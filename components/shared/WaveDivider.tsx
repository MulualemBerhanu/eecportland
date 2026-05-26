import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Flip vertically (e.g. bottom vs top of band) */
  flip?: boolean;
  colorClass?: string;
};

export function WaveDivider({
  className,
  flip,
  colorClass = "text-cream-50",
}: Props) {
  return (
    <div
      className={cn(
        "pointer-events-none relative -mt-px w-full overflow-hidden leading-[0]",
        colorClass,
        className,
      )}
      aria-hidden
    >
      <svg
        className={cn(
          "relative block h-10 w-[calc(100%+2px)] max-w-none sm:h-14",
          flip && "rotate-180",
        )}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0 24 C 180 0 360 48 540 24 C 720 0 900 48 1080 24 C 1260 0 1380 12 1440 8 L 1440 48 L 0 48 Z"
        />
      </svg>
    </div>
  );
}
