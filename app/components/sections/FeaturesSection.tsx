"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useIntersection } from "@/app/hooks/useIntersection";
import { useRef, useState } from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import {
  Brain,
  Award,
  FlaskConical,
  Rocket,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Target,
  Building,
  Shield,
} from "lucide-react";
import DNAHelix from "../visualizations/DNAHelix";
import NeuralNetwork from "../visualizations/NeuralNetwork";
import FlowingBackground from "../visualizations/FlowingBackground";

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
    id: "insurespectre",
    category: "Startup",
    title: "INSURESPECTRE",
    subtitle: "AI Health Insurance Platform",
    description: "Founded AI-powered insurance platform helping students find better health insurance options.",
    icon: Rocket,
    color: "primary",
    link: "https://insurespectre.com",
  },
  {
    id: "sentinel-ai",
    category: "Startup",
    title: "Sentinel AI",
    subtitle: "AI-Powered Compliance Firewall",
    description: "Building Sentinel AI CF - an intelligent compliance firewall for safer digital experiences.",
    icon: Shield,
    color: "cyan",
    link: "https://trysentinelai.com",
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
    id: "borough-council",
    category: "Leadership",
    title: "Borough Council",
    subtitle: "Community Oversight Board",
    description: "Appointed to serve on the State College Borough Council's Community Oversight Board, providing civilian oversight of local law enforcement.",
    icon: Building,
    color: "blue",
    link: "https://www.statecollegepa.us/745/Community-Oversight-Board",
  },
];



