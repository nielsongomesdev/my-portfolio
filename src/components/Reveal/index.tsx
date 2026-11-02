"use client";

import { motion } from "motion/react";
import { cn } from "@/utils/cn";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  as?: "div" | "section" | "article" | "li" | "ul" | "header" | "figure";
  spotlight?: boolean;
};

export const revealEase = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  once = true,
  as = "div",
  spotlight = false,
}: RevealProps) {
  const Component = motion[as];

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, ease: revealEase, delay }}
      className={cn(className)}
      data-spotlight={spotlight ? "" : undefined}
    >
      {children}
    </Component>
  );
}
