"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  pulse: number;
}

interface FlowLine {
  points: { x: number; y: number }[];
  progress: number;
  speed: number;
  color: string;
  width: number;
}

export default function FlowingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const flowLinesRef = useRef<FlowLine[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resize();
    window.addEventListener("resize", resize);

    // Initialize particles - sparse and subtle
    const initParticles = () => {
      const rect = canvas.getBoundingClientRect();
      const particles: Particle[] = [];
      const colors = ["#22d3ee", "#34d399", "#a855f7", "#f472b6"];
      const numParticles = Math.min(40, Math.floor((rect.width * rect.height) / 40000));

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: 1 + Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.1 + Math.random() * 0.3,
          pulse: Math.random() * Math.PI * 2,
        });
      }
      return particles;
    };

    // Initialize flow lines - elegant curves flowing across screen
    const initFlowLines = () => {
      const rect = canvas.getBoundingClientRect();
      const lines: FlowLine[] = [];
      const colors = ["#22d3ee", "#34d399", "#a855f7"];

      for (let i = 0; i < 5; i++) {
        const points: { x: number; y: number }[] = [];
        let x = -100;
        let y = rect.height * (0.2 + Math.random() * 0.6);

        // Create smooth curve points
        while (x < rect.width + 100) {
          points.push({ x, y });
          x += 80 + Math.random() * 60;
          y += (Math.random() - 0.5) * 120;
          y = Math.max(50, Math.min(rect.height - 50, y));
        }

        lines.push({
          points,
          progress: Math.random(),
          speed: 0.002 + Math.random() * 0.003,
          color: colors[i % colors.length],
          width: 1 + Math.random(),
        });
      }
      return lines;
    };

    particlesRef.current = initParticles();
    flowLinesRef.current = initFlowLines();

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear with very subtle fade for trails
      ctx.fillStyle = "rgba(2, 6, 23, 0.08)";
      ctx.fillRect(0, 0, width, height);

      timeRef.current += 0.016;
      const time = timeRef.current;
      const particles = particlesRef.current;
      const flowLines = flowLinesRef.current;

      // Draw subtle grid pattern
      ctx.strokeStyle = "rgba(34, 211, 238, 0.015)";
      ctx.lineWidth = 1;
      const gridSize = 80;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw and update flow lines
      flowLines.forEach((line) => {
        line.progress += line.speed;
        if (line.progress > 1.3) line.progress = -0.3;

        // Draw the path itself (very subtle)
        ctx.beginPath();
        ctx.moveTo(line.points[0].x, line.points[0].y);
        for (let i = 1; i < line.points.length; i++) {
          const p0 = line.points[Math.max(0, i - 1)];
          const p1 = line.points[i];
          const cp1x = p0.x + (p1.x - p0.x) * 0.5;
          const cp1y = p0.y;
          const cp2x = p0.x + (p1.x - p0.x) * 0.5;
          const cp2y = p1.y;
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p1.x, p1.y);
        }
        ctx.strokeStyle = line.color + "08";
        ctx.lineWidth = line.width * 2;
        ctx.stroke();

        // Draw flowing pulse along the line
        const totalLength = line.points.length - 1;
        const pulsePos = line.progress * totalLength;
        const segmentIndex = Math.floor(pulsePos);
        const segmentProgress = pulsePos - segmentIndex;

        if (segmentIndex >= 0 && segmentIndex < totalLength) {
          const p1 = line.points[segmentIndex];
          const p2 = line.points[segmentIndex + 1];
          const px = p1.x + (p2.x - p1.x) * segmentProgress;
          const py = p1.y + (p2.y - p1.y) * segmentProgress;

          // Glowing pulse
          const pulseGlow = ctx.createRadialGradient(px, py, 0, px, py, 30);
          pulseGlow.addColorStop(0, line.color + "40");
          pulseGlow.addColorStop(0.5, line.color + "15");
          pulseGlow.addColorStop(1, line.color + "00");
          ctx.beginPath();
          ctx.arc(px, py, 30, 0, Math.PI * 2);
          ctx.fillStyle = pulseGlow;
          ctx.fill();

          // Core pulse
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = line.color + "80";
          ctx.fill();
        }
      });

      // Update and draw particles
      particles.forEach((p) => {
        // Update pulse
        p.pulse += 0.03;

        // Gentle wave motion
        p.vx += Math.sin(time * 0.5 + p.y * 0.005) * 0.005;
        p.vy += Math.cos(time * 0.5 + p.x * 0.005) * 0.005;

        // Apply velocity with damping
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Boundary wrapping
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Draw particle with pulse
        const pulseScale = 1 + Math.sin(p.pulse) * 0.3;
        const alpha = p.alpha * (0.7 + Math.sin(p.pulse) * 0.3);

        // Glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 8 * pulseScale);
        glow.addColorStop(0, p.color + Math.floor(alpha * 100).toString(16).padStart(2, "0"));
        glow.addColorStop(1, p.color + "00");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 8 * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });

      // Draw connections between close particles (sparse)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p1.color + Math.floor(opacity * 255).toString(16).padStart(2, "0");
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 50%, transparent 0%, rgba(2, 6, 23, 0.5) 100%)",
          }}
        />
      </div>
      {/* Animated floating orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "20%",
          left: "10%",
        }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 80, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          bottom: "30%",
          right: "5%",
        }}
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -40, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(52, 211, 153, 0.07) 0%, transparent 70%)",
          filter: "blur(70px)",
          top: "60%",
          left: "50%",
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}
