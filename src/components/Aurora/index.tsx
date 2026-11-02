"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { usePathname } from "@/i18n/navigation";

export function Aurora() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollY } = useScroll();
  const homeOpacity = useTransform(scrollY, (value) => {
    if (typeof window === "undefined") return 0;
    const start = window.innerHeight * 0.35;
    const end = window.innerHeight * 0.95;
    return Math.min(1, Math.max(0, (value - start) / (end - start)));
  });

  return (
    <motion.div
      aria-hidden="true"
      className="site-aurora"
      style={{ opacity: isHome ? homeOpacity : 1 }}
    >
      <span className="site-aurora__blob site-aurora__blob--a" />
      <span className="site-aurora__blob site-aurora__blob--b" />
      <span className="site-aurora__blob site-aurora__blob--c" />
    </motion.div>
  );
}
