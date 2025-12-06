"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TimelineEffect, type EffectType } from "@/components/ui/effects";

interface TimelineItem {
  year: string;
  effect: EffectType;
  colors: string[];
}

interface ExperienceWrapperProps {
  children: React.ReactNode;
  timelineItems: TimelineItem[];
}

export function ExperienceWrapper({ children, timelineItems }: ExperienceWrapperProps) {
  const [activeCard, setActiveCard] = useState(0);
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Detectar se é desktop (md breakpoint = 768px)
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Detectar quando estamos dentro da seção timeline
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTimelineVisible(entry.isIntersecting);
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

  // Detectar qual card está visível usando data-index
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cards = document.querySelectorAll('[data-timeline-card]');
    if (!cards.length) return;

    const observers: IntersectionObserver[] = [];

    cards.forEach((card) => {
      const index = parseInt(card.getAttribute('data-timeline-card') || '0');
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveCard(index);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(card);
      observers.push(observer);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  const handleTimelineClick = (index: number) => {
    if (typeof window === 'undefined') return;
    const card = document.querySelector(`[data-timeline-card="${index}"]`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div ref={timelineRef} className="relative">
      {/* Dynamic Background Effects - Only on desktop */}
      {isDesktop && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
          <AnimatePresence mode="wait">
            {isTimelineVisible && timelineItems[activeCard] && (
              <TimelineEffect
                key={timelineItems[activeCard].effect}
                effect={timelineItems[activeCard].effect}
                colors={timelineItems[activeCard].colors}
                isActive={true}
              />
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Journey Path - Connection line between cards */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {/* Mobile line - left side */}
        <div
          className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent lg:hidden"
          style={{ left: '1rem' }}
        />
        {/* Desktop line */}
        <div
          className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent hidden lg:block"
          style={{ left: 'calc(11rem + 480px)' }}
        />
      </div>

      {/* Server-rendered cards */}
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 relative" style={{ zIndex: 2 }}>
        <div className="lg:pl-36 xl:pl-44">
          {children}
        </div>
      </div>

      {/* Timeline Navigation - Desktop */}
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
              {timelineItems.map((item, index) => {
                const isActive = index === activeCard;
                const isPast = index < activeCard;

                return (
                  <button
                    key={item.year}
                    className="flex items-center gap-2 hover:translate-x-0.5 transition-transform"
                    onClick={() => handleTimelineClick(index)}
                  >
                    <div
                      className="rounded-full transition-all duration-300 flex-shrink-0"
                      style={{
                        width: isActive ? 10 : 6,
                        height: isActive ? 10 : 6,
                        backgroundColor: isActive ? item.colors[0] : isPast ? item.colors[0] : 'rgba(255,255,255,0.4)',
                        boxShadow: isActive ? `0 0 10px ${item.colors[0]}` : 'none',
                      }}
                    />
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
            {timelineItems.map((item, index) => (
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
    </div>
  );
}
