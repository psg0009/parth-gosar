"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useIntersection } from "@/app/hooks/useIntersection";
import { ExternalLink, Briefcase, FlaskConical, GraduationCap, BookOpen, Award, Newspaper, Users, ChevronRight, Sparkles, MapPin, Calendar, ArrowUpRight, Globe, Rocket, Star, Target, Activity, TrendingUp, Crown, Trophy, Building, User, FileText } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { experiences, education, awards, newsArticles, iscJourney, additionalLeadership, publications } from "@/app/constants/experience";
import { useState, useRef, useEffect } from "react";

// ============================================
// GALAXY JOURNEY VISUALIZATION
// A stunning 3D-inspired orbital timeline
// ============================================

type NodeColorKey = "cyan" | "purple" | "pink" | "green" | "amber";

interface GalaxyNode {
  id: string;
  label: string;
  year: string;
  description: string;
  icon: React.ReactNode;
  colorKey: NodeColorKey;
  size: "lg" | "md" | "sm";
  highlight?: boolean;
}

// Map color keys to Tailwind classes
const nodeColorClasses: Record<NodeColorKey, { bg: string; border: string; text: string; shadow: string }> = {
  cyan: { bg: "bg-cyan-400", border: "border-cyan-400", text: "text-cyan-400", shadow: "shadow-cyan-400/30" },
  purple: { bg: "bg-violet-500", border: "border-violet-500", text: "text-violet-500", shadow: "shadow-violet-500/30" },
  pink: { bg: "bg-pink-400", border: "border-pink-400", text: "text-pink-400", shadow: "shadow-pink-400/30" },
  green: { bg: "bg-emerald-400", border: "border-emerald-400", text: "text-emerald-400", shadow: "shadow-emerald-400/30" },
  amber: { bg: "bg-amber-400", border: "border-amber-400", text: "text-amber-400", shadow: "shadow-amber-400/30" },
};

const journeyMilestones: GalaxyNode[] = [
  { id: "psu-start", label: "Penn State Journey Begins", year: "2022", description: "Started BS in Computer Science", icon: <GraduationCap size={20} />, colorKey: "cyan", size: "md" },
  { id: "isc-join", label: "ISC Programming Committee", year: "2022", description: "First step in student leadership", icon: <Users size={20} />, colorKey: "purple", size: "sm" },
  { id: "upua", label: "UPUA Representative", year: "2022", description: "Voice of international students", icon: <Globe size={20} />, colorKey: "pink", size: "sm" },
  { id: "research-start", label: "Research Assistant", year: "2023", description: "IST - Conversational AI", icon: <FlaskConical size={20} />, colorKey: "green", size: "md" },
  { id: "finance-dir", label: "ISC Finance Director", year: "2023", description: "Managing 3000+ student budget", icon: <TrendingUp size={20} />, colorKey: "amber", size: "md" },
  { id: "nlp-intern", label: "NLP Summer Intern", year: "2024", description: "Influenza Predictive Analysis", icon: <Activity size={20} />, colorKey: "cyan", size: "sm" },
  { id: "isc-president", label: "60th ISC President", year: "2024", description: "Historic leadership milestone", icon: <Star size={20} />, colorKey: "green", size: "lg", highlight: true },
  { id: "cob", label: "Oversight Board Member", year: "2024", description: "State College Borough", icon: <Target size={20} />, colorKey: "purple", size: "sm" },
  { id: "insurespectre", label: "Founded INSURESPECTRE", year: "2025", description: "AI Insurance Platform", icon: <Rocket size={20} />, colorKey: "pink", size: "md" },
  { id: "oswald", label: "John W. Oswald Award", year: "2025", description: "Highest student honor", icon: <Award size={20} />, colorKey: "amber", size: "lg", highlight: true },
  { id: "usc-start", label: "USC MS Journey", year: "2025", description: "AI specialization begins", icon: <GraduationCap size={20} />, colorKey: "green", size: "lg", highlight: true },
  { id: "usc-research", label: "Dual Lab Research", year: "2025", description: "MRI & Epigenetics Labs", icon: <FlaskConical size={20} />, colorKey: "cyan", size: "md" },
];

