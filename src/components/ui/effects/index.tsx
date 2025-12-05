"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParticlesEffect } from "./particles-effect";
import { WavesEffect } from "./waves-effect";
import { NetworkEffect } from "./network-effect";
import { AuroraEffect } from "./aurora-effect";

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

  const renderEffect = () => {
    switch (currentEffect) {
      case "matrix":
        return <ParticlesEffect key="matrix" variant="matrix" colors={currentColors} />;
      case "calm":
        return <ParticlesEffect key="calm" variant="calm" colors={currentColors} />;
      case "fog":
        return <WavesEffect key="fog" variant="fog" colors={currentColors} />;
      case "rising":
        return <WavesEffect key="rising" variant="rising" colors={currentColors} />;
      case "connections":
        return <NetworkEffect key="connections" variant="connections" colors={currentColors} />;
      case "globe":
        return <NetworkEffect key="globe" variant="globe" colors={currentColors} />;
      case "aurora":
        return <AuroraEffect key="aurora" colors={currentColors} />;
      default:
        return null;
    }
  };

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
      {renderEffect()}
    </motion.div>
  );
}

export { ParticlesEffect } from "./particles-effect";
export { WavesEffect } from "./waves-effect";
export { NetworkEffect } from "./network-effect";
export { AuroraEffect } from "./aurora-effect";
