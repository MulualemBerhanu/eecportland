"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CTALink } from "@/components/shared/CTAButton";
import { Container } from "@/components/shared/Container";
import { siteConfig } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function FinalCTASection() {
  const reduce = useReducedMotion();

  return (
    <section className="section-y-xl relative overflow-x-hidden border-t border-cream-200/70 bg-gradient-to-b from-cream-50 via-white to-cream-100/60">
      <div
        className="pointer-events-none absolute inset-0 bg-mesh-light opacity-90"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(201,162,39,0.12),transparent_58%)]"
        aria-hidden
      />
      <Container className="relative">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.72, ease }}
          className="relative overflow-x-hidden rounded-[2rem] border border-cream-200/90 bg-white/85 px-8 py-16 text-center shadow-[0_36px_100px_-48px_rgba(10,22,40,0.35)] ring-1 ring-navy-950/[0.05] backdrop-blur-md sm:px-14 sm:py-20"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_-25%,rgba(201,162,39,0.18),transparent_58%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold-400/15 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-navy-900/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/45 to-transparent"
            aria-hidden
          />
          <h2 className="relative font-heading text-[2.25rem] leading-[1.26] tracking-[-0.035em] text-navy-950 sm:text-4xl lg:text-[2.85rem] pb-[0.1em]">
            We’d love to meet you this Sunday
          </h2>
          <p className="relative mx-auto mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-charcoal-700 sm:text-lg">
            There’s a seat for you. No perfect story required. Come as you are and
            encounter the grace of Jesus with us.
          </p>
          <p className="relative mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-navy-900/90">
            {siteConfig.serviceTime}
            <span className="mt-1 block text-sm font-normal text-charcoal-700">
              {siteConfig.fridayGathering}
            </span>
            <span className="mt-3 block">{siteConfig.address.full}</span>
          </p>
          <div className="relative mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <CTALink href="/visit" variant="primary" size="lg">
              Plan your visit
            </CTALink>
            <CTALink href="/contact" variant="secondary" size="lg">
              Contact us
            </CTALink>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
