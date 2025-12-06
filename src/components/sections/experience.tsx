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
    gradient: "from-emerald-500 to-green-600",
    effect: "calm",
    colors: ["#10b981", "#22c55e", "#34d399", "#059669"] // Green - Code revival/Terminal
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
    gradient: "from-purple-600 to-fuchsia-500",
    effect: "globe",
    colors: ["#9333ea", "#a855f7", "#c026d3", "#7c3aed"] // Purple/Fuchsia - Amiltone brand
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
          <p className="mx-auto max-w-2xl text-2xl sm:text-3xl md:text-4xl font-heading font-medium leading-relaxed text-white/90">
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

        {/* Journey Path - Connection line between cards */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block" style={{ zIndex: 1 }}>
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent"
            style={{ left: 'calc(11rem + 480px)' }}
          />
        </div>

        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 relative" style={{ zIndex: 2 }}>
          {/* Content Area - Centralizado com timeline */}
          <div className="lg:pl-36 xl:pl-44">
            {timelineData.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.year}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  className="min-h-screen h-screen flex items-center justify-start relative"
                >
                  <div className="w-full max-w-xl lg:max-w-xl xl:max-w-2xl relative z-10">
                    {/* Glass Card Container - Same style as Projects */}
                    <div className="relative px-8 py-10 sm:px-12 sm:py-12 lg:px-16 lg:py-14 rounded-3xl bg-[#141414] border border-white/10 shadow-2xl">
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Header: Icon + Year */}
                        <div className="flex items-center gap-3 mb-6">
                          <div
                            className={cn(
                              "h-9 w-9 rounded-lg flex items-center justify-center bg-gradient-to-br shadow-lg",
                              item.gradient
                            )}
                          >
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-2xl sm:text-3xl font-bold text-white/20">
                            {item.year}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                          {t(`timeline.${item.year}.title`)}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-base sm:text-lg text-white/50 mb-8">
                          {t(`timeline.${item.year}.subtitle`)}
                        </p>

                        {/* Description */}
                        <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-4">
                          {t(`timeline.${item.year}.description`)}
                        </p>

                        {/* Expanded */}
                        <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8">
                          {t(`timeline.${item.year}.expanded`)}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2">
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

      {/* Timeline Navigation - Minimal vertical dots with years */}
      <AnimatePresence>
        {isTimelineVisible && (
          <motion.div
            className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-2">
              {timelineData.map((item, index) => {
                const isActive = index === activeCard;
                const isPast = index < activeCard;

                return (
                  <button
                    key={item.year}
                    className="flex items-center gap-2 hover:translate-x-0.5 transition-transform"
                    onClick={() => handleTimelineClick(index)}
                  >
                    {/* Dot */}
                    <div
                      className="rounded-full transition-all duration-300 flex-shrink-0"
                      style={{
                        width: isActive ? 10 : 6,
                        height: isActive ? 10 : 6,
                        backgroundColor: isActive ? item.colors[0] : isPast ? item.colors[0] : 'rgba(255,255,255,0.4)',
                        boxShadow: isActive ? `0 0 10px ${item.colors[0]}` : 'none',
                      }}
                    />

                    {/* Year */}
                    <span
                      className="font-mono text-xs transition-all duration-300"
                      style={{
                        color: isActive ? item.colors[0] : 'rgba(255,255,255,0.6)',
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {item.year}
                    </span>
                  </button>
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
