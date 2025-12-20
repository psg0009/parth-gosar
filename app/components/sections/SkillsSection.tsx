"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useIntersection } from "@/app/hooks/useIntersection";
import { skillCategories, technologies, medicalDomains } from "@/app/constants/skills";
import FlowingBackground from "../visualizations/FlowingBackground";

// ═══════════════════════════════════════════════════════════════════════════════
// CATEGORY COLORS CONFIG
// ═══════════════════════════════════════════════════════════════════════════════
const categoryColors: Record<string, { primary: string; secondary: string; glow: string }> = {
  "medical-ai": { primary: "#22d3ee", secondary: "#06b6d4", glow: "rgba(34, 211, 238, 0.5)" },
  "ml-ai": { primary: "#a855f7", secondary: "#9333ea", glow: "rgba(168, 85, 247, 0.5)" },
  "bioinformatics": { primary: "#10b981", secondary: "#059669", glow: "rgba(16, 185, 129, 0.5)" },
  "programming": { primary: "#f59e0b", secondary: "#d97706", glow: "rgba(245, 158, 11, 0.5)" },
  "cloud": { primary: "#ec4899", secondary: "#db2777", glow: "rgba(236, 72, 153, 0.5)" },
  "research": { primary: "#3b82f6", secondary: "#2563eb", glow: "rgba(59, 130, 246, 0.5)" },
};

