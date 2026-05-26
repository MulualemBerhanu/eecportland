import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Light = default on cream; dark = for navy/deep sections */
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  tone = "light",
}: Props) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "max-w-2xl overflow-visible",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" && "mx-auto justify-center",
          )}
        >
          <span
            className={cn(
              "h-px w-10 shrink-0 bg-gradient-to-r",
              isDark
                ? "from-transparent to-gold-400/80"
                : "from-gold-500/25 to-gold-600",
            )}
            aria-hidden
          />
          <p
            className={cn(
              "text-[0.68rem] font-semibold tracking-[0.34em] uppercase sm:text-[0.72rem]",
              "font-[family-name:var(--font-outfit),ui-sans-serif,system-ui,sans-serif]",
              isDark ? "text-gold-300" : "text-gold-700",
            )}
          >
            {eyebrow}
          </p>
          <span
            className={cn(
              "h-px w-10 shrink-0 bg-gradient-to-l",
              isDark
                ? "from-transparent to-gold-400/80"
                : "from-gold-500/25 to-gold-600",
            )}
            aria-hidden
          />
        </div>
      ) : null}
      <h2
        className={cn(
          "font-heading mt-5 text-[clamp(1.85rem,4vw+1rem,3.15rem)] leading-[1.28] tracking-[-0.038em] pb-[0.14em]",
          isDark
            ? "text-cream-50"
            : "bg-gradient-to-br from-navy-950 via-navy-950 to-navy-900/95 bg-clip-text text-transparent",
          eyebrow && "mt-4",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-6 max-w-xl text-[1.08rem] leading-[1.78] sm:text-lg sm:leading-[1.72]",
            align === "center" && "mx-auto",
            isDark ? "text-cream-200/95" : "text-charcoal-700",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
