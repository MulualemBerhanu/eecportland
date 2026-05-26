"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function AnimatedSection({ children, className, delay = 0, id }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div id={id} className={cn(className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      className={cn(className)}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px", amount: 0.12 }}
      transition={{
        type: "spring",
        stiffness: 78,
        damping: 24,
        mass: 0.85,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
