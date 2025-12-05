"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  Monitor,
  Shield,
  GraduationCap,
  Globe2,
  Code2,
  Rocket,
  Building2
} from "lucide-react";
import { TimelineEffect, type EffectType } from "@/components/ui/effects";

const timelineData: {
  year: string;
  icon: typeof Monitor;
  gradient: string;
  effect: EffectType;
  colors: string[];
}[] = [
  {
    year: "2008",
    icon: Monitor,
    gradient: "from-cyan-500 to-blue-600",
    effect: "matrix",
    colors: ["#06b6d4", "#0ea5e9", "#3b82f6", "#22d3ee"] // Cyan/Blue - Tech/Matrix
  },
  {
    year: "2012",
    icon: Shield,
    gradient: "from-green-500 to-emerald-600",
    effect: "fog",
    colors: ["#22c55e", "#10b981", "#059669", "#14b8a6"] // Green - Military/Fog
  },
  {
    year: "2013",
    icon: GraduationCap,
    gradient: "from-purple-500 to-violet-600",
    effect: "connections",
    colors: ["#a855f7", "#8b5cf6", "#7c3aed", "#6366f1"] // Purple - Academic/Network
  },
  {
    year: "2017",
    icon: Globe2,
    gradient: "from-blue-600 via-white to-red-500",
    effect: "aurora",
    colors: ["#2563eb", "#e0e7ff", "#dc2626", "#1e40af"] // Bleu, Blanc, Rouge - France
  },
  {
    year: "2020",
    icon: Code2,
    gradient: "from-pink-500 to-rose-600",
    effect: "calm",
    colors: ["#ec4899", "#f43f5e", "#db2777", "#be185d"] // Pink - Pandemic/Calm particles
  },
  {
    year: "2021",
    icon: Rocket,
    gradient: "from-yellow-500 to-amber-600",
    effect: "rising",
    colors: ["#eab308", "#f59e0b", "#fbbf24", "#d97706"] // Yellow - Growth/Rising waves
  },
  {
    year: "2024",
    icon: Building2,
    gradient: "from-indigo-500 to-blue-600",
    effect: "globe",
    colors: ["#6366f1", "#4f46e5", "#3b82f6", "#2563eb"] // Indigo - Enterprise/Globe
  },
];

export function ExperienceSection() {
  const t = useTranslations("experience");
  const [activeCard, setActiveCard] = useState(0);
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Detectar quando estamos dentro da seção timeline
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTimelineVisible(entry.isIntersecting);
        // Reset para o primeiro card quando sair da timeline
        if (!entry.isIntersecting) {
          setActiveCard(0);
        }
      },
      { threshold: 0.01 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Detectar qual card está visível usando IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              setActiveCard(index);
            }
          },
          { threshold: 0.3 }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);


  const handleTimelineClick = (index: number) => {
    const item = itemRefs.current[index];
    if (item) {
      item.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section id="experience" ref={sectionRef} className="relative bg-black">
      {/* Section Header */}
      <div className="min-h-screen h-screen flex items-center justify-center">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 text-center">
          <h2 className="text-sm uppercase tracking-[0.2em] text-white/40 mb-6">
            {t("sectionTitle")}
          </h2>
          <p className="mx-auto max-w-3xl text-3xl sm:text-4xl md:text-5xl font-heading font-bold leading-snug text-white">
            {t("intro")}
          </p>

          {/* Indicador de scroll */}
          <motion.div
            className="mt-16"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 mx-auto rounded-full border-2 border-white/30 flex items-start justify-center p-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-white/60"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Timeline Content Area */}
      <div ref={timelineRef} className="relative">
        {/* Dynamic Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
          <AnimatePresence mode="wait">
            {isTimelineVisible && (
              <TimelineEffect
                key={timelineData[activeCard].effect}
                effect={timelineData[activeCard].effect}
                colors={timelineData[activeCard].colors}
                isActive={true}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Journey Path - Static line */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[1px] bg-white/20" />
        </div>

        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 relative" style={{ zIndex: 2 }}>
          {/* Content Area - Centralizado */}
          <div className="max-w-4xl mx-auto">
            {timelineData.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.year}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  className="min-h-screen h-screen flex items-center justify-center relative"
                >
                  <div className="w-full max-w-4xl mx-4 relative z-10">
                    {/* Glass Card Container - Wide & Horizontal */}
                    <div className="relative px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12 rounded-2xl backdrop-blur-xl bg-black/40 border border-white/10 shadow-2xl">
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/[0.03] via-transparent to-white/[0.03] pointer-events-none" />

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Header: Icon + Year */}
                        <div className="flex items-center justify-center gap-4 mb-6">
                          <div
                            className={cn(
                              "h-10 w-10 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg",
                              item.gradient
                            )}
                          >
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-3xl sm:text-4xl font-bold text-white/20">
                            {item.year}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 text-center">
                          {t(`timeline.${item.year}.title`)}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-sm sm:text-base text-white/50 mb-6 text-center">
                          {t(`timeline.${item.year}.subtitle`)}
                        </p>

                        {/* Description */}
                        <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-3 text-center max-w-2xl mx-auto">
                          {t(`timeline.${item.year}.description`)}
                        </p>

                        {/* Expanded */}
                        <p className="text-white/40 text-xs sm:text-sm leading-relaxed mb-6 text-center max-w-2xl mx-auto">
                          {t(`timeline.${item.year}.expanded`)}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap justify-center gap-2">
                          {(t.raw(`timeline.${item.year}.skills`) as string[]).map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 text-xs rounded-full border backdrop-blur-sm bg-white/5 border-white/15 text-white/60 hover:bg-white/10 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline Navigation - FIXED, aparece só quando timeline visível */}
      <AnimatePresence>
        {isTimelineVisible && (
          <motion.div
            className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Timeline Line */}
            <div className="absolute left-3 top-0 h-full w-0.5 bg-white/10" />

            {/* Progress Line */}
            <motion.div
              className="absolute left-3 top-0 w-0.5 bg-white/60 origin-top"
              animate={{
                height: `${((activeCard + 1) / timelineData.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Year Items */}
            <div className="space-y-8 relative">
              {timelineData.map((item, index) => {
                const Icon = item.icon;
                const isActive = index === activeCard;
                const isPast = index < activeCard;

                return (
                  <motion.button
                    key={item.year}
                    className="flex items-center gap-4 cursor-pointer text-left"
                    animate={{
                      opacity: isActive ? 1 : isPast ? 0.6 : 0.3,
                    }}
                    onClick={() => handleTimelineClick(index)}
                  >
                    <motion.div
                      className={cn(
                        "relative z-10 h-6 w-6 rounded-full flex items-center justify-center transition-all duration-300",
                        isActive
                          ? `bg-gradient-to-br ${item.gradient}`
                          : "bg-white/10 border border-white/20"
                      )}
                      animate={{ scale: isActive ? 1.3 : 1 }}
                    >
                      {isActive && <Icon className="h-3 w-3 text-white" />}
                    </motion.div>

                    <motion.span
                      className={cn(
                        "font-bold text-base transition-colors duration-300",
                        isActive ? "text-white" : "text-white/40"
                      )}
                    >
                      {item.year}
                    </motion.span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Dots - Mobile */}
      <AnimatePresence>
        {isTimelineVisible && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2 lg:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {timelineData.map((item, index) => (
              <motion.button
                key={item.year}
                className="h-2 rounded-full"
                animate={{
                  width: index === activeCard ? 24 : 8,
                  backgroundColor: index === activeCard ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
                }}
                onClick={() => handleTimelineClick(index)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
