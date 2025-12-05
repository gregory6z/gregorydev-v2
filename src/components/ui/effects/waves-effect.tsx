"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface WavesEffectProps {
  variant: "fog" | "rising";
  colors: string[];
}

export function WavesEffect({ variant, colors }: WavesEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let time = 0;
    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (variant === "fog") {
        // Fog/mist effect - layered waves with blur
        const layers = 4;
        for (let layer = 0; layer < layers; layer++) {
          ctx.beginPath();
          ctx.moveTo(0, canvas.height);

          const amplitude = 50 + layer * 20;
          const frequency = 0.002 - layer * 0.0003;
          const speed = 0.005 + layer * 0.002; // Much slower
          const baseY = canvas.height * (0.5 + layer * 0.12);

          for (let x = 0; x <= canvas.width; x += 5) {
            const y =
              baseY +
              Math.sin(x * frequency + time * speed) * amplitude +
              Math.sin(x * frequency * 2 + time * speed * 1.5) * (amplitude * 0.5);
            ctx.lineTo(x, y);
          }

          ctx.lineTo(canvas.width, canvas.height);
          ctx.closePath();

          const gradient = ctx.createLinearGradient(0, baseY - amplitude, 0, canvas.height);
          gradient.addColorStop(0, `${colors[layer % colors.length]}00`);
          gradient.addColorStop(0.5, `${colors[layer % colors.length]}15`);
          gradient.addColorStop(1, `${colors[layer % colors.length]}08`);

          ctx.fillStyle = gradient;
          ctx.fill();
        }
      } else {
        // Rising waves effect - dynamic upward motion
        const waveCount = 5;
        for (let wave = 0; wave < waveCount; wave++) {
          ctx.beginPath();

          const baseY = canvas.height - (wave * canvas.height * 0.15);
          const amplitude = 30 + wave * 15;
          const frequency = 0.003 + wave * 0.001;
          const speed = 0.008 + wave * 0.003; // Much slower

          ctx.moveTo(0, canvas.height);

          for (let x = 0; x <= canvas.width; x += 3) {
            const y =
              baseY +
              Math.sin(x * frequency + time * speed) * amplitude +
              Math.sin(x * frequency * 0.5 - time * speed * 0.7) * (amplitude * 0.6) +
              Math.cos(x * frequency * 1.5 + time * speed * 1.2) * (amplitude * 0.3);
            ctx.lineTo(x, y);
          }

          ctx.lineTo(canvas.width, canvas.height);
          ctx.closePath();

          const gradient = ctx.createLinearGradient(0, baseY - amplitude * 2, 0, canvas.height);
          gradient.addColorStop(0, `${colors[wave % colors.length]}03`);
          gradient.addColorStop(0.3, `${colors[wave % colors.length]}10`);
          gradient.addColorStop(0.7, `${colors[wave % colors.length]}08`);
          gradient.addColorStop(1, `${colors[wave % colors.length]}03`);

          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Add some rising particles
        const particleCount = 12;
        for (let i = 0; i < particleCount; i++) {
          const x = (i / particleCount) * canvas.width + Math.sin(time * 0.5 + i) * 50;
          const y = canvas.height - ((time * 8 + i * 100) % (canvas.height + 100)); // Slower rise
          const size = 1.5 + Math.sin(time + i) * 0.5;
          const opacity = 0.1 + Math.sin(time * 2 + i) * 0.05;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = colors[i % colors.length];
          ctx.globalAlpha = opacity;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      time += 0.016;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [variant, colors]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
  );
}