// ═══════════════════════════════════════════════════════════════════════════════
// HEXAGONAL SKILL NODE - Clean skill display
// ═══════════════════════════════════════════════════════════════════════════════
function HexSkillNode({ skill, color, index, isVisible }: { skill: { name: string }; color: string; index: number; isVisible: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative p-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden">
        {/* Animated background on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(135deg, ${color}15, transparent)` }}
        />

        {/* Left accent bar */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
          style={{ background: `linear-gradient(180deg, ${color}, ${color}60)` }}
          initial={{ scaleY: 0 }}
          animate={isVisible ? { scaleY: 1 } : {}}
          transition={{ delay: 0.4 + index * 0.08, duration: 0.5 }}
        />

        <div className="relative flex items-center gap-4 pl-3">
          {/* Skill name */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <motion.div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: color, boxShadow: `0 0 8px ${color}` }}
              animate={isHovered ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 0.5 }}
            />
            <span className="text-sm text-white/90 font-medium">{skill.name}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HOLOGRAPHIC SKILL CARD - Main category card component
// ═══════════════════════════════════════════════════════════════════════════════
function HolographicSkillCard({ category, index, isVisible }: { category: typeof skillCategories[0]; index: number; isVisible: boolean }) {
  const colors = categoryColors[category.id] || categoryColors["medical-ai"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      animate={isVisible ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 100 }}
      className="group perspective-1000"
    >
      <div
        className="relative rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500"
        style={{ background: `linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3))`, border: `1px solid ${colors.primary}30` }}
      >
        {/* Holographic shimmer */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{ background: `linear-gradient(45deg, transparent 30%, ${colors.primary}20 50%, transparent 70%)`, backgroundSize: "200% 200%" }}
          animate={{ backgroundPosition: ["0% 0%", "200% 200%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`, boxShadow: `0 0 20px ${colors.primary}40` }} />

        {/* Corner accents */}
        <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 rounded-tl-lg" style={{ borderColor: colors.primary }} />
        <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 rounded-tr-lg" style={{ borderColor: colors.primary }} />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 rounded-bl-lg" style={{ borderColor: `${colors.primary}60` }} />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 rounded-br-lg" style={{ borderColor: `${colors.primary}60` }} />

        {/* Content */}
        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                className="relative w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}10)`, border: `1px solid ${colors.primary}40`, boxShadow: `0 0 20px ${colors.primary}20` }}
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <motion.div
                  className="w-4 h-4 rounded"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-1 rounded-lg border"
                  style={{ borderColor: `${colors.primary}40` }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: colors.primary }}>{category.title}</h3>
                <p className="text-xs text-white/40 font-mono">{category.skills.length} SKILLS</p>
              </div>
            </div>

            {/* Signal indicator */}
            <div className="flex items-end gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 rounded-full"
                  style={{ height: 6 + i * 4, background: colors.primary, opacity: 0.3 + i * 0.15 }}
                  animate={{ opacity: [0.3 + i * 0.15, 0.9, 0.3 + i * 0.15] }}
                  transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
                />
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="space-y-3">
            {category.skills.map((skill, skillIndex) => (
              <HexSkillNode key={skill.name} skill={skill} color={colors.primary} index={skillIndex} isVisible={isVisible} />
            ))}
          </div>

          {/* Bottom accent */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${colors.primary}40, transparent)` }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{ boxShadow: `inset 0 0 60px ${colors.primary}10` }} />
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// NEURAL DOMAIN HUB - Medical domains visualization
// ═══════════════════════════════════════════════════════════════════════════════
function NeuralDomainHub({ domains, isVisible }: { domains: typeof medicalDomains; isVisible: boolean }) {
  const [hoveredDomain, setHoveredDomain] = useState<number | null>(null);

  // Split domains into left and right sides
  const leftDomains = domains.slice(0, 3);
  const rightDomains = domains.slice(3, 6);

  // Domain card component
  const DomainCard = ({ domain, index, side }: { domain: typeof domains[0]; index: number; side: 'left' | 'right' }) => {
    const actualIndex = side === 'left' ? index : index + 3;
    return (
      <motion.div
        key={domain.name}
        initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
        onMouseEnter={() => setHoveredDomain(actualIndex)}
        onMouseLeave={() => setHoveredDomain(null)}
        className="group relative"
      >
        <div
          className={`relative p-5 rounded-2xl backdrop-blur-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-500 ${hoveredDomain === actualIndex ? 'scale-105 shadow-lg shadow-cyan-500/20' : ''}`}
          style={{ background: hoveredDomain === actualIndex ? 'linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(168, 85, 247, 0.1))' : 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2))' }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: 'linear-gradient(45deg, transparent 30%, rgba(34, 211, 238, 0.1) 50%, transparent 70%)', backgroundSize: '200% 200%' }}
            animate={{ backgroundPosition: ['0% 0%', '200% 200%'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-500/30 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-500/30 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-500/20 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-500/20 rounded-br-lg" />

          {/* Status indicator */}
          <motion.div
            className="absolute top-3 right-3 w-2 h-2 rounded-full bg-cyan-400"
            animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Content */}
          <div className="relative">
            <h4 className="font-bold text-white text-sm mb-2 group-hover:text-cyan-400 transition-colors leading-tight">{domain.name}</h4>
            <p className="text-[11px] text-white/50 group-hover:text-white/70 transition-colors leading-relaxed">{domain.description}</p>
          </div>

          {/* Bottom accent */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
            initial={{ scaleX: 0 }}
            animate={hoveredDomain === actualIndex ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative">
      {/* Mobile/Tablet: Simple grid layout */}
      <div className="lg:hidden grid grid-cols-2 md:grid-cols-3 gap-4">
        {domains.map((domain, index) => (
          <DomainCard key={domain.name} domain={domain} index={index} side="left" />
        ))}
      </div>

      {/* Desktop: Neural Core in center with cards on sides */}
      <div className="hidden lg:block relative">
        {/* Connecting lines */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-center pointer-events-none z-0">
          {/* Left connecting line */}
          <motion.div
            className="h-[2px] flex-1 mr-4"
            style={{ background: 'linear-gradient(90deg, rgba(34, 211, 238, 0.1), rgba(34, 211, 238, 0.5))' }}
            initial={{ scaleX: 0, originX: 1 }}
            animate={isVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />
          {/* Center spacer for the core */}
          <div className="w-28 flex-shrink-0" />
          {/* Right connecting line */}
          <motion.div
            className="h-[2px] flex-1 ml-4"
            style={{ background: 'linear-gradient(90deg, rgba(34, 211, 238, 0.5), rgba(34, 211, 238, 0.1))' }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={isVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>

        {/* Main layout: Left cards - Core - Right cards */}
        <div className="flex items-center gap-4">
          {/* Left side domains */}
          <div className="flex-1 grid grid-cols-3 gap-3">
            {leftDomains.map((domain, index) => (
              <DomainCard key={domain.name} domain={domain} index={index} side="left" />
            ))}
          </div>

          {/* Central Neural Core */}
          <div className="flex-shrink-0 relative z-10">
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Rotating outer ring */}
              <motion.div
                className="absolute rounded-full border-2 border-cyan-500/30"
                style={{ width: 110, height: 110 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              {/* Pulsing rings */}
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-cyan-500/20"
                  style={{
                    width: 90 + i * 20,
                    height: 90 + i * 20,
                  }}
                  animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
                />
              ))}
              {/* Core circle */}
              <motion.div
                className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 flex items-center justify-center backdrop-blur-sm"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-center">
                  <div className="text-cyan-400 font-mono text-xs font-bold">NEURAL</div>
                  <div className="text-purple-400 font-mono text-[10px]">CORE</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right side domains */}
          <div className="flex-1 grid grid-cols-3 gap-3">
            {rightDomains.map((domain, index) => (
              <DomainCard key={domain.name} domain={domain} index={index} side="right" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TECH CONSTELLATION - Technology tags cloud
// ═══════════════════════════════════════════════════════════════════════════════
function TechConstellation({ isVisible }: { technologies: string[]; isVisible: boolean }) {
  // Organized tech categories with their colors
  const techCategories = [
    {
      label: "Medical AI",
      color: "#22d3ee",
      bg: "rgba(34, 211, 238, 0.1)",
      border: "rgba(34, 211, 238, 0.3)",
      techs: ["MONAI", "VarNet", "U-Net", "DICOM", "Bioconductor", "Genomics"],
    },
    {
      label: "ML/Deep Learning",
      color: "#a855f7",
      bg: "rgba(168, 85, 247, 0.1)",
      border: "rgba(168, 85, 247, 0.3)",
      techs: ["PyTorch", "TensorFlow", "Transformers", "CNNs", "LSTMs", "Scikit-learn"],
    },
    {
      label: "Programming",
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.1)",
      border: "rgba(245, 158, 11, 0.3)",
      techs: ["Python", "Java", "C++", "R", "SQL", "MATLAB"],
    },
    {
      label: "Cloud/Infra",
      color: "#ec4899",
      bg: "rgba(236, 72, 153, 0.1)",
      border: "rgba(236, 72, 153, 0.3)",
      techs: ["AWS", "GCP", "Docker", "Kubernetes", "CUDA"],
    },
    {
      label: "Data Science",
      color: "#10b981",
      bg: "rgba(16, 185, 129, 0.1)",
      border: "rgba(16, 185, 129, 0.3)",
      techs: ["Pandas", "NumPy", "Matplotlib", "OpenCV", "Hugging Face"],
    },
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2))' }}>
      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl">
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.2), rgba(168, 85, 247, 0.2), transparent)', backgroundSize: '200% 100%' }}
          animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative p-8 border border-white/10 rounded-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-emerald-500/10 border border-white/10 mb-4" whileHover={{ scale: 1.02 }}>
            <motion.span className="text-cyan-400" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>◈</motion.span>
            <span className="text-white/80 font-medium">Technologies & Tools</span>
            <motion.span className="text-purple-400" animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>◈</motion.span>
          </motion.div>
          <p className="text-sm text-white/40">Comprehensive tech stack for biomedical AI research</p>
        </div>

        {/* Tech tags - Organized by category rows */}
        <div className="space-y-4">
          {techCategories.map((category, catIndex) => (
            <motion.div
              key={category.label}
              className="flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + catIndex * 0.15 }}
            >
              {category.techs.map((tech, techIndex) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1 + catIndex * 0.15 + techIndex * 0.05, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="group relative"
                >
                  <div
                    className="px-4 py-2 rounded-xl backdrop-blur-md transition-all duration-300 cursor-pointer"
                    style={{ background: category.bg, border: `1px solid ${category.border}` }}
                  >
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ boxShadow: `0 0 20px ${category.color}30` }}
                    />
                    <span className="relative text-sm font-medium" style={{ color: category.color }}>{tech}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 pt-6 border-t border-white/10">
          {techCategories.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}60` }} />
              <span className="text-xs text-white/50">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN SKILLS SECTION
// ═══════════════════════════════════════════════════════════════════════════════
export default function SkillsSection() {
  const { ref, isVisible } = useIntersection<HTMLElement>({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="skills" ref={ref} className="section relative overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1520] via-[#0d0d1a] to-[#0a0a14]" />

      {/* Flowing Background */}
      <FlowingBackground />

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          {/* Animated badge */}
          <motion.div
            className="inline-flex items-center gap-4 px-8 py-3 mb-6 rounded-full border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 via-purple-500/5 to-cyan-500/10 backdrop-blur-md"
            whileHover={{ scale: 1.02, borderColor: 'rgba(34, 211, 238, 0.5)' }}
          >
            {/* Left DNA helix */}
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 rounded-full bg-cyan-400"
                  style={{ height: 8 + Math.sin(i * 1.5) * 6 }}
                  animate={{ height: [8 + Math.sin(i * 1.5) * 6, 8 + Math.cos(i * 1.5) * 6, 8 + Math.sin(i * 1.5) * 6] }}
                  transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                />
              ))}
            </div>

            <span className="text-cyan-400 text-sm font-mono tracking-wider">NEURAL SKILL MATRIX</span>

            {/* Right DNA helix */}
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 rounded-full bg-purple-400"
                  style={{ height: 8 + Math.cos(i * 1.5) * 6 }}
                  animate={{ height: [8 + Math.cos(i * 1.5) * 6, 8 + Math.sin(i * 1.5) * 6, 8 + Math.cos(i * 1.5) * 6] }}
                  transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Technical </span>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Proficiency
            </span>
          </h2>

          <p className="text-white/50 max-w-2xl mx-auto">
            Specialized in medical AI, deep learning, and computational biology
          </p>
        </motion.div>

        {/* Medical Domains - Neural Hub */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30 flex items-center justify-center"
              whileHover={{ rotate: 10 }}
            >
              <div className="w-3 h-3 rounded bg-cyan-400" />
            </motion.div>
            <h3 className="text-xl font-semibold text-white">Medical AI Domains</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
          </div>

          <NeuralDomainHub domains={medicalDomains} isVisible={isVisible} />
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {skillCategories.map((category, index) => {
              const isActive = activeCategory === category.id;
              const colors = categoryColors[category.id];

              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  onClick={() => setActiveCategory(isActive ? null : category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div
                    className="px-5 py-2.5 rounded-xl backdrop-blur-md transition-all duration-300"
                    style={{
                      background: isActive ? `${colors.primary}20` : 'rgba(0,0,0,0.3)',
                      border: `1px solid ${isActive ? colors.primary : 'rgba(255,255,255,0.1)'}`,
                      boxShadow: isActive ? `0 0 20px ${colors.primary}30` : 'none',
                    }}
                  >
                    <span
                      className="text-sm font-medium transition-colors"
                      style={{ color: isActive ? colors.primary : 'rgba(255,255,255,0.7)' }}
                    >
                      {category.title}
                    </span>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="skillActiveTab"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                      style={{ background: colors.primary }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Skills Grid - Holographic Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {skillCategories
                .filter((cat) => !activeCategory || cat.id === activeCategory)
                .map((category, index) => (
                  <HolographicSkillCard
                    key={category.id}
                    category={category}
                    index={index}
                    isVisible={isVisible}
                  />
                ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Technologies - Constellation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <TechConstellation technologies={technologies} isVisible={isVisible} />
        </motion.div>
      </div>
    </section>
  );
}
