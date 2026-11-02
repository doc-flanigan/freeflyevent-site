export type HelpNight = {
  title: string;
  /** ISO 8601 with offset, e.g. "2026-11-21T19:00:00-06:00" */
  startsAt: string;
  durationMinutes: number;
  /** Invite-with-event link, https://discord.gg/<invite>?event=<eventId>, so
   *  visitors who aren't in the server yet can join and land on the event. */
  discordEventUrl?: string;
  note?: string;
};

/**
 * New Player Help Nights, listed on the homepage and /event-guide.
 *
 * Doc adds an entry here AFTER creating the matching Discord Scheduled Event
 * (link format: https://discord.gg/<invite>?event=<eventId>).
 * The site never calls the Discord API; this file is the only source.
 * Past entries are filtered out automatically, so they can stay or be removed.
 */
// Saturdays 1–3pm US Central (Doc, 2026-11-02): chosen to land in the
// UK/EU evening too; ~58% of 2026 recruits are outside the US.
// Discord Scheduled Events live in the Events > Event 1 voice channel
// (the bot can't see the Newbie Lounge, which is onboarding-gated).
export const HELP_NIGHTS: HelpNight[] = [
  {
    title: 'New Player Help Night',
    startsAt: '2026-11-14T13:00:00-06:00',
    durationMinutes: 120,
    discordEventUrl: 'https://discord.gg/MpAUJs9xet?event=1566899366805897246',
    note: '1–3pm US Central · 7–9pm UK · 8–10pm Central Europe. Events voice channel on Discord.',
  },
  {
    title: 'New Player Help Night',
    startsAt: '2026-11-21T13:00:00-06:00',
    durationMinutes: 120,
    discordEventUrl: 'https://discord.gg/MpAUJs9xet?event=1566899421801881620',
    note: '1–3pm US Central · 7–9pm UK · 8–10pm Central Europe. Events voice channel on Discord.',
  },
  {
    title: 'New Player Help Night',
    startsAt: '2026-11-28T13:00:00-06:00',
    durationMinutes: 120,
    discordEventUrl: 'https://discord.gg/MpAUJs9xet?event=1566899429716271134',
    note: '1–3pm US Central · 7–9pm UK · 8–10pm Central Europe. Events voice channel on Discord.',
  },
  {
    title: 'New Player Help Night',
    startsAt: '2026-12-05T13:00:00-06:00',
    durationMinutes: 120,
    discordEventUrl: 'https://discord.gg/MpAUJs9xet?event=1566899437434048614',
    note: '1–3pm US Central · 7–9pm UK · 8–10pm Central Europe. Events voice channel on Discord.',
  },
];

export function upcomingHelpNights(now: Date = new Date()): HelpNight[] {
  return HELP_NIGHTS.filter((n) => new Date(n.startsAt).getTime() > now.getTime()).sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  );
}
