"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useIntersection } from "@/app/hooks/useIntersection";
import { ExternalLink, ArrowUpRight, Brain, Activity, Dna, TrendingUp, FileSearch, Car, BookOpen, Beaker, Code, Bug, Calculator, Utensils, Binary, Microscope } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { projects, projectCategories } from "@/app/constants/projects";
import { useState } from "react";
import FlowingBackground from "../visualizations/FlowingBackground";

export default function ProjectsSection() {
  const { ref, isVisible } = useIntersection<HTMLElement>({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="projects" ref={ref} className="section relative overflow-hidden">
      {/* Flowing Background - continues the visual flow */}
      <FlowingBackground />

      {/* Purple/Accent theme for Projects */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />

      <div className="relative container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-mono mb-4">
              PORTFOLIO
            </span>
            <h2 className="section-title">
              Signature <span className="gradient-text-accent">Projects</span>
            </h2>
            <p className="section-subtitle mx-auto">
              From AI-powered platforms to research breakthroughs
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setShowAll(false);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-accent text-white"
                    : "bg-cyber-card border border-cyber-border text-white/70 hover:border-accent/50 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Show More Button */}
          {filteredProjects.length > 6 && (
            <motion.div
              variants={itemVariants}
              className="text-center mt-10"
            >
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less" : `Show All (${filteredProjects.length})`}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: (typeof projects)[0];
}

function ProjectCard({ project }: ProjectCardProps) {
  const categoryColors: Record<string, string> = {
    ai: "primary",
    research: "secondary",
    medical: "glow",
  };

  const categoryGradients: Record<string, string> = {
    ai: "from-primary/20 to-secondary/10",
    research: "from-secondary/20 to-cyan-500/10",
    medical: "from-cyan-500/20 to-emerald-500/10",
  };

  // Project-specific illustrations
  const projectIllustrations: Record<string, React.ReactNode> = {
    // MRI Brain Scan Visualization
    "vwi-mri-reconstruction": (
      <svg viewBox="0 0 200 120" className="w-full h-full">
        <defs>
          <linearGradient id="mriGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        {/* MRI Scanner Ring */}
        <ellipse cx="100" cy="60" rx="70" ry="45" fill="none" stroke="url(#mriGrad)" strokeWidth="3" opacity="0.9" />
        <ellipse cx="100" cy="60" rx="55" ry="35" fill="none" stroke="#22d3ee" strokeWidth="2" opacity="0.7" />
        {/* Brain silhouette */}
        <path d="M100 25 Q130 30 135 50 Q140 70 125 85 Q110 95 100 95 Q90 95 75 85 Q60 70 65 50 Q70 30 100 25" fill="#22d3ee" fillOpacity="0.15" stroke="#22d3ee" strokeWidth="2.5" opacity="1" />
        {/* Scan lines */}
        <line x1="30" y1="60" x2="170" y2="60" stroke="#22d3ee" strokeWidth="1.5" opacity="0.5" strokeDasharray="5,5" />
        <line x1="100" y1="15" x2="100" y2="105" stroke="#22d3ee" strokeWidth="1.5" opacity="0.5" strokeDasharray="5,5" />
        {/* Data points */}
        {[40, 70, 100, 130, 160].map((x, i) => (
          <circle key={i} cx={x} cy={60 + Math.sin(i) * 10} r="4" fill="#22d3ee" opacity="0.9" />
        ))}
      </svg>
    ),
    // Blood Cells & Microscope
    "crossmodal-hemanet": (
      <svg viewBox="0 0 200 120" className="w-full h-full">
        <defs>
          <radialGradient id="cellGrad" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.8" />
          </radialGradient>
        </defs>
        {/* Blood cells */}
        <ellipse cx="50" cy="45" rx="25" ry="12" fill="url(#cellGrad)" opacity="0.9" />
        <ellipse cx="50" cy="45" rx="8" ry="4" fill="#0a0a0f" opacity="0.6" />
        <ellipse cx="120" cy="70" rx="30" ry="14" fill="url(#cellGrad)" opacity="0.85" />
        <ellipse cx="120" cy="70" rx="10" ry="5" fill="#0a0a0f" opacity="0.6" />
        <ellipse cx="160" cy="40" rx="22" ry="10" fill="url(#cellGrad)" opacity="0.8" />
        {/* DNA strand hint */}
        <path d="M30 90 Q50 80 70 90 Q90 100 110 90" stroke="#10b981" strokeWidth="2.5" fill="none" opacity="0.8" />
        <path d="M30 95 Q50 105 70 95 Q90 85 110 95" stroke="#10b981" strokeWidth="2.5" fill="none" opacity="0.8" />
        {/* Connection lines */}
        {[40, 55, 70, 85, 100].map((x, i) => (
          <line key={i} x1={x} y1={90 - (i % 2) * 5} x2={x} y2={95 + (i % 2) * 5} stroke="#10b981" strokeWidth="1.5" opacity="0.7" />
        ))}
      </svg>
    ),
    // Synthetic Data Privacy Shield
    "synthetic-data-ml": (
      <svg viewBox="0 0 200 120" className="w-full h-full">
        <defs>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {/* Shield shape */}
        <path d="M100 15 L150 30 L150 70 Q150 100 100 110 Q50 100 50 70 L50 30 Z" fill="#8b5cf6" fillOpacity="0.15" stroke="url(#shieldGrad)" strokeWidth="2.5" />
        {/* Lock icon inside */}
        <rect x="85" y="50" width="30" height="25" rx="3" fill="none" stroke="#22d3ee" strokeWidth="2.5" opacity="0.9" />
        <path d="M90 50 L90 40 Q90 30 100 30 Q110 30 110 40 L110 50" fill="none" stroke="#22d3ee" strokeWidth="2.5" opacity="0.9" />
        {/* Data particles */}
        {[...Array(8)].map((_, i) => (
          <circle key={i} cx={60 + (i % 4) * 25} cy={25 + Math.floor(i / 4) * 70} r="3" fill="#8b5cf6" opacity="0.8" />
        ))}
        {/* Binary hint */}
        <text x="65" y="105" fill="#22d3ee" fontSize="9" opacity="0.7" fontFamily="monospace">01101</text>
        <text x="115" y="105" fill="#22d3ee" fontSize="9" opacity="0.7" fontFamily="monospace">10010</text>
      </svg>
    ),
    // Stock Trading Chart
    "algobot": (
      <svg viewBox="0 0 200 120" className="w-full h-full">
        <defs>
          <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a3e635" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a3e635" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Chart area fill */}
        <path d="M20 90 L40 70 L60 75 L80 50 L100 55 L120 35 L140 45 L160 25 L180 30 L180 100 L20 100 Z" fill="url(#chartGrad)" />
        {/* Chart line */}
        <path d="M20 90 L40 70 L60 75 L80 50 L100 55 L120 35 L140 45 L160 25 L180 30" fill="none" stroke="#a3e635" strokeWidth="2.5" opacity="0.9" />
        {/* Candlesticks */}
        {[[40, 65, 75], [80, 45, 55], [120, 30, 40], [160, 20, 30]].map(([x, y1, y2], i) => (
          <g key={i}>
            <line x1={x} y1={y1} x2={x} y2={y2} stroke={i % 2 === 0 ? "#22c55e" : "#ef4444"} strokeWidth="6" opacity="0.9" />
            <line x1={x} y1={y1 - 5} x2={x} y2={y2 + 5} stroke={i % 2 === 0 ? "#22c55e" : "#ef4444"} strokeWidth="1.5" opacity="0.8" />
          </g>
        ))}
        {/* Grid lines */}
        {[30, 50, 70, 90].map((y, i) => (
          <line key={i} x1="20" y1={y} x2="180" y2={y} stroke="#ffffff" strokeWidth="0.5" opacity="0.2" />
        ))}
      </svg>
    ),
    // SEC Filing Documents
    "sec-stock-tracker": (
      <svg viewBox="0 0 200 120" className="w-full h-full">
        {/* Document stack */}
        <rect x="50" y="25" width="80" height="90" rx="3" fill="#1a1a2e" stroke="#a3e635" strokeWidth="1.5" opacity="0.8" />
        <rect x="55" y="20" width="80" height="90" rx="3" fill="#1a1a2e" stroke="#a3e635" strokeWidth="1.5" opacity="0.9" />
        <rect x="60" y="15" width="80" height="90" rx="3" fill="#1a1a2e" stroke="#a3e635" strokeWidth="2.5" />
        {/* Document lines */}
        {[30, 45, 60, 75].map((y, i) => (
          <line key={i} x1="70" y1={y} x2={120 - i * 5} y2={y} stroke="#a3e635" strokeWidth="1.5" opacity="0.7" />
        ))}
        {/* 13F Badge */}
        <rect x="130" y="50" width="35" height="20" rx="3" fill="#a3e635" opacity="0.3" />
        <text x="137" y="64" fill="#a3e635" fontSize="11" fontWeight="bold" opacity="0.9">13F</text>
        {/* Search magnifier */}
        <circle cx="155" cy="30" r="12" fill="none" stroke="#22d3ee" strokeWidth="2.5" opacity="0.85" />
        <line x1="163" y1="38" x2="175" y2="50" stroke="#22d3ee" strokeWidth="2.5" opacity="0.85" />
      </svg>
    ),
    // Ride sharing map
    "smartrides": (
      <svg viewBox="0 0 200 120" className="w-full h-full">
        {/* Map background */}
        <rect x="20" y="15" width="160" height="90" rx="5" fill="#1a1a2e" stroke="#a3e635" strokeWidth="1.5" opacity="0.5" />
        {/* Roads */}
        <line x1="20" y1="60" x2="180" y2="60" stroke="#ffffff" strokeWidth="2" opacity="0.25" />
        <line x1="100" y1="15" x2="100" y2="105" stroke="#ffffff" strokeWidth="2" opacity="0.25" />
        <path d="M40 30 Q100 50 160 30" stroke="#ffffff" strokeWidth="1.5" opacity="0.2" fill="none" />
        {/* Route line */}
        <path d="M50 40 L80 60 L120 50 L150 70" stroke="#a3e635" strokeWidth="3" strokeDasharray="5,3" fill="none" opacity="0.9" />
        {/* Location pins */}
        <circle cx="50" cy="40" r="10" fill="#22c55e" opacity="0.9" />
        <circle cx="50" cy="40" r="4" fill="#ffffff" />
        <circle cx="150" cy="70" r="10" fill="#ef4444" opacity="0.9" />
        <circle cx="150" cy="70" r="4" fill="#ffffff" />
        {/* Car icon */}
        <rect x="93" y="50" width="24" height="12" rx="3" fill="#a3e635" opacity="0.9" />
        <circle cx="98" cy="65" r="4" fill="#a3e635" opacity="0.8" />
        <circle cx="112" cy="65" r="4" fill="#a3e635" opacity="0.8" />
      </svg>
    ),
    // Ancient text scrolls
    "jain-ai": (
      <svg viewBox="0 0 200 120" className="w-full h-full">
        <defs>
          <linearGradient id="scrollGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {/* Scroll */}
        <path d="M40 20 L40 100 Q50 110 60 100 L60 20 Q50 10 40 20" fill="url(#scrollGrad)" opacity="0.85" />
        <path d="M60 20 L140 20 L140 100 L60 100" fill="#1a1a2e" stroke="#fbbf24" strokeWidth="1.5" opacity="0.8" />
        <path d="M140 20 L140 100 Q150 110 160 100 L160 20 Q150 10 140 20" fill="url(#scrollGrad)" opacity="0.85" />
        {/* Sanskrit-like text lines */}
        {[35, 50, 65, 80].map((y, i) => (
          <g key={i}>
            <line x1="70" y1={y} x2="130" y2={y} stroke="#fbbf24" strokeWidth="1.5" opacity="0.6" />
            <text x="70" y={y - 2} fill="#fbbf24" fontSize="7" opacity="0.5">॥ श्री ॥</text>
          </g>
        ))}
        {/* AI sparkle */}
        <circle cx="165" cy="30" r="5" fill="#a3e635" opacity="0.9" />
        <line x1="165" y1="20" x2="165" y2="40" stroke="#a3e635" strokeWidth="2" opacity="0.8" />
        <line x1="155" y1="30" x2="175" y2="30" stroke="#a3e635" strokeWidth="2" opacity="0.8" />
      </svg>
    ),
    // Climate research
    "climate-methodology-gen": (
      <svg viewBox="0 0 200 120" className="w-full h-full">
        {/* Globe */}
        <circle cx="70" cy="60" r="40" fill="none" stroke="#22d3ee" strokeWidth="2.5" opacity="0.85" />
        <ellipse cx="70" cy="60" rx="40" ry="15" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.5" />
        <ellipse cx="70" cy="60" rx="15" ry="40" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.5" />
        {/* Landmass hint */}
        <path d="M50 50 Q60 45 75 50 Q85 55 80 65 Q70 70 55 65 Q45 60 50 50" fill="#10b981" opacity="0.5" />
        {/* Document/methodology */}
        <rect x="120" y="30" width="60" height="70" rx="3" fill="#1a1a2e" stroke="#8b5cf6" strokeWidth="2" />
        {[45, 55, 65, 75, 85].map((y, i) => (
          <line key={i} x1="130" y1={y} x2={165 - i * 3} y2={y} stroke="#8b5cf6" strokeWidth="1.5" opacity="0.7" />
        ))}
        {/* Connection arrow */}
        <path d="M110 60 L118 60" stroke="#a3e635" strokeWidth="2.5" />
        <polygon points="118,55 130,60 118,65" fill="#a3e635" opacity="0.9" />
      </svg>
    ),
    // AI Bias game
    "biasbusters": (
      <svg viewBox="0 0 200 120" className="w-full h-full">
        {/* Balance scale */}
        <line x1="100" y1="20" x2="100" y2="50" stroke="#a3e635" strokeWidth="3" opacity="0.9" />
        <line x1="50" y1="50" x2="150" y2="50" stroke="#a3e635" strokeWidth="2.5" opacity="0.9" />
        {/* Left pan - biased */}
        <line x1="50" y1="50" x2="50" y2="70" stroke="#a3e635" strokeWidth="2" opacity="0.8" />
        <ellipse cx="50" cy="75" rx="25" ry="8" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.9" />
        <text x="37" y="79" fill="#ef4444" fontSize="9" opacity="0.8">bias</text>
        {/* Right pan - fair */}
        <line x1="150" y1="50" x2="150" y2="70" stroke="#a3e635" strokeWidth="2" opacity="0.8" />
        <ellipse cx="150" cy="75" rx="25" ry="8" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.9" />
        <text x="140" y="79" fill="#22c55e" fontSize="9" opacity="0.8">fair</text>
        {/* Game controller hint */}
        <rect x="75" y="90" width="50" height="20" rx="10" fill="none" stroke="#8b5cf6" strokeWidth="2" opacity="0.8" />
        <circle cx="88" cy="100" r="5" fill="#8b5cf6" opacity="0.7" />
        <circle cx="112" cy="100" r="5" fill="#8b5cf6" opacity="0.7" />
      </svg>
    ),
    // Handwriting analysis
    "likhit": (
      <svg viewBox="0 0 200 120" className="w-full h-full">
        {/* Paper */}
        <rect x="30" y="20" width="100" height="80" rx="2" fill="#1a1a2e" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />
        {/* Handwritten text */}
        <path d="M45 40 Q55 35 65 40 Q75 45 85 40" stroke="#a3e635" strokeWidth="2.5" fill="none" opacity="0.9" />
        <path d="M45 55 Q60 50 75 55 Q90 60 105 55" stroke="#a3e635" strokeWidth="2.5" fill="none" opacity="0.8" />
        <path d="M45 70 Q55 65 70 70" stroke="#a3e635" strokeWidth="2.5" fill="none" opacity="0.7" />
        {/* AI analysis */}
        <rect x="140" y="35" width="45" height="50" rx="3" fill="#1a1a2e" stroke="#22d3ee" strokeWidth="2" />
        <text x="148" y="55" fill="#22d3ee" fontSize="10" opacity="0.9">OCR</text>
        <text x="148" y="72" fill="#22d3ee" fontSize="10" opacity="0.9">97%</text>
        {/* Connection */}
        <path d="M130 60 L138 60" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3,2" opacity="0.8" />
      </svg>
    ),
    // Data pipeline
    "numerical-data-handler": (
      <svg viewBox="0 0 200 120" className="w-full h-full">
        {/* Database cylinders */}
        <ellipse cx="40" cy="50" rx="20" ry="8" fill="#1a1a2e" stroke="#8b5cf6" strokeWidth="2" opacity="0.9" />
        <rect x="20" y="50" width="40" height="30" fill="#1a1a2e" stroke="#8b5cf6" strokeWidth="2" opacity="0.9" />
        <ellipse cx="40" cy="80" rx="20" ry="8" fill="none" stroke="#8b5cf6" strokeWidth="2" opacity="0.9" />
        {/* Flow arrows */}
        <path d="M65 60 L85 60" stroke="#22d3ee" strokeWidth="2.5" opacity="0.9" />
        <polygon points="85,55 98,60 85,65" fill="#22d3ee" opacity="0.9" />
        {/* Processing box */}
        <rect x="98" y="45" width="40" height="30" rx="3" fill="#1a1a2e" stroke="#22d3ee" strokeWidth="2" />
        <text x="107" y="65" fill="#22d3ee" fontSize="10" opacity="0.9">API</text>
        {/* Cloud storage */}
        <path d="M160 55 Q145 45 150 35 Q155 25 170 30 Q185 25 185 40 Q195 45 185 55 Q180 65 160 55" fill="none" stroke="#a3e635" strokeWidth="2" opacity="0.9" />
        <path d="M140 60 L155 55" stroke="#a3e635" strokeWidth="2.5" opacity="0.9" />
      </svg>
    ),
    // DNA Sequence
    "sequence-alignment": (
      <svg viewBox="0 0 200 120" className="w-full h-full">
        {/* Double helix */}
        <path d="M30 20 Q60 40 30 60 Q60 80 30 100" stroke="#22d3ee" strokeWidth="2.5" fill="none" opacity="0.9" />
        <path d="M60 20 Q30 40 60 60 Q30 80 60 100" stroke="#8b5cf6" strokeWidth="2.5" fill="none" opacity="0.9" />
        {/* Base pairs */}
        {[30, 50, 70, 90].map((y, i) => (
          <line key={i} x1="35" y1={y} x2="55" y2={y} stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />
        ))}
        {/* Alignment visualization */}
        <rect x="80" y="30" width="100" height="60" rx="3" fill="#1a1a2e" stroke="#10b981" strokeWidth="1.5" opacity="0.8" />
        <text x="90" y="50" fill="#22d3ee" fontSize="11" fontFamily="monospace" opacity="0.9">ATCGATCG</text>
        <text x="90" y="65" fill="#8b5cf6" fontSize="11" fontFamily="monospace" opacity="0.9">ATCG-TCG</text>
        <text x="90" y="80" fill="#10b981" fontSize="11" fontFamily="monospace" opacity="0.8">||||.|||</text>
      </svg>
    ),
    // Recipe/Food
    "recipe-meal-planner": (
      <svg viewBox="0 0 200 120" className="w-full h-full">
        {/* Plate */}
        <ellipse cx="100" cy="70" rx="60" ry="25" fill="none" stroke="#8b5cf6" strokeWidth="2.5" opacity="0.85" />
        <ellipse cx="100" cy="70" rx="45" ry="18" fill="none" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.5" />
        {/* Food items */}
        <circle cx="85" cy="65" r="12" fill="#22c55e" opacity="0.7" />
        <circle cx="110" cy="60" r="15" fill="#f59e0b" opacity="0.7" />
        <ellipse cx="100" cy="78" rx="20" ry="8" fill="#ef4444" opacity="0.6" />
        {/* Calendar hint */}
        <rect x="150" y="25" width="35" height="35" rx="3" fill="#1a1a2e" stroke="#a3e635" strokeWidth="2" />
        <line x1="150" y1="35" x2="185" y2="35" stroke="#a3e635" strokeWidth="1.5" opacity="0.7" />
        {[42, 50].map((y, i) => (
          <g key={i}>
            {[156, 167, 178].map((x, j) => (
              <rect key={j} x={x} y={y} width="6" height="6" fill="#a3e635" opacity={0.5 + j * 0.15} />
            ))}
          </g>
        ))}
      </svg>
    ),
    // Debug/Bug visualization
    "vibe-debug": (
      <svg viewBox="0 0 200 120" className="w-full h-full">
        {/* Code window */}
        <rect x="20" y="20" width="90" height="80" rx="5" fill="#1a1a2e" stroke="#ef4444" strokeWidth="2" />
        <circle cx="32" cy="32" r="4" fill="#ef4444" opacity="0.9" />
        <circle cx="45" cy="32" r="4" fill="#fbbf24" opacity="0.9" />
        <circle cx="58" cy="32" r="4" fill="#22c55e" opacity="0.9" />
        {/* Code lines with bug */}
        <line x1="30" y1="50" x2="80" y2="50" stroke="#a3e635" strokeWidth="2" opacity="0.7" />
        <line x1="30" y1="60" x2="90" y2="60" stroke="#ef4444" strokeWidth="2.5" opacity="0.9" />
        <line x1="30" y1="70" x2="70" y2="70" stroke="#a3e635" strokeWidth="2" opacity="0.7" />
        <line x1="30" y1="80" x2="85" y2="80" stroke="#a3e635" strokeWidth="2" opacity="0.7" />
        {/* Bug icon */}
        <circle cx="95" cy="60" r="8" fill="#ef4444" opacity="0.9" />
        {/* Arrow to fixed */}
        <path d="M115 60 L135 60" stroke="#22c55e" strokeWidth="2.5" opacity="0.9" />
        <polygon points="135,54 148,60 135,66" fill="#22c55e" opacity="0.9" />
        {/* Fixed code window */}
        <rect x="150" y="40" width="40" height="40" rx="3" fill="#1a1a2e" stroke="#22c55e" strokeWidth="2" />
        <text x="162" y="67" fill="#22c55e" fontSize="16">✓</text>
      </svg>
    ),
    // Math/Numbers
    "goldbach-conjecture": (
      <svg viewBox="0 0 200 120" className="w-full h-full">
        {/* Number line */}
        <line x1="20" y1="60" x2="180" y2="60" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.7" />
        {/* Prime numbers highlighted */}
        {[[30, "2"], [50, "3"], [70, "5"], [90, "7"], [120, "11"], [150, "13"]].map(([x, n], i) => (
          <g key={i}>
            <circle cx={x as number} cy={60} r="14" fill="#8b5cf6" opacity="0.5" />
            <text x={(x as number) - 5} y={65} fill="#8b5cf6" fontSize="12" opacity="0.9">{n}</text>
          </g>
        ))}
        {/* Equation */}
        <text x="50" y="28" fill="#22d3ee" fontSize="16" fontFamily="serif" opacity="0.9">2n = p + q</text>
        {/* Graph hint */}
        <path d="M130 100 L140 85 L150 90 L160 75 L170 80 L180 70" stroke="#a3e635" strokeWidth="2" fill="none" opacity="0.8" />
      </svg>
    ),
  };

  const ProjectIllustration = projectIllustrations[project.id] || (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <circle cx="100" cy="60" r="35" fill="none" stroke="#a3e635" strokeWidth="2" opacity="0.6" />
      <circle cx="100" cy="60" r="20" fill="#a3e635" opacity="0.2" />
      <path d="M90 60 L95 65 L110 50" stroke="#a3e635" strokeWidth="3" fill="none" opacity="0.8" />
    </svg>
  );

  return (
    <Card
      variant="default"
      padding="none"
      className="group h-full flex flex-col overflow-hidden card-shine"
    >
      {/* Header with gradient */}
      <div className={`relative h-24 md:h-36 bg-gradient-to-br ${categoryGradients[project.category] || "from-cyber-card to-cyber-elevated"} p-3 md:p-6`}>
        {/* Animated background glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/10 group-hover:to-secondary/5 transition-all duration-500" />

        {/* Category Badge */}
        <Badge
          variant={categoryColors[project.category] as any}
          size="sm"
          className="absolute top-2 right-2 md:top-4 md:right-4 z-10 text-[10px] md:text-xs"
        >
          {project.category.toUpperCase()}
        </Badge>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10 flex items-center gap-1 md:gap-1.5 text-[10px] md:text-xs text-primary font-mono bg-black/30 backdrop-blur-sm px-1.5 py-0.5 md:px-2 md:py-1 rounded-full">
            <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-primary rounded-full animate-pulse" />
            FEATURED
          </div>
        )}

        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

        {/* Project Illustration - Centered Visual (behind text) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-3 pt-6 md:p-6 md:pt-10 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-28 h-16 md:w-40 md:h-24"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {ProjectIllustration}
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-border to-transparent" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      {/* Content */}
      <div className="flex-1 p-3 md:p-6 flex flex-col relative">
        <h3 className="text-base md:text-xl font-semibold text-white mb-1 md:mb-2 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-white/60 text-xs md:text-sm mb-2 md:mb-4 flex-1 line-clamp-2 md:line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-4">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[10px] md:text-xs px-1.5 py-0.5 md:px-2.5 md:py-1 bg-cyber-surface rounded-md text-white/50 border border-cyber-border/50 hover:border-primary/30 hover:text-white/70 transition-all"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-[10px] md:text-xs px-1.5 py-0.5 md:px-2.5 md:py-1 bg-cyber-surface rounded-md text-white/50 border border-cyber-border/50">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-4 border-t border-cyber-border/50">
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-white/60 hover:text-primary transition-colors"
              whileHover={{ x: 2 }}
            >
              <ExternalLink size={16} />
              Live Demo
            </motion.a>
          )}
          <motion.span
            className="ml-auto"
            initial={{ x: 0, y: 0 }}
            whileHover={{ x: 2, y: -2 }}
          >
            <ArrowUpRight
              size={18}
              className="text-white/30 group-hover:text-primary transition-colors duration-300"
            />
          </motion.span>
        </div>
      </div>
    </Card>
  );
}
