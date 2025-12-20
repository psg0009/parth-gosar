"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DNAHelixProps {
  className?: string;
  height?: number;
}

// Map height to CSS class
const getHeightClass = (height: number): string => {
  if (height <= 150) return "dna-h-150";
  if (height <= 200) return "dna-h-200";
  if (height <= 220) return "dna-h-220";
  if (height <= 250) return "dna-h-250";
  return "dna-h-300";
};

export default function DNAHelix({ className = "", height = 300 }: DNAHelixProps) {
  const heightClass = getHeightClass(height);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 0.05);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const numPoints = 20;
  const points = Array.from({ length: numPoints }, (_, i) => {
    const y = (i / numPoints) * height;
    const phase = (i / numPoints) * Math.PI * 4 + time;
    const x1 = 50 + Math.sin(phase) * 30;
    const x2 = 50 - Math.sin(phase) * 30;
    const z = Math.cos(phase);
    return { y, x1, x2, z, i };
  });

  // Base pair colors for ATCG
  const basePairColors = [
    { left: "#22d3ee", right: "#f472b6" }, // A-T cyan-pink
    { left: "#34d399", right: "#fbbf24" }, // G-C emerald-amber
    { left: "#f472b6", right: "#22d3ee" }, // T-A pink-cyan
    { left: "#fbbf24", right: "#34d399" }, // C-G amber-emerald
  ];

  return (
    <div className={`relative ${heightClass} ${className}`}>
      <svg viewBox="0 0 100 300" className="w-full h-full">
        <defs>
          <linearGradient id="helixGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="helixGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Back strand */}
        <path
          d={`M ${points.map((p) => `${p.x2},${p.y}`).join(" L ")}`}
          fill="none"
          stroke="url(#helixGradient2)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Base pairs (connections) - render back ones first */}
        {points
          .filter((p) => p.z < 0)
          .map((p) => {
            const colors = basePairColors[p.i % 4];
            return (
              <g key={`back-${p.i}`} opacity={0.3 + (1 + p.z) * 0.3}>
                <line
                  x1={p.x1}
                  y1={p.y}
                  x2={p.x2}
                  y2={p.y}
                  stroke={`${colors.left}40`}
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              </g>
            );
          })}

        {/* Front strand */}
        <path
          d={`M ${points.map((p) => `${p.x1},${p.y}`).join(" L ")}`}
          fill="none"
          stroke="url(#helixGradient1)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow)"
        />

        {/* Base pairs (connections) - render front ones */}
        {points
          .filter((p) => p.z >= 0)
          .map((p) => {
            const colors = basePairColors[p.i % 4];
            return (
              <g key={`front-${p.i}`} opacity={0.5 + p.z * 0.5}>
                <line
                  x1={p.x1}
                  y1={p.y}
                  x2={p.x2}
                  y2={p.y}
                  stroke={colors.left}
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />
                {/* Nucleotide markers */}
                <circle cx={p.x1} cy={p.y} r="3" fill={colors.left} filter="url(#glow)" />
                <circle cx={p.x2} cy={p.y} r="3" fill={colors.right} filter="url(#glow)" />
              </g>
            );
          })}

        {/* Highlight effect */}
        <motion.ellipse
          cx="50"
          cy={height / 2}
          rx="40"
          ry="30"
          fill="none"
          stroke="rgba(34, 211, 238, 0.3)"
          strokeWidth="1"
          animate={{
            cy: [height * 0.3, height * 0.7, height * 0.3],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

    </div>
  );
}
