export type HelpNight = {
  title: string;
  /** ISO 8601 with offset, e.g. "2026-11-21T19:00:00-06:00" */
  startsAt: string;
  durationMinutes: number;
  /** https://discord.com/events/<guildId>/<eventId> */
  discordEventUrl?: string;
  note?: string;
};

/**
 * New Player Help Nights, listed on the homepage and /event-guide.
 *
 * Doc adds an entry here AFTER creating the matching Discord Scheduled Event
 * (event URL format: https://discord.com/events/<guildId>/<eventId>).
 * The site never calls the Discord API; this file is the only source.
 * Past entries are filtered out automatically, so they can stay or be removed.
 */
// Saturdays 1–3pm US Central (Doc, 2026-11-02): chosen to land in the
// UK/EU evening too; ~58% of 2026 recruits are outside the US.
// discordEventUrl: add once the bot can create Discord Scheduled Events.
export const HELP_NIGHTS: HelpNight[] = [
  {
    title: 'New Player Help Night',
    startsAt: '2026-11-14T13:00:00-06:00',
    durationMinutes: 120,
    note: '1–3pm US Central · 7–9pm UK · 8–10pm Central Europe. Newbie Lounge voice channel.',
  },
  {
    title: 'New Player Help Night',
    startsAt: '2026-11-21T13:00:00-06:00',
    durationMinutes: 120,
    note: '1–3pm US Central · 7–9pm UK · 8–10pm Central Europe. Newbie Lounge voice channel.',
  },
  {
    title: 'New Player Help Night',
    startsAt: '2026-11-28T13:00:00-06:00',
    durationMinutes: 120,
    note: '1–3pm US Central · 7–9pm UK · 8–10pm Central Europe. Newbie Lounge voice channel.',
  },
  {
    title: 'New Player Help Night',
    startsAt: '2026-12-05T13:00:00-06:00',
    durationMinutes: 120,
    note: '1–3pm US Central · 7–9pm UK · 8–10pm Central Europe. Newbie Lounge voice channel.',
  },
];

export function upcomingHelpNights(now: Date = new Date()): HelpNight[] {
  return HELP_NIGHTS.filter((n) => new Date(n.startsAt).getTime() > now.getTime()).sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  );
}
