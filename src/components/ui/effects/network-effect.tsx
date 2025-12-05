"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface NetworkEffectProps {
  variant: "connections" | "globe";
  colors: string[];
}

export function NetworkEffect({ variant, colors }: NetworkEffectProps) {
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

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      // Globe specific
      angle?: number;
      speed?: number;
      orbitRadius?: number;
    }

    const nodes: Node[] = [];
    const nodeCount = variant === "globe" ? 35 : 25; // Reduced for subtlety
    const connectionDistance = variant === "globe" ? 120 : 150;

    // Initialize nodes
    if (variant === "connections") {
      // Random distributed nodes for network
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          radius: Math.random() * 3 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    } else {
      // Globe arrangement
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const globeRadius = Math.min(canvas.width, canvas.height) * 0.35;

      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const orbitRadius = globeRadius * (0.5 + Math.random() * 0.5);

        nodes.push({
          x: centerX + Math.cos(angle) * orbitRadius,
          y: centerY + Math.sin(angle) * orbitRadius * 0.6, // Flatten for 3D effect
          vx: 0,
          vy: 0,
          radius: Math.random() * 2 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle: angle,
          speed: 0.0005 + Math.random() * 0.001, // Much slower rotation
          orbitRadius: orbitRadius,
        });
      }
    }

    let time = 0;
    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      if (variant === "globe") {
        // Draw globe outline
        ctx.beginPath();
        ctx.arc(centerX, centerY, Math.min(canvas.width, canvas.height) * 0.35, 0, Math.PI * 2);
        ctx.strokeStyle = `${colors[0]}10`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw horizontal ellipses for globe effect
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          const yOffset = (i - 2) * (Math.min(canvas.width, canvas.height) * 0.12);
          const ellipseWidth = Math.sqrt(1 - Math.pow((i - 2) / 2.5, 2)) * Math.min(canvas.width, canvas.height) * 0.35;
          ctx.ellipse(centerX, centerY + yOffset, ellipseWidth, 20, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `${colors[0]}08`;
          ctx.stroke();
        }

        // Draw vertical arc
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, 30, Math.min(canvas.width, canvas.height) * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `${colors[0]}15`;
        ctx.stroke();
      }

      // Update and draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.15; // More subtle
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `${nodes[i].color}`;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;

      // Update and draw nodes
      nodes.forEach((node) => {
        if (variant === "connections") {
          // Move nodes
          node.x += node.vx;
          node.y += node.vy;

          // Bounce off edges
          if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
          if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

          // Keep in bounds
          node.x = Math.max(0, Math.min(canvas.width, node.x));
          node.y = Math.max(0, Math.min(canvas.height, node.y));
        } else {
          // Globe rotation
          node.angle! += node.speed!;
          node.x = centerX + Math.cos(node.angle!) * node.orbitRadius!;
          node.y = centerY + Math.sin(node.angle!) * node.orbitRadius! * 0.6;

          // Fade based on "depth" (x position relative to center simulates 3D)
          const depthFactor = (Math.cos(node.angle!) + 1) / 2;
          ctx.globalAlpha = 0.1 + depthFactor * 0.2; // More subtle
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 3
        );
        gradient.addColorStop(0, `${node.color}15`);
        gradient.addColorStop(1, `${node.color}00`);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
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
