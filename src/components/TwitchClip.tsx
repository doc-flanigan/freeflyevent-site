'use client';

import { useEffect, useState } from 'react';

type Props = {
  clipId: string;
  title?: string;
};

export function TwitchClip({ clipId, title = 'Official CIG statement' }: Props) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const parent = window.location.hostname;
    setSrc(
      `https://clips.twitch.tv/embed?clip=${clipId}&parent=${parent}&autoplay=false`,
    );
  }, [clipId]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-blackMid">
      {src ? (
        <iframe
          src={src}
          title={title}
          allowFullScreen
          allow="autoplay; fullscreen"
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <div className="absolute inset-0 animate-pulse bg-white/5" aria-hidden />
      )}
    </div>
  );
}
