import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/** `public/EEC Logo PNG copy.png` */
export const BRAND_LOGO_PATH = "/EEC%20Logo%20PNG%20copy.png" as const;

/** Must match actual file pixels (avoids layout bugs with `next/image`). */
const LOGO_WIDTH = 1950;
const LOGO_HEIGHT = 1500;

type BrandLogoProps = {
  variant: "navbar" | "footer";
  className?: string;
};

/**
 * Logo only: size capped so it cannot overflow the header bar.
 */
export function BrandLogo({ variant, className }: BrandLogoProps) {
  const isNav = variant === "navbar";

  return (
    <Image
      src={BRAND_LOGO_PATH}
      alt={siteConfig.shortName}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      sizes={
        isNav
          ? "(max-width: 640px) 180px, (max-width: 1024px) 260px, 300px"
          : "(max-width: 640px) 280px, (max-width: 1024px) 360px, 420px"
      }
      priority={isNav}
      className={cn(
        "h-auto w-auto shrink-0 object-contain object-left sm:object-center",
        isNav &&
          cn(
            "max-h-[calc(136px-1rem)] max-w-[min(48vw,10.5rem)]",
            "sm:max-h-[calc(136px-1.25rem)] sm:max-w-[min(52vw,15rem)]",
            "md:max-w-[15rem]",
            "lg:max-w-[17rem]",
            "xl:max-w-[19rem]",
          ),
        !isNav &&
          "mx-auto block max-h-28 max-w-[min(94vw,20rem)] sm:max-h-36 sm:max-w-[24rem] lg:max-h-44 lg:max-w-[28rem]",
        className,
      )}
    />
  );
}
