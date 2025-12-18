"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useIntersection } from "@/app/hooks/useIntersection";
import { useState } from "react";
import {
  Brain,
  Microscope,
  Activity,
  Dna,
  FlaskConical,
  ScanLine,
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  TrendingUp,
  Layers
} from "lucide-react";
import DNAHelix from "../visualizations/DNAHelix";

const researchAreas = [
  {
    id: "medical-imaging",
    title: "Medical Imaging AI",
    description: "Deep learning for MRI/CT reconstruction, segmentation, and diagnostic assistance",
    projects: 2,
    colorClass: "research-area-cyan",
    icon: ScanLine,
    stats: { accuracy: "94%", speedup: "15%" },
    techniques: ["VarNet", "U-Net", "Transformers"],
  },
  {
    id: "genomics",
    title: "Computational Genomics",
    description: "Epigenetic analysis and biomarker discovery for personalized medicine",
    projects: 1,
    colorClass: "research-area-emerald",
    icon: Dna,
    stats: { biomarkers: "12+", pipelines: "3" },
    techniques: ["RNA-seq", "ChIP-seq", "ATAC-seq"],
  },
  {
    id: "clinical",
    title: "Clinical Prediction",
    description: "Multi-modal frameworks for disease prognosis and treatment outcomes",
    projects: 2,
    colorClass: "research-area-pink",
    icon: Activity,
    stats: { models: "5+", datasets: "8" },
    techniques: ["XGBoost", "Neural Networks", "Ensemble"],
  },
  {
    id: "pathology",
    title: "Digital Pathology",
    description: "AI-powered histopathology analysis for clinical diagnostics",
    projects: 1,
    colorClass: "research-area-amber",
    icon: Microscope,
    stats: { slides: "1000+", accuracy: "91%" },
    techniques: ["CNN", "Vision Transformers", "GAN"],
  },
];

const researchPositions = [
  {
    title: "Research Assistant",
    lab: "Fan MRI Lab",
    institution: "USC",
    color: "cyan",
    status: "Active",
    description: "Building multimodal deep learning models for accelerated MRI reconstruction. Achieved 15% workflow acceleration for radiologists and reduced image processing time by 2 seconds per scan.",
    tech: ["VarNet", "PyTorch", "DICOM", "Medical Imaging"],
    metrics: [
      { label: "Speedup", value: "15%" },
      { label: "Time Saved", value: "2s/scan" },
    ],
  },
  {
    title: "Research Assistant",
    lab: "Epigenetics & Therapy Lab",
    institution: "USC",
    color: "emerald",
    status: "Active",
    description: "Investigating epigenetic mechanisms in therapy response. Developing computational pipelines for biomarker discovery and personalized treatment recommendations.",
    tech: ["Bioinformatics", "Python", "R", "Gene Expression"],
    metrics: [
      { label: "Biomarkers", value: "12+" },
      { label: "Pipelines", value: "3" },
    ],
  },
];

const impactStats = [
  { label: "Research Labs", value: "2", icon: FlaskConical, color: "cyan" },
  { label: "Active Projects", value: "5+", icon: Layers, color: "purple" },
  { label: "Accuracy Improvement", value: "12%", icon: Target, color: "green" },
  { label: "Processing Speedup", value: "15%", icon: TrendingUp, color: "pink" },
];

