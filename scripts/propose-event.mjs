#!/usr/bin/env node
/**
 * propose-event.mjs
 *
 * Trigger this when CIG announces a new Free Fly event. Pass the URL of the
 * announcement (RSI Comm-Link or any page that contains the event details) and
 * the script will:
 *
 *   1. Fetch the page
 *   2. Strip it to readable text
 *   3. Send it to Claude with the current `src/data/events.ts` as cached
 *      context, asking for a single proposed FreeFlyEvent entry as JSON
 *   4. Print the result so you can paste it into events.ts
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... npm run propose-event -- <url>
 *
 * Examples:
 *   npm run propose-event -- https://robertsspaceindustries.com/en/comm-link/transmission/...
 *
 * Environment:
 *   ANTHROPIC_API_KEY   required
 *   ANTHROPIC_MODEL     optional, defaults to claude-opus-4-7
 */

import Anthropic from '@anthropic-ai/sdk';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const EVENTS_FILE = path.join(REPO_ROOT, 'src', 'data', 'events.ts');
const MAX_HTML_CHARS = 200_000;
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-opus-4-7';

function die(msg, code = 1) {
  process.stderr.write(`error: ${msg}\n`);
  process.exit(code);
}

function usage() {
  process.stderr.write(
    `usage: npm run propose-event -- <announcement-url>\n` +
      `  Set ANTHROPIC_API_KEY in your environment.\n`,
  );
  process.exit(2);
}

function htmlToText(html) {
  // Drop noisy tag content first, then tags, then collapse whitespace.
  // Good enough for marketing pages — not a real HTML parser.
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .trim();
}

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      // RSI sometimes blocks bare Node UAs.
      'User-Agent':
        'Mozilla/5.0 (compatible; freeflyevent-site/1.0; +https://freeflyevent.com)',
      Accept: 'text/html,application/xhtml+xml',
    },
    redirect: 'follow',
  });
  if (!res.ok) die(`fetch failed: ${res.status} ${res.statusText} for ${url}`);
  const html = await res.text();
  let text = htmlToText(html);
  if (text.length > MAX_HTML_CHARS) {
    text = text.slice(0, MAX_HTML_CHARS) + '\n\n[... truncated ...]';
  }
  return text;
}

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    found: {
      type: 'boolean',
      description:
        'Whether the page describes a Star Citizen Free Fly event with concrete dates.',
    },
    reasoning: {
      type: 'string',
      description:
        'Short explanation of how you decided. If not found, what was on the page instead. If found, which sentences gave you the dates.',
    },
    event: {
      anyOf: [
        { type: 'null' },
        {
          type: 'object',
          additionalProperties: false,
          properties: {
            id: {
              type: 'string',
              description:
                'Slug like "invictus-2026" or "iae-2026". lowercase, hyphenated, no spaces.',
            },
            name: {
              type: 'string',
              description:
                'Display name, e.g. "Invictus Launch Week 2026" or "Intergalactic Aerospace Expo 2026".',
            },
            start: {
              type: 'string',
              description: 'ISO 8601 UTC timestamp of event start.',
            },
            end: {
              type: 'string',
              description: 'ISO 8601 UTC timestamp of event end.',
            },
            ships: {
              type: 'array',
              items: { type: 'string' },
              description:
                'Free-fly ship roster as listed in the announcement, in order. If a daily-rotation event, summarize as one entry like "100+ rotating ships".',
            },
            notes: {
              type: 'string',
              description:
                'One short sentence of context (optional). Empty string if nothing to add.',
            },
            source: {
              type: 'string',
              description: 'Canonical announcement URL.',
            },
            confidence: {
              type: 'string',
              enum: ['high', 'medium', 'low'],
              description:
                'high = explicit dates and ship list found; medium = dates inferred or partial; low = significant ambiguity.',
            },
          },
          required: [
            'id',
            'name',
            'start',
            'end',
            'ships',
            'notes',
            'source',
            'confidence',
          ],
        },
      ],
    },
  },
  required: ['found', 'reasoning', 'event'],
};

