"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Expand,
  X,
} from "lucide-react";
import { buildPagerItems } from "@/lib/pagination";
import { cn } from "@/lib/utils";

/** Must match primary nav row height in `Navbar.tsx` (`h-[136px]`). */
const NAVBAR_OFFSET_PX = 136;

/** Matches Tailwind `sm`: below this we show a tighter page for faster mobile loading. */
const MOBILE_MAX_WIDTH_MEDIA = "(min-width: 640px)";
const PAGE_SIZE_MOBILE = 6;
const PAGE_SIZE_DESKTOP = 9;

type Props = {
  images: readonly string[];
  /**
   * Fixed photos per page on all breakpoints.
   * When omitted, uses {@link PAGE_SIZE_MOBILE} below `sm` and {@link PAGE_SIZE_DESKTOP} from `sm` up.
   */
  pageSize?: number;
};

export function PhotoGalleryLightbox({ images, pageSize: pageSizeProp }: Props) {
  const reduce = useReducedMotion();
  const [page, setPage] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  /** Mobile-first default keeps SSR + first client paint aligned with the mobile grid. */
  const [responsivePageSize, setResponsivePageSize] = useState(PAGE_SIZE_MOBILE);

  useLayoutEffect(() => {
    if (pageSizeProp != null) return;
    const mq = window.matchMedia(MOBILE_MAX_WIDTH_MEDIA);
    const apply = () =>
      setResponsivePageSize(mq.matches ? PAGE_SIZE_DESKTOP : PAGE_SIZE_MOBILE);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [pageSizeProp]);

  const pageSize = pageSizeProp ?? responsivePageSize;

  const totalPages = useMemo(
    () => (images.length === 0 ? 0 : Math.ceil(images.length / pageSize)),
    [images.length, pageSize],
  );
  const safePage = totalPages === 0 ? 0 : Math.min(page, totalPages - 1);
  const start = safePage * pageSize;
  const end = Math.min(start + pageSize, images.length);
  const slice = useMemo(() => images.slice(start, end), [images, start, end]);

  useEffect(() => {
    if (totalPages === 0) {
      setPage(0);
      return;
    }
    setPage((p) => Math.min(p, totalPages - 1));
  }, [totalPages]);

  useEffect(() => {
    if (activeIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight")
        setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % images.length));
      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === null ? 0 : (prev - 1 + images.length) % images.length,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, images.length]);

  const pagerItems = totalPages === 0 ? [] : buildPagerItems(safePage, totalPages);
  const canPrev = totalPages > 0 && safePage > 0;
  const canNext = totalPages > 0 && safePage < totalPages - 1;

  const gridClass =
    "mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4";

  const gridContent = slice.map((img, localIndex) => {
    const globalIndex = start + localIndex;
    return (
      <button
        key={`${safePage}-${pageSize}-${img}-${globalIndex}`}
        type="button"
        onClick={() => setActiveIndex(globalIndex)}
        className="group relative aspect-square overflow-hidden rounded-2xl border border-cream-200/90 bg-white shadow-card-soft transition-shadow duration-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-gold-500/45 focus-visible:outline-none"
        aria-label={`Open photo ${globalIndex + 1} in fullscreen`}
      >
        <Image
          src={`/eec photo/${img}`}
          alt={`Ebenezer Ethiopian Church gallery photo ${globalIndex + 1}`}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 50vw, 33vw"
          quality={78}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/18 via-transparent to-transparent opacity-75" />
        <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full border border-white/30 bg-navy-950/60 px-2 py-1 text-[0.65rem] font-semibold text-white opacity-0 transition group-hover:opacity-100">
          <Expand className="size-3" aria-hidden />
          Fullscreen
        </span>
      </button>
    );
  });

  const gridBlock = reduce ? (
    <div key={`${safePage}-${pageSize}`} className={gridClass}>
      {gridContent}
    </div>
  ) : (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={`${safePage}-${pageSize}`}
        className={gridClass}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {gridContent}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <>
      {images.length === 0 ? (
        <p className="mt-10 text-center text-sm text-charcoal-600">No photos to show yet.</p>
      ) : (
        <>
          {gridBlock}

          <nav
            className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between"
            aria-label="Gallery pagination"
          >
            <p className="text-center text-sm leading-relaxed text-charcoal-600 sm:text-left">
              Showing{" "}
              <span className="font-semibold text-navy-950">
                {start + 1}–{end}
              </span>{" "}
              of <span className="font-semibold text-navy-950">{images.length}</span>
              <span className="text-charcoal-500"> · </span>
              <span className="text-charcoal-600">
                Page {safePage + 1} of {totalPages}
              </span>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
              <button
                type="button"
                disabled={!canPrev}
                onClick={() => setPage(0)}
                className={cn(
                  "inline-flex size-10 items-center justify-center rounded-xl border text-charcoal-700 transition",
                  canPrev
                    ? "border-cream-300/90 bg-white shadow-sm hover:border-gold-400/45 hover:bg-cream-50 hover:text-navy-950"
                    : "cursor-not-allowed border-cream-200/70 bg-cream-100/50 text-charcoal-400",
                )}
                aria-label="First page"
              >
                <ChevronsLeft className="size-[1.125rem]" aria-hidden />
              </button>
              <button
                type="button"
                disabled={!canPrev}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                className={cn(
                  "inline-flex size-10 items-center justify-center rounded-xl border text-charcoal-700 transition",
                  canPrev
                    ? "border-cream-300/90 bg-white shadow-sm hover:border-gold-400/45 hover:bg-cream-50 hover:text-navy-950"
                    : "cursor-not-allowed border-cream-200/70 bg-cream-100/50 text-charcoal-400",
                )}
                aria-label="Previous page"
              >
                <ChevronLeft className="size-5" aria-hidden />
              </button>

              <div
                className="flex max-w-[min(100%,20rem)] flex-wrap items-center justify-center gap-1 rounded-2xl border border-cream-200/90 bg-gradient-to-b from-white to-cream-50/90 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] sm:max-w-none"
                role="group"
                aria-label="Page numbers"
              >
                {pagerItems.map((item) =>
                  item.type === "ellipsis" ? (
                    <span
                      key={item.key}
                      className="px-1.5 text-sm font-medium text-charcoal-400"
                      aria-hidden
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={item.index}
                      type="button"
                      onClick={() => setPage(item.index)}
                      aria-label={`Go to page ${item.index + 1}`}
                      aria-current={item.index === safePage ? "page" : undefined}
                      className={cn(
                        "min-h-9 min-w-9 rounded-xl px-3 text-sm font-semibold transition",
                        item.index === safePage
                          ? "bg-gradient-to-b from-gold-300 via-gold-400 to-gold-600 text-navy-950 shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,0_8px_22px_-10px_rgba(212,175,55,0.45)]"
                          : "text-charcoal-600 hover:bg-white/90 hover:text-navy-950",
                      )}
                    >
                      {item.index + 1}
                    </button>
                  ),
                )}
              </div>

              <button
                type="button"
                disabled={!canNext}
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                className={cn(
                  "inline-flex size-10 items-center justify-center rounded-xl border text-charcoal-700 transition",
                  canNext
                    ? "border-cream-300/90 bg-white shadow-sm hover:border-gold-400/45 hover:bg-cream-50 hover:text-navy-950"
                    : "cursor-not-allowed border-cream-200/70 bg-cream-100/50 text-charcoal-400",
                )}
                aria-label="Next page"
              >
                <ChevronRight className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                disabled={!canNext}
                onClick={() => setPage(totalPages - 1)}
                className={cn(
                  "inline-flex size-10 items-center justify-center rounded-xl border text-charcoal-700 transition",
                  canNext
                    ? "border-cream-300/90 bg-white shadow-sm hover:border-gold-400/45 hover:bg-cream-50 hover:text-navy-950"
                    : "cursor-not-allowed border-cream-200/70 bg-cream-100/50 text-charcoal-400",
                )}
                aria-label="Last page"
              >
                <ChevronsRight className="size-[1.125rem]" aria-hidden />
              </button>
            </div>
          </nav>
        </>
      )}

      {activeIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="photo-lightbox-title"
          className={cn(
            "fixed inset-x-0 bottom-0 z-40 flex min-h-0 flex-col border-t border-white/12",
            "bg-gradient-to-b from-navy-900/[0.98] via-navy-950/[0.99] to-navy-950",
            "shadow-[0_-28px_90px_-24px_rgba(0,0,0,0.55)] backdrop-blur-2xl backdrop-saturate-150",
          )}
          style={{
            top: `calc(${NAVBAR_OFFSET_PX}px + env(safe-area-inset-top, 0px))`,
          }}
        >
          <div className="relative z-30 flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5 sm:px-6 sm:py-4">
            <div className="min-w-0">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold-300/90">
                Community gallery
              </p>
              <p
                id="photo-lightbox-title"
                className="font-heading mt-1 truncate text-lg text-white sm:text-xl"
              >
                Photo <span className="text-gold-200">{activeIndex + 1}</span>
                <span className="text-white/40"> / </span>
                {images.length}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border border-white/25",
                "bg-white/12 px-4 py-2.5 text-sm font-semibold text-white shadow-lg",
                "transition hover:border-white/40 hover:bg-white/20",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950",
              )}
              aria-label="Close fullscreen gallery"
            >
              <X className="size-4" aria-hidden />
              Close
            </button>
          </div>

          <div className="relative z-0 min-h-0 flex-1 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,transparent_0%,rgba(0,0,0,0.22)_100%)]"
              aria-hidden
            />

            <button
              type="button"
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === null ? 0 : (prev - 1 + images.length) % images.length,
                )
              }
              className={cn(
                "absolute left-2 top-1/2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-2xl sm:left-5 sm:size-12",
                "border border-white/20 bg-navy-950/55 text-white shadow-lg backdrop-blur-md",
                "transition hover:border-gold-400/45 hover:bg-navy-900/80 hover:text-gold-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/60",
              )}
              aria-label="Previous photo"
            >
              <ChevronLeft className="size-5 sm:size-6" aria-hidden />
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % images.length))
              }
              className={cn(
                "absolute right-2 top-1/2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-2xl sm:right-5 sm:size-12",
                "border border-white/20 bg-navy-950/55 text-white shadow-lg backdrop-blur-md",
                "transition hover:border-gold-400/45 hover:bg-navy-900/80 hover:text-gold-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/60",
              )}
              aria-label="Next photo"
            >
              <ChevronRight className="size-5 sm:size-6" aria-hidden />
            </button>

            <div className="absolute inset-x-3 inset-y-3 sm:inset-x-10 sm:inset-y-5 md:inset-x-16">
              <div className="relative h-full min-h-[12rem] w-full">
                <Image
                  src={`/eec photo/${images[activeIndex]}`}
                  alt={`Ebenezer Ethiopian Church fullscreen photo ${activeIndex + 1}`}
                  fill
                  className="object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.45)]"
                  sizes="100vw"
                  quality={88}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
