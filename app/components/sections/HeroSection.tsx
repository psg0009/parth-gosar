"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Linkedin, Mail, Activity, Brain, Microscope, Github } from "lucide-react";
import Button from "../ui/Button";
import { useRef } from "react";
import BrainMRI from "../visualizations/BrainMRI";
import DNAHelix from "../visualizations/DNAHelix";
import NeuralNetwork from "../visualizations/NeuralNetwork";
import EKGMonitor from "../visualizations/EKGMonitor";
import CellDivision from "../visualizations/CellDivision";
import FlowingBackground from "../visualizations/FlowingBackground";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-black"
    >
      {/* Flowing Background - connects visually with other sections */}
      <FlowingBackground />

      {/* Main content container */}
      <motion.div style={{ y, opacity }} className="relative z-10 w-full">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-20">
            {/* Left side - Text content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-left"
            >
              {/* Status badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-3 px-4 py-2 bg-cyber-card/50 border border-cyan-500/30 rounded-full mb-6 backdrop-blur-sm"
              >
                                <span className="text-xs text-white/50 font-mono">USC MS CS '27</span>
              </motion.div>

              {/* Main title */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-4 leading-[1.1]"
              >
                <span className="text-white">Building </span>
                <span className="relative inline-block">
                  {/* AI text with holographic effect */}
                  <span className="relative">
                    <motion.span
                      className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-primary bg-clip-text text-transparent relative inline-block"
                      animate={{
                        textShadow: [
                          "0 0 20px rgba(34,211,238,0.5), 0 0 40px rgba(34,211,238,0.3)",
                          "0 0 30px rgba(52,211,153,0.6), 0 0 60px rgba(52,211,153,0.4)",
                          "0 0 20px rgba(34,211,238,0.5), 0 0 40px rgba(34,211,238,0.3)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      AI
                    </motion.span>
                    {/* Holographic scan lines */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                          style={{ top: `${i * 12.5}%` }}
                          animate={{ opacity: [0.2, 0.8, 0.2], x: ["-100%", "100%"] }}
                          transition={{
                            duration: 1.5,
                            delay: i * 0.1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      ))}
                    </div>
                  </span>
                  {/* 3D Rotating Brain Hologram - repositioned to avoid overlap */}
                  <div className="absolute -left-12 -right-12 -top-10 -bottom-6 pointer-events-none hero-brain-hologram">
                    <motion.svg
                      viewBox="0 0 100 100"
                      className="w-full h-full preserve-3d"
                      animate={{ rotateY: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <defs>
                        <filter id="hologram-glow">
                          <feGaussianBlur stdDeviation="2" result="blur"/>
                          <feMerge>
                            <feMergeNode in="blur"/>
                            <feMergeNode in="blur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                        <linearGradient id="brainHoloGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6"/>
                          <stop offset="50%" stopColor="#34d399" stopOpacity="0.4"/>
                          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.6"/>
                        </linearGradient>
                      </defs>
                      {/* Brain outline layers - creating 3D depth */}
                      {[0, 1, 2].map((layer) => (
                        <motion.ellipse
                          key={layer}
                          cx="50"
                          cy="50"
                          rx={35 - layer * 5}
                          ry={40 - layer * 5}
                          fill="none"
                          stroke="url(#brainHoloGradient)"
                          strokeWidth={1 - layer * 0.2}
                          filter="url(#hologram-glow)"
                          opacity={0.6 - layer * 0.15}
                          animate={{
                            strokeDashoffset: [0, 100],
                          }}
                          style={{ strokeDasharray: "5 10" }}
                          transition={{
                            duration: 3,
                            delay: layer * 0.5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      ))}
                      {/* Neural pathways inside brain */}
                      {[
                        "M 35 40 Q 50 35 65 40",
                        "M 30 50 Q 50 45 70 50",
                        "M 35 60 Q 50 55 65 60",
                        "M 40 35 Q 45 50 40 65",
                        "M 60 35 Q 55 50 60 65",
                      ].map((path, i) => (
                        <motion.path
                          key={i}
                          d={path}
                          fill="none"
                          stroke="#22d3ee"
                          strokeWidth="0.5"
                          filter="url(#hologram-glow)"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{
                            pathLength: [0, 1, 1, 0],
                            opacity: [0, 0.8, 0.8, 0],
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.4,
                            repeat: Infinity,
                            repeatDelay: 1,
                          }}
                        />
                      ))}
                      {/* Synaptic nodes */}
                      {[
                        { cx: 35, cy: 40 }, { cx: 65, cy: 40 },
                        { cx: 30, cy: 50 }, { cx: 70, cy: 50 },
                        { cx: 35, cy: 60 }, { cx: 65, cy: 60 },
                        { cx: 50, cy: 35 }, { cx: 50, cy: 65 },
                      ].map((node, i) => (
                        <motion.circle
                          key={i}
                          cx={node.cx}
                          cy={node.cy}
                          r="2"
                          fill="#34d399"
                          filter="url(#hologram-glow)"
                          animate={{
                            r: [1.5, 3, 1.5],
                            opacity: [0.4, 1, 0.4],
                          }}
                          transition={{
                            duration: 1.5,
                            delay: i * 0.2,
                            repeat: Infinity,
                          }}
                        />
                      ))}
                    </motion.svg>
                  </div>
                  {/* Matrix-style data stream - repositioned to avoid overlap */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-12 overflow-hidden pointer-events-none opacity-40 hero-matrix-stream">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-[8px] font-mono text-cyan-400"
                        style={{ left: `${(i % 6) * 16}%` }}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{
                          y: [0, 80],
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.15,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        {["01", "10", "∑", "∫", "Δ", "λ", "π", "Ω", "μ", "σ", "α", "β"][i]}
                      </motion.div>
                    ))}
                  </div>
                  {/* Floating AI concepts - repositioned to avoid overlap */}
                  <div className="absolute -inset-8 pointer-events-none hero-ai-concepts">
                    {[
                      { text: "NEURAL NET", x: -10, y: 15 },
                      { text: "DEEP LEARNING", x: 80, y: 10 },
                      { text: "TRANSFORMER", x: -5, y: 85 },
                      { text: "CONV2D", x: 85, y: 80 },
                    ].map((item, i) => (
                      <motion.span
                        key={i}
                        className="absolute text-[8px] font-mono text-cyan-400/30 whitespace-nowrap"
                        style={{ left: `${item.x}%`, top: `${item.y}%` }}
                        animate={{
                          opacity: [0, 0.5, 0],
                          scale: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 4,
                          delay: i * 1,
                          repeat: Infinity,
                        }}
                      >
                        {item.text}
                      </motion.span>
                    ))}
                  </div>
                </span>
                <br />
                <span className="text-white">for </span>
                <span className="relative inline-block">
                  {/* Healthcare text with life pulse effect */}
                  <motion.span
                    className="bg-gradient-to-r from-pink-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent relative hero-bg-size-200"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  >
                    Healthcare
                  </motion.span>
                  {/* Ultimate DNA → Data → Heartbeat Transformation - moved further down */}
                  <motion.svg
                    className="absolute -bottom-4 left-0 w-full h-10 pointer-events-none hero-dna-svg"
                    viewBox="0 0 400 50"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="ultimateGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f472b6">
                          <animate attributeName="stop-color" values="#f472b6;#a855f7;#f472b6" dur="3s" repeatCount="indefinite"/>
                        </stop>
                        <stop offset="25%" stopColor="#a855f7">
                          <animate attributeName="stop-color" values="#a855f7;#8b5cf6;#a855f7" dur="3s" repeatCount="indefinite"/>
                        </stop>
                        <stop offset="50%" stopColor="#22d3ee">
                          <animate attributeName="stop-color" values="#22d3ee;#06b6d4;#22d3ee" dur="3s" repeatCount="indefinite"/>
                        </stop>
                        <stop offset="75%" stopColor="#34d399">
                          <animate attributeName="stop-color" values="#34d399;#10b981;#34d399" dur="3s" repeatCount="indefinite"/>
                        </stop>
                        <stop offset="100%" stopColor="#10b981">
                          <animate attributeName="stop-color" values="#10b981;#059669;#10b981" dur="3s" repeatCount="indefinite"/>
                        </stop>
                      </linearGradient>
                      <filter id="ultimate-glow">
                        <feGaussianBlur stdDeviation="3" result="blur"/>
                        <feMerge>
                          <feMergeNode in="blur"/>
                          <feMergeNode in="blur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                      <filter id="pulse-glow">
                        <feGaussianBlur stdDeviation="4" result="blur"/>
                        <feMerge>
                          <feMergeNode in="blur"/>
                          <feMergeNode in="blur"/>
                          <feMergeNode in="blur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    {/* Complete journey: DNA Helix → Binary Stream → ECG Heartbeat */}
                    {/* DNA Double Helix (0-100) */}
                    <motion.path
                      d="M 0 25 Q 12 10 25 25 Q 38 40 50 25 Q 62 10 75 25 Q 88 40 100 25"
                      fill="none"
                      stroke="#f472b6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      filter="url(#ultimate-glow)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.3 }}
                    />
                    <motion.path
                      d="M 0 25 Q 12 40 25 25 Q 38 10 50 25 Q 62 40 75 25 Q 88 10 100 25"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="6 4"
                      filter="url(#ultimate-glow)"
                      opacity="0.7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                    {/* DNA base pairs with nucleotide labels */}
                    {[12, 37, 62, 87].map((x, i) => (
                      <g key={`bp-${i}`}>
                        <motion.line
                          x1={x}
                          y1="15"
                          x2={x}
                          y2="35"
                          stroke={["#22d3ee", "#f472b6", "#34d399", "#a855f7"][i]}
                          strokeWidth="2"
                          strokeLinecap="round"
                          initial={{ opacity: 0, scaleY: 0 }}
                          animate={{ opacity: [0, 1, 1, 0.5], scaleY: 1 }}
                          transition={{ duration: 0.5, delay: 1 + i * 0.2 }}
                        />
                        <motion.text
                          x={x}
                          y="45"
                          fill={["#22d3ee", "#f472b6", "#34d399", "#a855f7"][i]}
                          fontSize="6"
                          fontFamily="monospace"
                          textAnchor="middle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 3, delay: 1.5 + i * 0.3, repeat: Infinity, repeatDelay: 2 }}
                        >
                          {["A", "T", "G", "C"][i]}
                        </motion.text>
                      </g>
                    ))}
                    {/* Binary transition zone (100-150) */}
                    <motion.path
                      d="M 100 25 C 110 25 115 20 125 25 C 135 30 140 25 150 25"
                      fill="none"
                      stroke="url(#ultimateGradient)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      filter="url(#ultimate-glow)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 1.5 }}
                    />
                    {/* Binary digits in transition zone */}
                    {[105, 115, 125, 135, 145].map((x, i) => (
                      <motion.text
                        key={`bin-${i}`}
                        x={x}
                        y={i % 2 === 0 ? 15 : 40}
                        fill="#8b5cf6"
                        fontSize="7"
                        fontFamily="monospace"
                        initial={{ opacity: 0, y: i % 2 === 0 ? 25 : 25 }}
                        animate={{
                          opacity: [0, 0.8, 0],
                          y: i % 2 === 0 ? [25, 12, 0] : [25, 38, 50],
                        }}
                        transition={{
                          duration: 2,
                          delay: 2 + i * 0.2,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      >
                        {i % 2 === 0 ? "1" : "0"}
                      </motion.text>
                    ))}
                    {/* ECG Heartbeat (150-400) - Multiple beats */}
                    <motion.path
                      d="M 150 25 L 175 25 L 180 25 L 185 8 L 192 42 L 198 18 L 204 32 L 210 25
                         L 240 25 L 245 25 L 250 8 L 257 42 L 263 18 L 269 32 L 275 25
                         L 305 25 L 310 25 L 315 8 L 322 42 L 328 18 L 334 32 L 340 25
                         L 370 25 L 375 25 L 380 8 L 387 42 L 393 18 L 399 32 L 400 25"
                      fill="none"
                      stroke="url(#ultimateGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#ultimate-glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 2.5, delay: 2, ease: "easeOut" }}
                    />
                    {/* Life energy pulse - traveling orb */}
                    <motion.circle
                      cx="0"
                      cy="25"
                      r="6"
                      fill="#fff"
                      filter="url(#pulse-glow)"
                      animate={{
                        cx: [0, 400],
                        cy: [25, 10, 40, 25, 40, 10, 25, 25, 25, 8, 42, 18, 32, 25, 25, 8, 42, 18, 32, 25, 25, 8, 42, 18, 32, 25, 25, 8, 42, 18, 32, 25],
                        r: [5, 6, 5, 6, 5, 6, 5, 8, 6, 8, 6, 8, 6, 8, 6, 8, 6, 8, 6, 8, 6, 8, 6, 8, 6, 8, 6, 8, 6, 8, 6, 5],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    {/* Trailing particle 1 - cyan */}
                    <motion.circle
                      cx="0"
                      cy="25"
                      r="4"
                      fill="#22d3ee"
                      opacity="0.7"
                      filter="url(#ultimate-glow)"
                      animate={{
                        cx: [-15, 385],
                        cy: [25, 10, 40, 25, 40, 10, 25, 25, 25, 8, 42, 18, 32, 25, 25, 8, 42, 18, 32, 25, 25, 8, 42, 18, 32, 25, 25, 8, 42, 18, 32, 25],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    {/* Trailing particle 2 - emerald */}
                    <motion.circle
                      cx="0"
                      cy="25"
                      r="3"
                      fill="#34d399"
                      opacity="0.5"
                      filter="url(#ultimate-glow)"
                      animate={{
                        cx: [-28, 372],
                        cy: [25, 10, 40, 25, 40, 10, 25, 25, 25, 8, 42, 18, 32, 25, 25, 8, 42, 18, 32, 25, 25, 8, 42, 18, 32, 25, 25, 8, 42, 18, 32, 25],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    {/* Trailing particle 3 - pink */}
                    <motion.circle
                      cx="0"
                      cy="25"
                      r="2"
                      fill="#f472b6"
                      opacity="0.4"
                      filter="url(#ultimate-glow)"
                      animate={{
                        cx: [-40, 360],
                        cy: [25, 10, 40, 25, 40, 10, 25, 25, 25, 8, 42, 18, 32, 25, 25, 8, 42, 18, 32, 25, 25, 8, 42, 18, 32, 25, 25, 8, 42, 18, 32, 25],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    {/* Heartbeat sound wave rings at each peak */}
                    {[192, 257, 322, 387].map((x, i) => (
                      <motion.circle
                        key={`wave-${i}`}
                        cx={x}
                        cy="25"
                        r="5"
                        fill="none"
                        stroke="#f472b6"
                        strokeWidth="1"
                        initial={{ r: 5, opacity: 0 }}
                        animate={{
                          r: [5, 20, 35],
                          opacity: [0, 0.6, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: 4 + i * 1,
                          repeat: Infinity,
                          repeatDelay: 2.5,
                        }}
                      />
                    ))}
                  </motion.svg>
                  {/* Beating 3D Heart - repositioned to avoid overlap */}
                  <motion.div
                    className="absolute -right-8 top-0 pointer-events-none hero-heart-container"
                  >
                    <motion.svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      animate={{
                        scale: [1, 1.25, 1.1, 1.3, 1],
                        rotateY: [0, 10, -10, 5, 0],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        times: [0, 0.2, 0.35, 0.5, 1],
                      }}
                    >
                      <defs>
                        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f472b6"/>
                          <stop offset="100%" stopColor="#ec4899"/>
                        </linearGradient>
                        <filter id="heart-glow">
                          <feGaussianBlur stdDeviation="2" result="blur"/>
                          <feMerge>
                            <feMergeNode in="blur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      <motion.path
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                        fill="url(#heartGradient)"
                        stroke="#fff"
                        strokeWidth="0.5"
                        filter="url(#heart-glow)"
                      />
                    </motion.svg>
                    {/* Heart pulse rings */}
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full border-2 border-pink-400"
                        animate={{
                          scale: [1, 2.5],
                          opacity: [0.6, 0],
                        }}
                        transition={{
                          duration: 1.2,
                          delay: i * 0.4,
                          repeat: Infinity,
                        }}
                      />
                    ))}
                  </motion.div>
                  {/* Floating medical/bio symbols - repositioned to avoid overlap */}
                  <div className="absolute -inset-4 pointer-events-none hero-medical-symbols">
                    {[
                      { symbol: "❤️", x: 92, y: 10 },
                      { symbol: "🧬", x: 5, y: 40 },
                      { symbol: "💊", x: 90, y: 60 },
                      { symbol: "🔬", x: 8, y: 70 },
                    ].map((item, i) => (
                      <motion.span
                        key={i}
                        className="absolute text-sm"
                        style={{ left: `${item.x}%`, top: `${item.y}%` }}
                        animate={{
                          opacity: [0, 0.6, 0],
                          scale: [0.5, 1, 0.5],
                          y: [0, -15, 0],
                        }}
                        transition={{
                          duration: 4,
                          delay: i * 1.2,
                          repeat: Infinity,
                        }}
                      >
                        {item.symbol}
                      </motion.span>
                    ))}
                  </div>
                </span>
                <br />
                <span className="text-white/80 text-3xl md:text-4xl lg:text-5xl mt-6 inline-block">Innovation</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-white/60 mb-6 max-w-xl leading-relaxed"
              >
                Biomedical AI researcher developing deep learning systems for{" "}
                <span className="text-cyan-400">MRI acceleration</span> and{" "}
                <span className="text-emerald-400">clinical diagnostics</span>. Currently at USC's Fan MRI Lab.
              </motion.p>

              {/* Stats row */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-6 mb-8"
              >
                {[
                  { value: "2", label: "Research Labs", icon: Microscope },
                  { value: "12%", label: "Accuracy Gain", icon: Brain },
                  { value: "15%", label: "Processing Speedup", icon: Activity },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <stat.icon size={18} className="text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-white font-mono">{stat.value}</div>
                      <div className="text-xs text-white/40">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4 mb-8"
              >
                <Button
                  variant="glow"
                  size="lg"
                  onClick={() => scrollToSection("research")}
                  icon={<Brain size={20} />}
                >
                  View Research
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="border-white/20 text-white hover:border-cyan-500/50 hover:text-cyan-400"
                >
                  Get in Touch
                </Button>
              </motion.div>

              {/* Social links */}
              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <span className="text-xs text-white/30 font-mono">CONNECT</span>
                <div className="flex items-center gap-2">
                  {[
                    { href: "https://github.com/psg0009", icon: Github },
                    { href: "https://www.linkedin.com/in/parth-gosar-04042b1b1", icon: Linkedin },
                    { href: "mailto:gosar@usc.edu", icon: Mail },
                  ].map((link) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-cyber-card/50 border border-cyber-border flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <link.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right side - Visualizations */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative hidden lg:block"
            >
              {/* Main MRI visualization with DNA on left side */}
              <div className="flex items-center gap-4 mb-6 mt-16">
                {/* DNA Helix - on the left */}
                <div className="flex-shrink-0">
                  <DNAHelix height={280} />
                </div>

                {/* Brain MRI */}
                <div className="relative">
                  <BrainMRI size={300} />

                  {/* Cell Division (Neural Processor) - top right of MRI */}
                  <div className="absolute top-0 -right-6">
                    <CellDivision size={90} />
                  </div>
                </div>
              </div>

              {/* Neural Network */}
              <div className="mb-4">
                <NeuralNetwork className="opacity-90" />
              </div>

              {/* EKG Monitor */}
              <div className="max-w-sm mx-auto">
                <EKGMonitor label="MODEL INFERENCE" color="#22d3ee" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center gap-2 text-white/30 hover:text-cyan-400 transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-[10px] font-mono tracking-widest">SCROLL TO EXPLORE</span>
          <ArrowDown size={16} />
        </motion.button>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-20 left-6 w-20 h-20 border-l border-t border-cyan-500/10" />
      <div className="absolute top-20 right-6 w-20 h-20 border-r border-t border-cyan-500/10" />
      <div className="absolute bottom-20 left-6 w-20 h-20 border-l border-b border-cyan-500/10" />
      <div className="absolute bottom-20 right-6 w-20 h-20 border-r border-b border-cyan-500/10" />

      {/* Tech stack ticker */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-cyber-border/30 bg-cyber-black/50 backdrop-blur-sm">
        <div className="overflow-hidden py-3">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[
              "PyTorch", "TensorFlow", "MONAI", "VarNet", "U-Net", "Python",
              "React", "Next.js", "fastMRI", "DICOM", "Genomics", "Bioconductor",
              "PyTorch", "TensorFlow", "MONAI", "VarNet", "U-Net", "Python",
              "React", "Next.js", "fastMRI", "DICOM", "Genomics", "Bioconductor",
            ].map((tech, i) => (
              <span
                key={i}
                className="text-xs font-mono text-white/30 flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-cyan-500/50" />
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
