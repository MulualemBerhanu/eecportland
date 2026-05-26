"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CTALink } from "@/components/shared/CTAButton";
import { Container } from "@/components/shared/Container";
import { siteConfig } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function GivingCTASection() {
  const reduce = useReducedMotion();

  return (
    <section className="section-y-xl bg-cream-50 pb-28 sm:pb-36 lg:pb-40">
      <Container>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="shadow-card-soft grid overflow-x-hidden rounded-[2rem] border border-cream-200/90 bg-white ring-1 ring-navy-950/[0.04] lg:grid-cols-2"
        >
          <div className="relative flex flex-col justify-center p-10 sm:p-12 lg:p-16">
            <div
              className="pointer-events-none absolute -right-12 top-12 h-52 w-52 rounded-full bg-gold-500/12 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-8 bottom-8 h-40 w-40 rounded-full bg-navy-950/5 blur-2xl"
              aria-hidden
            />
            <p className="relative text-[0.65rem] font-semibold tracking-[0.28em] text-gold-600 uppercase">
              Generosity
            </p>
            <h2 className="relative font-heading mt-5 text-[2.2rem] leading-[1.26] tracking-[-0.035em] text-navy-950 sm:text-4xl lg:text-[2.75rem] pb-[0.1em]">
              Faithful giving fuels faithful ministry
            </h2>
            <p className="relative mt-7 text-[1.08rem] leading-[1.75] text-charcoal-700 sm:text-lg">
              Your gifts support worship, discipleship, mercy, and missions, helping
              people meet Jesus and grow in His love. We steward resources with
              transparency and gratitude.
            </p>
            <div className="relative mt-12">
              <CTALink
                href={siteConfig.givingUrl}
                variant="primary"
                size="lg"
                external
              >
                Give securely
              </CTALink>
            </div>
          </div>
          <div className="relative min-h-[320px] overflow-hidden bg-gradient-to-br from-navy-900 via-navy-950 to-[#060f18] lg:min-h-full">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 22% 18%, rgba(212,175,55,0.38), transparent 46%), radial-gradient(circle at 88% 72%, rgba(28,46,69,0.4), transparent 50%), radial-gradient(circle at 50% 100%, rgba(122,158,140,0.18), transparent 55%)",
              }}
              aria-hidden
            />
            <div className="bg-grain absolute inset-0 opacity-[0.38]" aria-hidden />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(0,0,0,0.45),transparent_65%)]"
              aria-hidden
            />
            <div className="relative flex h-full min-h-[320px] flex-col justify-end p-10 sm:p-12 lg:min-h-full lg:p-16">
              <p className="font-heading text-xl italic leading-snug text-cream-50 sm:text-2xl lg:text-[1.65rem] lg:leading-snug">
                “Each one must give as he has decided in his heart, not reluctantly
                or under compulsion, for God loves a cheerful giver.”
              </p>
              <p className="mt-6 text-sm font-semibold tracking-[0.2em] text-gold-300/95 uppercase">
                2 Corinthians 9:7
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
