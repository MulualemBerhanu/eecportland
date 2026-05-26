"use client";

import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { isSameRoute, scrollToPageTop } from "@/lib/nav-scroll";

type Options = {
  /** When false, skips same-page scroll (e.g. external links). Default true. */
  enabled?: boolean;
  onAfter?: () => void;
};

export function useNavScrollClick(href: string, options?: Options) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const enabled = options?.enabled ?? true;

  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (enabled && isSameRoute(pathname, href)) {
      e.preventDefault();
      scrollToPageTop(reduceMotion);
    }
    options?.onAfter?.();
  };
}
