"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  SectionBridge,
  type SectionBridgeVariant,
} from "@/components/shared/SectionBridge";
import { cn } from "@/lib/utils";

type Props = {
  variant: SectionBridgeVariant;
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function MotionSectionBridge({ variant, className }: Props) {
  const raw = useId();
  const uid = raw.replace(/:/g, "");
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn("relative z-10 -my-px overflow-hidden", className)}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px", amount: 0.2 }}
      transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <SectionBridge variant={variant} uid={uid} />
    </motion.div>
  );
}
