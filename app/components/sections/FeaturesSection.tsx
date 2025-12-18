"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useIntersection } from "@/app/hooks/useIntersection";
import { useRef, useState } from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import {
  Brain,
  Award,
  Newspaper,
  ExternalLink,
  Users,
  FlaskConical,
  Rocket,
  GraduationCap,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Target,
  Zap,
} from "lucide-react";
import DNAHelix from "../visualizations/DNAHelix";
import NeuralNetwork from "../visualizations/NeuralNetwork";

// Featured highlights data
const featuredHighlights = [
  {
    id: "mri-research",
    category: "Research",
    title: "MRI Acceleration",
    subtitle: "Fan MRI Lab, USC",
    description: "Building multimodal deep learning models for accelerated MRI reconstruction, achieving 15% workflow improvement for radiologists.",
    metric: "15%",
    metricLabel: "Faster Workflow",
    icon: Brain,
    color: "cyan",
    link: "https://sites.usc.edu/fan-mri-lab/staff/",
  },
  {
    id: "cancer-prediction",
    category: "Research",
    title: "Cancer Prediction AI",
    subtitle: "Multi-Modal Framework",
    description: "Developed multi-modal cancer prediction framework fusing histopathology, lab results, and genomic data.",
    metric: "12%",
    metricLabel: "Accuracy Gain",
    icon: FlaskConical,
    color: "emerald",
  },
  {
    id: "oswald-award",
    category: "Award",
    title: "John W. Oswald Award",
    subtitle: "Penn State's Highest Honor",
    description: "Recognized for outstanding leadership in social services and student government as the 60th ISC President.",
    metric: "2025",
    metricLabel: "Recipient",
    icon: Award,
    color: "amber",
    link: "https://news.engr.psu.edu/2025/gosar-parth-oswald-award-winner.aspx",
  },
  {
    id: "insurespectre",
    category: "Startup",
    title: "INSURESPECTRE",
    subtitle: "AI Health Insurance Platform",
    description: "Founded AI-powered insurance platform saving students $1,000+ annually on health insurance premiums.",
    metric: "$1K+",
    metricLabel: "Saved/Year",
    icon: Rocket,
    color: "primary",
    link: "https://insurespectre.com",
  },
];

// Featured news articles
const featuredNews = [
  {
    id: "engr-oswald",
    title: "Computer science major named 2025 Oswald Award winner",
    source: "Penn State Engineering",
    date: "April 2025",
    url: "https://news.engr.psu.edu/2025/gosar-parth-oswald-award-winner.aspx",
  },
  {
    id: "collegian-watw",
    title: "ISC hosts 60th We Are The World showcase",
    source: "The Daily Collegian",
    date: "March 2025",
    url: "https://www.psucollegian.com/news/campus/making-culture-accessible-international-student-council-hosts-60th-we-are-the-world-showcase/article_ba7bbe08-f7e2-11ef-883d-bf684639fe4a.html",
  },
  {
    id: "south-asian",
    title: "Indian student wins PSU's prestigious award",
    source: "The South Asian Times",
    date: "April 2025",
    url: "https://thesouthasiantimes.info/Indian-Community/news/indian-student-wins-psus-prestigious-john-w-oswald-award-/3987",
  },
];

// Stats
const impactStats = [
  { value: "3K+", label: "Students Impacted", icon: Users },
  { value: "5", label: "Awards Won", icon: Award },
  { value: "3+", label: "Publications", icon: FlaskConical },
  { value: "2", label: "Research Labs", icon: Brain },
];

// Animated hexagon grid background
function HexagonGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <polygon
              points="25,0 50,14.4 50,43.4 25,57.7 0,43.4 0,14.4"
              fill="none"
              stroke="rgba(34, 211, 238, 0.3)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  );
}

