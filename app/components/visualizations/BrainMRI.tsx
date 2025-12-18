"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BrainMRIProps {
  className?: string;
  size?: number;
}

export default function BrainMRI({ className = "", size = 400 }: BrainMRIProps) {
  const [scanLine, setScanLine] = useState(0);
  const [activeSlice, setActiveSlice] = useState(0);

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanLine((prev) => (prev + 1) % 100);
    }, 30);

    const sliceInterval = setInterval(() => {
      setActiveSlice((prev) => (prev + 1) % 12);
    }, 2000);

    return () => {
      clearInterval(scanInterval);
      clearInterval(sliceInterval);
    };
  }, []);

  // Generate MRI slice layers
  const slices = Array.from({ length: 12 }, (_, i) => {
    const opacity = Math.abs(activeSlice - i) <= 2 ? 1 - Math.abs(activeSlice - i) * 0.3 : 0.1;
    const scale = 1 - Math.abs(activeSlice - i) * 0.05;
    return { id: i, opacity, scale, z: (i - 6) * 8 };
  });

  // Use CSS custom properties for dynamic sizing
  const sizeStyle = { "--brain-size": `${size}px` } as React.CSSProperties;

  return (
    <div className={`relative brain-mri-container ${className}`} style={sizeStyle}>
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full brain-mri-conic-gradient"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Main container */}
      <div className="absolute inset-4 rounded-full bg-cyber-black border border-cyan-500/30 overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-20 brain-mri-grid" />

        {/* MRI Brain visualization */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full brain-mri-svg-glow"
        >
          {/* Brain outline layers */}
          {slices.map((slice) => (
            <g key={slice.id} style={{ opacity: slice.opacity }}>
              {/* Outer brain shape */}
              <ellipse
                cx="100"
                cy="100"
                rx={70 * slice.scale}
                ry={80 * slice.scale}
                fill="none"
                stroke="rgba(34, 211, 238, 0.6)"
                strokeWidth="1"
              />
              {/* Inner structures */}
              <path
                d={`M ${60 * slice.scale + 30} ${100}
                    Q ${80 * slice.scale + 20} ${60 * slice.scale + 40} ${100} ${50 * slice.scale + 50}
                    Q ${120 * slice.scale - 20} ${60 * slice.scale + 40} ${140 * slice.scale - 30} ${100}
                    Q ${120 * slice.scale - 20} ${140 * slice.scale - 40} ${100} ${150 * slice.scale - 50}
                    Q ${80 * slice.scale + 20} ${140 * slice.scale - 40} ${60 * slice.scale + 30} ${100}`}
                fill="none"
                stroke="rgba(52, 211, 153, 0.4)"
                strokeWidth="0.5"
              />
              {/* Corpus callosum */}
              <ellipse
                cx="100"
                cy={90 * slice.scale + 10}
                rx={30 * slice.scale}
                ry={8 * slice.scale}
                fill="none"
                stroke="rgba(34, 211, 238, 0.5)"
                strokeWidth="0.5"
              />
              {/* Ventricles */}
              <ellipse
                cx={85}
                cy={100}
                rx={8 * slice.scale}
                ry={15 * slice.scale}
                fill="rgba(34, 211, 238, 0.1)"
                stroke="rgba(34, 211, 238, 0.4)"
                strokeWidth="0.5"
              />
              <ellipse
                cx={115}
                cy={100}
                rx={8 * slice.scale}
                ry={15 * slice.scale}
                fill="rgba(34, 211, 238, 0.1)"
                stroke="rgba(34, 211, 238, 0.4)"
                strokeWidth="0.5"
              />
            </g>
          ))}

          {/* Tumor detection highlight */}
          <motion.circle
            cx="130"
            cy="80"
            r="12"
            fill="none"
            stroke="rgba(239, 68, 68, 0.8)"
            strokeWidth="2"
            strokeDasharray="4 2"
            animate={{
              r: [12, 15, 12],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.circle
            cx="130"
            cy="80"
            r="4"
            fill="rgba(239, 68, 68, 0.6)"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />

          {/* AI detection markers */}
          {[
            { x: 70, y: 75, label: "ROI-1" },
            { x: 130, y: 120, label: "ROI-2" },
          ].map((marker, i) => (
            <g key={i}>
              <motion.rect
                x={marker.x - 10}
                y={marker.y - 10}
                width="20"
                height="20"
                fill="none"
                stroke="rgba(34, 211, 238, 0.6)"
                strokeWidth="1"
                animate={{
                  strokeOpacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              />
              <line
                x1={marker.x - 15}
                y1={marker.y}
                x2={marker.x - 10}
                y2={marker.y}
                stroke="rgba(34, 211, 238, 0.8)"
                strokeWidth="1"
              />
              <line
                x1={marker.x + 10}
                y1={marker.y}
                x2={marker.x + 15}
                y2={marker.y}
                stroke="rgba(34, 211, 238, 0.8)"
                strokeWidth="1"
              />
              <line
                x1={marker.x}
                y1={marker.y - 15}
                x2={marker.x}
                y2={marker.y - 10}
                stroke="rgba(34, 211, 238, 0.8)"
                strokeWidth="1"
              />
              <line
                x1={marker.x}
                y1={marker.y + 10}
                x2={marker.x}
                y2={marker.y + 15}
                stroke="rgba(34, 211, 238, 0.8)"
                strokeWidth="1"
              />
            </g>
          ))}
        </svg>

        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          style={{ top: `${scanLine}%` }}
        />

        {/* Corner brackets */}
        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-500/60" />
        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-500/60" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-500/60" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-500/60" />
      </div>

      {/* Data readouts */}
      <div className="absolute -right-4 top-1/4 text-[10px] font-mono text-cyan-400/80 space-y-1">
        <div>SLICE: {String(activeSlice + 1).padStart(2, "0")}/12</div>
        <div>RES: 256x256</div>
        <div>T2W FLAIR</div>
      </div>

      <div className="absolute -left-4 bottom-1/4 text-[10px] font-mono text-emerald-400/80 space-y-1 text-right">
        <div>AI CONF: 94.2%</div>
        <div>PROC: ACTIVE</div>
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ANALYZING...
        </motion.div>
      </div>
    </div>
  );
}
