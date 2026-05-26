"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Sermon } from "@/data/sermons";
import { youtubeEmbedId } from "@/lib/youtube-embed";
import { YoutubeTheaterModal } from "@/components/shared/YoutubeTheaterModal";
import { Play } from "lucide-react";

type Props = {
  sermon: Sermon;
  watchUrl: string | null;
};

export function FeaturedSermonHero({ sermon, watchUrl }: Props) {
  const videoId = youtubeEmbedId(sermon);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[240px] bg-navy-950 lg:min-h-[320px]">
          <Image
            src={sermon.thumbnailUrl}
            alt={`${sermon.title}, featured sermon`}
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/25 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-navy-950/15 lg:to-navy-950/40" />
          {videoId ? (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white"
            >
              <span className="inline-flex size-20 items-center justify-center rounded-full bg-white text-navy-950 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.55)] ring-4 ring-white/30 transition hover:scale-105">
                <Play className="ml-1 size-10 fill-current" aria-hidden />
              </span>
              <span className="rounded-full bg-navy-950/65 px-5 py-2 text-sm font-semibold tracking-wide backdrop-blur-sm">
                Play fullscreen
              </span>
            </button>
          ) : null}
        </div>
        <div className="flex flex-col justify-center border-t border-cream-200/90 p-8 sm:p-10 lg:border-t-0 lg:border-l">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold-700 uppercase">Featured</p>
          <h2 className="font-ethiopic mt-3 text-3xl font-semibold leading-snug text-navy-950">
            {sermon.title}
          </h2>
          <p className="mt-2 text-charcoal-700">
            {sermon.speaker} · {sermon.scripture}
          </p>
          {sermon.description ? (
            <p className="font-ethiopic mt-4 max-w-prose text-sm leading-relaxed whitespace-pre-line text-charcoal-700">
              {sermon.description}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-4">
            {videoId ? (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-6 py-3 text-sm font-semibold text-cream-50 shadow-lg ring-1 ring-navy-950/20 transition hover:bg-navy-900"
              >
                <Play className="size-4 fill-current" aria-hidden />
                Watch fullscreen
              </button>
            ) : null}
            {watchUrl ? (
              <p className="flex items-center text-sm text-charcoal-700">
                <Link
                  href={watchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-navy-950 underline decoration-gold-500/50 underline-offset-4 hover:decoration-gold-600"
                >
                  Open on YouTube
                </Link>
              </p>
            ) : null}
          </div>
          {!videoId ? (
            <div className="mt-8 aspect-video w-full rounded-2xl border border-cream-200 bg-cream-50/80">
              <div className="flex h-full items-center justify-center px-4 text-center text-sm text-charcoal-700">
                Add a <code className="mx-1 rounded bg-cream-200 px-1">youtubeId</code> or{" "}
                <code className="mx-1 rounded bg-cream-200 px-1">videoUrl</code> in your sermon data to
                enable playback.
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {videoId ? (
        <YoutubeTheaterModal
          open={open}
          onClose={() => setOpen(false)}
          videoId={videoId}
          title={sermon.title}
        />
      ) : null}
    </>
  );
}