// ═══════════════════════════════════════════════════════════════════════════════
// COSMIC NEURAL GENESIS - An Unprecedented Visual Experience
// Combining: Morphogenetic fields, quantum chromodynamics, living fractals,
// dimensional rifts, aurora synthesis, and consciousness visualization
// ═══════════════════════════════════════════════════════════════════════════════
function QuantumHolographicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* ╔═══════════════════════════════════════════════════════════════════╗
          ║ LAYER 1: MORPHOGENETIC FIELD - Living, breathing energy matrix    ║
          ╚═══════════════════════════════════════════════════════════════════╝ */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Morphogenetic turbulence filter */}
          <filter id="morphoTurbulence" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves="4" seed="15" result="noise">
              <animate attributeName="baseFrequency" values="0.006;0.008;0.006" dur="20s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* Chromatic aberration glow */}
          <filter id="chromaticGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feOffset in="blur" dx="2" dy="0" result="red">
              <animate attributeName="dx" values="2;-2;2" dur="4s" repeatCount="indefinite" />
            </feOffset>
            <feOffset in="blur" dx="-2" dy="0" result="blue">
              <animate attributeName="dx" values="-2;2;-2" dur="4s" repeatCount="indefinite" />
            </feOffset>
            <feColorMatrix in="red" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="redChannel" />
            <feColorMatrix in="blue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blueChannel" />
            <feMerge>
              <feMergeNode in="redChannel" />
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="blueChannel" />
            </feMerge>
          </filter>

          {/* Living gradient that breathes */}
          <linearGradient id="cosmicBreath" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.6">
              <animate attributeName="stop-color" values="#00ffff;#ff00ff;#00ff88;#00ffff" dur="12s" repeatCount="indefinite" />
              <animate attributeName="stopOpacity" values="0.6;0.3;0.6" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4">
              <animate attributeName="stop-color" values="#8b5cf6;#00ffff;#ff00ff;#8b5cf6" dur="12s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#ff00ff" stopOpacity="0.6">
              <animate attributeName="stop-color" values="#ff00ff;#00ff88;#00ffff;#ff00ff" dur="12s" repeatCount="indefinite" />
              <animate attributeName="stopOpacity" values="0.6;0.3;0.6" dur="6s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>

        {/* Morphogenetic waves */}
        <g filter="url(#morphoTurbulence)" opacity="0.15">
          {[...Array(5)].map((_, i) => (
            <ellipse
              key={i}
              cx="50%"
              cy="50%"
              rx={200 + i * 100}
              ry={150 + i * 80}
              fill="none"
              stroke="url(#cosmicBreath)"
              strokeWidth="0.8"
              opacity={0.6 - i * 0.1}
            >
              <animateTransform attributeName="transform" type="rotate" from={`0 50% 50%`} to={`${i % 2 === 0 ? 360 : -360} 50% 50%`} dur={`${40 + i * 10}s`} repeatCount="indefinite" />
              <animate attributeName="rx" values={`${200 + i * 100};${220 + i * 100};${200 + i * 100}`} dur={`${8 + i}s`} repeatCount="indefinite" />
            </ellipse>
          ))}
        </g>
      </svg>

      {/* ╔═══════════════════════════════════════════════════════════════════╗
          ║ LAYER 2: DIMENSIONAL RIFT - Tears in spacetime                    ║
          ╚═══════════════════════════════════════════════════════════════════╝ */}
      {[
        { x: "15%", y: "20%", rotation: -15 },
        { x: "80%", y: "30%", rotation: 25 },
        { x: "10%", y: "75%", rotation: -30 },
        { x: "85%", y: "70%", rotation: 15 },
        { x: "50%", y: "15%", rotation: 0 },
      ].map((rift, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: rift.x,
            top: rift.y,
            transform: `rotate(${rift.rotation}deg)`,
          }}
        >
          {/* Rift core */}
          <motion.div
            className="relative"
            animate={{
              scaleY: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Main rift line */}
            <div
              className="w-[2px] h-32"
              style={{
                background: `linear-gradient(180deg, transparent, #00ffff, #ff00ff, #00ffff, transparent)`,
                boxShadow: `0 0 20px #00ffff, 0 0 40px #ff00ff, 0 0 60px #00ffff`,
              }}
            />
            {/* Rift energy emanation */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-40"
              style={{
                background: `radial-gradient(ellipse at center, #00ffff20 0%, transparent 70%)`,
              }}
              animate={{
                scaleX: [1, 1.5, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            />
            {/* Particles escaping the rift */}
            {[...Array(3)].map((_, j) => (
              <motion.div
                key={j}
                className="absolute w-1 h-1 rounded-full bg-cyan-400"
                style={{
                  left: "50%",
                  top: `${30 + j * 20}%`,
                  boxShadow: "0 0 6px #00ffff",
                }}
                animate={{
                  x: [0, (j % 2 === 0 ? 30 : -30), 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: j * 0.4 + i * 0.2 }}
              />
            ))}
          </motion.div>
        </motion.div>
      ))}

      {/* ╔═══════════════════════════════════════════════════════════════════╗
          ║ LAYER 3: AURORA SYNTHESIS - Northern lights meets digital         ║
          ╚═══════════════════════════════════════════════════════════════════╝ */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full"
            style={{
              height: "40%",
              top: `${10 + i * 15}%`,
              background: `linear-gradient(${90 + i * 30}deg,
                transparent 0%,
                ${i % 3 === 0 ? "#00ffff08" : i % 3 === 1 ? "#ff00ff08" : "#00ff8808"} 20%,
                ${i % 3 === 0 ? "#8b5cf610" : i % 3 === 1 ? "#00ffff10" : "#ff00ff10"} 50%,
                ${i % 3 === 0 ? "#ff00ff08" : i % 3 === 1 ? "#00ff8808" : "#00ffff08"} 80%,
                transparent 100%)`,
              filter: "blur(40px)",
            }}
            animate={{
              x: ["-10%", "10%", "-10%"],
              scaleY: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* ╔═══════════════════════════════════════════════════════════════════╗
          ║ LAYER 4: QUANTUM ENTANGLEMENT WEB - Connected consciousness       ║
          ╚═══════════════════════════════════════════════════════════════════╝ */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="quantumGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="entangleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0">
              <animate attributeName="stopOpacity" values="0;0.8;0" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.8">
              <animate attributeName="stop-color" values="#ff00ff;#00ffff;#00ff88;#ff00ff" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0">
              <animate attributeName="stopOpacity" values="0;0.8;0" dur="3s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>

        {/* Entanglement nodes */}
        {[
          { x: 150, y: 150 }, { x: 400, y: 100 }, { x: 700, y: 180 },
          { x: 100, y: 400 }, { x: 500, y: 350 }, { x: 850, y: 400 },
          { x: 200, y: 600 }, { x: 600, y: 550 }, { x: 900, y: 650 },
        ].map((node, i) => (
          <g key={i} filter="url(#quantumGlow)">
            {/* Node core */}
            <circle cx={node.x} cy={node.y} r="4" fill="#00ffff" opacity="0.8">
              <animate attributeName="r" values="3;6;3" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            {/* Connection lines to adjacent nodes */}
            {[...Array(9)].map((_, j) => {
              if (j <= i) return null;
              const targetNode = [
                { x: 150, y: 150 }, { x: 400, y: 100 }, { x: 700, y: 180 },
                { x: 100, y: 400 }, { x: 500, y: 350 }, { x: 850, y: 400 },
                { x: 200, y: 600 }, { x: 600, y: 550 }, { x: 900, y: 650 },
              ][j];
              const distance = Math.sqrt(Math.pow(targetNode.x - node.x, 2) + Math.pow(targetNode.y - node.y, 2));
              if (distance > 400) return null;
              return (
                <line
                  key={j}
                  x1={node.x}
                  y1={node.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke="url(#entangleGrad)"
                  strokeWidth="0.5"
                  opacity="0.3"
                >
                  <animate attributeName="stroke-dasharray" values={`0 ${distance};${distance} 0;0 ${distance}`} dur={`${4 + (i + j) * 0.2}s`} repeatCount="indefinite" />
                </line>
              );
            })}
          </g>
        ))}
      </svg>

      {/* ╔═══════════════════════════════════════════════════════════════════╗
          ║ LAYER 5: CONSCIOUSNESS RIPPLES - Thought waves visualization      ║
          ╚═══════════════════════════════════════════════════════════════════╝ */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 100 + i * 80,
              height: 100 + i * 80,
              left: -(50 + i * 40),
              top: -(50 + i * 40),
              border: "1px solid",
              borderColor: `rgba(${i % 2 === 0 ? "0, 255, 255" : "255, 0, 255"}, ${0.3 - i * 0.03})`,
              boxShadow: `0 0 ${20 + i * 5}px rgba(${i % 2 === 0 ? "0, 255, 255" : "255, 0, 255"}, ${0.1 - i * 0.01})`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3 - i * 0.03, 0.5 - i * 0.05, 0.3 - i * 0.03],
              rotate: i % 2 === 0 ? [0, 10, 0] : [0, -10, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* ╔═══════════════════════════════════════════════════════════════════╗
          ║ LAYER 6: PLASMA TENDRILS - Living energy streams                  ║
          ╚═══════════════════════════════════════════════════════════════════╝ */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="plasmaGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="plasmaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0" />
            <stop offset="20%" stopColor="#00ffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ff00ff" stopOpacity="1" />
            <stop offset="80%" stopColor="#00ff88" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Plasma tendrils */}
        <g filter="url(#plasmaGlow)" opacity="0.25">
          <path d="M -100,200 Q 200,100 400,250 Q 600,400 800,200 Q 1000,0 1200,150" stroke="url(#plasmaGrad)" strokeWidth="2" fill="none">
            <animate attributeName="d"
              values="M -100,200 Q 200,100 400,250 Q 600,400 800,200 Q 1000,0 1200,150;
                      M -100,250 Q 200,150 400,200 Q 600,350 800,250 Q 1000,50 1200,200;
                      M -100,200 Q 200,100 400,250 Q 600,400 800,200 Q 1000,0 1200,150"
              dur="10s" repeatCount="indefinite" />
          </path>
          <path d="M -100,500 Q 150,600 350,450 Q 550,300 750,500 Q 950,700 1200,550" stroke="url(#plasmaGrad)" strokeWidth="2" fill="none">
            <animate attributeName="d"
              values="M -100,500 Q 150,600 350,450 Q 550,300 750,500 Q 950,700 1200,550;
                      M -100,450 Q 150,550 350,500 Q 550,350 750,450 Q 950,650 1200,500;
                      M -100,500 Q 150,600 350,450 Q 550,300 750,500 Q 950,700 1200,550"
              dur="12s" repeatCount="indefinite" />
          </path>
          <path d="M -100,750 Q 300,650 500,800 Q 700,950 900,700 Q 1100,450 1300,700" stroke="url(#plasmaGrad)" strokeWidth="2" fill="none">
            <animate attributeName="d"
              values="M -100,750 Q 300,650 500,800 Q 700,950 900,700 Q 1100,450 1300,700;
                      M -100,700 Q 300,700 500,750 Q 700,900 900,750 Q 1100,500 1300,650;
                      M -100,750 Q 300,650 500,800 Q 700,950 900,700 Q 1100,450 1300,700"
              dur="14s" repeatCount="indefinite" />
          </path>
        </g>
      </svg>

      {/* ╔═══════════════════════════════════════════════════════════════════╗
          ║ LAYER 7: CELLULAR GENESIS - Dividing energy cells                 ║
          ╚═══════════════════════════════════════════════════════════════════╝ */}
      {[
        { x: "20%", y: "25%", size: 60 },
        { x: "75%", y: "20%", size: 50 },
        { x: "85%", y: "60%", size: 70 },
        { x: "12%", y: "65%", size: 55 },
        { x: "55%", y: "80%", size: 45 },
      ].map((cell, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: cell.x, top: cell.y }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Cell membrane */}
          <motion.div
            className="rounded-full"
            style={{
              width: cell.size,
              height: cell.size,
              border: "1px solid rgba(0, 255, 255, 0.3)",
              background: "radial-gradient(circle at 30% 30%, rgba(0, 255, 255, 0.1), transparent 70%)",
              boxShadow: "0 0 30px rgba(0, 255, 255, 0.1), inset 0 0 20px rgba(255, 0, 255, 0.1)",
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
          >
            {/* Nucleus */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: cell.size * 0.4,
                height: cell.size * 0.4,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(255, 0, 255, 0.4), rgba(0, 255, 255, 0.2), transparent)",
                boxShadow: "0 0 15px rgba(255, 0, 255, 0.3)",
              }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity }}
            />
            {/* Organelles orbiting */}
            {[...Array(3)].map((_, j) => (
              <motion.div
                key={j}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: j === 0 ? "#00ffff" : j === 1 ? "#ff00ff" : "#00ff88",
                  boxShadow: `0 0 8px ${j === 0 ? "#00ffff" : j === 1 ? "#ff00ff" : "#00ff88"}`,
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  x: [cell.size * 0.3 * Math.cos(j * 2.1), cell.size * 0.3 * Math.cos(j * 2.1 + Math.PI), cell.size * 0.3 * Math.cos(j * 2.1)],
                  y: [cell.size * 0.3 * Math.sin(j * 2.1), cell.size * 0.3 * Math.sin(j * 2.1 + Math.PI), cell.size * 0.3 * Math.sin(j * 2.1)],
                }}
                transition={{ duration: 5 + j, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </motion.div>
        </motion.div>
      ))}

      {/* ╔═══════════════════════════════════════════════════════════════════╗
          ║ LAYER 8: SYNAPTIC LIGHTNING - Neural discharge flashes            ║
          ╚═══════════════════════════════════════════════════════════════════╝ */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="lightningGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Lightning bolts */}
        <g filter="url(#lightningGlow)">
          <path d="M 100,50 L 120,150 L 90,160 L 130,280 L 100,290 L 150,400" stroke="#00ffff" strokeWidth="1.5" fill="none" opacity="0">
            <animate attributeName="opacity" values="0;0;0.8;0.4;0.9;0;0;0" dur="5s" repeatCount="indefinite" />
            <animate attributeName="d" values="M 100,50 L 120,150 L 90,160 L 130,280 L 100,290 L 150,400;M 105,50 L 115,150 L 95,160 L 125,280 L 105,290 L 145,400;M 100,50 L 120,150 L 90,160 L 130,280 L 100,290 L 150,400" dur="0.1s" repeatCount="indefinite" />
          </path>
          <path d="M 900,100 L 870,200 L 910,210 L 860,330 L 890,340 L 850,450" stroke="#ff00ff" strokeWidth="1.5" fill="none" opacity="0">
            <animate attributeName="opacity" values="0;0;0;0.8;0.4;0.9;0;0" dur="5s" repeatCount="indefinite" begin="1.5s" />
          </path>
          <path d="M 500,0 L 480,100 L 520,110 L 470,220 L 510,230 L 460,350" stroke="#00ff88" strokeWidth="1.5" fill="none" opacity="0">
            <animate attributeName="opacity" values="0;0.8;0.4;0.9;0;0;0;0" dur="5s" repeatCount="indefinite" begin="3s" />
          </path>
        </g>
      </svg>

      {/* ╔═══════════════════════════════════════════════════════════════════╗
          ║ LAYER 9: HOLOGRAPHIC DATA STREAMS - Information flow              ║
          ╚═══════════════════════════════════════════════════════════════════╝ */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${8 + i * 8}%`,
              top: 0,
              width: "2px",
              height: "100%",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          >
            {/* Data bits flowing down */}
            {[...Array(8)].map((_, j) => (
              <motion.div
                key={j}
                className="absolute w-full"
                style={{
                  height: "8px",
                  background: `linear-gradient(180deg, transparent, ${i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#ff00ff" : "#00ff88"}, transparent)`,
                  boxShadow: `0 0 10px ${i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#ff00ff" : "#00ff88"}`,
                }}
                animate={{
                  top: ["-5%", "105%"],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: j * 0.3 + i * 0.1,
                  ease: "linear",
                }}
              />
            ))}
          </motion.div>
        ))}
      </div>

      {/* ╔═══════════════════════════════════════════════════════════════════╗
          ║ LAYER 10: ETHEREAL PARTICLES - Ambient floating specks            ║
          ╚═══════════════════════════════════════════════════════════════════╝ */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => {
          const colors = ["#00ffff", "#ff00ff", "#00ff88", "#8b5cf6", "#fbbf24"];
          const color = colors[i % colors.length];
          const size = 1 + Math.random() * 3;
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                left: `${startX}%`,
                top: `${startY}%`,
                background: color,
                boxShadow: `0 0 ${size * 3}px ${color}`,
              }}
              animate={{
                y: [0, -50 - Math.random() * 50, 0],
                x: [0, Math.random() * 40 - 20, 0],
                opacity: [0, 0.9, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* ╔═══════════════════════════════════════════════════════════════════╗
          ║ LAYER 11: SACRED GEOMETRY MANDALA - Rotating infinity pattern     ║
          ╚═══════════════════════════════════════════════════════════════════╝ */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mandalaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" />
            <stop offset="33%" stopColor="#ff00ff" />
            <stop offset="66%" stopColor="#00ff88" />
            <stop offset="100%" stopColor="#00ffff" />
          </linearGradient>
        </defs>

        <g transform="translate(500, 500)">
          {/* Outer rings */}
          {[0, 30, 60, 90, 120, 150].map((rotation, i) => (
            <g key={i} transform={`rotate(${rotation})`}>
              <ellipse cx="0" cy="0" rx="400" ry="200" fill="none" stroke="url(#mandalaGrad)" strokeWidth="0.5">
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur={`${60 + i * 10}s`} repeatCount="indefinite" />
              </ellipse>
            </g>
          ))}

          {/* Inner sacred patterns */}
          {[...Array(12)].map((_, i) => (
            <g key={i} transform={`rotate(${i * 30})`}>
              <path d="M 0,-150 Q 50,-75 0,0 Q -50,-75 0,-150" fill="none" stroke="url(#mandalaGrad)" strokeWidth="0.3">
                <animateTransform attributeName="transform" type="rotate" from="0" to={i % 2 === 0 ? "360" : "-360"} dur={`${40 + i * 5}s`} repeatCount="indefinite" />
              </path>
            </g>
          ))}

          {/* Center seed of life */}
          <circle cx="0" cy="0" r="50" fill="none" stroke="url(#mandalaGrad)" strokeWidth="0.5" />
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <circle
              key={i}
              cx={50 * Math.cos((angle * Math.PI) / 180)}
              cy={50 * Math.sin((angle * Math.PI) / 180)}
              r="50"
              fill="none"
              stroke="url(#mandalaGrad)"
              strokeWidth="0.5"
            />
          ))}
        </g>
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
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      text: "text-blue-400",
      glow: "shadow-blue-500/20",
      gradient: "from-blue-500/20 via-transparent to-transparent",
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
        className={`relative overflow-hidden h-full min-h-[220px] border ${colors.border} hover:border-opacity-60 transition-all duration-500 ${
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

          {/* Link - only show if link exists */}
          <div className="h-8 mt-4">
            {highlight.link && (
              <motion.a
                href={highlight.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm ${colors.text} hover:underline`}
                whileHover={{ x: 4 }}
              >
                Learn more
                <ArrowRight size={14} />
              </motion.a>
            )}
          </div>
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
    <section id="features" ref={ref} className="section relative overflow-hidden bg-gradient-to-b from-cyber-dark via-[#050510] to-cyber-dark">
      {/* Flowing Background - unified with other sections */}
      <FlowingBackground />

      {/* Amber/Gold theme for Achievements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />

      {/* DNA Helix - Left side decoration */}
      <motion.div
        style={{ y: decorY }}
        className="absolute left-0 top-1/4 opacity-10 hidden xl:block"
      >
        <DNAHelix height={300} />
      </motion.div>

      <div ref={containerRef} className="relative container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Section Header - Holographic Design */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            {/* Futuristic Badge */}
            <div className="relative inline-block mb-6">
              {/* Outer glow ring */}
              <motion.div
                className="absolute -inset-4 rounded-full opacity-50"
                style={{
                  background: "radial-gradient(circle, rgba(52, 211, 153, 0.2) 0%, transparent 70%)",
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              {/* Badge container */}
              <motion.div
                className="relative px-6 py-3 rounded-2xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(52, 211, 153, 0.15) 0%, rgba(34, 211, 238, 0.1) 50%, rgba(168, 85, 247, 0.1) 100%)",
                  border: "1px solid rgba(52, 211, 153, 0.3)",
                  boxShadow: "0 0 30px rgba(52, 211, 153, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Animated shimmer */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(52, 211, 153, 0.3), transparent)",
                  }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-3 h-3">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-emerald-400 to-transparent" />
                  <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-emerald-400 to-transparent" />
                </div>
                <div className="absolute top-0 right-0 w-3 h-3">
                  <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-cyan-400 to-transparent" />
                  <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-cyan-400 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-3 h-3">
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-emerald-400 to-transparent" />
                  <div className="absolute bottom-0 left-0 h-full w-[1px] bg-gradient-to-t from-emerald-400 to-transparent" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3">
                  <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-purple-400 to-transparent" />
                  <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-purple-400 to-transparent" />
                </div>
                {/* Badge content */}
                <div className="relative flex items-center gap-3">
                  {/* Animated icon */}
                  <div className="relative">
                    <motion.div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, rgba(52, 211, 153, 0.3), rgba(34, 211, 238, 0.2))",
                        border: "1px solid rgba(52, 211, 153, 0.4)",
                      }}
                      animate={{ boxShadow: ["0 0 10px rgba(52, 211, 153, 0.3)", "0 0 20px rgba(52, 211, 153, 0.5)", "0 0 10px rgba(52, 211, 153, 0.3)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles size={16} className="text-emerald-400" />
                    </motion.div>
                    {/* Orbiting dot */}
                    <motion.div
                      className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400"
                      style={{ boxShadow: "0 0 8px #34d399" }}
                      animate={{
                        rotate: 360,
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      initial={{ x: 14, y: 4 }}
                    />
                  </div>
                  <span className="text-sm font-mono font-medium tracking-widest" style={{ color: "#34d399", textShadow: "0 0 10px rgba(52, 211, 153, 0.5)" }}>
                    KEY ACHIEVEMENTS
                  </span>
                  {/* Pulse indicator */}
                  <motion.div
                    className="w-2 h-2 rounded-full bg-emerald-400"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </div>

            <h2 className="section-title">
              Milestones & <span className="gradient-text">Recognition</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Defining moments from research, leadership, and entrepreneurship
            </p>
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
              {featuredHighlights.map((highlight, index) => {
                const isLastAndOdd = index === featuredHighlights.length - 1 && featuredHighlights.length % 2 !== 0;
                return (
                  <div key={highlight.id} className={isLastAndOdd ? "md:col-span-2" : ""}>
                    <FeatureCard
                      highlight={highlight}
                      index={index}
                      isVisible={isVisible}
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Impact Journey - Holographic Timeline */}
          <motion.div
            variants={itemVariants}
            className="mt-12"
          >
            <Card variant="glass" padding="lg" className="border-cyan-500/20 overflow-hidden relative">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-emerald-500/5" />

              {/* Scanning line effect */}
              <motion.div
                className="absolute left-0 right-0 h-[1px]"
                style={{
                  background: "linear-gradient(90deg, transparent, #22d3ee, #a855f7, #34d399, transparent)",
                  boxShadow: "0 0 20px #22d3ee",
                }}
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
                      <TrendingUp size={18} className="text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Impact Journey</h3>
                      <p className="text-xs text-white/50 font-mono">2022 → Present</p>
                    </div>
                  </div>
                  <motion.div
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono text-emerald-400">ACTIVE</span>
                  </motion.div>
                </div>

                {/* Timeline visualization */}
                <div className="relative">
                  {/* Main timeline line */}
                  <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2">
                    <div className="w-full h-full bg-gradient-to-r from-cyan-500/20 via-purple-500/30 to-emerald-500/20 rounded-full" />
                    {/* Animated pulse along the line */}
                    <motion.div
                      className="absolute top-0 w-20 h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg, transparent, #22d3ee, #a855f7, transparent)",
                        boxShadow: "0 0 20px #22d3ee",
                      }}
                      animate={{ left: ["-10%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </div>

                  {/* Timeline nodes */}
                  <div className="relative flex justify-between items-center py-8">
                    {[
                      { year: "2022", label: "Penn State", color: "#22d3ee", icon: "🎓" },
                      { year: "2023", label: "Research", color: "#34d399", icon: "🔬" },
                      { year: "2024", label: "Leadership", color: "#a855f7", icon: "👑" },
                      { year: "2025", label: "USC & Awards", color: "#fbbf24", icon: "🏆" },
                    ].map((node, index) => (
                      <motion.div
                        key={node.year}
                        className="relative flex flex-col items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.8 + index * 0.15 }}
                      >
                        {/* Node circle */}
                        <motion.div
                          className="relative"
                          whileHover={{ scale: 1.2 }}
                        >
                          {/* Outer glow ring */}
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: `radial-gradient(circle, ${node.color}40 0%, transparent 70%)`,
                            }}
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 0.2, 0.5],
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                          />
                          {/* Main node */}
                          <div
                            className="relative w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                            style={{
                              background: `linear-gradient(135deg, ${node.color}30, ${node.color}10)`,
                              border: `2px solid ${node.color}`,
                              boxShadow: `0 0 20px ${node.color}40`,
                            }}
                          >
                            {node.icon}
                          </div>
                        </motion.div>

                        {/* Year label */}
                        <motion.div
                          className="mt-3 text-center"
                          initial={{ opacity: 0 }}
                          animate={isVisible ? { opacity: 1 } : {}}
                          transition={{ delay: 1 + index * 0.15 }}
                        >
                          <div
                            className="text-lg font-bold font-mono"
                            style={{ color: node.color }}
                          >
                            {node.year}
                          </div>
                          <div className="text-xs text-white/60 mt-1">{node.label}</div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom stats row */}
                <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
                  {[
                    { value: "3+", label: "Years of Impact", color: "#22d3ee" },
                    { value: "5", label: "Major Milestones", color: "#a855f7" },
                    { value: "2", label: "Universities", color: "#34d399" },
                    { value: "∞", label: "Growth Potential", color: "#fbbf24" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.2 + index * 0.1 }}
                    >
                      <div
                        className="text-2xl font-bold font-mono leading-none"
                        style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}50`, fontSize: "1.5rem" }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-white/50 uppercase tracking-wider mt-1">{stat.label}</div>
                    </motion.div>
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
