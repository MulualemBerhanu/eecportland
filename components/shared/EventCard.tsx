import type { ChurchEvent } from "@/data/events";
import { formatEventDate } from "@/data/events";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Calendar, Clock, MapPin } from "lucide-react";

const categoryStyles: Record<ChurchEvent["category"], string> = {
  worship: "bg-burgundy-700/12 text-burgundy-800 ring-burgundy-700/15",
  community: "bg-navy-900/10 text-navy-900 ring-navy-900/10",
  family: "bg-forest-700/10 text-forest-800 ring-forest-700/12",
  serve: "bg-gold-500/14 text-gold-700 ring-gold-500/20",
};

const categoryLabel: Record<ChurchEvent["category"], string> = {
  worship: "Worship",
  community: "Community",
  family: "Family",
  serve: "Serve",
};

type Props = {
  event: ChurchEvent;
  className?: string;
};

export function EventCard({ event, className }: Props) {
  return (
    <article
      className={cn(
        "shadow-card-soft group relative flex flex-col overflow-hidden rounded-3xl border border-cream-200/90 bg-gradient-to-b from-white to-cream-50/35 p-6",
        "ring-1 ring-navy-950/[0.035]",
        "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-2 hover:scale-[1.02] hover:border-gold-500/25 hover:shadow-card-hover",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold-500/[0.04] via-transparent to-navy-950/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-wide ring-1",
            categoryStyles[event.category],
          )}
        >
          {categoryLabel[event.category]}
        </span>
        {event.featured ? (
          <span className="rounded-full bg-gold-500/18 px-3 py-1 text-xs font-semibold text-gold-800 ring-1 ring-gold-500/25">
            Featured
          </span>
        ) : null}
      </div>
      <h3 className="relative mt-4 font-heading text-xl tracking-tight text-navy-950">
        {event.title}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-charcoal-700">
        {event.summary}
      </p>
      <ul className="relative mt-5 space-y-2.5 text-sm text-charcoal-700">
        <li className="flex items-start gap-2.5">
          <Calendar className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden />
          <span>{formatEventDate(event.date)}</span>
        </li>
        <li className="flex items-start gap-2.5">
          <Clock className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden />
          <span>{event.time}</span>
        </li>
        <li className="flex items-start gap-2.5">
          <MapPin className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden />
          <span>{event.location}</span>
        </li>
      </ul>
      <button
        type="button"
        className="relative mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-navy-900 transition hover:gap-2"
      >
        Details & register
        <ArrowUpRight className="size-4 opacity-70 transition group-hover:opacity-100" aria-hidden />
      </button>
    </article>
  );
}
