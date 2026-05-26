"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Sermon } from "@/data/sermons";
import { CTALink } from "@/components/shared/CTAButton";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SermonCard } from "@/components/shared/SermonCard";
import { Play } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const PREVIEW_COUNT = 4;

type Props = {
  sermons: Sermon[];
};

export function SermonPreviewHome({ sermons }: Props) {
  const preview = sermons.slice(0, PREVIEW_COUNT);
  const reduce = useReducedMotion();

  return (
    <section className="section-y-xl relative bg-mesh-light">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-950/12 to-transparent"
        aria-hidden
      />
      <Container>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.68, ease }}
        >
          <SectionHeading
            eyebrow="Media"
            title="Listen again. Share freely."
            description="Missed a Sunday? Traveling? Catch up on recent messages and walk through Scripture with us."
            className="max-w-xl lg:max-w-2xl"
          />
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: 0.06 },
            },
          }}
        >
          {preview.map((s, i) => (
            <motion.div
              key={s.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
            >
              <SermonCard sermon={s} priority={i < 2} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center sm:mt-12"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.12, ease }}
        >
          <CTALink href="/sermons#videos" variant="primary" size="lg" icon={Play}>
            All videos
          </CTALink>
        </motion.div>
      </Container>
    </section>
  );
}
