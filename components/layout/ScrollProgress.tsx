"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Minimal gold reading-progress line: editorial, non-intrusive. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const [p, setP] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setP(max > 0 ? el.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px] md:h-[3px]"
      role="progressbar"
      aria-valuenow={Math.round(p * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Scroll progress"
    >
      <div
        className="h-full origin-left rounded-r-full bg-gradient-to-r from-gold-600 via-gold-300 to-gold-500 shadow-[0_0_12px_rgba(212,175,55,0.45)] will-change-transform"
        style={{
          transform: `scaleX(${p})`,
        }}
      />
    </div>
  );
}
