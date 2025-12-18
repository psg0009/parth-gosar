"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useIntersection } from "@/app/hooks/useIntersection";
import { useRef } from "react";
import Card from "../ui/Card";
import { Brain, Microscope, Award, Rocket, GraduationCap, Users, FlaskConical, Heart } from "lucide-react";
import DNAHelix from "../visualizations/DNAHelix";
import CellDivision from "../visualizations/CellDivision";
import EKGMonitor from "../visualizations/EKGMonitor";

const highlights = [
  {
    title: "MRI Research",
    description: "Deep learning for accelerated imaging at USC",
    color: "cyan",
    icon: Brain,
  },
  {
    title: "Cancer Research",
    description: "Epigenetics & therapy response prediction",
    color: "emerald",
    icon: FlaskConical,
  },
  {
    title: "Oswald Award",
    description: "Penn State's top leadership honor",
    color: "amber",
    icon: Award,
  },
  {
    title: "Startup Founder",
    description: "Built AI health insurance platform",
    color: "primary",
    icon: Rocket,
  },
];

const stats = [
  { label: "Research Labs", value: "2", icon: Microscope },
  { label: "Students Impacted", value: "3K+", icon: Users },
  { label: "Projects", value: "10+", icon: FlaskConical },
  { label: "Awards", value: "5", icon: Award },
];

