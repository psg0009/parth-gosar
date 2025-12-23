"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PreloaderProps {
  onComplete?: () => void;
}

// DNA Helix Animation Component
function DNAHelixLoader() {
  const basePairs = 8;
  return (
    <div className="absolute left-8 top-1/2 -translate-y-1/2 h-[300px] w-16 hidden md:block">
      {[...Array(basePairs)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full flex justify-between items-center"
          style={{ top: `${(i / basePairs) * 100}%` }}
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 4,
            delay: i * 0.15,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            className="w-3 h-3 rounded-full bg-cyan-400"
            style={{ boxShadow: "0 0 10px #22d3ee, 0 0 20px #22d3ee40" }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
          />
          <div className="flex-1 h-[2px] mx-1 bg-gradient-to-r from-cyan-400/60 via-white/30 to-emerald-400/60" />
          <motion.div
            className="w-3 h-3 rounded-full bg-emerald-400"
            style={{ boxShadow: "0 0 10px #10b981, 0 0 20px #10b98140" }}
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// Neural Network Animation
function NeuralNetworkLoader() {
  const nodes = [
    { x: 85, y: 20 }, { x: 92, y: 35 }, { x: 88, y: 50 },
    { x: 95, y: 65 }, { x: 87, y: 80 },
  ];

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-20 h-[300px] hidden md:block">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Connection lines */}
        {nodes.map((node, i) =>
          nodes.slice(i + 1).map((target, j) => (
            <motion.line
              key={`${i}-${j}`}
              x1={node.x}
              y1={node.y}
              x2={target.x}
              y2={target.y}
              stroke="url(#neuralGrad)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
            />
          ))
        )}
        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r="3"
            fill={i % 2 === 0 ? "#22d3ee" : "#a855f7"}
            animate={{
              r: [3, 4, 3],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
            style={{ filter: "drop-shadow(0 0 5px currentColor)" }}
          />
        ))}
        {/* Traveling pulse */}
        {nodes.slice(0, -1).map((node, i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="2"
            fill="#22d3ee"
            initial={{ cx: node.x, cy: node.y, opacity: 0 }}
            animate={{
              cx: [node.x, nodes[i + 1].x],
              cy: [node.y, nodes[i + 1].y],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 1, delay: i * 0.5, repeat: Infinity, repeatDelay: 1 }}
          />
        ))}
        <defs>
          <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// EKG/Heartbeat Line
function EKGLine() {
  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-80 h-12 overflow-hidden opacity-40">
      <motion.svg
        className="w-[200%] h-full"
        viewBox="0 0 400 50"
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <motion.path
          d="M0,25 L30,25 L35,25 L40,10 L45,40 L50,5 L55,45 L60,25 L65,25 L100,25 L130,25 L135,25 L140,10 L145,40 L150,5 L155,45 L160,25 L165,25 L200,25 L230,25 L235,25 L240,10 L245,40 L250,5 L255,45 L260,25 L265,25 L300,25 L330,25 L335,25 L340,10 L345,40 L350,5 L355,45 L360,25 L365,25 L400,25"
          fill="none"
          stroke="url(#ekgGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="ekgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}

// Binary/Data Stream
function DataStream({ side }: { side: "left" | "right" }) {
  const chars = ["0", "1", "A", "T", "G", "C"]; // DNA bases + binary
  return (
    <div className={`absolute ${side === "left" ? "left-20" : "right-20"} top-0 h-full w-8 overflow-hidden opacity-20 hidden lg:block`}>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xs font-mono text-cyan-400"
          style={{ left: `${Math.random() * 100}%` }}
          initial={{ top: "-5%", opacity: 0 }}
          animate={{ top: "105%", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {chars[Math.floor(Math.random() * chars.length)]}
        </motion.div>
      ))}
    </div>
  );
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("INITIALIZING");

  const statuses = [
    { threshold: 0, text: "INITIALIZING NEURAL NETWORKS" },
    { threshold: 15, text: "LOADING GENOMIC DATA" },
    { threshold: 30, text: "TRAINING AI MODELS" },
    { threshold: 45, text: "PROCESSING MRI SEQUENCES" },
    { threshold: 60, text: "ANALYZING BIOMARKERS" },
    { threshold: 75, text: "OPTIMIZING PARAMETERS" },
    { threshold: 90, text: "FINALIZING DIAGNOSTICS" },
    { threshold: 100, text: "SYSTEM READY" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            onComplete?.();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const status = statuses.reduce((acc, curr) => {
      if (progress >= curr.threshold) return curr.text;
      return acc;
    }, "INITIALIZING SYSTEMS");
    setCurrentStatus(status);
  }, [progress]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Full-page Background Image */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <Image
                src="/images/spotlight/author_image.jpg"
                alt="Background"
                fill
                className="object-cover object-[50%_20%]"
                priority
              />
            </motion.div>
            {/* Gradient overlays for depth and readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 via-transparent to-emerald-900/30" />
            {/* Animated vignette */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.7) 100%)",
              }}
              animate={{ opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Cyber grid overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
              }}
            />
            {/* Animated scan lines */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
              }}
            />
          </div>

          {/* Glowing accent spots */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[150px]"
            animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[150px]"
            animate={{ opacity: [0.3, 0.5, 0.3], scale: [1.1, 1, 1.1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Scan Line Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              initial={{ top: "-10%" }}
              animate={{ top: "110%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* Floating DNA Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  left: `${10 + (i % 6) * 15}%`,
                  background: i % 2 === 0 ? "#22d3ee" : "#10b981",
                  boxShadow: i % 2 === 0 ? "0 0 10px #22d3ee" : "0 0 10px #10b981",
                }}
                initial={{ top: "100%", opacity: 0 }}
                animate={{
                  top: "-10%",
                  opacity: [0, 0.8, 0],
                  x: [0, Math.sin(i) * 30, 0],
                }}
                transition={{
                  duration: 4 + i * 0.3,
                  delay: i * 0.4,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Pulsing Ring Effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="absolute w-64 h-64 rounded-full border border-cyan-400/20"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.div
              className="absolute w-48 h-48 rounded-full border border-emerald-400/20"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.2, 0, 0.2],
              }}
              transition={{
                duration: 3,
                delay: 0.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Profile Photo */}
            <motion.div
              className="relative mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Animated ring */}
              <motion.div
                className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 opacity-80"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              {/* Pulsing glow */}
              <motion.div
                className="absolute -inset-4 rounded-full bg-cyan-400/20 blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Image container */}
              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-cyber-black">
                <Image
                  src="/images/spotlight/author_image.jpg"
                  alt="Parth Gosar"
                  fill
                  className="object-cover object-[52%_18%] scale-[1.3]"
                  priority
                />
              </div>
              {/* Status dot */}
              <motion.span
                className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-cyber-black"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Logo/Name */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-display font-bold tracking-wider text-center">
                <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                  PARTH
                </span>
                <span className="text-white/80"> // </span>
                <span className="text-white">GOSAR</span>
              </h1>
              <p className="text-center text-white/50 text-sm mt-2 font-mono">
                Biomedical AI Researcher
              </p>
            </motion.div>

            {/* Status Text */}
            <motion.div
              className="font-mono text-sm text-cyan-400/80 mb-6 tracking-widest"
              key={currentStatus}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              [{currentStatus}]
            </motion.div>

            {/* Progress Bar */}
            <div className="w-64 md:w-80">
              <div className="h-1 bg-cyber-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                />
              </div>

              {/* Percentage Markers */}
              <div className="flex justify-between mt-3 text-xs font-mono text-white/40">
                {[0, 25, 50, 75, 100].map((mark) => (
                  <span
                    key={mark}
                    className={progress >= mark ? "text-cyan-400" : ""}
                  >
                    {mark}%
                  </span>
                ))}
              </div>
            </div>

            {/* Current Percentage */}
            <motion.div
              className="mt-6 text-3xl font-mono font-bold text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.div>

          </div>

          {/* Corner Decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-500/30" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cyan-500/30" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-cyan-500/30" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-500/30" />

          {/* Novel UI Elements */}
          <DNAHelixLoader />
          <NeuralNetworkLoader />
          <EKGLine />
          <DataStream side="left" />
          <DataStream side="right" />

          {/* Circular Progress Ring around profile */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginTop: "-80px" }}>
            <svg className="w-44 h-44 md:w-52 md:h-52" viewBox="0 0 100 100">
              {/* Background ring */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(34, 211, 238, 0.1)"
                strokeWidth="2"
              />
              {/* Progress ring */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#progressGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
                transform="rotate(-90 50 50)"
                style={{ filter: "drop-shadow(0 0 6px #22d3ee)" }}
              />
              {/* Glowing dot at progress end */}
              <motion.circle
                cx="50"
                cy="5"
                r="3"
                fill="#22d3ee"
                style={{
                  filter: "drop-shadow(0 0 8px #22d3ee)",
                  transformOrigin: "50px 50px",
                }}
                animate={{ rotate: progress * 3.6 }}
                transition={{ duration: 0.1 }}
              />
              <defs>
                <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Floating Tech Tags */}
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-3 opacity-60">
            {["PyTorch", "MRI", "Genomics", "AI"].map((tag, i) => (
              <motion.span
                key={tag}
                className="px-3 py-1 text-xs font-mono rounded-full border border-cyan-500/30 text-cyan-400/70 bg-cyan-500/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
