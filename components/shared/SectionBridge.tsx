import { cn } from "@/lib/utils";

/**
 * Full-width SVG transitions between homepage sections.
 * Each variant is intentionally different for a custom, editorial feel.
 * Pass a unique `uid` (e.g. from useId) so gradient IDs never collide.
 */

export type SectionBridgeVariant =
  | "aurora"
  | "toNavy"
  | "fromNavy"
  | "ribbon"
  | "fold"
  | "steps"
  | "spire"
  | "softRamp";

const CREAM = "#faf8f5";
const CREAM_DEEP = "#efeae4";
const NAVY = "#0b1c2c";
const NAVY_MID = "#1c2e45";
const NAVY_INDIGO = "#2a3d52";
const GOLD = "#d4af37";

type Props = {
  variant: SectionBridgeVariant;
  /** Unique string for SVG defs (use useId().replace(/:/g, "")) */
  uid: string;
  className?: string;
};

export function SectionBridge({ variant, uid, className }: Props) {
  const g = (name: string) => `${uid}-${name}`;

  switch (variant) {
    case "aurora":
      return (
        <div className={cn("bridge-drift -mx-px", className)} aria-hidden>
          <svg
            className="relative block h-[4.5rem] w-full max-w-none sm:h-[5.5rem] md:h-28"
            viewBox="0 0 1440 140"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={g("a")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CREAM} />
                <stop offset="55%" stopColor={CREAM_DEEP} />
                <stop offset="100%" stopColor={CREAM} />
              </linearGradient>
              <linearGradient id={g("b")} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={`${GOLD}00`} />
                <stop offset="50%" stopColor={`${GOLD}33`} />
                <stop offset="100%" stopColor={`${GOLD}00`} />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${g("a")})`}
              d="M0 0h1440v40c-240 48-480 72-720 60S240 68 0 20V0z"
            />
            <path
              fill={`url(#${g("b")})`}
              opacity="0.9"
              d="M0 25c320 70 640 90 960 45s400-55 480-65v30H0z"
            />
          </svg>
        </div>
      );

    case "toNavy":
      return (
        <div className={cn("bridge-drift -mx-px", className)} aria-hidden>
          <svg
            className="relative block h-16 w-full max-w-none sm:h-24 md:h-32"
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={g("n")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CREAM} />
                <stop offset="32%" stopColor={NAVY_MID} />
                <stop offset="72%" stopColor={NAVY_INDIGO} />
                <stop offset="100%" stopColor={NAVY} />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${g("n")})`}
              d="M0 0h1440L1440 85C1080 20 720-5 360 45S0 120 0 95V0z"
            />
            <path
              fill={NAVY}
              opacity="0.38"
              d="M0 55c480-40 960-50 1440 25v80H0z"
            />
          </svg>
        </div>
      );

    case "fromNavy":
      return (
        <div className={cn("bridge-drift-reverse -mx-px", className)} aria-hidden>
          <svg
            className="relative block h-16 w-full max-w-none sm:h-24 md:h-28"
            viewBox="0 0 1440 140"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={g("f")} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor={CREAM} />
                <stop offset="38%" stopColor={CREAM_DEEP} />
                <stop offset="88%" stopColor={NAVY_INDIGO} />
                <stop offset="100%" stopColor={NAVY} />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${g("f")})`}
              d="M0 140h1440V45c-360 55-720 40-1080 0S0 0 0 25v115z"
            />
            <path
              fill={GOLD}
              fillOpacity="0.12"
              d="M0 100c480 28 960 18 1440-35v75H0z"
            />
          </svg>
        </div>
      );

    case "ribbon":
      return (
        <div className={cn("relative py-2", className)} aria-hidden>
          <div className="relative h-px w-full bg-gradient-to-r from-transparent via-cream-200 to-transparent" />
          <div className="relative -mt-px flex justify-center">
            <svg
              className="h-14 w-full max-w-3xl sm:h-16"
              viewBox="0 0 800 64"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id={g("r")} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={`${GOLD}00`} />
                  <stop offset="50%" stopColor={GOLD} />
                  <stop offset="100%" stopColor={`${GOLD}00`} />
                </linearGradient>
              </defs>
              <path
                d="M0 32 Q200 8 400 32 T800 32"
                fill="none"
                stroke={`url(#${g("r")})`}
                strokeWidth="2"
                strokeLinecap="round"
                className="bridge-stroke-draw"
              />
            </svg>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-navy-950/10 to-transparent" />
        </div>
      );

    case "fold":
      return (
        <div className={cn("-mx-px", className)} aria-hidden>
          <svg
            className="relative block h-20 w-full max-w-none sm:h-28"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={g("fo")} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor={CREAM} />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${g("fo")})`}
              d="M0 0 L1440 0 L1440 45 L960 75 L480 35 L0 65 Z"
            />
            <path
              fill={CREAM_DEEP}
              fillOpacity="0.5"
              d="M0 40 L480 20 L960 60 L1440 30 L1440 120 L0 120 Z"
            />
          </svg>
        </div>
      );

    case "steps":
      return (
        <div className={cn("-mx-px", className)} aria-hidden>
          <svg
            className="relative block h-14 w-full sm:h-[4.5rem]"
            viewBox="0 0 1440 72"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={g("s")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CREAM_DEEP} />
                <stop offset="100%" stopColor={CREAM} />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${g("s")})`}
              d="M0 0h1440v12H960v12H480v12H0v36z"
            />
            <path
              fill={NAVY}
              fillOpacity="0.04"
              d="M0 36h480v12h480v12h480v12H0z"
            />
          </svg>
        </div>
      );

    case "spire":
      return (
        <div className={cn("-mx-px", className)} aria-hidden>
          <svg
            className="relative block h-24 w-full sm:h-32"
            viewBox="0 0 1440 128"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={g("sp")} x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#eef0ea" />
                <stop offset="100%" stopColor={CREAM} />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${g("sp")})`}
              d="M720 0 L1440 90 L1440 128 L0 128 L0 90 Z"
            />
            <path
              fill={GOLD}
              fillOpacity="0.08"
              d="M720 0 L1320 85 L120 85 Z"
            />
          </svg>
        </div>
      );

    case "softRamp":
      return (
        <div className={cn("bridge-drift -mx-px", className)} aria-hidden>
          <svg
            className="relative block h-12 w-full sm:h-16"
            viewBox="0 0 1440 64"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={g("sr")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CREAM} />
                <stop offset="100%" stopColor={CREAM_DEEP} />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${g("sr")})`}
              d="M0 0c480 40 960 40 1440 0v64H0z"
            />
          </svg>
        </div>
      );

    default:
      return null;
  }
}