// Molecule floating animation
function FloatingMolecule({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.6, 0],
        y: [0, -30, -60],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40">
        <circle cx="20" cy="10" r="4" fill="rgba(34, 211, 238, 0.5)" />
        <circle cx="10" cy="30" r="4" fill="rgba(52, 211, 153, 0.5)" />
        <circle cx="30" cy="30" r="4" fill="rgba(251, 191, 36, 0.5)" />
        <line x1="20" y1="10" x2="10" y2="30" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="2" />
        <line x1="20" y1="10" x2="30" y2="30" stroke="rgba(52, 211, 153, 0.3)" strokeWidth="2" />
        <line x1="10" y1="30" x2="30" y2="30" stroke="rgba(251, 191, 36, 0.3)" strokeWidth="2" />
      </svg>
    </motion.div>
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const decorY = useTransform(scrollYProgress, [0, 1], [50, -50]);

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

  // Floating molecules data
  const molecules = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.8,
    x: `${15 + Math.random() * 70}%`,
    y: `${20 + Math.random() * 60}%`,
    size: 24 + Math.random() * 16,
  }));

  return (
    <section id="about" ref={ref} className="section relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <ScanLine />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />

      {/* Floating Molecules */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {molecules.map((mol) => (
          <FloatingMolecule key={mol.id} {...mol} />
        ))}
      </div>

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
              ABOUT ME
            </motion.span>
            <h2 className="section-title">
              AI for <span className="text-cyan-400">Healthcare</span> Innovation
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
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 }}
                  >
                    I'm a <span className="text-cyan-400 font-semibold">Computer Science graduate student</span> at
                    USC, specializing in Artificial Intelligence with a focus on <span className="text-cyan-400">medical imaging</span> and
                    <span className="text-emerald-400"> healthcare AI</span>. My research aims to develop
                    interpretable AI systems that assist clinicians in diagnosis and treatment decisions.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 }}
                  >
                    Currently, I'm conducting research at two USC labs: the <span className="text-cyan-400 font-semibold">Fan MRI Lab</span> where
                    I develop deep learning models for accelerated MRI reconstruction, and the
                    <span className="text-emerald-400 font-semibold"> Epigenetics & Cancer Therapy Lab</span> where
                    I work on computational methods for biomarker discovery.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 }}
                  >
                    My recent work includes building a <span className="text-primary font-semibold">multi-modal cancer prediction framework</span> that
                    fuses histopathology images, lab results, and genomic data—achieving a 12% improvement in
                    prediction accuracy. I'm passionate about creating AI that's not just accurate, but
                    <span className="text-amber-400"> interpretable and trustworthy</span> for clinical use.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 }}
                  >
                    Beyond research, I founded <span className="text-primary font-semibold">INSURESPECTRE</span>,
                    an AI platform that saved students $1,000+ annually on health insurance. As president of
                    Penn State's International Student Council, I impacted 3,000+ students and received the
                    prestigious <span className="text-amber-400 font-semibold">John W. Oswald Award</span>.
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

              {/* EKG Monitor below main card */}
              <motion.div
                variants={itemVariants}
                className="mt-6 hidden lg:block"
              >
                <EKGMonitor label="RESEARCH ACTIVITY" color="#22d3ee" />
              </motion.div>
            </motion.div>

            {/* Right: Highlight Cards - 5 columns */}
            <motion.div variants={itemVariants} className="lg:col-span-5 space-y-4">
              {/* Highlight Cards Grid */}
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((highlight, index) => {
                  const Icon = highlight.icon;
                  const colorClasses = {
                    cyan: {
                      text: "text-cyan-400",
                      border: "border-cyan-500/30 hover:border-cyan-500/60",
                      bg: "bg-cyan-500/5",
                      iconBg: "bg-cyan-500/10",
                    },
                    emerald: {
                      text: "text-emerald-400",
                      border: "border-emerald-500/30 hover:border-emerald-500/60",
                      bg: "bg-emerald-500/5",
                      iconBg: "bg-emerald-500/10",
                    },
                    amber: {
                      text: "text-amber-400",
                      border: "border-amber-500/30 hover:border-amber-500/60",
                      bg: "bg-amber-500/5",
                      iconBg: "bg-amber-500/10",
                    },
                    primary: {
                      text: "text-primary",
                      border: "border-primary/30 hover:border-primary/60",
                      bg: "bg-primary/5",
                      iconBg: "bg-primary/10",
                    },
                  };
                  const colors = colorClasses[highlight.color as keyof typeof colorClasses];

                  return (
                    <motion.div
                      key={highlight.title}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="group"
                    >
                      <Card
                        variant="default"
                        padding="md"
                        className={`h-full border ${colors.border} ${colors.bg} transition-all duration-300 backdrop-blur-sm`}
                      >
                        <div className={`w-10 h-10 rounded-lg ${colors.iconBg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                          <Icon size={20} className={colors.text} />
                        </div>
                        <h3 className={`font-semibold mb-1 ${colors.text}`}>
                          {highlight.title}
                        </h3>
                        <p className="text-sm text-white/50">
                          {highlight.description}
                        </p>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Visual Element - Animated Medical Scan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
              >
                <Card variant="glass" padding="md" className="border-cyan-500/20 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5" />

                  {/* Animated scan visualization */}
                  <div className="relative h-32">
                    <svg viewBox="0 0 200 80" className="w-full h-full">
                      <defs>
                        <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                          <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
                          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Grid lines */}
                      {Array.from({ length: 10 }, (_, i) => (
                        <line
                          key={`h-${i}`}
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
                          key={`v-${i}`}
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
                        stroke="url(#scanGradient)"
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

              {/* Education Mini Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
              >
                <Card variant="default" padding="md" className="border-l-4 border-l-primary bg-primary/5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Education</h4>
                      <p className="text-sm text-primary">MS Computer Science, USC '27</p>
                      <p className="text-xs text-white/50">BS Computer Science, Penn State '24</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>

          {/* Research Focus Banner */}
          <motion.div
            variants={itemVariants}
            className="mt-12"
          >
            <Card variant="glass" padding="lg" className="border-cyan-500/20 relative overflow-hidden">
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-emerald-500/5 to-primary/5"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              />

              <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Heart size={24} className="text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Research Interests</h3>
                    <p className="text-white/60 text-sm">Medical Imaging • Computational Biology • Clinical AI • Interpretable ML</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                  {["PyTorch", "Medical Imaging", "Genomics", "NLP", "Deep Learning"].map((tag, i) => (
                    <motion.span
                      key={tag}
                      className="px-3 py-1 bg-cyber-surface text-cyan-400 text-sm rounded-full border border-cyan-500/20 hover:border-cyan-500/50 transition-colors cursor-default"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.9 + i * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
