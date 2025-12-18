"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface JourneyPathProps {
  className?: string;
  activeIndex: number;
  totalNodes: number;
}

export default function JourneyPath({ className = "", activeIndex, totalNodes }: JourneyPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pathLength, setPathLength] = useState(0);

  // Calculate the progress based on active index
  const progress = (activeIndex + 1) / totalNodes;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <svg
        viewBox="0 0 100 600"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradient for the path */}
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00ff88" />
            <stop offset="33%" stopColor="#22d3ee" />
            <stop offset="66%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Animated dash pattern */}
          <pattern id="movingDots" patternUnits="userSpaceOnUse" width="20" height="20">
            <circle cx="10" cy="10" r="2" fill="#22d3ee" opacity="0.5">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
            </circle>
          </pattern>
        </defs>

        {/* Background path (faded) */}
        <path
          d="M 50 20
             C 50 80, 80 100, 80 150
             C 80 200, 20 220, 20 280
             C 20 340, 80 360, 80 420
             C 80 480, 50 500, 50 560"
          fill="none"
          stroke="rgba(34, 211, 238, 0.1)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Animated progress path */}
        <motion.path
          d="M 50 20
             C 50 80, 80 100, 80 150
             C 80 200, 20 220, 20 280
             C 20 340, 80 360, 80 420
             C 80 480, 50 500, 50 560"
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#pathGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Animated particles along the path */}
        {[0, 0.25, 0.5, 0.75].map((offset, i) => (
          <motion.circle
            key={i}
            r="3"
            fill="#22d3ee"
            filter="url(#pathGlow)"
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
            }}
          >
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              begin={`${i * 1}s`}
              path="M 50 20 C 50 80, 80 100, 80 150 C 80 200, 20 220, 20 280 C 20 340, 80 360, 80 420 C 80 480, 50 500, 50 560"
            />
          </motion.circle>
        ))}

        {/* Node positions */}
        {Array.from({ length: totalNodes }, (_, i) => {
          const positions = [
            { x: 50, y: 20 },
            { x: 80, y: 150 },
            { x: 20, y: 280 },
            { x: 80, y: 420 },
            { x: 50, y: 560 },
          ];
          const pos = positions[i] || { x: 50, y: 20 + (i * 540) / (totalNodes - 1) };
          const isActive = i <= activeIndex;
          const isCurrent = i === activeIndex;

          return (
            <g key={i}>
              {/* Outer pulse ring for current */}
              {isCurrent && (
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r="12"
                  fill="none"
                  stroke="#00ff88"
                  strokeWidth="2"
                  animate={{
                    r: [12, 20, 12],
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}

              {/* Main node */}
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={isCurrent ? 10 : 8}
                fill={isActive ? (isCurrent ? "#00ff88" : "#22d3ee") : "#1a1a2e"}
                stroke={isActive ? "#00ff88" : "#22d3ee"}
                strokeWidth="2"
                filter={isActive ? "url(#pathGlow)" : "none"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.2, type: "spring" }}
              />

              {/* Inner dot */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r="3"
                fill={isActive ? "#000" : "#22d3ee"}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
