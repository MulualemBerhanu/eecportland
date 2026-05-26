"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import type { Sermon } from "@/data/sermons";
import { SermonCard } from "@/components/shared/SermonCard";
import { buildPagerItems } from "@/lib/pagination";
import { cn } from "@/lib/utils";

/** Matches Tailwind `sm`: below this we render fewer videos per page for performance. */
const MOBILE_MAX_WIDTH_MEDIA = "(min-width: 640px)";
const PAGE_SIZE_MOBILE = 4;
const PAGE_SIZE_DESKTOP = 8;

type Props = {
  sermons: Sermon[];
  /**
   * Fixed videos per page on all breakpoints.
   * When omitted, uses {@link PAGE_SIZE_MOBILE} below `sm` and {@link PAGE_SIZE_DESKTOP} from `sm` up.
   */
  pageSize?: number;
};

export function PaginatedSermonVideoGrid({ sermons, pageSize: pageSizeProp }: Props) {
  const reduce = useReducedMotion();
  const [page, setPage] = useState(0);
  /** Mobile-first default keeps SSR + first client paint aligned; widened after layout on desktop. */
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
    () => (sermons.length === 0 ? 0 : Math.ceil(sermons.length / pageSize)),
    [sermons.length, pageSize],
  );
  const safePage = totalPages === 0 ? 0 : Math.min(page, totalPages - 1);
  const start = safePage * pageSize;
  const end = Math.min(start + pageSize, sermons.length);
  const slice = useMemo(() => sermons.slice(start, end), [sermons, start, end]);

  useEffect(() => {
    if (totalPages === 0) {
      setPage(0);
      return;
    }
    setPage((p) => Math.min(p, totalPages - 1));
  }, [totalPages]);

  const pagerItems = totalPages === 0 ? [] : buildPagerItems(safePage, totalPages);
  const canPrev = totalPages > 0 && safePage > 0;
  const canNext = totalPages > 0 && safePage < totalPages - 1;

  const gridClass = "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4";

  const gridContent = slice.map((sermon, localIndex) => (
    <SermonCard
      key={`${safePage}-${pageSize}-${sermon.id}`}
      sermon={sermon}
      priority={localIndex < 2}
    />
  ));

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

  if (sermons.length === 0) {
    return (
      <p className="mt-8 text-center text-sm text-charcoal-600">
        Videos will appear here when sermons are available from the channel.
      </p>
    );
  }

  return (
    <>
      {gridBlock}

      <nav
        className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between"
        aria-label="Video pagination"
      >
        <p className="text-center text-sm leading-relaxed text-charcoal-600 sm:text-left">
          Showing{" "}
          <span className="font-semibold text-navy-950">
            {start + 1}–{end}
          </span>{" "}
          of <span className="font-semibold text-navy-950">{sermons.length}</span>
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
  );
}
