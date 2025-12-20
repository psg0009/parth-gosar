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
  const [heartRate, setHeartRate] = useState(72);
  const [amplitude, setAmplitude] = useState(0.92);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const indexRef = useRef(0);

  // Stable heart rate that changes occasionally
  useEffect(() => {
    const rateInterval = setInterval(() => {
      setHeartRate(Math.floor(68 + Math.random() * 15));
      setAmplitude(0.85 + Math.random() * 0.2);
    }, 3000);
    return () => clearInterval(rateInterval);
  }, []);

  useEffect(() => {
    // Generate EKG-like pattern with proper heartbeat shape
    const generatePoint = (index: number) => {
      // Create a realistic ECG waveform cycle (about 50 points per beat)
      const cyclePos = index % 50;

      // Baseline with slight variation
      const baseline = Math.sin(index * 0.05) * 2;

      // P wave (atrial depolarization) - small bump
      if (cyclePos >= 5 && cyclePos <= 10) {
        const t = (cyclePos - 5) / 5;
        return baseline + Math.sin(t * Math.PI) * 8;
      }
      // PR segment (flat)
      else if (cyclePos >= 11 && cyclePos <= 14) {
        return baseline;
      }
      // Q wave (small downward)
      else if (cyclePos >= 15 && cyclePos <= 16) {
        return baseline - 8;
      }
      // R wave (sharp upward spike - the main heartbeat peak)
      else if (cyclePos >= 17 && cyclePos <= 19) {
        const t = (cyclePos - 17) / 2;
        if (t < 0.5) {
          return baseline + t * 2 * 35; // Going up
        } else {
          return baseline + (1 - t) * 2 * 35; // Coming down
        }
      }
      // S wave (sharp downward)
      else if (cyclePos >= 20 && cyclePos <= 22) {
        const t = (cyclePos - 20) / 2;
        return baseline - 15 + t * 15;
      }
      // ST segment (flat, slightly elevated)
      else if (cyclePos >= 23 && cyclePos <= 28) {
        return baseline + 2;
      }
      // T wave (repolarization - rounded bump)
      else if (cyclePos >= 29 && cyclePos <= 38) {
        const t = (cyclePos - 29) / 9;
        return baseline + Math.sin(t * Math.PI) * 12;
      }
      // Return to baseline
      return baseline;
    };

    const interval = setInterval(() => {
      setPoints((prev) => {
        indexRef.current += 1;
        const newPoints = [...prev, generatePoint(indexRef.current)];
        if (newPoints.length > 150) {
          return newPoints.slice(-150);
        }
        return newPoints;
      });
    }, 25);

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
    <div className={`relative bg-transparent rounded-lg border border-cyan-500/10 p-3 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <motion.span
            className="w-2 h-2 rounded-full bg-cyan-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-[10px] font-mono text-white/60">{label}</span>
        </div>
        <span className="text-[10px] font-mono text-cyan-400">
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
        <span>RATE: {heartRate} BPM</span>
        <span>AMP: {amplitude.toFixed(2)} mV</span>
      </div>
    </div>
  );
}
