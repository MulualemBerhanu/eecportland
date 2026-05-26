"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Ensures each client-side navigation lands at the top of the new route (hero / page
 * start under the fixed navbar). If the URL has a hash, scrolls to that element after.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    const hash = window.location.hash;
    if (hash.length <= 1) return;

    const id = decodeURIComponent(hash.slice(1));
    if (!id) return;

    const go = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ block: "start" });
      return Boolean(el);
    };

    if (go()) return;

    const t = window.setTimeout(() => {
      go();
    }, 0);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
