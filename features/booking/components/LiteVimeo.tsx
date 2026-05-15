"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/features/analytics/track";

interface Props {
  videoId: string | undefined;
  posterUrl?: string;
  background?: boolean;
  className?: string;
}

export function LiteVimeo({ videoId, posterUrl, background = false, className }: Props) {
  const [loaded, setLoaded] = useState(background);

  if (!videoId) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-[color:var(--color-racing-blue)] to-[color:var(--color-checkered-black)] text-white",
          background ? "h-full w-full" : "aspect-video w-full rounded-[var(--radius-lg)]",
          className,
        )}
      >
        <p className="text-sm opacity-70">Hero video placeholder</p>
      </div>
    );
  }

  const params = background
    ? "background=1&autoplay=1&loop=1&muted=1&autopause=0"
    : "autoplay=1&title=0&byline=0&portrait=0";

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        background ? "h-full w-full" : "aspect-video w-full rounded-[var(--radius-lg)]",
        className,
      )}
    >
      {!loaded ? (
        <button
          type="button"
          onClick={() => {
            setLoaded(true);
            track("video_play", { videoId });
          }}
          className="absolute inset-0 z-10 grid place-items-center bg-cover bg-center"
          style={posterUrl ? { backgroundImage: `url(${posterUrl})` } : undefined}
          aria-label="Play video"
        >
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--color-track-orange)] text-white shadow-[var(--shadow-lg)] hover:bg-[color:var(--color-track-orange-600)]">
            <Play size={28} aria-hidden />
          </span>
        </button>
      ) : (
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?${params}`}
          title="RC Track UAE"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}
