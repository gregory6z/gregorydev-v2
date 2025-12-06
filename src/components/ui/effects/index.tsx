"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GSAPTimelineEffect } from "./gsap-effects";

export type EffectType = "matrix" | "fog" | "connections" | "aurora" | "calm" | "rising" | "globe";

interface TimelineEffectProps {
  effect: EffectType;
  colors: string[];
  isActive: boolean;
}

export function TimelineEffect({ effect, colors, isActive }: TimelineEffectProps) {
  const [currentEffect, setCurrentEffect] = useState(effect);
  const [currentColors, setCurrentColors] = useState(colors);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevEffect = useRef(effect);

  useEffect(() => {
    if (effect !== prevEffect.current) {
      // Start transition
      setIsTransitioning(true);

      // After fade out, switch effect
      const timer = setTimeout(() => {
        setCurrentEffect(effect);
        setCurrentColors(colors);
        setIsTransitioning(false);
      }, 400);

      prevEffect.current = effect;
      return () => clearTimeout(timer);
    }
  }, [effect, colors]);

  if (!isActive) return null;

  return (
    <motion.div
      className="absolute inset-0"
      animate={{
        opacity: isTransitioning ? 0 : 1,
        filter: isTransitioning ? "blur(10px)" : "blur(0px)"
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut"
      }}
    >
      <GSAPTimelineEffect
        effect={currentEffect}
        colors={currentColors}
        isActive={!isTransitioning}
      />
    </motion.div>
  );
}

export { GSAPTimelineEffect } from "./gsap-effects";
