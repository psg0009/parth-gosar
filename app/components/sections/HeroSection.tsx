"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Activity, Brain, Microscope } from "lucide-react";
import Button from "../ui/Button";
import { useRef } from "react";
import BrainMRI from "../visualizations/BrainMRI";
import DNAHelix from "../visualizations/DNAHelix";
import NeuralNetwork from "../visualizations/NeuralNetwork";
import EKGMonitor from "../visualizations/EKGMonitor";
import CellDivision from "../visualizations/CellDivision";

// Floating data points
function DataPoint({ delay, x, y }: { delay: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-cyan-400"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
        y: [0, -50, -100, -150],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

// Scanning grid effect
function ScanGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent"
        animate={{ left: ["0%", "100%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

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

  // Data points for floating effect
  const dataPoints = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: i * 0.3,
    x: `${10 + Math.random() * 80}%`,
    y: `${60 + Math.random() * 30}%`,
  }));

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-black"
    >
      {/* Scanning grid effect */}
      <ScanGrid />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px]" />

      {/* Floating data points */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {dataPoints.map((point) => (
          <DataPoint key={point.id} {...point} />
        ))}
      </div>

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
                <span className="flex items-center gap-2">
                  <motion.span
                    className="w-2 h-2 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs text-emerald-400 font-mono">AVAILABLE FOR RESEARCH</span>
                </span>
                <span className="w-px h-4 bg-cyber-border" />
                <span className="text-xs text-white/50 font-mono">USC MS CS '27</span>
              </motion.div>

              {/* Main title */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-4 leading-[1.1]"
              >
                <span className="text-white">Building </span>
                <span className="relative">
                  <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-primary bg-clip-text text-transparent">
                    AI
                  </span>
                </span>
                <br />
                <span className="text-white">for </span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-pink-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                    Healthcare
                  </span>
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 100 8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                  >
                    <motion.path
                      d="M 0 4 Q 25 0 50 4 Q 75 8 100 4"
                      fill="none"
                      stroke="url(#underlineGradient)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f472b6" />
                        <stop offset="50%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </span>
                <br />
                <span className="text-white/80 text-3xl md:text-4xl lg:text-5xl">Innovation</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-white/60 mb-6 max-w-xl leading-relaxed"
              >
                Medical AI researcher developing deep learning systems for{" "}
                <span className="text-cyan-400">MRI acceleration</span> and{" "}
                <span className="text-emerald-400">clinical diagnostics</span>. Currently at USC's Fan MRI Lab.
              </motion.p>

              {/* Stats row */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-6 mb-8"
              >
                {[
                  { value: "12%", label: "Accuracy Gain", icon: Brain },
                  { value: "2", label: "Research Labs", icon: Microscope },
                  { value: "3K+", label: "Students Impacted", icon: Activity },
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
              {/* Main MRI visualization */}
              <div className="relative flex items-center justify-center">
                <BrainMRI size={350} className="mx-auto" />

                {/* DNA Helix - left side */}
                <div className="absolute -left-8 top-1/2 -translate-y-1/2">
                  <DNAHelix height={250} />
                </div>

                {/* Cell Division - top right */}
                <div className="absolute -top-4 -right-4">
                  <CellDivision size={100} />
                </div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full border border-cyan-500/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute -top-8 -right-8 w-16 h-16 rounded-full border border-emerald-500/20"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Neural Network below */}
              <div className="mt-8 mx-auto max-w-md">
                <NeuralNetwork className="opacity-80" />
              </div>

              {/* EKG Monitor */}
              <div className="absolute -bottom-4 right-0 w-64">
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