const SYSTEM_PROMPT = `You are an extraction assistant for freeflyevent.com, a fan tracker for Star Citizen Free Fly events.

A "Free Fly event" is a CIG-run promotion where Star Citizen is playable for free for a limited window — typically Invictus Launch Week (May) or the Intergalactic Aerospace Expo / IAE (November). They have explicit start/end dates and a list of unlocked ships.

Your job: given the rendered text of an announcement page, decide whether it describes a Free Fly event with concrete dates, and if so, extract a single FreeFlyEvent record.

Rules:
- All dates as ISO 8601 in UTC. CIG times are usually 17:00 UTC unless stated otherwise.
- The "ships" array should list the ships that are temporarily unlocked. For 100+-ship rotating events (IAE), summarize as one entry rather than enumerating.
- "id" must be lowercase, hyphenated, in the format "<event-shortname>-<year>" (e.g. "invictus-2026", "iae-2026"). Match the conventions visible in the existing events.ts file.
- If the page is about a different topic (a patch note, a ship sale, a tournament, news roundup), set found=false and explain.
- Do not invent dates. If only one date is given, set found=false unless you can confidently infer the other.
- Source URL is the page you were given.`;

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1) usage();
  const url = args[0];
  if (!/^https?:\/\//i.test(url)) die('argument must be an http(s) URL');
  if (!process.env.ANTHROPIC_API_KEY) die('ANTHROPIC_API_KEY is not set');

  process.stderr.write(`fetching ${url}\n`);
  const pageText = await fetchPage(url);
  process.stderr.write(`page extracted (${pageText.length} chars)\n`);

  const eventsSource = await readFile(EVENTS_FILE, 'utf8');

  const client = new Anthropic();

  process.stderr.write(`asking ${MODEL}...\n`);
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 4096,
    thinking: { type: 'adaptive' },
    system: [
      {
        type: 'text',
        text: SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' },
      },
    ],
    output_config: {
      format: { type: 'json_schema', schema: SCHEMA },
    },
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text:
              'Here is the current src/data/events.ts so you can match its conventions and avoid duplicate IDs:\n\n```ts\n' +
              eventsSource +
              '\n```',
            cache_control: { type: 'ephemeral' },
          },
          {
            type: 'text',
            text:
              `Announcement page URL: ${url}\n\n` +
              `Rendered page text follows. Decide whether it describes a new Free Fly and, if so, propose a single FreeFlyEvent entry.\n\n` +
              '---\n' +
              pageText +
              '\n---',
          },
        ],
      },
    ],
  });

  // Find the JSON output block. With output_config.format the model returns
  // a single text block whose content is the validated JSON string.
  const textBlock = response.content.find((b) => b.type === 'text');
  if (!textBlock) die('no text response from model');
  let parsed;
  try {
    parsed = JSON.parse(textBlock.text);
  } catch (err) {
    process.stderr.write('failed to parse JSON response — raw output:\n');
    process.stderr.write(textBlock.text + '\n');
    process.exit(1);
  }

  // Cache visibility — useful for tuning future runs.
  const u = response.usage;
  process.stderr.write(
    `tokens: in=${u.input_tokens} out=${u.output_tokens}` +
      ` cache_read=${u.cache_read_input_tokens ?? 0}` +
      ` cache_write=${u.cache_creation_input_tokens ?? 0}\n\n`,
  );

  if (!parsed.found) {
    process.stdout.write(
      'No Free Fly event extracted from that page.\n\n' +
        `reasoning: ${parsed.reasoning}\n`,
    );
    return;
  }

  const ev = parsed.event;
  process.stdout.write(
    `Proposed entry (confidence: ${ev.confidence})\n` +
      `${parsed.reasoning}\n\n` +
      `Paste into FREE_FLY_HISTORY at the top:\n\n` +
      `  {\n` +
      `    id: ${JSON.stringify(ev.id)},\n` +
      `    name: ${JSON.stringify(ev.name)},\n` +
      `    start: ${JSON.stringify(ev.start)},\n` +
      `    end: ${JSON.stringify(ev.end)},\n` +
      `    ships: ${JSON.stringify(ev.ships)},\n` +
      (ev.notes ? `    notes: ${JSON.stringify(ev.notes)},\n` : '') +
      `    source: ${JSON.stringify(ev.source)},\n` +
      `  },\n`,
  );
}

main().catch((err) => {
  process.stderr.write(`unexpected error: ${err?.stack || err}\n`);
  process.exit(1);
});
