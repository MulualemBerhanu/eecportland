"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ministries } from "@/data/ministries";
import { siteConfig } from "@/lib/site";
import { MinistryCard } from "@/components/shared/MinistryCard";

export function MinistryExplorer() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const activeMinistry = useMemo(
    () => ministries.find((m) => m.id === activeId) ?? null,
    [activeId],
  );

  useEffect(() => {
    if (!activeMinistry) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveId(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeMinistry]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!activeMinistry) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [activeMinistry]);

  const modal = (
    <AnimatePresence>
      {activeMinistry ? (
        <>
          <motion.div
            className="fixed inset-0 z-[120] bg-navy-950/52 backdrop-blur-[4px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveId(null)}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={activeMinistry.title}
            className="fixed inset-x-0 bottom-0 top-0 z-[130] overflow-hidden rounded-t-3xl border border-cream-200 bg-cream-50 shadow-[0_-16px_70px_-20px_rgba(11,28,44,0.45)] sm:inset-y-0 sm:left-auto sm:w-[min(42rem,92vw)] sm:rounded-none sm:rounded-l-3xl sm:border-l sm:border-t-0"
            initial={{ y: "100%", x: 0 }}
            animate={{ y: 0, x: 0 }}
            exit={{ y: "100%", x: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 30 }}
          >
            <div className="flex h-full flex-col">
              <div className="relative border-b border-cream-200 bg-white/90 px-6 pb-5 pt-6 backdrop-blur sm:px-8">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-500/70 via-gold-300/65 to-forest-600/65" />
                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  className="absolute right-5 top-5 inline-flex size-9 items-center justify-center rounded-full border border-cream-200 bg-white text-charcoal-700 transition hover:border-gold-500/35 hover:text-navy-950"
                  aria-label="Close ministry details"
                >
                  <X className="size-4" />
                </button>
                <p className="text-[0.66rem] font-semibold tracking-[0.2em] text-gold-700 uppercase">
                  Ministry detail
                </p>
                <h3 className="font-heading mt-2 max-w-[19ch] pr-12 text-3xl leading-tight text-navy-950 sm:text-[2.1rem]">
                  {activeMinistry.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal-700 sm:text-[0.96rem]">
                  {activeMinistry.description}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-7">
                <div className="space-y-8">
                  {activeMinistry.sections.map((section, idx) => (
                    <section key={`${activeMinistry.id}-${idx}`}>
                      {section.heading ? (
                        <h4 className="font-heading text-xl text-navy-950">{section.heading}</h4>
                      ) : null}
                      <div className={section.heading ? "mt-3 space-y-4" : "space-y-4"}>
                        {section.paragraphs.map((paragraph, pIdx) => (
                          <p
                            key={`${activeMinistry.id}-${idx}-${pIdx}`}
                            className="leading-relaxed text-charcoal-700"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>

                <div className="mt-10 rounded-2xl border border-cream-200 bg-white px-5 py-4 text-sm text-charcoal-700 shadow-sm">
                  Interested in joining this ministry? Call{" "}
                  <a
                    href={`tel:${siteConfig.contact.phoneTel}`}
                    className="font-semibold text-gold-700 underline decoration-gold-500/35 underline-offset-2 hover:text-navy-950"
                  >
                    {siteConfig.contact.phone}
                  </a>{" "}
                  or email{" "}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-semibold text-gold-700 underline decoration-gold-500/35 underline-offset-2 hover:text-navy-950"
                  >
                    {siteConfig.contact.email}
                  </a>
                  .
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ministries.map((ministry) => (
          <button
            key={ministry.id}
            type="button"
            onClick={() => setActiveId(ministry.id)}
            className="group block h-full rounded-3xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-4 focus-visible:ring-offset-cream-50"
            aria-haspopup="dialog"
            aria-expanded={activeMinistry?.id === ministry.id}
          >
            <MinistryCard ministry={ministry} className="h-full" />
          </button>
        ))}
      </div>

      {mounted ? createPortal(modal, document.body) : null}
    </>
  );
}
