"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useIntersection } from "@/app/hooks/useIntersection";
import { useRef, useState } from "react";
import Card from "../ui/Card";
import { Brain, Microscope, Award, Rocket, GraduationCap, FlaskConical, Heart, Building, Users } from "lucide-react";
import DNAHelix from "../visualizations/DNAHelix";
import CellDivision from "../visualizations/CellDivision";
import NeuralActivityBar from "../visualizations/NeuralActivityBar";
import FlowingBackground from "../visualizations/FlowingBackground";

const highlights = [
  {
    title: "MRI Research",
    description: "Deep learning for accelerated imaging at USC",
    color: "cyan",
    icon: Brain,
    status: "Active Research",
  },
  {
    title: "Cancer Research",
    description: "Epigenetics & therapy response prediction",
    color: "pink",
    icon: FlaskConical,
    status: "Ongoing Study",
  },
  {
    title: "Oswald Award",
    description: "Penn State's top leadership honor",
    color: "amber",
    icon: Award,
    status: "Verified",
  },
  {
    title: "Borough Council",
    description: "Citizens Oversight Board Member, State College",
    color: "emerald",
    icon: Building,
    status: "Appointed",
  },
  {
    title: "Startup Founder",
    description: "Built AI health insurance platform",
    color: "purple",
    icon: Rocket,
    status: "Founded",
  },
  {
    title: "ISC President",
    description: "Led 3,000+ international students at Penn State",
    color: "blue",
    icon: Users,
    status: "60th President",
  },
];

const stats = [
  { label: "Research Labs", value: "2", icon: Microscope },
  { label: "Students Mentored", value: "3K+", icon: GraduationCap },
  { label: "Projects", value: "10+", icon: FlaskConical },
  { label: "Awards", value: "5", icon: Award },
];

// Keyword colors for emphasis
const keywordColors: Record<string, string> = {
  "Fan MRI Lab": "#22d3ee",
  "Epigenetics & Cancer Therapy Lab": "#f472b6",
  "multi-modal cancer prediction framework": "#34d399",
  "INSURESPECTRE": "#a855f7",
  "John W. Oswald Award": "#fbbf24",
  "State College Borough Council": "#f472b6",
  "interpretable and trustworthy": "#fbbf24",
};

