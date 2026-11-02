import { CTAButton } from '@/components/CTAButton';
import { upcomingHelpNights } from '@/data/help-nights';
import { LocalTimeRange } from '@/components/LocalTimeRange';

const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? 'https://discord.gg/MpAUJs9xet';

export function HelpNights() {
  const upcoming = upcomingHelpNights();

  return (
    <section id="help-nights" className="container-narrow py-16 sm:py-20">
      <div className="rounded-2xl border border-white/10 bg-blackMid/60 p-8 sm:p-10">
        <span className="eyebrow">Live on Discord</span>
        <h2 className="heading-display mt-3 text-2xl sm:text-3xl">New Player Help Nights</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Every Saturday through the IAE (Intergalactic Aerospace Expo) season, we host live voice
          sessions on the Day One Citizen Discord. A helper walks you through your first launch,
          your first quantum jump (fast travel between locations) and your first mission. Bring
          your questions. No purchase needed.
        </p>

        {upcoming.length > 0 ? (
          <ul className="mt-6 space-y-4">
            {upcoming.map((night) => {
              return (
                <li
                  key={night.startsAt + night.title}
                  className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4"
                >
                  <div>
                    <div className="font-semibold text-white">{night.title}</div>
                    <div className="text-sm text-muted">
                      <LocalTimeRange startsAt={night.startsAt} durationMinutes={night.durationMinutes} />
                    </div>
                    {night.note && <div className="mt-1 text-sm text-white/70">{night.note}</div>}
                  </div>
                  <CTAButton
                    href={night.discordEventUrl ?? DISCORD_URL}
                    variant="secondary"
                    size="sm"
                    trackingLabel="help-night-rsvp"
                  >
                    RSVP on Discord
                  </CTAButton>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="mt-6">
            <p className="text-white/80">
              The next help night gets announced on Discord first. Join now and pick the Server
              Events ping in the welcome questions.
            </p>
            <div className="mt-4">
              <CTAButton
                href={DISCORD_URL}
                variant="secondary"
                trackingLabel="help-night-discord"
              >
                Join the Discord
              </CTAButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
