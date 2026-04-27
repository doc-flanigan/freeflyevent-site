type Step = {
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    title: 'Create your free RSI account',
    body: 'Use a referral code at signup so 50,000 UEC lands in your account when you log in. You cannot add the code after the 24-hour grace window — get it right the first time.',
  },
  {
    title: 'Download the launcher',
    body: 'Grab the RSI Launcher from your account page. It downloads the game client (~100 GB). Start this early — the launcher will keep running while you read on.',
  },
  {
    title: 'Pick a ship from the Free Fly list',
    body: 'During the event, several ships are unlocked for everyone. The featured ships rotate by event — check the current event card on the homepage.',
  },
  {
    title: 'Run the new-player tutorial',
    body: 'Spawn at your starting station, follow the contract markers, and learn flight, quantum travel, and ship combat basics. 30–45 minutes well spent.',
  },
  {
    title: 'Try a delivery mission',
    body: 'Easiest first earner. Pick up boxes on one moon, drop them on another. Pays well, low risk, and you see a lot of the universe quickly.',
  },
  {
    title: 'Explore a major planet',
    body: 'Microtech (snow), ArcCorp (city), Crusader (gas giant), or Hurston (industrial). Each is enormous and worth a quantum jump.',
  },
  {
    title: 'Group up with friends',
    body: 'Star Citizen is unforgivingly fun in groups. Use chat or Spectrum to find a crew. Friend other players and queue into shared instances.',
  },
  {
    title: 'Decide before the event ends',
    body: "If you're enjoying it, pick up a Game Package while still inside the event window. Your referral bonus and any Free Fly progress carry over.",
  },
];

export function FreeFlyGuide() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2">
      {STEPS.map((step, i) => (
        <li
          key={step.title}
          className="card flex gap-4"
        >
          <div className="flex-shrink-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-orange/40 bg-orange/10 font-display font-bold text-orange">
              {i + 1}
            </span>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-white">{step.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