// Constellation background with animated stars
function ConstellationBackground() {
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 3,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white dynamic-position dynamic-size"
          style={{
            ['--pos-x' as string]: `${star.x}%`,
            ['--pos-y' as string]: `${star.y}%`,
            ['--size' as string]: `${star.size}px`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Floating particle system
const particleColors = ["particle-green", "particle-cyan", "particle-purple", "particle-pink"];

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }, (_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full dynamic-position ${particleColors[i % 4]}`}
          style={{
            ['--pos-x' as string]: `${Math.random() * 100}%`,
            ['--pos-y' as string]: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Galaxy orbital path visualization - Grid-based layout (no inline styles)
function GalaxyOrbit({ selectedNode, onNodeSelect }: { selectedNode: string | null; onNodeSelect: (id: string) => void }) {
  const colorClasses = nodeColorClasses;

  // Node sizes for Tailwind classes
  const nodeSizeClasses = {
    lg: "w-14 h-14",
    md: "w-12 h-12",
    sm: "w-10 h-10",
  };

  // Grid positions for nodes (using CSS grid areas)
  const gridPositions = [
    "col-start-3 row-start-1", // psu-start - top center
    "col-start-5 row-start-1", // isc-join - top right
    "col-start-6 row-start-2", // upua - right upper
    "col-start-6 row-start-3", // research-start - right middle
    "col-start-5 row-start-4", // finance-dir - right lower
    "col-start-4 row-start-5", // nlp-intern - bottom right
    "col-start-3 row-start-5", // isc-president - bottom center
    "col-start-2 row-start-5", // cob - bottom left
    "col-start-1 row-start-4", // insurespectre - left lower
    "col-start-1 row-start-3", // oswald - left middle
    "col-start-1 row-start-2", // usc-start - left upper
    "col-start-2 row-start-1", // usc-research - top left
  ];

  return (
    <div className="relative w-full py-8">
      {/* Central glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/30 via-secondary/20 to-accent/30 blur-3xl w-[200px] h-[200px] pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Center label */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center w-40 pointer-events-none z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="text-2xl font-bold gradient-text">Journey</span>
        <span className="text-xs text-white/50 font-mono">2022 - Present</span>
      </motion.div>

      {/* Grid-based node layout */}
      <div className="grid grid-cols-6 grid-rows-5 gap-4 md:gap-6 max-w-4xl mx-auto px-4 min-h-[400px] md:min-h-[500px]">
        {journeyMilestones.map((node, index) => {
          const isSelected = selectedNode === node.id;
          const colors = colorClasses[node.colorKey];
          const sizeClass = nodeSizeClasses[node.size];

          const pulseColorClass = {
            cyan: "bg-cyan-400",
            purple: "bg-violet-500",
            pink: "bg-pink-400",
            green: "bg-emerald-400",
            amber: "bg-amber-400",
          }[node.colorKey];

          const bgClass = isSelected ? pulseColorClass : "bg-cyber-dark/80";
          const textClass = isSelected ? "text-black" : colors.text;

          return (
            <motion.div
              key={node.id}
              className={`${gridPositions[index]} flex flex-col items-center justify-center cursor-pointer`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.08, type: "spring", stiffness: 200 }}
              onClick={() => onNodeSelect(node.id)}
            >
              <div className="relative">
                {/* Pulse ring for highlighted nodes */}
                {node.highlight && (
                  <motion.div
                    className={`absolute inset-0 rounded-full ${pulseColorClass}`}
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.4, 0, 0.4],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Selection ring */}
                {isSelected && (
                  <motion.div
                    className={`absolute -inset-2 rounded-full border-2 ${colors.border}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring" }}
                  />
                )}

                {/* Node */}
                <motion.div
                  className={`relative flex items-center justify-center rounded-full border-2 backdrop-blur-sm ${sizeClass} ${bgClass} ${colors.border} shadow-lg`}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={textClass}>{node.icon}</span>
                </motion.div>
              </div>

              {/* Year label */}
              <motion.div
                className={`mt-2 text-xs font-mono whitespace-nowrap ${colors.text}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {node.year}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Selected node detail card
function NodeDetailCard({ node }: { node: GalaxyNode | null }) {
  if (!node) return null;

  const colorClasses = nodeColorClasses[node.colorKey];
  const borderColorClass = {
    cyan: "border-l-cyan-400",
    purple: "border-l-violet-500",
    pink: "border-l-pink-400",
    green: "border-l-emerald-400",
    amber: "border-l-amber-400",
  }[node.colorKey];

  const bgColorClass = {
    cyan: "bg-cyan-400/20 border-cyan-400/40",
    purple: "bg-violet-500/20 border-violet-500/40",
    pink: "bg-pink-400/20 border-pink-400/40",
    green: "bg-emerald-400/20 border-emerald-400/40",
    amber: "bg-amber-400/20 border-amber-400/40",
  }[node.colorKey];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative overflow-hidden"
    >
      <Card variant="glass" padding="lg" className={`border-l-4 ${borderColorClass}`}>
        {/* Animated background gradient */}
        <motion.div
          className={`absolute inset-0 opacity-20 bg-gradient-radial from-current to-transparent ${colorClasses.text}`}
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative">
          <div className="flex items-start gap-4">
            <motion.div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${bgColorClass}`}
              whileHover={{ rotate: 10 }}
            >
              <span className={colorClasses.text}>{node.icon}</span>
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-white">{node.label}</h3>
                {node.highlight && (
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  </motion.span>
                )}
              </div>
              <p className="text-white/70">{node.description}</p>
              <Badge variant="outline" size="sm" className={`mt-2 ${colorClasses.border} ${colorClasses.text}`}>
                {node.year}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ============================================
// TABS AND CONTENT SECTIONS
// ============================================

const tabs = [
  { id: "journey", label: "Journey", icon: Rocket, color: "gradient", hex: "#00ff88" },
  { id: "work", label: "Work", icon: Briefcase, color: "primary", hex: "#00ff88" },
  { id: "research", label: "Research", icon: FlaskConical, color: "secondary", hex: "#8b5cf6" },
  { id: "teaching", label: "Teaching", icon: BookOpen, color: "accent", hex: "#f472b6" },
  { id: "publications", label: "Publications", icon: BookOpen, color: "cyan", hex: "#22d3ee" },
  { id: "education", label: "Education", icon: GraduationCap, color: "emerald", hex: "#10b981" },
  { id: "awards", label: "Awards", icon: Award, color: "amber", hex: "#fbbf24" },
  { id: "news", label: "News", icon: Newspaper, color: "pink", hex: "#f472b6" },
  { id: "leadership", label: "Leadership", icon: Users, color: "purple", hex: "#a855f7" },
];

export default function ExperienceSection() {
  const { ref, isVisible } = useIntersection<HTMLElement>({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState("journey");
  const [selectedNode, setSelectedNode] = useState<string | null>("oswald");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

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

  // Sort function: "Present" first, then by most recent date
  const sortByDate = (a: typeof experiences[0], b: typeof experiences[0]) => {
    const getDateValue = (dateStr: string) => {
      if (dateStr === "Present") return Infinity;
      const months: Record<string, number> = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };
      const [month, year] = dateStr.split(" ");
      return parseInt(year) * 12 + (months[month] || 0);
    };
    return getDateValue(b.endDate) - getDateValue(a.endDate);
  };

  const workExperiences = experiences.filter((e) => e.type === "work").sort(sortByDate);
  const researchExperiences = experiences.filter((e) => e.type === "research").sort(sortByDate);
  const teachingExperiences = experiences.filter((e) => e.type === "teaching").sort(sortByDate);

  const selectedMilestone = journeyMilestones.find(n => n.id === selectedNode) || null;

  return (
    <section id="experience" ref={ref} className="section relative overflow-hidden bg-gradient-to-b from-cyber-dark via-[#0a0a14] to-cyber-dark">
      {/* Galaxy Background */}
      <ConstellationBackground />
      <FloatingParticles />

      {/* Ambient gradient orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[200px]"
        animate={{
          scale: [1.2, 1, 1.2],
          y: [0, -50, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div ref={containerRef} className="relative container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/20 border border-white/10 rounded-full mb-6 backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Rocket size={18} className="text-primary" />
              </motion.div>
              <span className="text-white/80 text-sm font-mono tracking-wider">EXPERIENCE & JOURNEY</span>
              <motion.div
                className="w-2 h-2 rounded-full bg-primary"
                animate={{
                  boxShadow: ["0 0 0 0 rgba(0, 255, 136, 0.4)", "0 0 0 10px rgba(0, 255, 136, 0)", "0 0 0 0 rgba(0, 255, 136, 0.4)"],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              From research labs to startup boardrooms — building impactful solutions that shape the future
            </p>
          </motion.div>

          {/* QUANTUM HOLOGRAPHIC TAB NAVIGATOR */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="relative">
              {/* Ambient energy field */}
              <motion.div
                className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
                animate={{
                  background: [
                    `radial-gradient(ellipse at 20% 50%, ${tabs.find(t => t.id === activeTab)?.hex}40, transparent 50%)`,
                    `radial-gradient(ellipse at 80% 50%, ${tabs.find(t => t.id === activeTab)?.hex}40, transparent 50%)`,
                    `radial-gradient(ellipse at 20% 50%, ${tabs.find(t => t.id === activeTab)?.hex}40, transparent 50%)`,
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Main container with holographic border */}
              <div className="relative p-1 rounded-3xl bg-gradient-to-r from-white/10 via-white/5 to-white/10">
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-50"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${tabs.find(t => t.id === activeTab)?.hex}30, transparent)`,
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["200% 0%", "-200% 0%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                <div className="relative bg-cyber-dark/80 backdrop-blur-2xl rounded-3xl p-6 overflow-hidden">
                  {/* Scanline effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-[0.03] scanline-bg"
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />

                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(15)].map((_, i) => {
                      const activeTabData = tabs.find(t => t.id === activeTab);
                      const particleColorClass = activeTabData?.color === "primary" ? "particle-green"
                        : activeTabData?.color === "secondary" ? "particle-purple"
                        : activeTabData?.color === "accent" ? "particle-pink"
                        : activeTabData?.color === "cyan" ? "particle-cyan"
                        : activeTabData?.color === "emerald" ? "particle-green"
                        : activeTabData?.color === "amber" ? "particle-green"
                        : activeTabData?.color === "pink" ? "particle-pink"
                        : activeTabData?.color === "purple" ? "particle-purple"
                        : "particle-green";
                      return (
                        <motion.div
                          key={i}
                          className={`absolute w-1 h-1 rounded-full ${particleColorClass} tab-particle-${i + 1}`}
                          animate={{
                            y: ["100%", "-100%"],
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                          }}
                          transition={{
                            duration: 3 + Math.random() * 2,
                            delay: i * 0.2,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Tab grid */}
                  <div className="relative grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
                    {tabs.map((tab, index) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;

                      return (
                        <motion.button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className="relative group"
                          initial={{ opacity: 0, y: 20, rotateX: -30 }}
                          animate={{ opacity: 1, y: 0, rotateX: 0 }}
                          transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
                          whileHover={{ scale: 1.05, y: -4 }}
                          whileTap={{ scale: 0.95 }}
                          style={{ perspective: "1000px" }}
                        >
                          {/* Card container */}
                          <motion.div
                            className={`
                              relative flex flex-col items-center gap-2 p-4 rounded-2xl
                              border transition-all duration-500 overflow-hidden
                              ${isActive
                                ? "bg-black/60 border-transparent"
                                : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.05]"
                              }
                            `}
                            style={{
                              boxShadow: isActive
                                ? `0 0 30px ${tab.hex}30, 0 0 60px ${tab.hex}15, inset 0 1px 0 ${tab.hex}40`
                                : "none",
                            }}
                            animate={isActive ? {
                              borderColor: [tab.hex + "60", tab.hex + "30", tab.hex + "60"],
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {/* Holographic shine effect */}
                            <motion.div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                background: `linear-gradient(135deg, transparent 30%, ${tab.hex}20 50%, transparent 70%)`,
                              }}
                              animate={isActive ? {
                                background: [
                                  `linear-gradient(135deg, transparent 0%, ${tab.hex}30 25%, transparent 50%)`,
                                  `linear-gradient(135deg, transparent 50%, ${tab.hex}30 75%, transparent 100%)`,
                                  `linear-gradient(135deg, transparent 0%, ${tab.hex}30 25%, transparent 50%)`,
                                ],
                              } : {}}
                              transition={{ duration: 2, repeat: Infinity }}
                            />

                            {/* Active state outer glow rings */}
                            {isActive && (
                              <>
                                <motion.div
                                  className="absolute -inset-px rounded-2xl"
                                  style={{ border: `1px solid ${tab.hex}` }}
                                  animate={{
                                    opacity: [0.8, 0.3, 0.8],
                                  }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <motion.div
                                  className="absolute -inset-1 rounded-2xl pointer-events-none"
                                  style={{ border: `1px solid ${tab.hex}40` }}
                                  animate={{
                                    scale: [1, 1.05, 1],
                                    opacity: [0.5, 0, 0.5],
                                  }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                              </>
                            )}

                            {/* Hexagonal icon container */}
                            <motion.div
                              className={`
                                relative w-10 h-10 flex items-center justify-center
                                ${isActive ? "" : "group-hover:scale-110"}
                                transition-transform duration-300
                              `}
                              animate={isActive ? {
                                rotate: [0, 5, -5, 0],
                              } : {}}
                              transition={{ duration: 4, repeat: Infinity }}
                            >
                              {/* Hexagon background */}
                              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 40 40">
                                <defs>
                                  <linearGradient id={`hexGrad-${tab.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={isActive ? tab.hex : "rgba(255,255,255,0.1)"} />
                                    <stop offset="100%" stopColor={isActive ? tab.hex + "80" : "rgba(255,255,255,0.05)"} />
                                  </linearGradient>
                                </defs>
                                <polygon
                                  points="20,2 36,11 36,29 20,38 4,29 4,11"
                                  fill={`url(#hexGrad-${tab.id})`}
                                  stroke={isActive ? tab.hex : "rgba(255,255,255,0.2)"}
                                  strokeWidth="1"
                                />
                              </svg>

                              {/* Icon */}
                              <motion.div
                                className="relative z-10"
                                animate={isActive ? {
                                  filter: [
                                    `drop-shadow(0 0 3px ${tab.hex})`,
                                    `drop-shadow(0 0 8px ${tab.hex})`,
                                    `drop-shadow(0 0 3px ${tab.hex})`,
                                  ],
                                } : {}}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <Icon
                                  size={18}
                                  className={isActive ? "text-black" : "text-white/60 group-hover:text-white transition-colors"}
                                />
                              </motion.div>
                            </motion.div>

                            {/* Label */}
                            <motion.span
                              className={`
                                text-xs font-medium tracking-wide transition-all duration-300
                                ${isActive ? "text-white" : "text-white/40 group-hover:text-white/80"}
                              `}
                              style={{
                                textShadow: isActive ? `0 0 20px ${tab.hex}` : "none",
                              }}
                            >
                              {tab.label}
                            </motion.span>

                            {/* Active indicator dot */}
                            {isActive && (
                              <motion.div
                                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: tab.hex }}
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [1, 0.5, 1],
                                }}
                                transition={{ duration: 1, repeat: Infinity }}
                              />
                            )}

                            {/* Corner accents for active */}
                            {isActive && (
                              <div className={`contents tab-color-${tab.color}`}>
                                <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 rounded-tl-lg tab-corner-accent" />
                                <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 rounded-tr-lg tab-corner-accent" />
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 rounded-bl-lg tab-corner-accent" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 rounded-br-lg tab-corner-accent" />
                              </div>
                            )}
                          </motion.div>

                          {/* Connection beam to content when active */}
                          {isActive && (
                            <div className={`tab-color-${tab.color}`}>
                              <motion.div
                                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-px h-6 tab-connection-beam"
                                initial={{ scaleY: 0, opacity: 0 }}
                                animate={{ scaleY: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              />
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Bottom status bar */}
                  <motion.div
                    className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ ['--tab-color' as string]: tabs.find(t => t.id === activeTab)?.hex }}
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-2 h-2 rounded-full tab-indicator-dot"
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="text-xs font-mono text-white/40 tracking-widest">
                        VIEWING: <span className="font-semibold tab-viewing-text">{activeTab.toUpperCase()}</span>
                      </span>
                    </div>
                    <div className="text-xs font-mono text-white/20">
                      [{tabs.findIndex(t => t.id === activeTab) + 1}/{tabs.length}]
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {/* JOURNEY TAB - Galaxy Visualization */}
            {activeTab === "journey" && (
              <motion.div
                key="journey"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Galaxy Orbit Visualization */}
                <motion.div
                  className="relative rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-b from-cyber-card/50 to-transparent backdrop-blur-sm"
                  variants={itemVariants}
                >
                  <GalaxyOrbit selectedNode={selectedNode} onNodeSelect={setSelectedNode} />
                </motion.div>

                {/* Selected Node Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <AnimatePresence mode="wait">
                    <NodeDetailCard key={selectedNode} node={selectedMilestone} />
                  </AnimatePresence>

                  {/* Quick Journey Stats */}
                  <motion.div variants={itemVariants}>
                    <Card variant="glass" padding="lg" className="h-full">
                      <div className="flex items-center gap-2 mb-6">
                        <Activity size={18} className="text-primary" />
                        <span className="font-mono text-sm text-white/60">JOURNEY METRICS</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <motion.div
                          className="stat-cyan p-4 rounded-xl text-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="stat-icon flex justify-center mb-2"><Calendar size={16} /></div>
                          <div className="stat-value text-2xl font-bold font-mono">3+</div>
                          <div className="text-xs text-white/40">Years Active</div>
                        </motion.div>
                        <motion.div
                          className="stat-purple p-4 rounded-xl text-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="stat-icon flex justify-center mb-2"><Briefcase size={16} /></div>
                          <div className="stat-value text-2xl font-bold font-mono">12+</div>
                          <div className="text-xs text-white/40">Roles Held</div>
                        </motion.div>
                        <motion.div
                          className="stat-green p-4 rounded-xl text-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="stat-icon flex justify-center mb-2"><BookOpen size={16} /></div>
                          <div className="stat-value text-2xl font-bold font-mono">3+</div>
                          <div className="text-xs text-white/40">Publications</div>
                        </motion.div>
                        <motion.div
                          className="stat-pink p-4 rounded-xl text-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="stat-icon flex justify-center mb-2"><Users size={16} /></div>
                          <div className="stat-value text-2xl font-bold font-mono">3K+</div>
                          <div className="text-xs text-white/40">Students Led</div>
                        </motion.div>
                      </div>
                    </Card>
                  </motion.div>
                </div>

                {/* Instruction hint */}
                <motion.p
                  className="text-center text-white/40 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  Click on any node in the orbit to explore that milestone
                </motion.p>
              </motion.div>
            )}

            {/* WORK TAB */}
            {activeTab === "work" && (
              <motion.div
                key="work"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -20 }}
                className="space-y-20"
              >
                {workExperiences.map((exp, index) => (
                  <motion.div key={exp.id} variants={itemVariants}>
                    <EnhancedTimelineCard
                      title={exp.role}
                      subtitle={exp.company}
                      location={exp.location}
                      date={`${exp.startDate} - ${exp.endDate}`}
                      description={exp.description}
                      index={index}
                      isLast={index === workExperiences.length - 1}
                      url={exp.url}
                      isVisible={isVisible}
                      isHovered={hoveredCard === exp.id}
                      onHover={() => setHoveredCard(exp.id)}
                      onLeave={() => setHoveredCard(null)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* RESEARCH TAB */}
            {activeTab === "research" && (
              <motion.div
                key="research"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -20 }}
                className="space-y-20"
              >
                {researchExperiences.map((exp, index) => (
                  <motion.div key={exp.id} variants={itemVariants}>
                    <EnhancedTimelineCard
                      title={exp.role}
                      subtitle={exp.company}
                      location={exp.location}
                      date={`${exp.startDate} - ${exp.endDate}`}
                      description={exp.description}
                      index={index}
                      isLast={index === researchExperiences.length - 1}
                      color="secondary"
                      url={exp.url}
                      isVisible={isVisible}
                      isHovered={hoveredCard === exp.id}
                      onHover={() => setHoveredCard(exp.id)}
                      onLeave={() => setHoveredCard(null)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* TEACHING TAB */}
            {activeTab === "teaching" && (
              <motion.div
                key="teaching"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -20 }}
                className="space-y-20"
              >
                {teachingExperiences.map((exp, index) => (
                  <motion.div key={exp.id} variants={itemVariants}>
                    <EnhancedTimelineCard
                      title={exp.role}
                      subtitle={exp.company}
                      location={exp.location}
                      date={`${exp.startDate} - ${exp.endDate}`}
                      description={exp.description}
                      index={index}
                      isLast={index === teachingExperiences.length - 1}
                      color="accent"
                      isVisible={isVisible}
                      isHovered={hoveredCard === exp.id}
                      onHover={() => setHoveredCard(exp.id)}
                      onLeave={() => setHoveredCard(null)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* PUBLICATIONS TAB */}
            {activeTab === "publications" && (
              <motion.div
                key="publications"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                {/* Published - Hero Card Style */}
                <div className="relative">
                  {/* Section Header with Animated Line */}
                  <motion.div
                    className="flex items-center gap-4 mb-6"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-green-500 flex items-center justify-center shadow-lg shadow-primary/30"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Sparkles size={24} className="text-black" />
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-primary/50"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white tracking-tight">Published Research</h3>
                      <motion.div
                        className="h-0.5 bg-gradient-to-r from-primary via-green-400 to-transparent mt-1"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                    <Badge variant="primary" className="animate-pulse">Peer Reviewed</Badge>
                  </motion.div>

                  {/* Published Cards */}
                  <div className="space-y-5">
                    {publications.filter((p) => p.status === "published").map((pub, i) => (
                      <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, y: 30, rotateX: -15 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
                        className="group perspective-1200"
                      >
                        <div className="relative bg-gradient-to-br from-cyber-surface via-cyber-surface to-primary/5 rounded-2xl border border-primary/30 overflow-hidden hover:border-primary/60 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
                          {/* Animated Background Pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,255,136,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
                          </div>

                          {/* Top Accent Bar */}
                          <motion.div
                            className="h-1 bg-gradient-to-r from-primary via-green-400 to-emerald-500"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: i * 0.15 + 0.3, duration: 0.5 }}
                          />

                          <div className="p-6 relative">
                            {/* Status Indicator */}
                            <div className="absolute top-4 right-4 flex items-center gap-2">
                              <motion.div
                                className="w-2 h-2 rounded-full bg-primary"
                                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              <span className="text-xs text-primary font-mono uppercase tracking-wider">Published</span>
                            </div>

                            {/* Content */}
                            <div className="pr-24">
                              <motion.h4
                                className="text-lg font-semibold text-white mb-3 leading-relaxed group-hover:text-primary transition-colors duration-300"
                                whileHover={{ x: 5 }}
                              >
                                {pub.title}
                              </motion.h4>

                              <div className="flex items-center gap-2 mb-4">
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                  <User size={12} className="text-primary" />
                                </div>
                                <p className="text-white/70 text-sm font-medium">{pub.authors}</p>
                              </div>

                              <div className="flex flex-wrap items-center gap-3">
                                <div className="px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/20">
                                  <span className="text-primary text-sm font-medium">{pub.venue}</span>
                                </div>
                                <div className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                                  <span className="text-white/60 text-sm">{pub.date}</span>
                                </div>
                                {pub.url && (
                                  <motion.a
                                    href={pub.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto flex items-center gap-2 px-4 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/30 text-primary text-sm font-medium transition-all"
                                    whileHover={{ scale: 1.05, x: 3 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <span>Read Paper</span>
                                    <ExternalLink size={14} />
                                  </motion.a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Under Review - Stacked Card Style */}
                <div className="relative">
                  <motion.div
                    className="flex items-center gap-4 mb-6"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <motion.div
                      className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-secondary/30"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <BookOpen size={24} className="text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white tracking-tight">Under Review</h3>
                      <motion.div
                        className="h-0.5 bg-gradient-to-r from-secondary via-purple-400 to-transparent mt-1"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      />
                    </div>
                    <motion.div
                      className="flex items-center gap-2 px-3 py-1 bg-secondary/10 rounded-full border border-secondary/30"
                      animate={{ opacity: [1, 0.6, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                      <span className="text-xs text-secondary font-mono">In Progress</span>
                    </motion.div>
                  </motion.div>

                  <div className="space-y-4">
                    {publications.filter((p) => p.status === "under_review").map((pub, i) => (
                      <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, x: -20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
                        whileHover={{ x: 8, scale: 1.01 }}
                        className="group"
                      >
                        <div className="relative bg-cyber-surface rounded-xl border border-secondary/20 overflow-hidden hover:border-secondary/50 transition-all duration-300">
                          {/* Left Accent */}
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary via-purple-500 to-pink-500" />

                          {/* Scanning Line Effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          />

                          <div className="p-5 pl-6 relative">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <motion.h4
                                  className="text-white font-semibold mb-2 group-hover:text-secondary transition-colors"
                                  whileHover={{ x: 3 }}
                                >
                                  {pub.title}
                                </motion.h4>
                                <p className="text-white/60 text-sm mb-3">{pub.authors}</p>
                                <div className="flex flex-wrap items-center gap-2">
                                  <Badge variant="secondary" size="sm" className="bg-secondary/10">{pub.venue}</Badge>
                                  <motion.div
                                    className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/10 rounded-full border border-amber-500/30"
                                    animate={{ opacity: [1, 0.7, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                    <span className="text-xs text-amber-400 font-medium">Pending Review</span>
                                  </motion.div>
                                </div>
                              </div>
                              <motion.div
                                className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                              >
                                <FileText size={18} className="text-secondary" />
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Preprints - Futuristic Grid Style */}
                <div className="relative">
                  <motion.div
                    className="flex items-center gap-4 mb-6"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <motion.div
                      className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Newspaper size={24} className="text-white" />
                      <motion.div
                        className="absolute -inset-1 rounded-2xl border border-cyan-400/50"
                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white tracking-tight">Preprints</h3>
                      <motion.div
                        className="h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-transparent mt-1"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      />
                    </div>
                    <div className="px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/30">
                      <span className="text-xs text-cyan-400 font-mono">Open Access</span>
                    </div>
                  </motion.div>

                  <div className="grid gap-4">
                    {publications.filter((p) => p.status === "preprint").map((pub, i) => (
                      <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: i * 0.12 + 0.5, type: "spring", stiffness: 120 }}
                        whileHover={{ y: -4 }}
                        className="group"
                      >
                        <div className="relative bg-gradient-to-br from-cyber-surface via-cyber-surface to-cyan-950/30 rounded-xl border border-cyan-500/20 overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
                          {/* Holographic Corner */}
                          <div className="absolute top-0 right-0 w-24 h-24">
                            <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/20 via-transparent to-transparent" />
                            <motion.div
                              className="absolute top-2 right-2 w-16 h-16 border border-cyan-500/30 rounded-lg"
                              animate={{ rotate: 45, scale: [1, 1.1, 1] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            />
                          </div>

                          <div className="p-5 relative">
                            <div className="flex items-start gap-4">
                              {/* Index Number */}
                              <motion.div
                                className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0"
                                whileHover={{ scale: 1.1, rotate: 10 }}
                              >
                                <span className="text-cyan-400 font-mono font-bold">{String(i + 1).padStart(2, '0')}</span>
                              </motion.div>

                              <div className="flex-1 min-w-0">
                                <motion.h4
                                  className="text-white font-semibold mb-2 group-hover:text-cyan-400 transition-colors leading-snug"
                                  whileHover={{ x: 3 }}
                                >
                                  {pub.title}
                                </motion.h4>
                                <p className="text-white/60 text-sm mb-3">{pub.authors}</p>

                                <div className="flex flex-wrap items-center gap-2">
                                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                    <Calendar size={12} className="text-cyan-400" />
                                    <span className="text-cyan-400 text-xs font-medium">{pub.date}</span>
                                  </div>
                                  <Badge variant="outline" size="sm" className="border-cyan-500/30 text-cyan-400">{pub.venue}</Badge>
                                </div>

                                {/* DOI Link */}
                                {pub.doi && (
                                  <motion.div
                                    className="mt-3 pt-3 border-t border-cyan-500/10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.1 + 0.7 }}
                                  >
                                    <a
                                      href={`https://doi.org/${pub.doi}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 text-xs text-cyan-400/80 hover:text-cyan-400 font-mono group/doi"
                                    >
                                      <span className="px-2 py-0.5 bg-cyan-500/10 rounded">DOI</span>
                                      <span className="truncate max-w-[200px] group-hover/doi:underline">{pub.doi}</span>
                                      <ExternalLink size={10} className="flex-shrink-0" />
                                    </a>
                                  </motion.div>
                                )}
                              </div>

                              {/* Action Button */}
                              {pub.url && (
                                <motion.a
                                  href={pub.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center hover:bg-cyan-500/20 transition-colors"
                                  whileHover={{ scale: 1.1, rotate: 15 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <ExternalLink size={16} className="text-cyan-400" />
                                </motion.a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* EDUCATION TAB */}
            {activeTab === "education" && (
              <motion.div
                key="education"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Section Header */}
                <motion.div
                  className="flex items-center gap-4 mb-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  >
                    <GraduationCap size={28} className="text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white tracking-tight">Academic Journey</h3>
                    <motion.div
                      className="h-0.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-transparent mt-1"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                </motion.div>

                {/* Education Cards - Timeline Style */}
                <div className="relative">
                  {/* Vertical Timeline Line */}
                  <motion.div
                    className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 via-teal-500 to-cyan-500"
                    initial={{ scaleY: 0, originY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />

                  <div className="space-y-8">
                    {education.map((edu, index) => (
                      <motion.div
                        key={edu.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + 0.4, type: "spring", stiffness: 100 }}
                        className="relative pl-16 group"
                      >
                        {/* Timeline Node */}
                        <motion.div
                          className="absolute left-3 top-6 w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center z-10 shadow-lg shadow-emerald-500/30"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.2 + 0.5, type: "spring" }}
                        >
                          <motion.div
                            className="absolute inset-0 rounded-full bg-emerald-400"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                          />
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </motion.div>

                        {/* Education Card */}
                        <div className="relative bg-gradient-to-br from-cyber-surface via-cyber-surface to-emerald-950/20 rounded-2xl border border-emerald-500/20 overflow-hidden hover:border-emerald-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 group-hover:translate-x-2">
                          {/* Animated Top Border */}
                          <motion.div
                            className="h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: index * 0.2 + 0.6, duration: 0.5 }}
                          />

                          {/* Holographic Effect */}
                          <div className="absolute top-0 right-0 w-32 h-32">
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-bl from-emerald-500/10 via-transparent to-transparent"
                              animate={{ opacity: [0.3, 0.6, 0.3] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            />
                          </div>

                          <div className="p-6 relative">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                              <div className="flex-1">
                                {/* Degree */}
                                <motion.h3
                                  className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors"
                                  whileHover={{ x: 5 }}
                                >
                                  {edu.degree}
                                </motion.h3>

                                {/* School */}
                                <div className="flex items-center gap-3 mb-3">
                                  <motion.div
                                    className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"
                                    whileHover={{ rotate: 10 }}
                                  >
                                    <Building size={16} className="text-emerald-400" />
                                  </motion.div>
                                  <span className="text-emerald-400 font-semibold">{edu.school}</span>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-2 text-white/50 text-sm">
                                  <MapPin size={14} className="text-emerald-400/60" />
                                  <span>{edu.location}</span>
                                </div>

                                {/* Focus */}
                                {edu.focus && (
                                  <motion.div
                                    className="mt-4 p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.2 + 0.8 }}
                                  >
                                    <p className="text-white/70 text-sm">
                                      <span className="text-emerald-400 font-medium">Focus: </span>{edu.focus}
                                    </p>
                                  </motion.div>
                                )}
                              </div>

                              {/* Right Side - Date & GPA */}
                              <div className="flex flex-col items-end gap-3">
                                {/* Date Badge */}
                                <motion.div
                                  className="px-4 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <div className="flex items-center gap-2">
                                    <Calendar size={14} className="text-emerald-400" />
                                    <span className="text-emerald-400 font-medium text-sm">
                                      {edu.startDate} - {edu.endDate}
                                    </span>
                                  </div>
                                </motion.div>

                                {/* GPA Display */}
                                {edu.gpa && (
                                  <motion.div
                                    className="relative"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: index * 0.2 + 0.7, type: "spring" }}
                                  >
                                    <div className="px-4 py-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 rounded-xl border border-emerald-500/30 relative overflow-hidden">
                                      <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent"
                                        animate={{ x: ["-100%", "200%"] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                      />
                                      <div className="relative text-center">
                                        <span className="text-xs text-emerald-400/70 font-mono uppercase tracking-wider">GPA</span>
                                        <p className="text-2xl font-bold text-emerald-400 font-mono">{edu.gpa}</p>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* AWARDS TAB */}
            {activeTab === "awards" && (
              <motion.div
                key="awards"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Section Header */}
                <motion.div
                  className="flex items-center gap-4 mb-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.div
                    className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/30"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Trophy size={28} className="text-white" />
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{ background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)" }}
                      animate={{ backgroundPosition: ["200% 200%", "-200% -200%"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white tracking-tight">Achievements & Recognition</h3>
                    <motion.div
                      className="h-0.5 bg-gradient-to-r from-amber-400 via-orange-400 to-transparent mt-1"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                  <motion.div
                    className="px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/30 flex items-center gap-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs text-amber-400 font-mono">{awards.length} Awards</span>
                  </motion.div>
                </motion.div>

                {/* Awards Grid - Trophy Case Style */}
                <div className="grid sm:grid-cols-2 gap-5">
                  {awards.map((award, i) => (
                    <motion.div
                      key={award.id}
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: i * 0.1 + 0.3, type: "spring", stiffness: 100 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group"
                    >
                      <div className="relative h-full bg-gradient-to-br from-cyber-surface via-cyber-surface to-amber-950/20 rounded-2xl border border-amber-500/20 overflow-hidden hover:border-amber-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20">
                        {/* Golden Shimmer Effect */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ background: "linear-gradient(45deg, transparent 30%, rgba(251,191,36,0.1) 50%, transparent 70%)" }}
                          animate={{ backgroundPosition: ["200% 200%", "-200% -200%"] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />

                        {/* Top Accent */}
                        <motion.div
                          className="h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: i * 0.1 + 0.4, duration: 0.5 }}
                        />

                        {/* Award Ribbon Effect */}
                        <div className="absolute top-0 right-4 w-8 h-12 overflow-hidden">
                          <motion.div
                            className="w-full h-full bg-gradient-to-b from-amber-500 to-amber-600"
                            initial={{ y: -50 }}
                            animate={{ y: 0 }}
                            transition={{ delay: i * 0.1 + 0.5, type: "spring" }}
                          >
                            <div className="absolute bottom-0 left-0 border-l-[16px] border-r-[16px] border-b-[8px] border-l-amber-500 border-r-amber-500 border-b-transparent" />
                          </motion.div>
                        </div>

                        <div className="p-5 relative">
                          <div className="flex items-start gap-4">
                            {/* Award Icon */}
                            <motion.div
                              className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                              whileHover={{ rotate: 15, scale: 1.1 }}
                              transition={{ type: "spring" }}
                            >
                              <Award size={24} className="text-amber-400 relative z-10" />
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-t from-amber-400/20 to-transparent"
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            </motion.div>

                            <div className="flex-1 min-w-0">
                              {/* Award Title */}
                              <motion.h3
                                className="font-bold text-white mb-2 group-hover:text-amber-400 transition-colors leading-tight"
                                whileHover={{ x: 3 }}
                              >
                                {award.title}
                              </motion.h3>

                              {/* Organization */}
                              <div className="flex items-center gap-2 mb-3">
                                <Building size={12} className="text-amber-400/60" />
                                <p className="text-white/60 text-sm truncate">{award.organization}</p>
                              </div>

                              {/* Date Badge */}
                              <motion.div
                                className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 rounded-lg border border-amber-500/20"
                                whileHover={{ scale: 1.05 }}
                              >
                                <Calendar size={12} className="text-amber-400" />
                                <span className="text-amber-400 text-xs font-medium">{award.date}</span>
                              </motion.div>

                              {/* Description */}
                              {award.description && (
                                <motion.p
                                  className="text-white/50 text-sm mt-3 line-clamp-2"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: i * 0.1 + 0.6 }}
                                >
                                  {award.description}
                                </motion.p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* NEWS TAB */}
            {activeTab === "news" && (
              <motion.div
                key="news"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Section Header */}
                <motion.div
                  className="flex items-center gap-4 mb-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.div
                    className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 via-rose-500 to-red-500 flex items-center justify-center shadow-lg shadow-pink-500/30"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Newspaper size={28} className="text-white" />
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <span className="text-[8px] text-white font-bold">{newsArticles.length}</span>
                    </motion.div>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white tracking-tight">In The News</h3>
                    <motion.div
                      className="h-0.5 bg-gradient-to-r from-pink-400 via-rose-400 to-transparent mt-1"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                  <motion.div
                    className="flex items-center gap-2 px-3 py-1 bg-pink-500/10 rounded-full border border-pink-500/30"
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full bg-pink-500"
                      animate={{ scale: [1, 0.8, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                    <span className="text-xs text-pink-400 font-mono">Press Coverage</span>
                  </motion.div>
                </motion.div>

                {/* News Cards - Magazine Style */}
                <div className="space-y-5">
                  {[...newsArticles].sort((a, b) => {
                    // Parse dates like "April 2025", "March 2025", "October 2022"
                    const parseDate = (dateStr: string) => {
                      const months: Record<string, number> = {
                        January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
                        July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
                      };
                      const parts = dateStr.split(' ');
                      const month = months[parts[0]] ?? 0;
                      const year = parseInt(parts[1]) || 2025;
                      return new Date(year, month);
                    };
                    return parseDate(b.date).getTime() - parseDate(a.date).getTime();
                  }).map((article, i) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 + 0.3, type: "spring", stiffness: 100 }}
                      className="group"
                    >
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative bg-gradient-to-br from-cyber-surface via-cyber-surface to-pink-950/20 rounded-2xl border border-pink-500/20 overflow-hidden hover:border-pink-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10 group-hover:translate-x-3">
                          {/* Animated Gradient Sweep */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />

                          {/* Left Accent Bar with Animation */}
                          <div className="absolute left-0 top-0 bottom-0 w-1 overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-b from-pink-400 via-rose-500 to-red-500"
                              initial={{ y: "100%" }}
                              animate={{ y: "0%" }}
                              transition={{ delay: i * 0.15 + 0.4, duration: 0.5 }}
                            />
                          </div>

                          <div className="p-5 pl-6 relative">
                            <div className="flex items-start gap-5">
                              {/* Index Number */}
                              <motion.div
                                className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/10 border border-pink-500/30 flex items-center justify-center flex-shrink-0"
                                whileHover={{ rotate: 10, scale: 1.1 }}
                              >
                                <span className="text-pink-400 font-mono font-bold text-lg">{String(i + 1).padStart(2, '0')}</span>
                              </motion.div>

                              <div className="flex-1 min-w-0">
                                {/* Source & Date */}
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                  <motion.div
                                    className="px-3 py-1 bg-pink-500/10 rounded-lg border border-pink-500/20"
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <span className="text-pink-400 text-xs font-semibold uppercase tracking-wide">{article.source}</span>
                                  </motion.div>
                                  <div className="flex items-center gap-1.5 text-white/40 text-xs">
                                    <Calendar size={12} className="text-pink-400/60" />
                                    <span>{article.date}</span>
                                  </div>
                                </div>

                                {/* Title */}
                                <motion.h3
                                  className="font-bold text-white mb-2 group-hover:text-pink-400 transition-colors text-lg leading-snug"
                                  whileHover={{ x: 5 }}
                                >
                                  {article.title}
                                </motion.h3>

                                {/* Description */}
                                <p className="text-white/60 text-sm line-clamp-2">{article.description}</p>

                                {/* Read More Link */}
                                <motion.div
                                  className="mt-4 inline-flex items-center gap-2 text-pink-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                                  initial={{ x: -10 }}
                                  whileHover={{ x: 0 }}
                                >
                                  <span>Read Article</span>
                                  <ArrowUpRight size={14} />
                                </motion.div>
                              </div>

                              {/* Arrow Button */}
                              <motion.div
                                className="flex-shrink-0 w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center group-hover:bg-pink-500/20 transition-colors"
                                whileHover={{ scale: 1.1, rotate: 45 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <ArrowUpRight size={20} className="text-pink-400" />
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* LEADERSHIP TAB */}
            {activeTab === "leadership" && (
              <motion.div
                key="leadership"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                {/* ISC Journey Header - Hero Style */}
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative text-center py-8 px-6 rounded-3xl overflow-hidden"
                >
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(0,255,136,0.2) 0%, transparent 50%)" }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <div className="absolute inset-0 border border-primary/20 rounded-3xl" />

                  <div className="relative">
                    <motion.div
                      className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 border border-primary/40 rounded-full mb-6 shadow-lg shadow-primary/20"
                      animate={{ boxShadow: ["0 0 20px rgba(0,255,136,0.2)", "0 0 40px rgba(0,255,136,0.3)", "0 0 20px rgba(0,255,136,0.2)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <Crown size={20} className="text-primary" />
                      </motion.div>
                      <span className="text-primary font-mono text-sm tracking-widest uppercase">ISC Journey</span>
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-3">
                      International Student Council
                    </h3>
                    <motion.p
                      className="text-white/70 text-base max-w-md mx-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      From Programming Committee member to <span className="text-primary font-semibold">60th President</span>
                    </motion.p>
                  </div>
                </motion.div>

                {/* Journey Timeline - Enhanced */}
                <div className="relative">
                  {/* Vertical Timeline Line with Glow */}
                  <motion.div
                    className="absolute left-5 top-0 bottom-0 w-1 rounded-full overflow-hidden"
                    initial={{ scaleY: 0, originY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-accent" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent"
                      animate={{ y: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>

                  <div className="space-y-5">
                    {iscJourney.map((step, index) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 100 }}
                        className="relative pl-14 group"
                      >
                        {/* Timeline Node */}
                        <motion.div
                          className={`absolute left-2 top-4 w-7 h-7 rounded-full flex items-center justify-center z-10 ${
                            step.highlight
                              ? "bg-gradient-to-br from-primary to-green-400 shadow-lg shadow-primary/50"
                              : "bg-cyber-surface border-2 border-primary/50"
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.15 + 0.4, type: "spring" }}
                        >
                          {step.highlight && (
                            <motion.div
                              className="absolute inset-0 rounded-full bg-primary"
                              animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                          <div className={`w-2.5 h-2.5 rounded-full ${step.highlight ? "bg-black" : "bg-primary"}`} />
                        </motion.div>

                        {/* Step Card */}
                        <div className={`relative rounded-2xl border overflow-hidden transition-all duration-500 ${
                          step.highlight
                            ? "bg-gradient-to-br from-primary/15 via-cyber-surface to-green-950/20 border-primary/40 hover:border-primary/60 shadow-xl shadow-primary/10"
                            : "bg-cyber-surface border-white/10 hover:border-primary/30"
                        } group-hover:translate-x-2`}>
                          {/* Top Accent for Highlight */}
                          {step.highlight && (
                            <motion.div
                              className="h-1 bg-gradient-to-r from-primary via-green-400 to-emerald-400"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
                            />
                          )}

                          <div className="p-5">
                            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                              <motion.h4
                                className={`font-bold text-lg ${step.highlight ? "text-primary" : "text-white group-hover:text-primary transition-colors"}`}
                                whileHover={{ x: 3 }}
                              >
                                {step.role}
                              </motion.h4>
                              <motion.div
                                className={`px-3 py-1 rounded-lg border ${
                                  step.highlight
                                    ? "bg-primary/10 border-primary/30 text-primary"
                                    : "bg-white/5 border-white/10 text-white/60"
                                }`}
                                whileHover={{ scale: 1.05 }}
                              >
                                <span className="text-sm font-medium">{step.period}</span>
                              </motion.div>
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                            {step.highlight && (
                              <motion.div
                                className="mt-4 pt-3 border-t border-primary/20 flex items-center gap-2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15 + 0.6 }}
                              >
                                <motion.div
                                  animate={{ rotate: [0, 10, -10, 0] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <Sparkles size={14} className="text-primary" />
                                </motion.div>
                                <span className="text-xs text-primary font-medium">Milestone Achievement</span>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Additional Leadership - Grid Style */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {/* Section Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-secondary/30"
                      whileHover={{ rotate: 10 }}
                    >
                      <Briefcase size={24} className="text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white">Other Leadership Roles</h4>
                      <motion.div
                        className="h-0.5 bg-gradient-to-r from-secondary via-purple-400 to-transparent mt-1"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {additionalLeadership.map((role, i) => (
                      <motion.div
                        key={role.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: i * 0.1 + 0.6 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="group"
                      >
                        <div className="h-full relative bg-gradient-to-br from-cyber-surface via-cyber-surface to-secondary/5 rounded-2xl border border-secondary/20 overflow-hidden hover:border-secondary/50 transition-all duration-300">
                          {/* Left Accent */}
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary via-purple-500 to-pink-500" />

                          <div className="p-5 pl-6">
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                              <div>
                                <motion.h5
                                  className="font-bold text-white group-hover:text-secondary transition-colors"
                                  whileHover={{ x: 3 }}
                                >
                                  {role.role}
                                </motion.h5>
                                <p className="text-sm text-secondary/80 font-medium">{role.organization}</p>
                              </div>
                              <div className="px-2.5 py-1 bg-secondary/10 rounded-lg border border-secondary/20">
                                <span className="text-xs text-secondary font-medium">{role.period}</span>
                              </div>
                            </div>
                            <p className="text-white/60 text-sm line-clamp-2">{role.description}</p>
                            {"url" in role && role.url && (
                              <motion.a
                                href={role.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-secondary/80 mt-3 font-medium"
                                whileHover={{ x: 4 }}
                              >
                                <span>Learn more</span>
                                <ChevronRight size={14} />
                              </motion.a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Advisory Boards - Floating Tags Style */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="relative bg-gradient-to-br from-cyber-surface via-cyber-surface to-cyan-950/20 rounded-2xl border border-cyan-500/20 overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5" />
                    <motion.div
                      className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    <div className="relative p-6">
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <motion.div
                          className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/30"
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          <Users size={22} className="text-white" />
                        </motion.div>
                        <div>
                          <h4 className="font-bold text-white text-lg">Advisory Board Memberships</h4>
                          <p className="text-white/50 text-sm">Active participation across university committees</p>
                        </div>
                      </div>

                      {/* Floating Tags */}
                      <div className="flex flex-wrap gap-3">
                        {[
                          "Student Legal Services",
                          "Housing and Food Services",
                          "HUB Advisory Board",
                          "Student Insurance Committee",
                          "Student Community Leaders",
                          "University Libraries Board",
                        ].map((board, i) => (
                          <motion.div
                            key={board}
                            className="group/tag relative"
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: i * 0.08 + 0.8, type: "spring" }}
                            whileHover={{ y: -4, scale: 1.05 }}
                          >
                            <div className="px-4 py-2 bg-cyber-surface rounded-xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-default">
                              <span className="text-white/70 text-sm font-medium group-hover/tag:text-cyan-400 transition-colors">
                                {board}
                              </span>
                            </div>
                            {/* Glow Effect on Hover */}
                            <motion.div
                              className="absolute inset-0 rounded-xl bg-cyan-500/20 opacity-0 group-hover/tag:opacity-100 blur-xl transition-opacity -z-10"
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// NEURAL MATRIX EXPERIENCE CARD - TRULY NOVEL UI
// A cyberpunk-inspired holographic data terminal
// ============================================

interface EnhancedTimelineCardProps {
  title: string;
  subtitle: string;
  location: string;
  date: string;
  description: string[];
  index: number;
  isLast: boolean;
  color?: "primary" | "secondary" | "accent";
  url?: string;
  isVisible: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function EnhancedTimelineCard({
  title,
  subtitle,
  location,
  date,
  description,
  index,
  isLast,
  color = "primary",
  url,
  isHovered,
  onHover,
  onLeave,
}: EnhancedTimelineCardProps) {
  const colorConfig = {
    primary: { hex: "#00ff88", rgb: "0, 255, 136" },
    secondary: { hex: "#8b5cf6", rgb: "139, 92, 246" },
    accent: { hex: "#f472b6", rgb: "244, 114, 182" },
  };

  const config = colorConfig[color];
  const isPresent = date.includes("Present");

  const cardColorClass = `timeline-card-${color}`;
  const holoGridClass = `holo-grid-${color}`;

  return (
    <motion.div
      className={`relative group ${cardColorClass} perspective-1200`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: index * 0.12, type: "spring", stiffness: 80, damping: 20 }}
    >
      {/* Neural connection lines to other cards */}
      {!isLast && (
        <svg className="absolute left-1/2 top-full w-px h-16 -translate-x-1/2 overflow-visible z-1">
          <defs>
            <linearGradient id={`neural-line-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={config.hex} stopOpacity="0.8" />
              <stop offset="50%" stopColor={config.hex} stopOpacity="0.2" />
              <stop offset="100%" stopColor={config.hex} stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.line
            x1="0" y1="0" x2="0" y2="64"
            stroke={`url(#neural-line-${index})`}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: index * 0.12 + 0.5, duration: 0.8 }}
          />
          {/* Traveling data pulse */}
          <motion.circle
            r="3"
            fill={config.hex}
            animate={{ cy: [0, 64], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
          />
        </svg>
      )}

      {/* Floating holographic layer (appears on hover) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute -inset-4 rounded-[2rem] pointer-events-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Holographic grid projection */}
            <div className={`absolute inset-0 rounded-[2rem] opacity-20 ${holoGridClass}`} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main card container */}
      <motion.div
        className="relative preserve-3d"
        animate={{
          y: isHovered ? -8 : 0,
          rotateY: isHovered ? 2 : 0,
          rotateX: isHovered ? -2 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {/* Outer glow */}
        <motion.div
          className="absolute -inset-[2px] rounded-2xl blur-sm card-outer-glow"
          animate={{ opacity: isHovered ? 1 : 0.3 }}
        />

        {/* Card body */}
        <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/5">
          {/* Animated top border beam */}
          <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
            <motion.div
              className="h-full w-1/3 card-top-beam"
              animate={{ x: ["-100%", "400%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Status indicator bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <motion.div
                className={`w-2 h-2 rounded-full ${isPresent ? "card-status-dot-active" : "card-status-dot"}`}
                animate={isPresent ? {
                  boxShadow: [`0 0 0 0 ${config.hex}`, `0 0 0 8px transparent`],
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[10px] font-mono uppercase tracking-widest card-status-text">
                {isPresent ? "ACTIVE" : "COMPLETED"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono text-white/30">ID:{String(index + 1).padStart(3, '0')}</span>
            </div>
          </div>

          {/* Main content area */}
          <div className="relative p-5">
            {/* Background data stream effect */}
            <div className="absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute text-[8px] font-mono whitespace-nowrap card-data-stream left-[${i * 25}%]`}
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                >
                  {Array(20).fill("01001010 ").join("")}
                </motion.div>
              ))}
            </div>

            {/* Header with 3D depth effect */}
            <div className="relative flex items-start gap-4 mb-5">
              {/* Animated role icon */}
              <motion.div
                className="relative flex-shrink-0 w-14 h-14 preserve-3d"
                animate={isHovered ? { rotateY: [0, 360] } : {}}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                {/* Rotating rings */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 56 56">
                  <motion.circle
                    cx="28" cy="28" r="26"
                    fill="none"
                    stroke={config.hex}
                    strokeWidth="0.5"
                    strokeDasharray="4 4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="transform-origin-center"
                  />
                  <motion.circle
                    cx="28" cy="28" r="22"
                    fill="none"
                    stroke={config.hex}
                    strokeWidth="0.5"
                    strokeDasharray="8 4"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="transform-origin-center"
                  />
                </svg>
                {/* Center hexagon */}
                <div className="absolute inset-2 rounded-xl flex items-center justify-center card-icon-container">
                  <Briefcase size={20} className="card-icon" />
                </div>
              </motion.div>

              {/* Title section */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <motion.h3
                    className="text-lg font-bold text-white leading-tight"
                    animate={isHovered ? { x: 4 } : { x: 0 }}
                  >
                    {title}
                  </motion.h3>
                  {url && (
                    <motion.a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md transition-colors card-link-bg"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ExternalLink size={12} className="card-icon" />
                    </motion.a>
                  )}
                </div>
                <motion.p
                  className="text-sm font-medium mb-2 card-subtitle"
                  animate={isHovered ? { x: 4 } : { x: 0 }}
                  transition={{ delay: 0.02 }}
                >
                  {subtitle}
                </motion.p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs card-location-badge">
                    <MapPin size={10} />
                    {location}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono ${isPresent ? "card-date-badge-active" : "card-date-badge"}`}>
                    <Calendar size={10} />
                    {date}
                  </span>
                </div>
              </div>
            </div>

            {/* Description as data entries */}
            <div className="space-y-2">
              {description.map((item, i) => (
                <motion.div
                  key={i}
                  className={`relative flex items-start gap-3 p-2 rounded-lg group/item ${isHovered ? "card-entry-bg-hover" : ""}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  {/* Entry indicator */}
                  <div className="flex-shrink-0 mt-1 flex items-center gap-1">
                    <motion.div
                      className="w-1 h-1 rounded-full card-entry-indicator"
                      animate={isHovered ? { scale: [1, 1.5, 1] } : {}}
                      transition={{ duration: 1, delay: i * 0.15, repeat: Infinity }}
                    />
                    <span className="text-[9px] font-mono card-entry-number">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-sm text-white/70 leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Bottom metrics bar */}
            <motion.div
              className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-white/30">
                  TYPE: <span className="card-type-text">{color.toUpperCase()}</span>
                </span>
              </div>
              {/* Signal strength indicator */}
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => {
                  const heightClasses = ["signal-h-4", "signal-h-6", "signal-h-8", "signal-h-10", "signal-h-12"];
                  return (
                    <motion.div
                      key={i}
                      className={`w-1 rounded-sm ${heightClasses[i]} ${i < 4 ? "card-signal-bar" : "card-signal-bar-dim"}`}
                      animate={isHovered && i < 4 ? {
                        opacity: [0.5, 1, 0.5],
                      } : {}}
                      transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity }}
                    />
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Animated side accent */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-1 card-side-accent"
            animate={{ opacity: isHovered ? 1 : 0.3 }}
          />

          {/* Corner tech decorations */}
          <svg className="absolute top-0 right-0 w-16 h-16 opacity-20" viewBox="0 0 64 64">
            <path d="M64 0 L64 20 L44 20" stroke={config.hex} strokeWidth="1" fill="none" />
            <path d="M64 0 L44 0 L44 20" stroke={config.hex} strokeWidth="0.5" fill="none" opacity="0.5" />
            <circle cx="44" cy="20" r="2" fill={config.hex} />
          </svg>
          <svg className="absolute bottom-0 left-0 w-16 h-16 opacity-20" viewBox="0 0 64 64">
            <path d="M0 64 L0 44 L20 44" stroke={config.hex} strokeWidth="1" fill="none" />
            <path d="M0 64 L20 64 L20 44" stroke={config.hex} strokeWidth="0.5" fill="none" opacity="0.5" />
            <circle cx="20" cy="44" r="2" fill={config.hex} />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}
