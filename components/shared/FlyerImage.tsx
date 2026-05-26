"use client";

import { useEffect, useMemo, useState } from "react";
import { buildGoogleDriveImageCandidates } from "@/lib/utils/normalizeDriveUrl";
import { cn } from "@/lib/utils";

type FlyerImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
};

export function FlyerImage({ src, alt, className, imgClassName }: FlyerImageProps) {
  const candidates = useMemo(() => buildGoogleDriveImageCandidates(src), [src]);
  const [index, setIndex] = useState(0);
  const current = candidates[index];

  useEffect(() => {
    setIndex(0);
  }, [src]);

  if (!current) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl border border-dashed border-cream-300 bg-cream-50/60 p-5 text-center text-xs text-charcoal-600",
          className,
        )}
      >
        Flyer image unavailable.
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-cream-200", className)}>
      <img
        key={current}
        src={current}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className={cn("h-full w-full object-cover", imgClassName)}
        onError={() => {
          if (index < candidates.length - 1) {
            setIndex((prev) => prev + 1);
          } else {
            setIndex(candidates.length);
          }
        }}
      />
    </div>
  );
}
