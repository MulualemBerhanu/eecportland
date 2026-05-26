"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { NavLink } from "@/components/layout/NavLink";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { mainNav } from "@/components/layout/nav-links";
import { CTALink } from "@/components/shared/CTAButton";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Safety: ensure the page is always scrollable after navigation.
  useEffect(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, [pathname]);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !open;

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,backdrop-filter,border-color] duration-500 ease-out",
        transparent
          ? "border-transparent bg-white/35 shadow-[0_1px_0_rgba(255,255,255,0.65)_inset] backdrop-blur-xl backdrop-saturate-150"
          : cn(
              "border-b border-cream-200/85 bg-cream-50/92 backdrop-blur-xl backdrop-saturate-150",
              scrolled &&
                "shadow-[0_16px_48px_-28px_rgba(11,28,44,0.14)] ring-1 ring-navy-950/[0.06]",
            ),
      )}
    >
      <ScrollProgress />
      <div className="mx-auto flex h-[136px] min-h-0 max-w-7xl items-center justify-between gap-2 overflow-hidden px-4 py-2 sm:gap-3 sm:px-7 sm:py-2.5 lg:px-10 2xl:max-w-[88rem] 2xl:px-14">
        <NavLink
          href="/"
          ariaLabel={`${siteConfig.shortName}, home`}
          className="group flex h-full min-h-0 min-w-0 max-w-[min(100%,18rem)] items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 sm:max-w-none"
        >
          <BrandLogo variant="navbar" />
        </NavLink>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <NavLink
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition",
                  transparent
                    ? active
                      ? "bg-navy-950/10 text-navy-950"
                      : "text-navy-900/90 hover:bg-white/50 hover:text-navy-950"
                    : active
                      ? "bg-navy-950 text-cream-50"
                      : "text-charcoal-800 hover:bg-cream-200/80",
                )}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <CTALink
            href="/visit"
            variant={transparent ? "outlineWarm" : "secondary"}
            size="md"
          >
            Plan your visit
          </CTALink>
          <CTALink
            href={siteConfig.givingUrl}
            variant="primary"
            size="md"
            external
          >
            Give
          </CTALink>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center rounded-full p-2.5 lg:hidden",
            transparent
              ? "text-navy-950 hover:bg-white/45"
              : "text-navy-950 hover:bg-cream-200/80",
          )}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="border-t border-cream-200 bg-cream-50 lg:hidden"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav
              className="flex max-h-[min(70vh,calc(100dvh-8.5rem))] flex-col gap-1 overflow-y-auto px-5 py-4"
              aria-label="Mobile primary"
            >
              {mainNav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <NavLink
                    href={item.href}
                    onAfterClick={closeMenu}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-base font-medium",
                      pathname === item.href
                        ? "bg-navy-950 text-cream-50"
                        : "text-charcoal-800 hover:bg-cream-200/80",
                    )}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-cream-200 pt-4">
                <CTALink
                  href="/visit"
                  variant="secondary"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Plan your visit
                </CTALink>
                <CTALink
                  href={siteConfig.givingUrl}
                  variant="primary"
                  className="w-full"
                  onClick={() => setOpen(false)}
                  external
                >
                  Give
                </CTALink>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
