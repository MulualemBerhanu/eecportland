"use client";

import Image from "next/image";
import { useState } from "react";
import type { Sermon } from "@/data/sermons";
import { cn } from "@/lib/utils";
import { youtubeEmbedId } from "@/lib/youtube-embed";
import { YoutubeTheaterModal } from "@/components/shared/YoutubeTheaterModal";
import { Play } from "lucide-react";

type Props = {
  sermon: Sermon;
  className?: string;
  priority?: boolean;
};

function formatRecency(sermon: Sermon): string | null {
  if (sermon.publishedTimeLabel?.trim()) return sermon.publishedTimeLabel.trim();
  if (sermon.date?.trim()) {
    const d = new Date(sermon.date + "T12:00:00");
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  }
  return null;
}

export function SermonCard({ sermon, className, priority }: Props) {
  const recency = formatRecency(sermon);
  const videoId = youtubeEmbedId(sermon);
  const [theaterOpen, setTheaterOpen] = useState(false);

  return (
    <article
      className={cn(
        "shadow-card-soft group overflow-hidden rounded-3xl border border-cream-200/90 bg-gradient-to-b from-white to-cream-50/40",
        "ring-1 ring-navy-950/[0.035] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-2 hover:scale-[1.02] hover:border-gold-500/25 hover:shadow-card-hover hover:ring-gold-500/15",
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={sermon.thumbnailUrl}
          alt={`${sermon.title}, sermon thumbnail`}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-navy-950/12 to-transparent" />
        {videoId ? (
          <button
            type="button"
            onClick={() => setTheaterOpen(true)}
            className="absolute inset-0 flex items-center justify-center"
            aria-label={`Play ${sermon.title}`}
          >
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-white/95 text-navy-950 shadow-[0_12px_40px_-12px_rgba(10,22,40,0.45)] ring-1 ring-white/60 transition hover:scale-105">
              <Play className="ml-0.5 size-6 fill-current" aria-hidden />
            </span>
          </button>
        ) : (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-white/95 text-navy-950 shadow-[0_12px_40px_-12px_rgba(10,22,40,0.45)] ring-1 ring-white/60">
              <Play className="ml-0.5 size-6 fill-current" aria-hidden />
              <span className="sr-only">Video unavailable</span>
            </span>
          </div>
        )}
        {sermon.duration ? (
          <span className="absolute bottom-3 right-3 rounded-md bg-navy-950/88 px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide text-cream-50 ring-1 ring-white/10 backdrop-blur-sm">
            {sermon.duration}
          </span>
        ) : null}
      </div>
      <div className="p-5">
        <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-gold-600 uppercase">
          {sermon.scripture}
        </p>
        <h3 className="font-ethiopic mt-2 text-lg font-semibold leading-snug tracking-tight text-navy-950">
          {sermon.title}
        </h3>
        <p className="mt-1.5 text-sm text-charcoal-700">
          {sermon.speaker}
          {recency ? ` · ${recency}` : null}
        </p>
        {sermon.description ? (
          <p className="font-ethiopic mt-3 line-clamp-4 text-sm leading-relaxed whitespace-pre-line text-charcoal-700">
            {sermon.description}
          </p>
        ) : null}
        {videoId ? (
          <button
            type="button"
            onClick={() => setTheaterOpen(true)}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy-950 transition hover:text-gold-700"
          >
            <Play className="size-4 fill-current" aria-hidden />
            Watch fullscreen
          </button>
        ) : null}
      </div>

      {videoId ? (
        <YoutubeTheaterModal
          open={theaterOpen}
          onClose={() => setTheaterOpen(false)}
          videoId={videoId}
          title={sermon.title}
        />
      ) : null}
    </article>
  );
}
