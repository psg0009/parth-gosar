"use client";

import { motion } from "framer-motion";

interface CellDivisionProps {
  className?: string;
  size?: number;
}

// Map size to CSS class
const getSizeClass = (size: number): string => {
  if (size <= 70) return "viz-size-70";
  if (size <= 85) return "viz-size-85";
  if (size <= 90) return "viz-size-90";
  if (size <= 100) return "viz-size-100";
  if (size <= 120) return "viz-size-120";
  if (size <= 150) return "viz-size-150";
  if (size <= 200) return "viz-size-200";
  if (size <= 250) return "viz-size-250";
  if (size <= 280) return "viz-size-280";
  if (size <= 300) return "viz-size-300";
  if (size <= 320) return "viz-size-320";
  if (size <= 350) return "viz-size-350";
  return "viz-size-400";
};

// AI Chip / Neural Processor visualization (renamed from CellDivision)
export default function CellDivision({ className = "", size = 120 }: CellDivisionProps) {
  const sizeClass = getSizeClass(size);

  return (
    <div className={`relative ${sizeClass} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="chipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0.3)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.2)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0.3)" />
          </linearGradient>
          <filter id="chipGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main chip body */}
        <motion.rect
          x="20"
          y="20"
          width="60"
          height="60"
          rx="4"
          fill="url(#chipGradient)"
          stroke="rgba(34, 211, 238, 0.6)"
          strokeWidth="1.5"
          filter="url(#chipGlow)"
          animate={{
            strokeOpacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Inner circuit pattern */}
        <motion.rect
          x="30"
          y="30"
          width="40"
          height="40"
          rx="2"
          fill="none"
          stroke="rgba(139, 92, 246, 0.5)"
          strokeWidth="0.5"
        />

        {/* AI Core - center */}
        <motion.circle
          cx="50"
          cy="50"
          r="12"
          fill="rgba(139, 92, 246, 0.3)"
          stroke="rgba(139, 92, 246, 0.8)"
          strokeWidth="1"
          animate={{
            r: [12, 14, 12],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Neural network pattern inside core */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.line
            key={`core-${i}`}
            x1="50"
            y1="50"
            x2={50 + Math.cos((angle * Math.PI) / 180) * 8}
            y2={50 + Math.sin((angle * Math.PI) / 180) * 8}
            stroke="rgba(34, 211, 238, 0.8)"
            strokeWidth="1"
            strokeLinecap="round"
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}

        {/* Connection pins - top */}
        {[28, 38, 50, 62, 72].map((x, i) => (
          <motion.line
            key={`top-${i}`}
            x1={x}
            y1="8"
            x2={x}
            y2="20"
            stroke="rgba(34, 211, 238, 0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Connection pins - bottom */}
        {[28, 38, 50, 62, 72].map((x, i) => (
          <motion.line
            key={`bottom-${i}`}
            x1={x}
            y1="80"
            x2={x}
            y2="92"
            stroke="rgba(34, 211, 238, 0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2 + 0.5,
            }}
          />
        ))}

        {/* Connection pins - left */}
        {[28, 38, 50, 62, 72].map((y, i) => (
          <motion.line
            key={`left-${i}`}
            x1="8"
            y1={y}
            x2="20"
            y2={y}
            stroke="rgba(52, 211, 153, 0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2 + 0.25,
            }}
          />
        ))}

        {/* Connection pins - right */}
        {[28, 38, 50, 62, 72].map((y, i) => (
          <motion.line
            key={`right-${i}`}
            x1="80"
            y1={y}
            x2="92"
            y2={y}
            stroke="rgba(52, 211, 153, 0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2 + 0.75,
            }}
          />
        ))}

        {/* Data flow particles */}
        {[0, 1, 2, 3].map((i) => (
          <motion.circle
            key={`particle-${i}`}
            cx="50"
            cy="8"
            r="2"
            fill="#22d3ee"
            filter="url(#chipGlow)"
            animate={{
              cy: [8, 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeIn",
            }}
          />
        ))}

        {/* Processing indicator */}
        <motion.text
          x="50"
          y="52"
          textAnchor="middle"
          fill="rgba(34, 211, 238, 0.9)"
          fontSize="6"
          fontFamily="monospace"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          AI
        </motion.text>
      </svg>

    </div>
  );
}
