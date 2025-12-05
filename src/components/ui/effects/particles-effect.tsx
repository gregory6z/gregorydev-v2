"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface ParticlesEffectProps {
  variant: "matrix" | "calm";
  colors: string[];
}

export function ParticlesEffect({ variant, colors }: ParticlesEffectProps) {
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

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      // Matrix specific
      char?: string;
      trail?: number;
    }

    const particles: Particle[] = [];
    const particleCount = variant === "matrix" ? 40 : 25; // Reduced for subtlety

    // Matrix characters
    const matrixChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const particle: Particle = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: variant === "matrix" ? 12 : Math.random() * 2 + 1,
        speedX: variant === "matrix" ? 0 : (Math.random() - 0.5) * 0.1,
        speedY: variant === "matrix" ? Math.random() * 0.4 + 0.2 : (Math.random() - 0.5) * 0.08,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.15 + 0.05, // Much more subtle
      };

      if (variant === "matrix") {
        particle.char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        particle.trail = Math.random() * 20 + 10;
      }

      particles.push(particle);
    }

    let animationId: number;

    const animate = () => {
      if (variant === "matrix") {
        // Matrix effect - semi-transparent black for trail effect
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        // Calm particles - clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      particles.forEach((particle) => {
        if (variant === "matrix") {
          // Matrix rain effect
          ctx.font = `${particle.size}px monospace`;
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = particle.opacity;
          ctx.fillText(particle.char!, particle.x, particle.y);

          particle.y += particle.speedY;

          // Random character change
          if (Math.random() > 0.95) {
            particle.char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          }

          // Reset when off screen
          if (particle.y > canvas.height) {
            particle.y = -20;
            particle.x = Math.random() * canvas.width;
          }
        } else {
          // Calm floating particles
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = particle.opacity;
          ctx.fill();

          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Gentle floating - change direction occasionally
          if (Math.random() > 0.995) {
            particle.speedX = (Math.random() - 0.5) * 0.15;
            particle.speedY = (Math.random() - 0.5) * 0.1;
          }

          // Wrap around screen
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
        }
      });

      ctx.globalAlpha = 1;
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
