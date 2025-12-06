"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

interface GSAPEffectProps {
  effect: "matrix" | "fog" | "connections" | "aurora" | "calm" | "rising" | "globe";
  colors: string[];
  isActive: boolean;
}

// 2008 - Retro Terminal Effect: Classic terminal with typing code
function TerminalEffect({ colors, isActive }: { colors: string[]; isActive: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Terminal windows positioned center-right
  const terminals = useMemo(() => [
    {
      id: 1,
      top: '12%',
      right: '18%',
      lines: [
        '$ gcc hello.c -o hello',
        '$ ./hello',
        'Hello, World!',
        '$ _'
      ]
    },
    {
      id: 2,
      top: '42%',
      right: '8%',
      lines: [
        '> print("Hello")',
        'Hello',
        '> x = 42',
        '> _'
      ]
    },
    {
      id: 3,
      bottom: '18%',
      right: '22%',
      lines: [
        'C:\\> dir',
        'hello.exe',
        'readme.txt',
        'C:\\> _'
      ]
    },
  ], []);

  useEffect(() => {
    if (!containerRef.current || !isActive) return;

    const terminalWindows = containerRef.current.querySelectorAll(".terminal-window");
    const codeLines = containerRef.current.querySelectorAll(".terminal-line");
    const cursors = containerRef.current.querySelectorAll(".terminal-cursor");

    // Fade in terminal windows
    terminalWindows.forEach((terminal, i) => {
      gsap.fromTo(terminal,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.4,
          ease: "power2.out"
        }
      );
    });

    // Type effect for code lines
    codeLines.forEach((line, i) => {
      gsap.fromTo(line,
        { width: 0, opacity: 0 },
        {
          width: "auto",
          opacity: 1,
          duration: 0.8,
          delay: 0.8 + i * 0.3,
          ease: "steps(12)"
        }
      );
    });

    // Blinking cursors
    cursors.forEach((cursor) => {
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)"
      });
    });

    return () => {
      gsap.killTweensOf(terminalWindows);
      gsap.killTweensOf(codeLines);
      gsap.killTweensOf(cursors);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {terminals.map((terminal) => (
        <div
          key={terminal.id}
          className="terminal-window absolute rounded-lg overflow-hidden"
          style={{
            top: terminal.top,
            bottom: terminal.bottom,
            right: terminal.right,
            background: 'rgba(0, 0, 0, 0.7)',
            border: `1px solid ${colors[0]}30`,
            boxShadow: `0 0 30px ${colors[0]}15, inset 0 0 30px rgba(0,0,0,0.5)`,
            minWidth: '180px',
          }}
        >
          {/* Terminal header */}
          <div
            className="flex items-center gap-1.5 px-3 py-2"
            style={{ background: `${colors[0]}15`, borderBottom: `1px solid ${colors[0]}20` }}
          >
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
            <span className="ml-2 text-[10px] font-mono" style={{ color: `${colors[0]}60` }}>terminal</span>
          </div>

          {/* Terminal content */}
          <div className="p-3 font-mono text-xs leading-relaxed">
            {terminal.lines.map((line, lineIdx) => (
              <div
                key={lineIdx}
                className="terminal-line overflow-hidden whitespace-nowrap"
                style={{ color: colors[0], opacity: 0.8 }}
              >
                {line.endsWith('_') ? (
                  <>
                    {line.slice(0, -1)}
                    <span className="terminal-cursor inline-block w-2 h-3 ml-0.5" style={{ background: colors[0] }} />
                  </>
                ) : (
                  line
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Background gradient - Tech/Matrix vibes */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg,
              ${colors[0]}15 0%,
              ${colors[0]}08 25%,
              transparent 50%,
              ${colors[2]}05 75%,
              ${colors[2]}12 100%
            )
          `,
        }}
      />

      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            ${colors[0]} 0px,
            ${colors[0]} 1px,
            transparent 1px,
            transparent 3px
          )`,
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 85% 30%, ${colors[0]}12, transparent 50%)`,
        }}
      />
    </motion.div>
  );
}

// 2012 - Radar/Military Effect: Military radar sweep
function RadarEffect({ colors, isActive }: { colors: string[]; isActive: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);

  // Radar blips (detected targets)
  const radarBlips = useMemo(() => [
    { id: 1, angle: 45, distance: 30, delay: 1 },
    { id: 2, angle: 120, distance: 50, delay: 2 },
    { id: 3, angle: 200, distance: 40, delay: 3 },
    { id: 4, angle: 280, distance: 60, delay: 4 },
    { id: 5, angle: 340, distance: 35, delay: 5 },
  ], []);

  useEffect(() => {
    if (!containerRef.current || !isActive) return;

    const sweep = sweepRef.current;
    const blips = containerRef.current.querySelectorAll(".radar-blip");
    const rings = containerRef.current.querySelectorAll(".radar-ring");

    // Radar sweep rotation
    if (sweep) {
      gsap.to(sweep, {
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: "none",
        transformOrigin: "left center"
      });
    }

    // Radar rings pulse
    rings.forEach((ring, i) => {
      gsap.fromTo(ring,
        { opacity: 0.3, scale: 0.95 },
        {
          opacity: 0.1,
          scale: 1.05,
          duration: 2,
          delay: i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        }
      );
    });

    // Blips appear and fade
    blips.forEach((blip, i) => {
      const blipData = radarBlips[i];
      gsap.fromTo(blip,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          delay: blipData?.delay || i,
          ease: "power2.out"
        }
      );

      // Blip pulse
      gsap.to(blip, {
        opacity: 0.3,
        scale: 1.5,
        duration: 1.5,
        delay: (blipData?.delay || i) + 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    return () => {
      gsap.killTweensOf(sweep);
      gsap.killTweensOf(blips);
      gsap.killTweensOf(rings);
    };
  }, [isActive, radarBlips]);

  if (!isActive) return null;

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Radar Display - Center-Right */}
      <div
        className="absolute right-[12%] top-1/2 -translate-y-1/2"
        style={{ width: '300px', height: '300px' }}
      >
        {/* Radar background */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${colors[0]}10 0%, transparent 70%)`,
            border: `1px solid ${colors[0]}30`,
          }}
        />

        {/* Radar rings */}
        {[0.25, 0.5, 0.75, 1].map((scale, i) => (
          <div
            key={i}
            className="radar-ring absolute rounded-full"
            style={{
              top: `${50 - scale * 50}%`,
              left: `${50 - scale * 50}%`,
              width: `${scale * 100}%`,
              height: `${scale * 100}%`,
              border: `1px solid ${colors[0]}30`,
            }}
          />
        ))}

        {/* Cross lines */}
        <div
          className="absolute top-0 bottom-0 left-1/2 w-px"
          style={{ background: `${colors[0]}20` }}
        />
        <div
          className="absolute left-0 right-0 top-1/2 h-px"
          style={{ background: `${colors[0]}20` }}
        />

        {/* Radar sweep with trail */}
        <div
          ref={sweepRef}
          className="absolute top-1/2 left-1/2 origin-left"
          style={{
            width: '50%',
            height: '2px',
            background: `linear-gradient(90deg, ${colors[0]}, transparent)`,
            boxShadow: `0 0 20px ${colors[0]}`,
          }}
        />

        {/* Center dot */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{
            background: colors[0],
            boxShadow: `0 0 10px ${colors[0]}`,
          }}
        />

        {/* Radar blips */}
        {radarBlips.map((blip) => {
          const x = 50 + Math.cos((blip.angle * Math.PI) / 180) * blip.distance;
          const y = 50 + Math.sin((blip.angle * Math.PI) / 180) * blip.distance;
          return (
            <div
              key={blip.id}
              className="radar-blip absolute w-2 h-2 rounded-full"
              style={{
                top: `${y}%`,
                left: `${x}%`,
                transform: 'translate(-50%, -50%)',
                background: colors[0],
                boxShadow: `0 0 8px ${colors[0]}`,
              }}
            />
          );
        })}

        {/* Coordinates display */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px]"
          style={{ color: `${colors[0]}80` }}
        >
          TACTICAL RADAR • ACTIVE
        </div>
      </div>

      {/* Background gradient - Military/Tactical vibes */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg,
              ${colors[0]}15 0%,
              ${colors[1]}10 25%,
              transparent 50%,
              ${colors[2]}10 75%,
              ${colors[3]}15 100%
            )
          `,
        }}
      />

      {/* Scanline effect */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            ${colors[0]} 0px,
            ${colors[0]} 1px,
            transparent 1px,
            transparent 3px
          )`,
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute right-0 top-0 w-1/3 h-full"
        style={{
          background: `radial-gradient(ellipse at 80% 50%, ${colors[0]}15, transparent 60%)`,
        }}
      />

    </motion.div>
  );
}

// 2013 - Data Flow / System Diagram Effect
function DataFlowEffect({ colors, isActive }: { colors: string[]; isActive: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !isActive) return;

    const shapes = containerRef.current.querySelectorAll(".flow-shape");
    const arrows = containerRef.current.querySelectorAll(".flow-arrow");
    const dataParticles = containerRef.current.querySelectorAll(".data-particle");

    // Animate shapes appearing
    shapes.forEach((shape, i) => {
      gsap.fromTo(shape,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: i * 0.15,
          ease: "back.out(1.5)"
        }
      );
    });

    // Animate arrows drawing
    arrows.forEach((arrow, i) => {
      const line = arrow.querySelector("line");
      if (line) {
        gsap.fromTo(line,
          { strokeDashoffset: 50 },
          {
            strokeDashoffset: 0,
            duration: 0.8,
            delay: 0.5 + i * 0.2,
            ease: "power2.inOut"
          }
        );
      }
    });

    // Animate data particles flowing
    dataParticles.forEach((particle, i) => {
      gsap.to(particle, {
        y: -150,
        opacity: 0,
        duration: 2 + Math.random(),
        delay: 1.5 + i * 0.3,
        repeat: -1,
        ease: "power1.in"
      });
    });

    // Pulse effect on shapes
    shapes.forEach((shape, i) => {
      gsap.to(shape, {
        boxShadow: `0 0 20px ${colors[0]}40`,
        duration: 1.5,
        delay: 2 + i * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    return () => {
      gsap.killTweensOf(shapes);
      gsap.killTweensOf(arrows);
      gsap.killTweensOf(dataParticles);
    };
  }, [isActive, colors]);

  if (!isActive) return null;

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Data Flow Diagram - positioned center-right */}
      <div className="absolute right-[15%] top-1/2 -translate-y-1/2" style={{ width: '250px', height: '320px' }}>

        {/* Process Box 1 - Input */}
        <div
          className="flow-shape absolute flex items-center justify-center rounded-lg border text-[10px] font-mono"
          style={{
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '35px',
            background: `${colors[0]}15`,
            borderColor: `${colors[0]}40`,
            color: `${colors[0]}90`,
          }}
        >
          INPUT
        </div>

        {/* Arrow 1 */}
        <svg className="flow-arrow absolute" style={{ top: '35px', left: '50%', transform: 'translateX(-50%)' }} width="20" height="30">
          <line x1="10" y1="0" x2="10" y2="25" stroke={colors[0]} strokeWidth="1.5" strokeDasharray="50" opacity="0.5" />
          <polygon points="5,20 10,28 15,20" fill={colors[0]} opacity="0.5" />
        </svg>

        {/* Decision Diamond */}
        <div
          className="flow-shape absolute flex items-center justify-center text-[9px] font-mono"
          style={{
            top: '70px',
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)',
            width: '50px',
            height: '50px',
            background: `${colors[0]}15`,
            border: `1px solid ${colors[0]}40`,
          }}
        >
          <span style={{ transform: 'rotate(-45deg)', color: `${colors[0]}90` }}>?</span>
        </div>

        {/* Arrow 2 - Left */}
        <svg className="flow-arrow absolute" style={{ top: '95px', left: '35px' }} width="40" height="20">
          <line x1="40" y1="10" x2="5" y2="10" stroke={colors[0]} strokeWidth="1.5" strokeDasharray="50" opacity="0.5" />
          <polygon points="10,5 2,10 10,15" fill={colors[0]} opacity="0.5" />
        </svg>

        {/* Arrow 3 - Right */}
        <svg className="flow-arrow absolute" style={{ top: '95px', right: '35px' }} width="40" height="20">
          <line x1="0" y1="10" x2="35" y2="10" stroke={colors[0]} strokeWidth="1.5" strokeDasharray="50" opacity="0.5" />
          <polygon points="30,5 38,10 30,15" fill={colors[0]} opacity="0.5" />
        </svg>

        {/* Process Box 2 - Left */}
        <div
          className="flow-shape absolute flex items-center justify-center rounded-lg border text-[9px] font-mono"
          style={{
            top: '130px',
            left: '0',
            width: '70px',
            height: '32px',
            background: `${colors[0]}15`,
            borderColor: `${colors[0]}40`,
            color: `${colors[0]}90`,
          }}
        >
          PROCESS
        </div>

        {/* Process Box 3 - Right */}
        <div
          className="flow-shape absolute flex items-center justify-center rounded-lg border text-[9px] font-mono"
          style={{
            top: '130px',
            right: '0',
            width: '70px',
            height: '32px',
            background: `${colors[0]}15`,
            borderColor: `${colors[0]}40`,
            color: `${colors[0]}90`,
          }}
        >
          ANALYZE
        </div>

        {/* Arrows down */}
        <svg className="flow-arrow absolute" style={{ top: '162px', left: '35px' }} width="20" height="30">
          <line x1="10" y1="0" x2="10" y2="25" stroke={colors[0]} strokeWidth="1.5" strokeDasharray="50" opacity="0.5" />
          <polygon points="5,20 10,28 15,20" fill={colors[0]} opacity="0.5" />
        </svg>
        <svg className="flow-arrow absolute" style={{ top: '162px', right: '35px' }} width="20" height="30">
          <line x1="10" y1="0" x2="10" y2="25" stroke={colors[0]} strokeWidth="1.5" strokeDasharray="50" opacity="0.5" />
          <polygon points="5,20 10,28 15,20" fill={colors[0]} opacity="0.5" />
        </svg>

        {/* Database Cylinder */}
        <div
          className="flow-shape absolute flex items-center justify-center text-[9px] font-mono"
          style={{
            top: '200px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '70px',
            height: '45px',
            background: `${colors[0]}15`,
            border: `1px solid ${colors[0]}40`,
            borderRadius: '8px 8px 50% 50% / 8px 8px 20px 20px',
            color: `${colors[0]}90`,
          }}
        >
          DATA
        </div>

        {/* Arrow to output */}
        <svg className="flow-arrow absolute" style={{ top: '245px', left: '50%', transform: 'translateX(-50%)' }} width="20" height="25">
          <line x1="10" y1="0" x2="10" y2="20" stroke={colors[0]} strokeWidth="1.5" strokeDasharray="50" opacity="0.5" />
          <polygon points="5,15 10,23 15,15" fill={colors[0]} opacity="0.5" />
        </svg>

        {/* Output - Rounded Rectangle */}
        <div
          className="flow-shape absolute flex items-center justify-center rounded-full border text-[10px] font-mono"
          style={{
            top: '275px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '35px',
            background: `${colors[0]}15`,
            borderColor: `${colors[0]}40`,
            color: `${colors[0]}90`,
          }}
        >
          OUTPUT
        </div>

        {/* Data particles */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="data-particle absolute w-1 h-1 rounded-full"
            style={{
              left: `${40 + i * 10}%`,
              top: '90%',
              background: colors[0],
              boxShadow: `0 0 4px ${colors[0]}`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Background gradient - Academic/Analytical vibes */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(120deg,
              ${colors[0]}10 0%,
              ${colors[1]}06 30%,
              transparent 50%,
              ${colors[2]}06 70%,
              ${colors[3]}10 100%
            )
          `,
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute right-0 top-0 w-1/3 h-full"
        style={{
          background: `radial-gradient(ellipse at 80% 50%, ${colors[0]}15, transparent 60%)`,
        }}
      />
    </motion.div>
  );
}

// 2017 - Flight Path Effect: Journey between two worlds
function FlightPathEffect({ colors, isActive }: { colors: string[]; isActive: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!containerRef.current || !isActive || !pathRef.current || !planeRef.current) return;

    const path = pathRef.current;
    const plane = planeRef.current;
    const pathLength = path.getTotalLength();

    // Animate path drawing
    gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 3,
      ease: "power2.inOut"
    });

    // Animate plane along path using SVG transform
    const animObj = { progress: 0 };
    gsap.to(animObj, {
      progress: 1,
      duration: 6,
      repeat: -1,
      ease: "none",
      delay: 1,
      onUpdate: () => {
        const point = path.getPointAtLength(animObj.progress * pathLength);
        const nextPoint = path.getPointAtLength(Math.min(animObj.progress + 0.01, 1) * pathLength);
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180 / Math.PI;

        plane.setAttribute('transform', `translate(${point.x}, ${point.y}) rotate(${angle + 90})`);
      }
    });

    // Pulse origin and destination markers
    const markers = containerRef.current.querySelectorAll(".location-marker");
    markers.forEach((marker, i) => {
      gsap.fromTo(marker,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, delay: i * 2, ease: "back.out" }
      );

      gsap.to(marker.querySelector(".marker-pulse"), {
        scale: 2,
        opacity: 0,
        duration: 2,
        repeat: -1,
        delay: i * 2 + 0.5,
        ease: "power1.out"
      });
    });

    return () => {
      gsap.killTweensOf(path);
      gsap.killTweensOf(animObj);
      gsap.killTweensOf(markers);
      gsap.killTweensOf(".marker-pulse");
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* SVG Flight Path - compact, positioned center-right */}
      <svg
        className="absolute right-[12%] top-1/2 -translate-y-1/2"
        style={{ width: '280px', height: '350px' }}
        viewBox="0 0 280 350"
      >
        {/* Dashed guide line */}
        <path
          d="M 40 300 Q 100 180 140 160 Q 180 140 240 50"
          fill="none"
          stroke={`${colors[0]}15`}
          strokeWidth="1"
          strokeDasharray="6 6"
        />

        {/* Flight path curve */}
        <path
          ref={pathRef}
          d="M 40 300 Q 100 180 140 160 Q 180 140 240 50"
          fill="none"
          stroke={`${colors[0]}50`}
          strokeWidth="2"
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${colors[0]}40)` }}
        />

        {/* Origin marker (Brazil) */}
        <g className="location-marker">
          <circle
            className="marker-pulse"
            cx="40"
            cy="300"
            r="10"
            fill={colors[2] || colors[0]}
            opacity="0.3"
          />
          <circle
            cx="40"
            cy="300"
            r="5"
            fill={colors[2] || colors[0]}
            style={{ filter: `drop-shadow(0 0 8px ${colors[2] || colors[0]})` }}
          />
          <text
            x="40"
            y="322"
            textAnchor="middle"
            fill={`${colors[2] || colors[0]}`}
            fontSize="11"
            fontFamily="monospace"
            opacity="0.8"
          >
            BRA
          </text>
        </g>

        {/* Destination marker (France) */}
        <g className="location-marker">
          <circle
            className="marker-pulse"
            cx="240"
            cy="50"
            r="10"
            fill={colors[0]}
            opacity="0.3"
          />
          <circle
            cx="240"
            cy="50"
            r="5"
            fill={colors[0]}
            style={{ filter: `drop-shadow(0 0 8px ${colors[0]})` }}
          />
          <text
            x="240"
            y="72"
            textAnchor="middle"
            fill={colors[0]}
            fontSize="11"
            fontFamily="monospace"
            opacity="0.8"
          >
            FRA
          </text>
        </g>

        {/* Plane */}
        <g ref={planeRef}>
          <path
            d="M0 -10 L3 10 L0 7 L-3 10 Z"
            fill={colors[0]}
            style={{ filter: `drop-shadow(0 0 6px ${colors[0]})` }}
          />
        </g>
      </svg>

      {/* French flag colors - full background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(90deg,
              ${colors[0]}25 0%,
              ${colors[0]}15 30%,
              rgba(255,255,255,0.06) 40%,
              rgba(255,255,255,0.08) 50%,
              rgba(255,255,255,0.06) 60%,
              ${colors[2] || '#dc2626'}15 70%,
              ${colors[2] || '#dc2626'}25 100%
            )
          `,
        }}
      />

      {/* Ambient glow - subtle, right side */}
      <div
        className="absolute right-0 top-0 w-1/3 h-full"
        style={{
          background: `radial-gradient(ellipse at 80% 30%, ${colors[0]}10, transparent 60%)`,
        }}
      />
    </motion.div>
  );
}

// 2020 - VS Code Style Editor Effect
function CodeEffect({ colors, isActive }: { colors: string[]; isActive: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Code lines with syntax highlighting
  const codeLines = useMemo(() => [
    { indent: 0, tokens: [{ text: 'const', color: '#c586c0' }, { text: ' app', color: '#9cdcfe' }, { text: ' = ', color: '#fff' }, { text: 'express', color: '#dcdcaa' }, { text: '();', color: '#fff' }] },
    { indent: 0, tokens: [] },
    { indent: 0, tokens: [{ text: 'app', color: '#9cdcfe' }, { text: '.', color: '#fff' }, { text: 'get', color: '#dcdcaa' }, { text: '(', color: '#ffd700' }, { text: "'/'", color: '#ce9178' }, { text: ', (', color: '#ffd700' }, { text: 'req, res', color: '#9cdcfe' }, { text: ') => {', color: '#ffd700' }] },
    { indent: 1, tokens: [{ text: 'res', color: '#9cdcfe' }, { text: '.', color: '#fff' }, { text: 'json', color: '#dcdcaa' }, { text: '({ ', color: '#fff' }, { text: 'status', color: '#9cdcfe' }, { text: ': ', color: '#fff' }, { text: "'ok'", color: '#ce9178' }, { text: ' });', color: '#fff' }] },
    { indent: 0, tokens: [{ text: '});', color: '#ffd700' }] },
    { indent: 0, tokens: [] },
    { indent: 0, tokens: [{ text: 'app', color: '#9cdcfe' }, { text: '.', color: '#fff' }, { text: 'listen', color: '#dcdcaa' }, { text: '(', color: '#ffd700' }, { text: '3000', color: '#b5cea8' }, { text: ');', color: '#ffd700' }] },
  ], []);

  useEffect(() => {
    if (!containerRef.current || !isActive) return;

    const editor = containerRef.current.querySelector(".vscode-editor");
    const lines = containerRef.current.querySelectorAll(".code-line-content");
    const cursor = containerRef.current.querySelector(".vscode-cursor");

    // Editor appears
    if (editor) {
      gsap.fromTo(editor,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }

    // Lines type in
    lines.forEach((line, i) => {
      gsap.fromTo(line,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          delay: 0.5 + i * 0.15,
          ease: "power2.out"
        }
      );
    });

    // Cursor blink
    if (cursor) {
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)"
      });
    }

    return () => {
      gsap.killTweensOf(editor);
      gsap.killTweensOf(lines);
      gsap.killTweensOf(cursor);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* VS Code Editor Window */}
      <div
        className="vscode-editor absolute right-[12%] top-1/2 -translate-y-1/2 rounded-lg overflow-hidden"
        style={{
          width: '320px',
          background: '#1e1e1e',
          border: '1px solid #333',
          boxShadow: `0 0 40px ${colors[0]}20, 0 20px 60px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Title Bar */}
        <div className="flex items-center justify-between px-3 py-2" style={{ background: '#323233' }}>
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
          </div>
          <span className="text-[11px] text-white/50 font-mono">app.js - Visual Studio Code</span>
          <div className="w-12" />
        </div>

        {/* Tab Bar */}
        <div className="flex" style={{ background: '#252526' }}>
          <div
            className="flex items-center gap-2 px-3 py-1.5 border-t-2"
            style={{ background: '#1e1e1e', borderColor: colors[0] }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#f1e05a">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/>
            </svg>
            <span className="text-[11px] text-white/80 font-mono">app.js</span>
            <span className="text-white/30 text-[10px] ml-1">×</span>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex">
          {/* Line Numbers */}
          <div className="py-2 px-2 text-right select-none" style={{ background: '#1e1e1e', minWidth: '35px' }}>
            {codeLines.map((_, i) => (
              <div key={i} className="text-[11px] leading-5 font-mono" style={{ color: '#858585' }}>
                {i + 1}
              </div>
            ))}
            <div className="text-[11px] leading-5 font-mono" style={{ color: '#858585' }}>
              {codeLines.length + 1}
            </div>
          </div>

          {/* Code Area */}
          <div className="py-2 pr-4 flex-1 overflow-hidden">
            {codeLines.map((line, i) => (
              <div
                key={i}
                className="code-line-content text-[11px] leading-5 font-mono whitespace-nowrap"
                style={{ paddingLeft: `${line.indent * 16}px` }}
              >
                {line.tokens.map((token, j) => (
                  <span key={j} style={{ color: token.color }}>{token.text}</span>
                ))}
              </div>
            ))}
            {/* Cursor line */}
            <div className="text-[11px] leading-5 font-mono flex items-center">
              <span className="vscode-cursor w-0.5 h-4 inline-block" style={{ background: '#fff' }} />
            </div>
          </div>

          {/* Minimap */}
          <div className="w-8 py-2" style={{ background: '#1e1e1e' }}>
            {codeLines.map((_, i) => (
              <div
                key={i}
                className="h-1 mx-1 my-0.5 rounded-sm"
                style={{
                  background: i === 0 || i === 2 || i === 6 ? `${colors[0]}40` : '#ffffff15',
                  width: `${10 + (i % 3) * 5}px`
                }}
              />
            ))}
          </div>
        </div>

        {/* Status Bar */}
        <div
          className="flex items-center justify-between px-2 py-0.5 text-[10px] font-mono"
          style={{ background: colors[0] }}
        >
          <div className="flex items-center gap-3 text-white/90">
            <span>main</span>
            <span>⟳</span>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <span>Ln 8, Col 1</span>
            <span>UTF-8</span>
            <span>JavaScript</span>
          </div>
        </div>
      </div>

      {/* Background gradient - Code/Terminal vibes */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(145deg,
              ${colors[0]}08 0%,
              transparent 30%,
              transparent 70%,
              ${colors[2]}08 100%
            )
          `,
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(${colors[0]}40 1px, transparent 1px),
            linear-gradient(90deg, ${colors[0]}40 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute right-0 top-0 w-1/3 h-full"
        style={{
          background: `radial-gradient(ellipse at 80% 50%, ${colors[0]}15, transparent 60%)`,
        }}
      />
    </motion.div>
  );
}

// 2021 - Level Up Effect: XP bar and achievements
function LevelUpEffect({ colors, isActive }: { colors: string[]; isActive: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Skills/achievements unlocked
  const achievements = useMemo(() => [
    { icon: '🎨', label: 'Figma', delay: 0.5 },
    { icon: '⚛️', label: 'React', delay: 1 },
    { icon: '🟢', label: 'Node.js', delay: 1.5 },
    { icon: '🗄️', label: 'Database', delay: 2 },
    { icon: '☁️', label: 'AWS', delay: 2.5 },
    { icon: '🚀', label: 'Deploy', delay: 3 },
  ], []);

  useEffect(() => {
    if (!containerRef.current || !isActive) return;

    const xpBar = containerRef.current.querySelector(".xp-bar-fill");
    const levelNumber = containerRef.current.querySelector(".level-number");
    const achievementItems = containerRef.current.querySelectorAll(".achievement-item");
    const xpTexts = containerRef.current.querySelectorAll(".xp-gain");

    // XP bar fills up
    if (xpBar) {
      gsap.fromTo(xpBar,
        { width: '0%' },
        {
          width: '85%',
          duration: 3,
          delay: 0.5,
          ease: "power2.out"
        }
      );
    }

    // Level number counts up
    if (levelNumber) {
      gsap.fromTo({ val: 0 },
        { val: 0 },
        {
          val: 10,
          duration: 3,
          delay: 0.5,
          ease: "power2.out",
          onUpdate: function() {
            const currentVal = Math.floor(this.targets()[0].val);
            if (levelNumber) levelNumber.textContent = String(currentVal);
          }
        }
      );
    }

    // Achievements pop in
    achievementItems.forEach((item, i) => {
      gsap.fromTo(item,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: achievements[i]?.delay || i * 0.5,
          ease: "back.out(1.7)"
        }
      );

      // Glow pulse after appearing
      gsap.to(item, {
        boxShadow: `0 0 20px ${colors[0]}60`,
        duration: 0.8,
        delay: (achievements[i]?.delay || i * 0.5) + 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Floating +XP texts
    xpTexts.forEach((text, i) => {
      gsap.fromTo(text,
        { y: 0, opacity: 0 },
        {
          y: -40,
          opacity: 1,
          duration: 1,
          delay: 1 + i * 0.6,
          ease: "power2.out"
        }
      );
      gsap.to(text, {
        y: -80,
        opacity: 0,
        duration: 1,
        delay: 2 + i * 0.6,
        ease: "power2.in"
      });
    });

    return () => {
      gsap.killTweensOf(xpBar);
      gsap.killTweensOf(levelNumber);
      gsap.killTweensOf(achievementItems);
      gsap.killTweensOf(xpTexts);
    };
  }, [isActive, colors, achievements]);

  if (!isActive) return null;

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Level Up Panel - Center-Right */}
      <div
        className="absolute right-[12%] top-1/2 -translate-y-1/2 rounded-xl p-5"
        style={{
          width: '280px',
          background: 'rgba(0,0,0,0.6)',
          border: `1px solid ${colors[0]}30`,
          boxShadow: `0 0 30px ${colors[0]}15`,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/60 text-xs font-mono uppercase tracking-wider">Freelance Journey</span>
          <div
            className="flex items-center gap-2 px-3 py-1 rounded-full"
            style={{ background: `${colors[0]}20`, border: `1px solid ${colors[0]}40` }}
          >
            <span className="text-xs" style={{ color: colors[0] }}>LVL</span>
            <span className="level-number text-lg font-bold" style={{ color: colors[0] }}>0</span>
          </div>
        </div>

        {/* XP Bar */}
        <div className="mb-5">
          <div className="flex justify-between text-[10px] text-white/40 mb-1 font-mono">
            <span>EXPERIENCE</span>
            <span>8,500 / 10,000 XP</span>
          </div>
          <div
            className="h-3 rounded-full overflow-hidden"
            style={{ background: `${colors[0]}20` }}
          >
            <div
              className="xp-bar-fill h-full rounded-full"
              style={{
                width: '0%',
                background: `linear-gradient(90deg, ${colors[0]}, ${colors[1] || colors[0]})`,
                boxShadow: `0 0 10px ${colors[0]}60`,
              }}
            />
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="mb-3">
          <span className="text-[10px] text-white/40 font-mono uppercase tracking-wider">Skills Unlocked</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {achievements.map((achievement, i) => (
            <div
              key={i}
              className="achievement-item flex flex-col items-center justify-center p-2 rounded-lg"
              style={{
                background: `${colors[0]}15`,
                border: `1px solid ${colors[0]}30`,
              }}
            >
              <span className="text-xl mb-1">{achievement.icon}</span>
              <span className="text-[9px] text-white/60 font-mono">{achievement.label}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-4 pt-3 border-t" style={{ borderColor: `${colors[0]}20` }}>
          <div className="flex justify-between text-[10px] font-mono">
            <span className="text-white/40">Projects</span>
            <span style={{ color: colors[0] }}>+12</span>
          </div>
          <div className="flex justify-between text-[10px] font-mono mt-1">
            <span className="text-white/40">Clients</span>
            <span style={{ color: colors[0] }}>+8</span>
          </div>
        </div>
      </div>

      {/* Floating +XP texts */}
      {['+500 XP', '+750 XP', '+1000 XP', '+250 XP'].map((text, i) => (
        <div
          key={i}
          className="xp-gain absolute font-bold font-mono text-sm"
          style={{
            right: `calc(12% + ${80 + i * 40}px)`,
            top: '45%',
            color: colors[0],
            textShadow: `0 0 10px ${colors[0]}`,
            opacity: 0,
          }}
        >
          {text}
        </div>
      ))}

      {/* Background gradient - Golden/Growth vibes */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(160deg,
              ${colors[0]}12 0%,
              ${colors[1]}06 25%,
              transparent 45%,
              transparent 55%,
              ${colors[2]}06 75%,
              ${colors[3]}12 100%
            )
          `,
        }}
      />

      {/* Radial glow from center */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${colors[0]}08, transparent 70%)`,
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute right-0 top-0 w-1/3 h-full"
        style={{
          background: `radial-gradient(ellipse at 80% 50%, ${colors[0]}12, transparent 60%)`,
        }}
      />
    </motion.div>
  );
}

// 2024 - Corporate Badge Effect: ID card appearing
function CorporateBadgeEffect({ colors, isActive }: { colors: string[]; isActive: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !isActive) return;

    const badge = containerRef.current.querySelector(".badge-card");
    const photo = containerRef.current.querySelector(".badge-photo");
    const info = containerRef.current.querySelectorAll(".badge-info");
    const barcode = containerRef.current.querySelector(".badge-barcode");
    const chip = containerRef.current.querySelector(".badge-chip");
    const lanyard = containerRef.current.querySelector(".badge-lanyard");

    // Lanyard drops down first
    if (lanyard) {
      gsap.fromTo(lanyard,
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1, duration: 0.5, ease: "power2.out" }
      );
    }

    // Badge swings in
    if (badge) {
      gsap.fromTo(badge,
        { y: -50, opacity: 0, rotateX: -30 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "back.out(1.5)"
        }
      );

      // Subtle swing animation
      gsap.to(badge, {
        rotateZ: 2,
        duration: 2,
        delay: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Photo fades in
    if (photo) {
      gsap.fromTo(photo,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, delay: 0.8, ease: "power2.out" }
      );
    }

    // Info lines appear one by one
    info.forEach((line, i) => {
      gsap.fromTo(line,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.4, delay: 1 + i * 0.15, ease: "power2.out" }
      );
    });

    // Chip glows
    if (chip) {
      gsap.fromTo(chip,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 1.3, ease: "power2.out" }
      );
      gsap.to(chip, {
        boxShadow: `0 0 15px ${colors[0]}60`,
        duration: 1.5,
        delay: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Barcode scans
    if (barcode) {
      gsap.fromTo(barcode,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 1.5, ease: "power2.out" }
      );
    }

    return () => {
      gsap.killTweensOf(badge);
      gsap.killTweensOf(photo);
      gsap.killTweensOf(info);
      gsap.killTweensOf(barcode);
      gsap.killTweensOf(chip);
      gsap.killTweensOf(lanyard);
    };
  }, [isActive, colors]);

  if (!isActive) return null;

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Badge Container - Center-Right */}
      <div className="absolute right-[15%] top-1/2 -translate-y-1/2 flex flex-col items-center">

        {/* Lanyard */}
        <div
          className="badge-lanyard w-1 h-16"
          style={{
            background: `linear-gradient(180deg, ${colors[0]}, ${colors[0]}80)`,
          }}
        />

        {/* Lanyard clip */}
        <div
          className="w-8 h-3 rounded-sm -mt-1 mb-1"
          style={{ background: '#888' }}
        />

        {/* Badge Card */}
        <div
          className="badge-card rounded-xl overflow-hidden"
          style={{
            width: '220px',
            background: 'linear-gradient(145deg, #1a1a2e, #16213e)',
            border: `1px solid ${colors[0]}30`,
            boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${colors[0]}15`,
          }}
        >
          {/* Header with company */}
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{ background: colors[0] }}
          >
            <span className="text-white font-bold text-sm tracking-wide">AMILTONE</span>
            <span className="text-white/70 text-[10px]">CONSEIL IT</span>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Photo and chip row */}
            <div className="flex gap-3 mb-4">
              {/* Photo */}
              <div
                className="badge-photo w-16 h-20 rounded-lg flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors[0]}30, ${colors[0]}10)`,
                  border: `1px solid ${colors[0]}30`,
                }}
              >
                <svg className="w-10 h-10 text-white/30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>

              {/* Chip */}
              <div
                className="badge-chip w-10 h-8 rounded-md mt-2"
                style={{
                  background: `linear-gradient(135deg, #ffd700, #ffaa00)`,
                  boxShadow: '0 2px 8px rgba(255,215,0,0.3)',
                }}
              >
                <div className="w-full h-full grid grid-cols-3 gap-px p-1 opacity-50">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-yellow-800/50 rounded-sm" />
                  ))}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-1">
              <div className="badge-info">
                <span className="text-white font-semibold text-sm">Gregory Praxedes</span>
              </div>
              <div className="badge-info">
                <span className="text-white/60 text-xs">Développeur Full Stack</span>
              </div>
              <div className="badge-info mt-2">
                <span className="text-[10px] font-mono" style={{ color: colors[0] }}>
                  ID: AMT-2024-0892
                </span>
              </div>
            </div>

            {/* Barcode */}
            <div className="badge-barcode mt-4 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="flex justify-center gap-px">
                {[2,1,3,1,2,1,1,3,2,1,1,2,3,1,2,1,3,1,1,2,1,3,2,1,1,2].map((w, i) => (
                  <div
                    key={i}
                    className="bg-white/80 rounded-sm"
                    style={{ width: `${w}px`, height: '25px' }}
                  />
                ))}
              </div>
              <div className="text-center mt-1">
                <span className="text-[8px] text-white/30 font-mono">*AMT2024GRP*</span>
              </div>
            </div>
          </div>
        </div>

        {/* Access level badge */}
        <div
          className="mt-3 px-3 py-1 rounded-full text-[10px] font-mono"
          style={{
            background: `${colors[0]}20`,
            border: `1px solid ${colors[0]}40`,
            color: colors[0],
          }}
        >
          ENTERPRISE ACCESS
        </div>
      </div>

      {/* Background gradient - Corporate/Professional vibes */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg,
              ${colors[0]}15 0%,
              ${colors[1]}08 20%,
              transparent 40%,
              transparent 60%,
              ${colors[2]}08 80%,
              ${colors[3]}15 100%
            )
          `,
        }}
      />

      {/* Subtle diagonal lines - corporate pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            ${colors[0]} 0px,
            ${colors[0]} 1px,
            transparent 1px,
            transparent 20px
          )`,
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute right-0 top-0 w-1/3 h-full"
        style={{
          background: `radial-gradient(ellipse at 80% 50%, ${colors[0]}15, transparent 60%)`,
        }}
      />
    </motion.div>
  );
}

// Main component that switches between effects
export function GSAPTimelineEffect({ effect, colors, isActive }: GSAPEffectProps) {
  switch (effect) {
    case "matrix":
      return <TerminalEffect colors={colors} isActive={isActive} />;
    case "fog":
      return <RadarEffect colors={colors} isActive={isActive} />;
    case "connections":
      return <DataFlowEffect colors={colors} isActive={isActive} />;
    case "aurora":
      return <FlightPathEffect colors={colors} isActive={isActive} />;
    case "calm":
      return <CodeEffect colors={colors} isActive={isActive} />;
    case "rising":
      return <LevelUpEffect colors={colors} isActive={isActive} />;
    case "globe":
      return <CorporateBadgeEffect colors={colors} isActive={isActive} />;
    default:
      return null;
  }
}

export default GSAPTimelineEffect;
