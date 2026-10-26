"use client";

import { MotionConfig } from "motion/react";

/**
 * Global motion settings. `reducedMotion="user"` makes every Motion
 * animation respect `prefers-reduced-motion`: transforms are skipped and
 * only opacity changes remain.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
