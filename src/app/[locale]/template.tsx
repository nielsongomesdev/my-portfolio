"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <div key={pathname} className="relative w-full overflow-x-hidden">
      <div
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: 100 }}
      >
        <motion.div
          className="absolute inset-0 bg-brand-bg"
          style={{ willChange: "clip-path" }}
          initial={{ clipPath: "inset(0 0 0 100%)" }}
          animate={{
            clipPath: ["inset(0 0 0 100%)", "inset(0 0 0 0)", "inset(0 100% 0 0)"],
          }}
          transition={{
            duration: 1.2,
            times: [0, 0.5, 1],
            ease: [0.76, 0, 0.24, 1],
          }}
        />
      </div>

      <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
      >
        {children}
      </motion.div>
    </div>
  );
}
