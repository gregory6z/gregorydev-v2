"use client";

import React from "react";
import { motion } from "framer-motion";

interface AuroraEffectProps {
  colors: string[];
}

export function AuroraEffect({ colors }: AuroraEffectProps) {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      style={
        {
          "--aurora-1": colors[0] || "#22d3ee",
          "--aurora-2": colors[1] || "#a855f7",
          "--aurora-3": colors[2] || "#3b82f6",
          "--aurora-4": colors[3] || "#06b6d4",
        } as React.CSSProperties
      }
    >
      <div
        className={`
          absolute -inset-[10px] opacity-40
          [--dark-gradient:repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)]
          [--aurora:repeating-linear-gradient(100deg,var(--aurora-1)_10%,var(--aurora-2)_15%,var(--aurora-3)_20%,var(--aurora-4)_25%,var(--aurora-1)_30%)]
          [background-image:var(--dark-gradient),var(--aurora)]
          [background-size:300%,200%]
          filter blur-[10px]
          after:content-[""] after:absolute after:inset-0
          after:[background-image:var(--dark-gradient),var(--aurora)]
          after:[background-size:200%,100%]
          after:animate-aurora after:mix-blend-difference
          [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]
        `}
      />
    </motion.div>
  );
}
