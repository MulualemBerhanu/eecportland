import type { Ministry } from "@/data/ministries";
import { cn } from "@/lib/utils";

const accentBar: Record<Ministry["accent"], string> = {
  gold: "from-gold-500 via-gold-400/60 to-transparent",
  burgundy: "from-burgundy-700 via-burgundy-600/50 to-transparent",
  forest: "from-forest-700 via-forest-600/50 to-transparent",
};

const iconBg: Record<Ministry["accent"], string> = {
  gold: "bg-gold-500/12 text-gold-700 ring-gold-500/15",
  burgundy: "bg-burgundy-700/10 text-burgundy-800 ring-burgundy-700/15",
  forest: "bg-forest-700/10 text-forest-800 ring-forest-700/15",
};

type Props = {
  ministry: Ministry;
  className?: string;
};

export function MinistryCard({ ministry, className }: Props) {
  const Icon = ministry.icon;
  return (
    <article
      className={cn(
        "shadow-card-soft group relative flex flex-col overflow-hidden rounded-3xl border border-cream-200/90 bg-gradient-to-b from-white to-cream-50/40 p-7",
        "ring-1 ring-navy-950/[0.035]",
        "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-2 hover:scale-[1.02] hover:border-gold-500/22 hover:shadow-card-hover",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          accentBar[ministry.accent],
        )}
        aria-hidden
      />
      <div
        className={cn(
          "mb-5 inline-flex size-12 items-center justify-center rounded-xl ring-1 transition duration-500 group-hover:scale-110 group-hover:-rotate-6",
          iconBg[ministry.accent],
        )}
        aria-hidden
      >
        <Icon className="size-6" />
      </div>
      <h3 className="font-heading text-xl tracking-tight text-navy-950">
        {ministry.title}
      </h3>
      <p className="mt-3 flex-1 leading-relaxed text-charcoal-700">
        {ministry.description}
      </p>
      <p className="mt-7 text-sm font-semibold tracking-wide text-gold-700 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        Explore ministry →
      </p>
    </article>
  );
}
