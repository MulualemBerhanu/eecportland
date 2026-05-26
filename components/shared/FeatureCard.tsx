import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
};

export function FeatureCard({ title, description, icon: Icon, className }: Props) {
  return (
    <div
      className={cn(
        "shadow-card-soft group relative overflow-hidden rounded-3xl border border-cream-200/90 bg-gradient-to-b from-white to-cream-50/50 p-8",
        "ring-1 ring-navy-950/[0.035] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-gold-500/35 before:to-transparent",
        "hover:-translate-y-1.5 hover:scale-[1.02] hover:border-gold-400/35 hover:shadow-card-hover hover:ring-2 hover:ring-gold-400/15",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-gradient-to-br from-gold-500/10 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      <div
        className="relative mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-950/[0.06] to-navy-950/[0.02] text-navy-900 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] ring-1 ring-navy-950/5 transition duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:from-gold-500/15 group-hover:to-gold-500/5 group-hover:text-gold-700 group-hover:ring-gold-500/20"
        aria-hidden
      >
        <Icon className="size-6" />
      </div>
      <h3 className="relative font-heading text-xl tracking-tight text-navy-950">
        {title}
      </h3>
      <p className="relative mt-3 leading-relaxed text-charcoal-700">
        {description}
      </p>
    </div>
  );
}
