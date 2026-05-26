import type { Ministry } from "@/data/ministries";
import { cn } from "@/lib/utils";

const accentBar: Record<Ministry["accent"], string> = {
  gold: "from-gold-500 via-gold-400/55 to-transparent",
  burgundy: "from-burgundy-700 via-burgundy-600/45 to-transparent",
  forest: "from-forest-700 via-forest-600/45 to-transparent",
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

export function MinistryArticle({ ministry, className }: Props) {
  const Icon = ministry.icon;
  return (
    <article
      id={ministry.id}
      className={cn(
        "scroll-mt-36 rounded-[1.35rem] border border-cream-200/90 bg-gradient-to-b from-white to-cream-50/50 p-8 shadow-card-soft ring-1 ring-navy-950/[0.035] sm:p-10",
        className,
      )}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
        <div
          className={cn(
            "flex size-14 shrink-0 items-center justify-center rounded-2xl ring-1",
            iconBg[ministry.accent],
          )}
          aria-hidden
        >
          <Icon className="size-7" />
        </div>
        <div className="min-w-0 flex-1">
          <div
            className={cn(
              "mb-6 h-1 w-16 rounded-full bg-gradient-to-r",
              accentBar[ministry.accent],
            )}
            aria-hidden
          />
          <h2 className="font-heading text-2xl tracking-tight text-navy-950 sm:text-[1.75rem]">
            {ministry.title}
          </h2>
          <div className="mt-6 space-y-8 text-base leading-relaxed text-charcoal-700">
            {ministry.sections.map((section, i) => (
              <div key={i}>
                {section.heading ? (
                  <h3 className="font-heading text-lg text-navy-950">{section.heading}</h3>
                ) : null}
                <div
                  className={cn(
                    "space-y-4",
                    section.heading ? "mt-3" : undefined,
                  )}
                >
                  {section.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
