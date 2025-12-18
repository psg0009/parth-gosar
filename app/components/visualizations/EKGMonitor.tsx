"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface EKGMonitorProps {
  className?: string;
  color?: string;
  label?: string;
}

export default function EKGMonitor({
  className = "",
  color = "#22d3ee",
  label = "NEURAL ACTIVITY",
}: EKGMonitorProps) {
  const [points, setPoints] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Generate EKG-like pattern
    const generatePoint = (index: number) => {
      const baseNoise = Math.sin(index * 0.1) * 5 + Math.random() * 3;

      // Create QRS complex pattern periodically
      const cyclePos = index % 60;
      if (cyclePos >= 20 && cyclePos <= 22) {
        return -15 + Math.random() * 5; // P wave
      } else if (cyclePos >= 25 && cyclePos <= 26) {
        return -20; // Q
      } else if (cyclePos >= 27 && cyclePos <= 29) {
        return 40 + Math.random() * 10; // R peak
      } else if (cyclePos >= 30 && cyclePos <= 32) {
        return -25; // S
      } else if (cyclePos >= 38 && cyclePos <= 42) {
        return 15 + Math.random() * 5; // T wave
      }
      return baseNoise;
    };

    const interval = setInterval(() => {
      setPoints((prev) => {
        const newPoints = [...prev, generatePoint(prev.length)];
        if (newPoints.length > 150) {
          return newPoints.slice(-150);
        }
        return newPoints;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = "rgba(34, 211, 238, 0.1)";
    ctx.lineWidth = 0.5;
    for (let x = 0; x < width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw EKG line
    if (points.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;

      points.forEach((point, i) => {
        const x = (i / 150) * width;
        const y = centerY - point;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Draw leading dot
      if (points.length > 0) {
        const lastX = ((points.length - 1) / 150) * width;
        const lastY = centerY - points[points.length - 1];
        ctx.beginPath();
        ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
    }
  }, [points, color]);

  return (
    <div className={`relative bg-cyber-black/50 rounded-lg border border-cyan-500/20 p-3 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-[10px] font-mono text-white/60">{label}</span>
        </div>
        <span className="text-[10px] font-mono" style={{ color }}>
          LIVE
        </span>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={300}
        height={80}
        className="w-full"
      />

      {/* Stats */}
      <div className="flex justify-between mt-2 text-[9px] font-mono text-white/40">
        <span>RATE: {Math.floor(60 + Math.random() * 20)} BPM</span>
        <span>AMP: {(0.8 + Math.random() * 0.4).toFixed(2)} mV</span>
      </div>
    </div>
  );
}
