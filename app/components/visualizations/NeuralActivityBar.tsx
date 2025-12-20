"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface NeuralActivityBarProps {
  className?: string;
}

export default function NeuralActivityBar({ className = "" }: NeuralActivityBarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Particles for data flow
    interface Particle {
      x: number;
      y: number;
      speed: number;
      size: number;
      color: string;
      trail: { x: number; y: number }[];
    }

    const particles: Particle[] = [];
    const colors = ["#22d3ee", "#34d399", "#a855f7", "#f472b6", "#fbbf24"];

    // Initialize particles
    const initParticles = () => {
      const rect = canvas.getBoundingClientRect();
      for (let i = 0; i < 25; i++) {
        particles.push({
          x: Math.random() * rect.width,
          y: 20 + Math.random() * 40,
          speed: 1 + Math.random() * 2,
          size: 2 + Math.random() * 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          trail: [],
        });
      }
    };

    initParticles();

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);
      timeRef.current += 0.02;
      const time = timeRef.current;

      // Draw flowing grid lines
      ctx.strokeStyle = "rgba(34, 211, 238, 0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw horizontal baseline
      const baseY = height / 2;
      ctx.strokeStyle = "rgba(34, 211, 238, 0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      ctx.lineTo(width, baseY);
      ctx.stroke();

      // Draw animated wave pattern
      ctx.beginPath();
      ctx.strokeStyle = "rgba(34, 211, 238, 0.3)";
      ctx.lineWidth = 1.5;
      for (let x = 0; x < width; x += 2) {
        const y = baseY + Math.sin(x * 0.02 + time * 2) * 15 + Math.sin(x * 0.01 + time) * 10;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Second wave (offset)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(52, 211, 153, 0.2)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 2) {
        const y = baseY + Math.sin(x * 0.015 - time * 1.5) * 12 + Math.cos(x * 0.008 + time * 0.5) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw and update particles
      particles.forEach((p) => {
        // Update trail
        p.trail.unshift({ x: p.x, y: p.y });
        if (p.trail.length > 20) p.trail.pop();

        // Update position with wave motion
        p.x += p.speed;
        p.y = baseY + Math.sin(p.x * 0.02 + time) * 20;

        // Wrap around
        if (p.x > width + 10) {
          p.x = -10;
          p.trail = [];
        }

        // Draw trail
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let i = 1; i < p.trail.length; i++) {
            ctx.lineTo(p.trail[i].x, p.trail[i].y);
          }
          const gradient = ctx.createLinearGradient(p.x, p.y, p.trail[p.trail.length - 1].x, p.trail[p.trail.length - 1].y);
          gradient.addColorStop(0, p.color);
          gradient.addColorStop(1, p.color + "00");
          ctx.strokeStyle = gradient;
          ctx.lineWidth = p.size * 0.8;
          ctx.lineCap = "round";
          ctx.stroke();
        }

        // Draw particle
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        glow.addColorStop(0, p.color);
        glow.addColorStop(0.3, p.color + "80");
        glow.addColorStop(1, p.color + "00");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Draw node points along the wave
      for (let i = 0; i < 8; i++) {
        const nodeX = (width / 8) * i + (width / 16);
        const nodeY = baseY + Math.sin(nodeX * 0.02 + time * 2) * 15;
        const pulse = Math.sin(time * 3 + i) * 0.5 + 0.5;

        // Outer ring
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 8 + pulse * 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.2 + pulse * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Inner dot
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${0.6 + pulse * 0.4})`;
        ctx.fill();
      }

      // Draw data labels at intervals
      ctx.font = "9px monospace";
      ctx.fillStyle = "rgba(34, 211, 238, 0.4)";
      const labels = ["INPUT", "CONV", "POOL", "DENSE", "RELU", "NORM", "ATTN", "OUTPUT"];
      labels.forEach((label, i) => {
        const x = (width / 8) * i + (width / 16) - 15;
        ctx.fillText(label, x, height - 8);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={`relative w-full h-20 ${className}`}>
      {/* Left label */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
        <motion.span
          className="w-2 h-2 rounded-full bg-cyan-400"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="text-[10px] font-mono text-cyan-400/60">NEURAL PIPELINE</span>
      </div>

      {/* Right label */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <motion.span
          className="text-[10px] font-mono text-emerald-400"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          PROCESSING
        </motion.span>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-cyber-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-cyber-black to-transparent pointer-events-none" />
    </div>
  );
}
