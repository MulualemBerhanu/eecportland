import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function PageHero({ eyebrow, title, description, className }: Props) {
  return (
    <section
      className={cn(
        "relative overflow-x-hidden border-b border-cream-200/80 bg-gradient-to-b from-cream-50 via-white to-cream-100/90 pb-20 pt-[calc(136px+0.5rem+env(safe-area-inset-top))] text-navy-950 sm:pb-24 sm:pt-36 lg:pt-40",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_58%_at_22%_0%,rgba(212,175,55,0.12),transparent_56%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_95%_85%,rgba(122,158,140,0.08),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
      >
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-gold-300/22 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cream-200/80 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-navy-900/6 blur-3xl" />
      </div>
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-[0.02]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-grid-warm opacity-[0.35]"
        aria-hidden
      />
      <Container className="relative">
        {eyebrow ? (
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500/80" />
            <p
              className="text-[0.68rem] font-semibold tracking-[0.34em] text-gold-700 uppercase sm:text-[0.72rem] font-[family-name:var(--font-outfit),ui-sans-serif,system-ui,sans-serif]"
            >
              {eyebrow}
            </p>
          </div>
        ) : null}
        <h1 className="font-heading mt-6 max-w-3xl bg-gradient-to-br from-navy-950 via-navy-950 to-navy-900/95 bg-clip-text text-transparent text-[clamp(2rem,4.5vw+1rem,3.35rem)] leading-[1.28] tracking-[-0.038em] pb-[0.14em]">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-charcoal-700 sm:text-lg">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