// Animated pulse ring
function PulseRing({ color, delay }: { color: string; delay: number }) {
  return (
    <motion.div
      className={`absolute inset-0 rounded-full border ${color}`}
      animate={{
        scale: [1, 1.5, 2],
        opacity: [0.6, 0.3, 0],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

// Feature card component with enhanced visuals
function FeatureCard({
  highlight,
  index,
  isVisible,
}: {
  highlight: typeof featuredHighlights[0];
  index: number;
  isVisible: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = highlight.icon;

  const colorClasses = {
    cyan: {
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
      text: "text-cyan-400",
      glow: "shadow-cyan-500/20",
      gradient: "from-cyan-500/20 via-transparent to-transparent",
    },
    emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      glow: "shadow-emerald-500/20",
      gradient: "from-emerald-500/20 via-transparent to-transparent",
    },
    amber: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-400",
      glow: "shadow-amber-500/20",
      gradient: "from-amber-500/20 via-transparent to-transparent",
    },
    primary: {
      bg: "bg-primary/10",
      border: "border-primary/30",
      text: "text-primary",
      glow: "shadow-primary/20",
      gradient: "from-primary/20 via-transparent to-transparent",
    },
  };

  const colors = colorClasses[highlight.color as keyof typeof colorClasses];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <Card
        variant="glass"
        padding="lg"
        className={`relative overflow-hidden h-full border ${colors.border} hover:border-opacity-60 transition-all duration-500 ${
          isHovered ? `shadow-xl ${colors.glow}` : ""
        }`}
      >
        {/* Animated gradient background on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${colors.gradient}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Scan line effect on hover */}
        {isHovered && (
          <motion.div
            className={`absolute left-0 right-0 h-px ${colors.bg}`}
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: "100%", opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Icon with pulse effect */}
              <div className={`relative w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                {isHovered && (
                  <>
                    <PulseRing color={colors.border} delay={0} />
                    <PulseRing color={colors.border} delay={0.5} />
                  </>
                )}
                <motion.div
                  animate={isHovered ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Icon size={24} className={colors.text} />
                </motion.div>
              </div>
              <Badge variant="outline" size="sm" className={colors.text}>
                {highlight.category}
              </Badge>
            </div>

            {/* Metric */}
            <div className="text-right">
              <motion.div
                className={`text-2xl font-bold font-mono ${colors.text}`}
                animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {highlight.metric}
              </motion.div>
              <div className="text-[10px] text-white/40 uppercase tracking-wide">
                {highlight.metricLabel}
              </div>
            </div>
          </div>

          {/* Content */}
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-white transition-colors">
            {highlight.title}
          </h3>
          <p className={`text-sm ${colors.text} mb-3`}>{highlight.subtitle}</p>
          <p className="text-sm text-white/60 leading-relaxed">{highlight.description}</p>

          {/* Link */}
          {highlight.link && (
            <motion.a
              href={highlight.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 mt-4 text-sm ${colors.text} hover:underline`}
              whileHover={{ x: 4 }}
            >
              Learn more
              <ArrowRight size={14} />
            </motion.a>
          )}
        </div>

        {/* Corner decoration */}
        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${colors.gradient} opacity-50`} />
      </Card>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const { ref, isVisible } = useIntersection<HTMLElement>({ threshold: 0.1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const decorY = useTransform(scrollYProgress, [0, 1], [80, -80]);

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
    <section id="features" ref={ref} className="section relative overflow-hidden">
      {/* Background */}
      <HexagonGrid />
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[200px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[250px]" />

      {/* DNA Helix - Left */}
      <motion.div
        style={{ y: decorY }}
        className="absolute left-0 top-1/4 opacity-15 hidden xl:block"
      >
        <DNAHelix height={300} />
      </motion.div>

      {/* Scanning Lines */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
        animate={{ left: ["0%", "100%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <div ref={containerRef} className="relative container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-mono mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <Sparkles size={14} />
              FEATURED HIGHLIGHTS
            </motion.span>
            <h2 className="section-title">
              Impact & <span className="gradient-text">Achievements</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Key milestones from research, leadership, and entrepreneurship journey
            </p>
          </motion.div>

          {/* Impact Stats */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {impactStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <Card variant="glass" padding="md" className="text-center border-primary/20 hover:border-primary/40 transition-all group">
                      <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-white font-mono mb-1">{stat.value}</div>
                      <div className="text-xs text-white/50">{stat.label}</div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Featured Highlights Grid */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Target size={18} className="text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Key Highlights</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredHighlights.map((highlight, index) => (
                <FeatureCard
                  key={highlight.id}
                  highlight={highlight}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </motion.div>

          {/* Featured News */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Newspaper size={18} className="text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">In The News</h3>
              </div>
              <a
                href="#experience"
                className="text-sm text-primary hover:underline flex items-center gap-1"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View all news <ArrowRight size={14} />
              </a>
            </div>

            <Card variant="glass" padding="lg" className="border-amber-500/20 relative overflow-hidden">
              {/* Animated gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-primary/5" />

              <div className="relative grid md:grid-cols-3 gap-6">
                {featuredNews.map((news, index) => (
                  <motion.a
                    key={news.id}
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="p-4 rounded-lg bg-cyber-surface/50 border border-cyber-border hover:border-amber-500/50 transition-all h-full">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" size="sm" className="text-amber-400 border-amber-500/30">
                          {news.source}
                        </Badge>
                        <span className="text-[10px] text-white/40">{news.date}</span>
                      </div>
                      <h4 className="text-sm font-medium text-white group-hover:text-amber-400 transition-colors line-clamp-2 mb-2">
                        {news.title}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-amber-400">
                        <span>Read article</span>
                        <ExternalLink size={10} />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Neural Network Visualization */}
          <motion.div
            variants={itemVariants}
            className="mt-12 hidden lg:block"
          >
            <Card variant="glass" padding="md" className="border-cyan-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <Zap size={16} className="text-cyan-400" />
                </div>
                <span className="text-sm font-mono text-white/60">AI MODEL VISUALIZATION</span>
              </div>
              <NeuralNetwork />
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
