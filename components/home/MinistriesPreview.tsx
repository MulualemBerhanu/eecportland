"use client";

import { NavLink } from "@/components/layout/NavLink";
import { motion, useReducedMotion } from "framer-motion";
import { ministries } from "@/data/ministries";
import { CTALink } from "@/components/shared/CTAButton";
import { Container } from "@/components/shared/Container";
import { MinistryCard } from "@/components/shared/MinistryCard";
import { SectionHeading } from "@/components/shared/SectionHeading";

const ease = [0.22, 1, 0.36, 1] as const;

export function MinistriesPreview() {
  const preview = ministries.slice(0, 6);
  const reduce = useReducedMotion();

  return (
    <section className="section-y-xl relative overflow-x-hidden border-y border-cream-200/80 bg-mesh-cream">
      <div
        className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-[0.35]"
        aria-hidden
      />
      <Container className="relative">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <SectionHeading
            eyebrow="Ministries"
            title="Worship, formation, and outreach"
            description="From worship and choirs to children, young adults, evangelism, and men’s and women’s fellowship, we also offer a ministerial program for those training to serve. Explore the full story on our ministries page."
            className="max-w-xl lg:max-w-2xl"
          />
        </motion.div>
        <motion.div
          className="mt-20 grid gap-7 sm:grid-cols-2 xl:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px", amount: 0.08 }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.08 },
            },
          }}
        >
          {preview.map((m) => (
            <motion.div
              key={m.id}
              variants={{
                hidden: { opacity: 0, y: 36 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.65, ease },
                },
              }}
            >
              <NavLink
                href="/ministries"
                className="group/card block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-4 focus-visible:ring-offset-cream-50"
              >
                <MinistryCard ministry={m} className="h-full" />
              </NavLink>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="mt-14 flex justify-center lg:justify-start"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.55, ease }}
        >
          <CTALink href="/ministries" variant="primary" size="lg">
            Explore all ministries
          </CTALink>
        </motion.div>
      </Container>
    </section>
  );
}