// Interactive keyword component - enlarges on click
function InteractiveKeyword({
  keyword,
  children,
  activeKeyword,
  onToggle
}: {
  keyword: string;
  children: React.ReactNode;
  activeKeyword: string | null;
  onToggle: (keyword: string | null) => void;
}) {
  const color = keywordColors[keyword] || "#22d3ee";
  const isActive = activeKeyword === keyword;

  return (
    <motion.span
      className="relative cursor-pointer font-semibold inline-block"
      style={{ color }}
      onClick={() => onToggle(isActive ? null : keyword)}
      animate={isActive ? {
        scale: 1.15,
        textShadow: `0 0 20px ${color}, 0 0 40px ${color}80`,
      } : {
        scale: 1,
        textShadow: `0 0 0px transparent`,
      }}
      whileHover={!isActive ? {
        scale: 1.05,
        textShadow: `0 0 10px ${color}60`,
      } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
      {/* Underline glow effect when active */}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-[2px] w-full rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isActive ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      {/* Pulse ring when active */}
      {isActive && (
        <motion.span
          className="absolute inset-0 rounded-md pointer-events-none"
          style={{
            border: `1px solid ${color}`,
            boxShadow: `0 0 15px ${color}40`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.5, 0.2, 0.5], scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.span>
  );
}

// Scanning line effect
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent"
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  );
}

export default function AboutSection() {
  const { ref, isVisible } = useIntersection<HTMLElement>({ threshold: 0.1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeKeyword, setActiveKeyword] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const decorY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const toggleKeyword = (keyword: string | null) => setActiveKeyword(keyword);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="about" ref={ref} className="section relative overflow-hidden">
      {/* Flowing Background - continues from Hero */}
      <FlowingBackground />

      {/* Subtle scan line for continuity */}
      <ScanLine />

      {/* DNA Helix Decoration - Right */}
      <motion.div
        style={{ y: decorY }}
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 hidden xl:block"
      >
        <DNAHelix height={350} />
      </motion.div>

      {/* Cell Division - Bottom Left */}
      <div className="absolute left-8 bottom-20 opacity-15 hidden xl:block">
        <CellDivision size={120} />
      </div>

      <div ref={containerRef} className="relative container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-mono mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-cyan-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              PROFILE
            </motion.span>
            <h2 className="section-title">
              Transforming <span className="text-cyan-400">Healthcare</span> with AI
            </h2>
            <p className="section-subtitle mx-auto">
              Bridging the gap between cutting-edge AI research and real-world medical applications
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left: About Text - 7 columns */}
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <Card variant="glass" padding="lg" className="relative overflow-hidden backdrop-blur-xl border-cyan-500/20">
                {/* Decorative Corner Gradients */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-cyan-500/10 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent" />

                {/* Medical Cross Pattern */}
                <div className="absolute top-4 right-4 opacity-20">
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <rect x="16" y="4" width="8" height="32" fill="#22d3ee" rx="2" />
                    <rect x="4" y="16" width="32" height="8" fill="#22d3ee" rx="2" />
                  </svg>
                </div>

                <div className="relative space-y-5 text-white/80 leading-relaxed">
                  {/* Hint for interactive keywords */}
                  <motion.div
                    className="flex items-center gap-2 text-xs text-cyan-400/60 mb-2"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ delay: 0.15 }}
                  >
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="font-mono">Click highlighted terms to emphasize</span>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-cyan-400 font-semibold">Computer Science graduate student</span> at
                    USC, specializing in Artificial Intelligence with a focus on <span className="text-cyan-400">medical imaging</span> and
                    <span className="text-emerald-400"> healthcare AI</span>. Focused on developing
                    interpretable AI systems that assist clinicians in diagnosis and treatment decisions.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 }}
                  >
                    Currently conducting research at two USC labs: the{" "}
                    <InteractiveKeyword keyword="Fan MRI Lab" activeKeyword={activeKeyword} onToggle={toggleKeyword}>
                      Fan MRI Lab
                    </InteractiveKeyword>{" "}
                    developing deep learning models for accelerated MRI reconstruction, and the{" "}
                    <InteractiveKeyword keyword="Epigenetics & Cancer Therapy Lab" activeKeyword={activeKeyword} onToggle={toggleKeyword}>
                      Epigenetics & Cancer Therapy Lab
                    </InteractiveKeyword>{" "}
                    working on computational methods for biomarker discovery.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 }}
                  >
                    Recent work includes building a{" "}
                    <InteractiveKeyword keyword="multi-modal cancer prediction framework" activeKeyword={activeKeyword} onToggle={toggleKeyword}>
                      multi-modal cancer prediction framework
                    </InteractiveKeyword>{" "}
                    that fuses histopathology images, lab results, and genomic data - achieving a 12% improvement in
                    prediction accuracy. Passionate about creating AI that's not just accurate, but{" "}
                    <InteractiveKeyword keyword="interpretable and trustworthy" activeKeyword={activeKeyword} onToggle={toggleKeyword}>
                      interpretable and trustworthy
                    </InteractiveKeyword>{" "}
                    for clinical use.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 }}
                  >
                    Beyond research, founded{" "}
                    <InteractiveKeyword keyword="INSURESPECTRE" activeKeyword={activeKeyword} onToggle={toggleKeyword}>
                      INSURESPECTRE
                    </InteractiveKeyword>
                    , an AI-powered health insurance platform for students. As president of
                    Penn State's International Student Council, championed initiatives benefiting 3,000+ students and received the
                    prestigious{" "}
                    <InteractiveKeyword keyword="John W. Oswald Award" activeKeyword={activeKeyword} onToggle={toggleKeyword}>
                      John W. Oswald Award
                    </InteractiveKeyword>
                    . Also served on the{" "}
                    <InteractiveKeyword keyword="State College Borough Council" activeKeyword={activeKeyword} onToggle={toggleKeyword}>
                      State College Borough Council
                    </InteractiveKeyword>
                    , contributing to local governance and community development.
                  </motion.p>
                </div>

                {/* Stats Row with Icons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-cyan-500/20">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        className="text-center group"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                          <Icon size={18} className="text-cyan-400" />
                        </div>
                        <div className="text-2xl font-bold text-cyan-400 font-mono">{stat.value}</div>
                        <div className="text-xs text-white/50">{stat.label}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>

              {/* Visual Element - Animated Medical Scan - moved here to fill space */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="mt-4"
              >
                <Card variant="glass" padding="md" className="border-cyan-500/20 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5" />

                  {/* Animated scan visualization */}
                  <div className="relative h-32">
                    <svg viewBox="0 0 200 80" className="w-full h-full">
                      <defs>
                        <linearGradient id="scanGradientLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                          <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
                          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Grid lines */}
                      {Array.from({ length: 10 }, (_, i) => (
                        <line
                          key={`hl-${i}`}
                          x1="0"
                          y1={i * 8}
                          x2="200"
                          y2={i * 8}
                          stroke="rgba(34, 211, 238, 0.1)"
                          strokeWidth="0.5"
                        />
                      ))}
                      {Array.from({ length: 20 }, (_, i) => (
                        <line
                          key={`vl-${i}`}
                          x1={i * 10}
                          y1="0"
                          x2={i * 10}
                          y2="80"
                          stroke="rgba(34, 211, 238, 0.1)"
                          strokeWidth="0.5"
                        />
                      ))}

                      {/* Waveform */}
                      <motion.path
                        d="M 0 40 Q 20 40 30 20 T 60 40 T 90 50 T 120 30 T 150 40 T 180 35 T 200 40"
                        fill="none"
                        stroke="url(#scanGradientLeft)"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />

                      {/* Moving scan line */}
                      <motion.line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="80"
                        stroke="#22d3ee"
                        strokeWidth="2"
                        animate={{ x1: [0, 200], x2: [0, 200] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        opacity="0.5"
                      />
                    </svg>

                    {/* Data readout */}
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] font-mono text-cyan-400/60">
                      <span>MEDICAL AI RESEARCH</span>
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        ACTIVE
                      </motion.span>
                    </div>
                  </div>
                </Card>
              </motion.div>

            </motion.div>

            {/* Right: Highlight Cards - 5 columns */}
            <motion.div variants={itemVariants} className="lg:col-span-5 space-y-4">
              {/* Highlight Cards Grid - Hexagonal/Holographic Design */}
              <div className="grid grid-cols-2 gap-5">
                {highlights.map((highlight, index) => {
                  const Icon = highlight.icon;
                  const colorConfig = {
                    cyan: { primary: "#22d3ee", secondary: "#06b6d4", glow: "rgba(34, 211, 238, 0.4)" },
                    pink: { primary: "#f472b6", secondary: "#ec4899", glow: "rgba(244, 114, 182, 0.4)" },
                    amber: { primary: "#fbbf24", secondary: "#f59e0b", glow: "rgba(251, 191, 36, 0.4)" },
                    emerald: { primary: "#34d399", secondary: "#10b981", glow: "rgba(52, 211, 153, 0.4)" },
                    purple: { primary: "#a855f7", secondary: "#9333ea", glow: "rgba(168, 85, 247, 0.4)" },
                    blue: { primary: "#3b82f6", secondary: "#2563eb", glow: "rgba(59, 130, 246, 0.4)" },
                  };
                  const config = colorConfig[highlight.color as keyof typeof colorConfig];

                  return (
                    <motion.div
                      key={highlight.title}
                      initial={{ opacity: 0, y: 30, rotateX: -15 }}
                      animate={isVisible ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.12, type: "spring", stiffness: 100 }}
                      whileHover={{ y: -8, scale: 1.03, rotateY: 5 }}
                      className="group perspective-1000"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div
                        className="relative p-5 rounded-2xl overflow-hidden backdrop-blur-xl"
                        style={{
                          background: `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)`,
                          border: `1px solid ${config.primary}30`,
                          boxShadow: `0 0 30px ${config.glow}, inset 0 1px 0 ${config.primary}20`,
                        }}
                      >
                        {/* Animated corner accents */}
                        <div className="absolute top-0 left-0 w-8 h-8">
                          <motion.div
                            className="absolute top-0 left-0 w-full h-[2px]"
                            style={{ background: `linear-gradient(90deg, ${config.primary}, transparent)` }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <motion.div
                            className="absolute top-0 left-0 h-full w-[2px]"
                            style={{ background: `linear-gradient(180deg, ${config.primary}, transparent)` }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          />
                        </div>
                        <div className="absolute top-0 right-0 w-8 h-8">
                          <motion.div
                            className="absolute top-0 right-0 w-full h-[2px]"
                            style={{ background: `linear-gradient(-90deg, ${config.primary}, transparent)` }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.25 }}
                          />
                          <motion.div
                            className="absolute top-0 right-0 h-full w-[2px]"
                            style={{ background: `linear-gradient(180deg, ${config.primary}, transparent)` }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.75 }}
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 w-8 h-8">
                          <motion.div
                            className="absolute bottom-0 left-0 w-full h-[2px]"
                            style={{ background: `linear-gradient(90deg, ${config.primary}, transparent)` }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                          />
                          <motion.div
                            className="absolute bottom-0 left-0 h-full w-[2px]"
                            style={{ background: `linear-gradient(0deg, ${config.primary}, transparent)` }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1.25 }}
                          />
                        </div>
                        <div className="absolute bottom-0 right-0 w-8 h-8">
                          <motion.div
                            className="absolute bottom-0 right-0 w-full h-[2px]"
                            style={{ background: `linear-gradient(-90deg, ${config.primary}, transparent)` }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                          />
                          <motion.div
                            className="absolute bottom-0 right-0 h-full w-[2px]"
                            style={{ background: `linear-gradient(0deg, ${config.primary}, transparent)` }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1.75 }}
                          />
                        </div>

                        {/* Scanning line effect */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: `linear-gradient(180deg, transparent 0%, ${config.primary}10 50%, transparent 100%)`,
                            height: "30%",
                          }}
                          animate={{ y: ["0%", "350%", "0%"] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Holographic shimmer overlay */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none opacity-30"
                          style={{
                            background: `linear-gradient(105deg, transparent 40%, ${config.primary}40 50%, transparent 60%)`,
                            backgroundSize: "200% 100%",
                          }}
                          animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Content */}
                        <div className="relative z-10">
                          {/* Icon with orbital ring */}
                          <div className="relative w-14 h-14 mb-4">
                            {/* Orbital ring */}
                            <motion.div
                              className="absolute inset-0 rounded-full"
                              style={{ border: `1px dashed ${config.primary}40` }}
                              animate={{ rotate: 360 }}
                              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />
                            {/* Orbiting dot */}
                            <motion.div
                              className="absolute w-2 h-2 rounded-full"
                              style={{
                                background: config.primary,
                                boxShadow: `0 0 10px ${config.glow}`,
                                top: "50%",
                                left: "50%",
                              }}
                              animate={{
                                x: [24, 0, -24, 0, 24],
                                y: [0, -24, 0, 24, 0],
                              }}
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                            {/* Center icon container */}
                            <div
                              className="absolute inset-2 rounded-xl flex items-center justify-center"
                              style={{
                                background: `linear-gradient(135deg, ${config.primary}20, ${config.secondary}10)`,
                                border: `1px solid ${config.primary}40`,
                              }}
                            >
                              <Icon size={22} style={{ color: config.primary }} />
                            </div>
                          </div>

                          {/* Title with glow */}
                          <h3
                            className="font-bold text-lg mb-2 tracking-wide"
                            style={{
                              color: config.primary,
                              textShadow: `0 0 20px ${config.glow}`,
                            }}
                          >
                            {highlight.title}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-white/60 leading-relaxed">
                            {highlight.description}
                          </p>

                          {/* Status indicator */}
                          <div className="flex items-center mt-4 pt-3 border-t" style={{ borderColor: `${config.primary}20` }}>
                            <div className="flex items-center gap-2">
                              <motion.div
                                className="w-2 h-2 rounded-full"
                                style={{ background: config.primary }}
                                animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: `${config.primary}99` }}>
                                {highlight.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Data points floating in background */}
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full"
                            style={{
                              background: config.primary,
                              top: `${20 + i * 20}%`,
                              right: `${10 + i * 5}%`,
                              opacity: 0.4,
                            }}
                            animate={{
                              y: [0, -10, 0],
                              opacity: [0.2, 0.6, 0.2],
                            }}
                            transition={{
                              duration: 2 + i * 0.5,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Education Card - Added to right column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                className="mt-4"
              >
                <Card variant="glass" padding="md" className="border-emerald-500/30 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/5" />

                  {/* Corner accents */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-emerald-500/50" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-emerald-500/50" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-emerald-500/50" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-emerald-500/50" />

                  <div className="relative flex items-start gap-4">
                    <motion.div
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <GraduationCap size={28} className="text-emerald-400" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-white text-lg">Education</h4>
                        <motion.div
                          className="w-2 h-2 rounded-full bg-emerald-400"
                          animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-emerald-400 font-medium">MS Computer Science, USC '27</p>
                        <p className="text-white/50 text-sm">BS Computer Science, Penn State '25</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>

          {/* Neural Activity Bar - Full Width */}
          <motion.div
            variants={itemVariants}
            className="mt-10"
          >
            <NeuralActivityBar />
          </motion.div>

          {/* Research Focus Banner - Futuristic Design */}
          <motion.div
            variants={itemVariants}
            className="mt-10"
          >
            <div className="relative rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)",
                border: "1px solid rgba(34, 211, 238, 0.2)",
                boxShadow: "0 0 40px rgba(34, 211, 238, 0.1), inset 0 1px 0 rgba(34, 211, 238, 0.1)",
              }}
            >
              {/* Animated circuit lines background */}
              <div className="absolute inset-0 overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                      <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Horizontal circuit lines */}
                  {[20, 50, 80].map((y, i) => (
                    <motion.line
                      key={`h-${i}`}
                      x1="0%"
                      y1={`${y}%`}
                      x2="100%"
                      y2={`${y}%`}
                      stroke="url(#circuitGrad)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: [0, 1, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                    />
                  ))}
                </svg>
                {/* Floating data particles */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      background: i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#34d399" : "#f472b6",
                      left: `${5 + i * 8}%`,
                      top: `${20 + (i % 4) * 20}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      x: [0, i % 2 === 0 ? 10 : -10, 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 3 + i * 0.2,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>

              {/* Scanning line */}
              <motion.div
                className="absolute left-0 right-0 h-[2px] pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, #22d3ee, transparent)",
                  boxShadow: "0 0 20px #22d3ee",
                }}
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-16 h-16">
                <motion.div
                  className="absolute top-0 left-0 w-full h-[2px]"
                  style={{ background: "linear-gradient(90deg, #22d3ee, transparent)" }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-0 left-0 h-full w-[2px]"
                  style={{ background: "linear-gradient(180deg, #22d3ee, transparent)" }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                {/* Corner node */}
                <motion.div
                  className="absolute top-1 left-1 w-2 h-2 rounded-full bg-cyan-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
              <div className="absolute top-0 right-0 w-16 h-16">
                <motion.div
                  className="absolute top-0 right-0 w-full h-[2px]"
                  style={{ background: "linear-gradient(-90deg, #34d399, transparent)" }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.25 }}
                />
                <motion.div
                  className="absolute top-0 right-0 h-full w-[2px]"
                  style={{ background: "linear-gradient(180deg, #34d399, transparent)" }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.75 }}
                />
                <motion.div
                  className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                />
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16">
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-[2px]"
                  style={{ background: "linear-gradient(90deg, #f472b6, transparent)" }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-full w-[2px]"
                  style={{ background: "linear-gradient(0deg, #f472b6, transparent)" }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.25 }}
                />
                <motion.div
                  className="absolute bottom-1 left-1 w-2 h-2 rounded-full bg-pink-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                />
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16">
                <motion.div
                  className="absolute bottom-0 right-0 w-full h-[2px]"
                  style={{ background: "linear-gradient(-90deg, #a855f7, transparent)" }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 h-full w-[2px]"
                  style={{ background: "linear-gradient(0deg, #a855f7, transparent)" }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.75 }}
                />
                <motion.div
                  className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-purple-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 p-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  {/* Left side - Icon and title */}
                  <div className="flex items-center gap-5">
                    {/* Animated icon container */}
                    <div className="relative">
                      <motion.div
                        className="w-16 h-16 rounded-xl flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(52, 211, 153, 0.1))",
                          border: "1px solid rgba(34, 211, 238, 0.3)",
                        }}
                        animate={{
                          boxShadow: [
                            "0 0 20px rgba(34, 211, 238, 0.2)",
                            "0 0 40px rgba(34, 211, 238, 0.4)",
                            "0 0 20px rgba(34, 211, 238, 0.2)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Heart size={28} className="text-cyan-400" />
                      </motion.div>
                      {/* Orbiting ring */}
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        style={{ border: "1px dashed rgba(34, 211, 238, 0.3)" }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                      {/* Orbiting dot */}
                      <motion.div
                        className="absolute w-2 h-2 rounded-full bg-cyan-400"
                        style={{ boxShadow: "0 0 10px #22d3ee" }}
                        animate={{
                          top: ["50%", "0%", "50%", "100%", "50%"],
                          left: ["100%", "50%", "0%", "50%", "100%"],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                    <div>
                      <motion.h3
                        className="text-xl font-bold text-white mb-1"
                        style={{ textShadow: "0 0 20px rgba(34, 211, 238, 0.5)" }}
                      >
                        Research Interests
                      </motion.h3>
                      <div className="flex flex-wrap gap-2 text-sm">
                        {["MRI Reconstruction", "Cancer Genomics", "Clinical AI", "Interpretable ML"].map((interest, i) => (
                          <motion.span
                            key={interest}
                            className="text-white/60"
                            initial={{ opacity: 0 }}
                            animate={isVisible ? { opacity: 1 } : {}}
                            transition={{ delay: 0.5 + i * 0.1 }}
                          >
                            {interest}
                            {i < 3 && <span className="text-cyan-500 mx-1">•</span>}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right side - Tags with novel design */}
                  <div className="flex flex-wrap gap-3 justify-start lg:justify-end">
                    {[
                      { tag: "Medical Imaging", color: "#22d3ee" },
                      { tag: "Epigenetics", color: "#f472b6" },
                      { tag: "Genomics", color: "#34d399" },
                      { tag: "Biomarker Discovery", color: "#fbbf24" },
                      { tag: "Deep Learning", color: "#a855f7" },
                      { tag: "PyTorch", color: "#ef4444" },
                    ].map(({ tag, color }, i) => (
                      <motion.div
                        key={tag}
                        className="relative group cursor-pointer"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
                        transition={{ delay: 0.7 + i * 0.08, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div
                          className="relative px-4 py-2 rounded-lg overflow-hidden"
                          style={{
                            background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                            border: `1px solid ${color}40`,
                          }}
                        >
                          {/* Shimmer effect on hover */}
                          <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${color}30, transparent)`,
                            }}
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                          {/* Tag content */}
                          <span
                            className="relative z-10 text-sm font-medium"
                            style={{ color }}
                          >
                            {tag}
                          </span>
                          {/* Pulse indicator */}
                          <motion.div
                            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
                            style={{ background: color }}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                          />
                        </div>
                        {/* Hover glow */}
                        <motion.div
                          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                          style={{
                            boxShadow: `0 0 20px ${color}40`,
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