export default function ResearchSection() {
  const { ref, isVisible } = useIntersection<HTMLElement>({ threshold: 0.1 });
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState<number | null>(null);

  return (
    <section id="research" ref={ref} className="section relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* 3D Grid Floor Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-64 research-grid-3d opacity-30" />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-cyan-500/10 blur-[100px] research-orb"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 right-[15%] w-80 h-80 rounded-full bg-emerald-500/10 blur-[120px] research-orb"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-500/5 blur-[150px]"
        />

        {/* Neural network connections */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
          {[...Array(8)].map((_, i) => (
            <motion.circle
              key={i}
              cx={`${15 + (i % 4) * 25}%`}
              cy={`${20 + Math.floor(i / 4) * 60}%`}
              r="3"
              fill="url(#neural-gradient)"
              className="neural-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
          {/* Connection lines */}
          <motion.path
            d="M 15% 20% Q 40% 50% 65% 20%"
            stroke="url(#neural-gradient)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isVisible ? { pathLength: 1, opacity: 0.3 } : {}}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.path
            d="M 40% 20% Q 52% 50% 65% 80%"
            stroke="url(#neural-gradient)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isVisible ? { pathLength: 1, opacity: 0.3 } : {}}
            transition={{ duration: 2, delay: 0.8 }}
          />
        </svg>

        {/* DNA Helix decoration */}
        <div className="absolute right-4 top-1/3 opacity-20 hidden xl:block">
          <DNAHelix height={300} />
        </div>
      </div>

      <div className="relative container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-2 mb-6 rounded-full border border-cyan-500/30 bg-cyan-500/5"
            whileHover={{ scale: 1.02 }}
          >
            <Brain size={18} className="text-cyan-400" />
            <span className="text-cyan-400 text-sm font-mono tracking-wider">MEDICAL AI RESEARCH</span>
            <Sparkles size={14} className="text-cyan-400" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Advancing <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">Healthcare</span> with AI
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Developing interpretable AI systems for medical imaging, clinical prediction, and personalized medicine
          </p>
        </motion.div>

        {/* Impact Stats - Hexagonal Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {impactStats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses: Record<string, string> = {
              cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400",
              purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400",
              green: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400",
              pink: "from-pink-500/20 to-pink-500/5 border-pink-500/30 text-pink-400",
            };

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`relative group overflow-hidden rounded-2xl border bg-gradient-to-br ${colorClasses[stat.color]} p-6 text-center`}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 research-card-shimmer" />

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent" />

                <div className="relative">
                  <motion.div
                    className="mx-auto w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3"
                    whileHover={{ rotate: 10 }}
                  >
                    <Icon size={24} className={colorClasses[stat.color].split(" ").pop()} />
                  </motion.div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Research Positions - Timeline Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-xl font-semibold text-white">Current Research Positions</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {researchPositions.map((position, index) => {
              const isHovered = hoveredPosition === index;
              const borderColor = position.color === "cyan" ? "border-cyan-500" : "border-emerald-500";
              const textColor = position.color === "cyan" ? "text-cyan-400" : "text-emerald-400";
              const bgColor = position.color === "cyan" ? "bg-cyan-500" : "bg-emerald-500";

              return (
                <motion.div
                  key={position.lab}
                  initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  onMouseEnter={() => setHoveredPosition(index)}
                  onMouseLeave={() => setHoveredPosition(null)}
                  className="group relative"
                >
                  <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-cyber-dark/80 backdrop-blur-sm transition-all duration-500 hover:border-white/20`}>
                    {/* Animated side accent */}
                    <motion.div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${bgColor}`}
                      animate={{ opacity: isHovered ? 1 : 0.5 }}
                    />

                    {/* Top glow line */}
                    <motion.div
                      className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${position.color === "cyan" ? "via-cyan-500" : "via-emerald-500"} to-transparent`}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                    />

                    {/* Content */}
                    <div className="relative p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-1">{position.title}</h4>
                          <p className={`${textColor} font-medium`}>{position.lab}, {position.institution}</p>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${position.color === "cyan" ? "bg-cyan-500/10 border border-cyan-500/30" : "bg-emerald-500/10 border border-emerald-500/30"}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${bgColor} animate-pulse`} />
                          <span className={`text-xs font-medium ${textColor}`}>{position.status}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-white/60 text-sm mb-4 leading-relaxed">
                        {position.description}
                      </p>

                      {/* Metrics */}
                      <div className="flex gap-4 mb-4">
                        {position.metrics.map((metric) => (
                          <div key={metric.label} className="flex items-center gap-2">
                            <Zap size={14} className={textColor} />
                            <span className="text-xs text-white/50">{metric.label}:</span>
                            <span className={`text-sm font-semibold ${textColor}`}>{metric.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {position.tech.map((tech) => (
                          <span
                            key={tech}
                            className={`text-xs px-2.5 py-1 rounded-lg ${position.color === "cyan" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Research Focus Areas - Interactive Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <h3 className="text-xl font-semibold text-white">Research Focus Areas</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {researchAreas.map((area, index) => {
              const Icon = area.icon;
              const isActive = activeArea === area.id;

              return (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  onClick={() => setActiveArea(isActive ? null : area.id)}
                  className={`group relative cursor-pointer ${area.colorClass}`}
                >
                  <div className={`relative overflow-hidden rounded-2xl border bg-cyber-dark/60 backdrop-blur-sm p-5 h-full transition-all duration-300 research-area-border ${isActive ? "border-opacity-100" : ""}`}>
                    {/* Background gradient on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: "radial-gradient(circle at center, var(--research-color, rgba(34, 211, 238, 0.1)) 0%, transparent 70%)"
                      }}
                    />

                    {/* Icon */}
                    <div className="relative mb-4">
                      <motion.div
                        className="w-14 h-14 rounded-xl border research-icon-container flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon size={26} className="research-icon" />
                      </motion.div>

                      {/* Pulse ring on active */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-xl border-2 research-area-indicator"
                            initial={{ scale: 1, opacity: 0.6 }}
                            animate={{ scale: 1.3, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Content */}
                    <h4 className="font-semibold mb-2 research-area-title text-lg">
                      {area.title}
                    </h4>
                    <p className="text-sm text-white/50 mb-3 line-clamp-2">
                      {area.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/40">
                        {area.projects} project{area.projects > 1 ? "s" : ""}
                      </span>
                      <motion.div
                        className="flex items-center gap-1 research-area-title"
                        animate={{ x: isActive ? 3 : 0 }}
                      >
                        <span>Details</span>
                        <ArrowRight size={12} />
                      </motion.div>
                    </div>

                    {/* Expanded details */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-white/10">
                            <p className="text-xs text-white/40 mb-2">Key Techniques</p>
                            <div className="flex flex-wrap gap-1.5">
                              {area.techniques.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/60"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Research Philosophy - Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 p-8 text-center"
        >
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-cyan-500/30 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-purple-500/30 rounded-br-2xl" />

          <motion.div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Brain size={24} className="text-cyan-400" />
          </motion.div>

          <blockquote className="text-xl md:text-2xl font-light text-white/80 mb-4 max-w-3xl mx-auto">
            "Building AI systems that augment clinical decision-making while maintaining interpretability and trust in healthcare settings."
          </blockquote>

          <p className="text-sm text-white/40">Research Philosophy</p>
        </motion.div>
      </div>
    </section>
  );
}
