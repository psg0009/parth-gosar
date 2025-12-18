"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("INITIALIZING");

  const statuses = [
    { threshold: 0, text: "INITIALIZING SYSTEMS" },
    { threshold: 20, text: "LOADING AI MODELS" },
    { threshold: 40, text: "PROCESSING DATA" },
    { threshold: 60, text: "ANALYZING PATTERNS" },
    { threshold: 80, text: "CALIBRATING OUTPUT" },
    { threshold: 100, text: "READY" },
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
          {/* Background Grid */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Medical-themed Gradient */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[150px]" />

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

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo/Name */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-wider">
                <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                  PARTH
                </span>
                <span className="text-white/80">//</span>
                <span className="text-white">GOSAR</span>
              </h1>
              <p className="text-center text-white/50 text-sm mt-2 font-mono">
                Medical AI Researcher
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
