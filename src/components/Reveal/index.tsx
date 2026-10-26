"use client";

import { motion } from "motion/react";
import { cn } from "@/utils/cn";

type RevealProps = {
  children: React.ReactNode;
  /** Seconds. Use small multiples (0.06–0.1) for staggered groups. */
  delay?: number;
  /** Vertical offset in px before the element settles. */
  y?: number;
  className?: string;
  /** Animate on first viewport entry only (default) or every time. */
  once?: boolean;
  as?: "div" | "section" | "article" | "li" | "ul" | "header" | "figure";
};

export const revealEase = [0.22, 1, 0.36, 1] as const;

/**
 * Shared "enter the viewport" motion. Keeps a single duration/easing
 * across the site so sections feel like one system.
 */
export function Reveal({ children, delay = 0, y = 16, className, once = true, as = "div" }: RevealProps) {
  const Component = motion[as];

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, ease: revealEase, delay }}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
