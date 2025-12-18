"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useIntersection } from "@/app/hooks/useIntersection";
import { skillCategories, technologies, medicalDomains } from "@/app/constants/skills";

export default function SkillsSection() {
  const { ref, isVisible } = useIntersection<HTMLElement>({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categoryClassMap: Record<string, string> = {
    "medical-ai": "skill-category-medical-ai",
    "ml-ai": "skill-category-ml-ai",
    "bioinformatics": "skill-category-bioinformatics",
    "programming": "skill-category-programming",
    "cloud": "skill-category-cloud",
    "research": "skill-category-research",
  };

  const orbGlowClasses = [
    "bg-cyan-400/20",
    "bg-purple-400/20",
    "bg-emerald-400/20",
    "bg-pink-400/20",
    "bg-amber-400/20",
    "bg-green-400/20",
  ];

  return (
    <section id="skills" ref={ref} className="section relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Neural network grid */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <defs>
              <pattern id="neural-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="rgba(34, 211, 238, 0.5)" />
                <line x1="30" y1="30" x2="60" y2="30" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="0.5" />
                <line x1="30" y1="30" x2="30" y2="60" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural-grid)" />
          </svg>
        </div>

        {/* Floating orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-[100px] ${orbGlowClasses[i]}`}
            style={{
              width: 200 + i * 50,
              height: 200 + i * 50,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
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
            whileHover={{ scale: 1.02, borderColor: "rgba(34, 211, 238, 0.5)" }}
          >
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </div>
            <span className="text-cyan-400 text-sm font-mono tracking-wider">SKILLS & EXPERTISE</span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, delay: 0.9 - i * 0.2, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Arsenal</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Specialized in medical AI, deep learning, and healthcare technology
          </p>
        </motion.div>

        {/* Medical Domains - Orbital Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-cyan-500" />
            Medical AI Domains
            <span className="w-20 h-[1px] bg-gradient-to-r from-cyan-500 to-transparent" />
          </h3>

          <div className="relative">
            {/* Central hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 hidden lg:flex items-center justify-center z-10">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-cyan-400 font-mono text-xs">CORE</span>
            </div>

            {/* Domain cards in orbital arrangement */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {medicalDomains.map((domain, index) => (
                <motion.div
                  key={domain.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <div className="relative p-4 rounded-xl bg-gradient-to-br from-cyber-dark/80 to-cyber-surface/50 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden">
                    {/* Animated corner accents */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-cyan-500/30 rounded-tl-lg group-hover:border-cyan-400 transition-colors" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-cyan-500/30 rounded-br-lg group-hover:border-cyan-400 transition-colors" />

                    {/* Pulse indicator */}
                    <motion.div
                      className="absolute top-3 right-3 w-2 h-2 rounded-full bg-cyan-400"
                      animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Content */}
                    <div className="relative">
                      <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-cyan-400 transition-colors">
                        {domain.name}
                      </h4>
                      <p className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
                        {domain.description}
                      </p>
                    </div>

                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skills Grid - Hexagonal Layout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {skillCategories.map((category, index) => {
              const isActive = activeCategory === category.id;
              const categoryClass = categoryClassMap[category.id];

              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  onClick={() => setActiveCategory(isActive ? null : category.id)}
                  className={`relative group ${categoryClass}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`px-5 py-2.5 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? "skill-tab-active"
                        : "bg-cyber-dark/50 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <span
                      className={`text-sm font-medium transition-colors ${
                        isActive ? "skill-tab-text-active" : "text-white/70 group-hover:text-white"
                      }`}
                    >
                      {category.title}
                    </span>
                  </div>

                  {/* Active indicator beam */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full skill-tab-indicator"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Skills display */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {skillCategories
                .filter((cat) => !activeCategory || cat.id === activeCategory)
                .map((category, categoryIndex) => {
                  const categoryClass = categoryClassMap[category.id];

                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -20 }}
                      transition={{ delay: categoryIndex * 0.1 }}
                      className={`group ${categoryClass}`}
                    >
                      <div className="relative h-full rounded-2xl overflow-hidden">
                        {/* Card background with gradient border */}
                        <div className="absolute inset-0 rounded-2xl opacity-50 skill-card-gradient" />
                        <div className="absolute inset-[1px] rounded-2xl bg-cyber-dark/90" />

                        {/* Top accent line */}
                        <motion.div
                          className="absolute top-0 left-0 right-0 h-[2px] skill-card-accent-line"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />

                        {/* Content */}
                        <div className="relative p-6">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center border skill-icon-container">
                                <motion.div
                                  className="w-3 h-3 rounded-sm skill-icon-box"
                                  animate={{ rotate: [0, 90, 180, 270, 360] }}
                                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                />
                              </div>
                              <h3 className="text-lg font-semibold skill-category-title">
                                {category.title}
                              </h3>
                            </div>

                            {/* Signal strength indicator */}
                            <div className="flex items-end gap-0.5">
                              {[4, 6, 8, 10, 12].map((h, i) => (
                                <motion.div
                                  key={i}
                                  className="w-1 rounded-full skill-signal-bar"
                                  style={{ height: h, opacity: 0.3 + i * 0.15 }}
                                  animate={{ opacity: [0.3 + i * 0.15, 0.8, 0.3 + i * 0.15] }}
                                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Skills list */}
                          <div className="space-y-4">
                            {category.skills.map((skill, skillIndex) => (
                              <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                                onMouseEnter={() => setHoveredSkill(skill.name)}
                                onMouseLeave={() => setHoveredSkill(null)}
                                className="relative"
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm text-white/80 flex items-center gap-2">
                                    <motion.span
                                      className="w-1.5 h-1.5 rounded-full skill-dot"
                                      animate={hoveredSkill === skill.name ? { scale: [1, 1.5, 1] } : {}}
                                      transition={{ duration: 0.5 }}
                                    />
                                    {skill.name}
                                  </span>
                                  <span className="text-xs font-mono skill-level-text">
                                    {skill.level}%
                                  </span>
                                </div>

                                {/* Skill bar container */}
                                <div className="relative h-2 rounded-full bg-cyber-surface overflow-hidden">
                                  {/* Background grid */}
                                  <div className="absolute inset-0 opacity-30 skill-bar-grid" />

                                  {/* Progress bar */}
                                  <motion.div
                                    className="absolute top-0 left-0 h-full rounded-full skill-bar-fill"
                                    initial={{ width: 0 }}
                                    animate={isVisible ? { width: `${skill.level}%` } : {}}
                                    transition={{ duration: 1.2, delay: 0.8 + categoryIndex * 0.1 + skillIndex * 0.05, ease: "easeOut" }}
                                  />

                                  {/* Glow effect */}
                                  <motion.div
                                    className="absolute top-0 h-full w-8 rounded-full blur-sm skill-bar-glow"
                                    style={{ left: `calc(${skill.level}% - 16px)` }}
                                    initial={{ opacity: 0 }}
                                    animate={isVisible ? { opacity: [0, 0.8, 0.4] } : {}}
                                    transition={{ duration: 1.5, delay: 1 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                                  />
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Decorative corner */}
                          <div className="absolute bottom-0 right-0 w-16 h-16 opacity-20 skill-corner-glow" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Technologies - Floating Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="relative rounded-2xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark/80 to-cyber-surface/30" />
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="tech-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#tech-dots)" />
              </svg>
            </div>

            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl">
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
                style={{ backgroundSize: "200% 100%" }}
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <div className="relative p-8 border border-white/5 rounded-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-white mb-2 flex items-center justify-center gap-3">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="text-cyan-400"
                  >
                    ◈
                  </motion.span>
                  Technologies & Tools
                  <motion.span
                    animate={{ rotate: -360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="text-purple-400"
                  >
                    ◈
                  </motion.span>
                </h3>
                <p className="text-sm text-white/40">Hover to explore the tech stack</p>
              </div>

              {/* Tech cloud */}
              <div className="flex flex-wrap justify-center gap-3">
                {technologies.map((tech, index) => {
                  const isMedical = ["MONAI", "VarNet", "U-Net", "DICOM", "Bioconductor", "Genomics"].includes(tech);
                  const isML = ["PyTorch", "TensorFlow", "Transformers", "CNNs", "LSTMs", "Scikit-learn"].includes(tech);

                  let tagClass = "tech-tag-other";
                  if (isMedical) tagClass = "tech-tag-medical";
                  else if (isML) tagClass = "tech-tag-ml";

                  return (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0, rotate: -10 }}
                      animate={isVisible ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                      transition={{ delay: 1 + index * 0.03, type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="group relative"
                    >
                      <div className={`px-4 py-2 rounded-lg border transition-all duration-300 cursor-default ${tagClass}`}>
                        <span className="text-sm font-medium">{tech}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full legend-dot-cyan" />
                  <span className="text-xs text-white/50">Medical AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full legend-dot-purple" />
                  <span className="text-xs text-white/50">ML/Deep Learning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full legend-dot-green" />
                  <span className="text-xs text-white/50">Other Tools</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
