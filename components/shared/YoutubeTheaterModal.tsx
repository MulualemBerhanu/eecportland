"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { YoutubeSermonEmbed } from "@/components/shared/YoutubeSermonEmbed";

type Props = {
  open: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
};

export function YoutubeTheaterModal({ open, onClose, videoId, title }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex flex-col bg-navy-950/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`${title}, video`}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-white/20 sm:right-6 sm:top-6"
        aria-label="Close video"
      >
        <X className="size-5" aria-hidden />
        Close
      </button>

      <div
        className="relative z-[1] flex min-h-0 flex-1 flex-col items-center justify-center px-3 pb-6 pt-16 sm:px-6 sm:pb-10 sm:pt-20"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-video w-full max-h-[min(85vh,calc(100vw-1.5rem))] max-w-[min(1600px,100vw-1.5rem)] overflow-hidden rounded-xl border border-white/15 bg-black shadow-[0_24px_80px_-20px_rgba(0,0,0,0.65)] ring-1 ring-white/10 sm:rounded-2xl">
          <YoutubeSermonEmbed
            videoId={videoId}
            title={title}
            autoplay
            priority
            className="h-full max-h-[inherit]"
          />
        </div>
        <p className="font-ethiopic mt-6 max-w-4xl text-center text-base font-semibold leading-snug text-white/95 sm:text-lg">
          {title}
        </p>
      </div>
    </div>,
    document.body,
  );
}
