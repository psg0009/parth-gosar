"use client";

import { motion } from "framer-motion";

interface CellDivisionProps {
  className?: string;
  size?: number;
}

export default function CellDivision({ className = "", size = 120 }: CellDivisionProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <radialGradient id="cellGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0.3)" />
            <stop offset="70%" stopColor="rgba(34, 211, 238, 0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="cellGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Cell membrane - main cell */}
        <motion.ellipse
          cx="50"
          cy="50"
          rx="35"
          ry="35"
          fill="url(#cellGradient)"
          stroke="rgba(34, 211, 238, 0.6)"
          strokeWidth="1.5"
          filter="url(#cellGlow)"
          animate={{
            rx: [35, 38, 35, 30, 35],
            ry: [35, 32, 35, 38, 35],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Nucleus */}
        <motion.ellipse
          cx="50"
          cy="50"
          rx="12"
          ry="12"
          fill="rgba(239, 68, 68, 0.3)"
          stroke="rgba(239, 68, 68, 0.6)"
          strokeWidth="1"
          animate={{
            rx: [12, 14, 10, 12],
            ry: [12, 10, 14, 12],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Chromosomes inside nucleus */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.line
            key={i}
            x1={50 + Math.cos((angle * Math.PI) / 180) * 4}
            y1={50 + Math.sin((angle * Math.PI) / 180) * 4}
            x2={50 + Math.cos((angle * Math.PI) / 180) * 8}
            y2={50 + Math.sin((angle * Math.PI) / 180) * 8}
            stroke="rgba(239, 68, 68, 0.8)"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transformOrigin: "50px 50px" }}
          />
        ))}

        {/* Mitochondria */}
        {[
          { x: 30, y: 35, rot: 45 },
          { x: 70, y: 40, rot: -30 },
          { x: 35, y: 70, rot: 20 },
          { x: 65, y: 65, rot: -60 },
        ].map((mito, i) => (
          <motion.ellipse
            key={i}
            cx={mito.x}
            cy={mito.y}
            rx="6"
            ry="3"
            fill="rgba(52, 211, 153, 0.4)"
            stroke="rgba(52, 211, 153, 0.6)"
            strokeWidth="0.5"
            transform={`rotate(${mito.rot} ${mito.x} ${mito.y})`}
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Ribosomes (small dots) */}
        {Array.from({ length: 15 }, (_, i) => {
          const angle = (i / 15) * Math.PI * 2;
          const r = 20 + Math.random() * 10;
          return (
            <motion.circle
              key={i}
              cx={50 + Math.cos(angle) * r}
              cy={50 + Math.sin(angle) * r}
              r="1.5"
              fill="rgba(251, 191, 36, 0.6)"
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          );
        })}

        {/* Division indicator - cleavage furrow forming */}
        <motion.path
          d="M 50 15 Q 45 50 50 85"
          fill="none"
          stroke="rgba(34, 211, 238, 0.4)"
          strokeWidth="1"
          strokeDasharray="3 3"
          animate={{
            opacity: [0, 0.6, 0],
            d: [
              "M 50 15 Q 45 50 50 85",
              "M 50 15 Q 40 50 50 85",
              "M 50 15 Q 45 50 50 85",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </svg>

      {/* Label */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-cyan-400/60 whitespace-nowrap">
        MITOSIS PHASE
      </div>
    </div>
  );
}
