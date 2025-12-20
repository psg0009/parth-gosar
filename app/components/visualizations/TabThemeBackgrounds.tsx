"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ============================================
// JOURNEY TAB - Transparent (no background)
// Let the main section background show through
// ============================================
export function JourneyBackground() {
  return null;
}

// ============================================
// WORK TAB - Corporate Tech Grid
// Circuit patterns and data flow
// ============================================
export function WorkBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient - Vibrant tech green/teal */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a2818] via-[#0d2020] to-[#103025]" />

      {/* Main glow effect - Green corporate theme - Enhanced */}
      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0, 255, 136, 0.3) 0%, rgba(0, 255, 136, 0.1) 40%, transparent 70%)",
          filter: "blur(80px)",
          top: "-10%",
          left: "15%",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary cyan glow - Enhanced */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.25) 0%, rgba(34, 211, 238, 0.08) 50%, transparent 70%)",
          filter: "blur(60px)",
          bottom: "5%",
          right: "5%",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Tertiary teal accent */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(20, 184, 166, 0.2) 0%, transparent 60%)",
          filter: "blur(50px)",
          top: "40%",
          left: "40%",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid pattern - More visible */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 136, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 136, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Flowing data lines - Brighter */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[3px]"
          style={{
            background: `linear-gradient(90deg, transparent, #00ff88, #22d3ee, transparent)`,
            width: "300px",
            top: `${10 + i * 11}%`,
            left: "-300px",
            boxShadow: "0 0 20px #00ff8880",
          }}
          animate={{
            x: ["0vw", "120vw"],
          }}
          transition={{
            duration: 3 + i * 0.3,
            delay: i * 0.6,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Corner brackets - More visible */}
      <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-primary/40" />
      <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-primary/40" />
      <div className="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-primary/40" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-primary/40" />

      {/* Pulsing nodes - Larger and brighter */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: `${8 + (i % 4) * 25}%`,
            top: `${15 + Math.floor(i / 4) * 30}%`,
            background: "#00ff88",
            boxShadow: "0 0 15px #00ff88, 0 0 30px #00ff8860",
          }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            delay: i * 0.25,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Circuit paths */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <motion.path
          d="M 0 200 L 100 200 L 100 100 L 300 100 L 300 300 L 500 300"
          fill="none"
          stroke="#00ff88"
          strokeWidth="2"
          strokeDasharray="10 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.path
          d="M 100% 400 L 80% 400 L 80% 250 L 60% 250 L 60% 450 L 40% 450"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2"
          strokeDasharray="10 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, delay: 1, repeat: Infinity }}
        />
      </svg>
    </div>
  );
}

// ============================================
// RESEARCH TAB - Laboratory/Scientific
// DNA helixes, molecules, and data viz
// ============================================
export function ResearchBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient - Vibrant purple/violet lab */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#200a38] via-[#180d28] to-[#2a1040]" />

      {/* Main purple/violet glow - Enhanced brightness */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(139, 92, 246, 0.15) 40%, transparent 70%)",
          filter: "blur(80px)",
          top: "0%",
          left: "5%",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary pink glow - Enhanced */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(236, 72, 153, 0.1) 50%, transparent 70%)",
          filter: "blur(60px)",
          bottom: "10%",
          right: "10%",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Tertiary cyan accent glow */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, transparent 60%)",
          filter: "blur(50px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating molecules - More visible */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${5 + (i * 6)}%`,
            top: `${10 + (i % 5) * 18}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 15, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 6 + i * 0.3,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <div
              className="w-4 h-4 rounded-full"
              style={{
                background: "rgba(139, 92, 246, 0.6)",
                boxShadow: "0 0 15px rgba(139, 92, 246, 0.8), 0 0 30px rgba(139, 92, 246, 0.4)",
              }}
            />
            <div className="absolute -top-3 -left-3 w-3 h-3 rounded-full bg-purple-400/40" />
            <div className="absolute -bottom-2 -right-3 w-3 h-3 rounded-full bg-pink-400/40" />
            <div className="absolute top-1/2 left-full w-6 h-[2px] bg-gradient-to-r from-violet-500/60 to-transparent" />
            <div className="absolute top-full left-1/2 w-[2px] h-6 bg-gradient-to-b from-violet-500/60 to-transparent" />
          </div>
        </motion.div>
      ))}

      {/* DNA helix visualization - More visible */}
      <svg className="absolute right-4 top-0 h-full w-48 opacity-30">
        <motion.path
          d="M 80 0 Q 40 60 80 120 Q 120 180 80 240 Q 40 300 80 360 Q 120 420 80 480 Q 40 540 80 600 Q 120 660 80 720"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="3"
          animate={{ y: [0, -120, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 80 0 Q 120 60 80 120 Q 40 180 80 240 Q 120 300 80 360 Q 40 420 80 480 Q 120 540 80 600 Q 40 660 80 720"
          fill="none"
          stroke="#ec4899"
          strokeWidth="3"
          animate={{ y: [0, -120, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        {/* Connection rungs */}
        {[...Array(18)].map((_, i) => (
          <motion.line
            key={i}
            x1="55"
            y1={i * 40}
            x2="105"
            y2={i * 40}
            stroke="#a855f7"
            strokeWidth="2"
            opacity="0.5"
            animate={{ y: [0, -120, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>

      {/* Left side DNA helix */}
      <svg className="absolute left-4 top-0 h-full w-32 opacity-20">
        <motion.path
          d="M 60 0 Q 30 50 60 100 Q 90 150 60 200 Q 30 250 60 300 Q 90 350 60 400 Q 30 450 60 500"
          fill="none"
          stroke="#a855f7"
          strokeWidth="2"
          animate={{ y: [0, -80, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Hexagon grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%238b5cf6' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 52px",
        }}
      />
    </div>
  );
}

// ============================================
// TEACHING TAB - Classroom/Knowledge
// Book pages, lightbulbs, and wisdom flows
// ============================================
export function TeachingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient - Warm pink/magenta educational */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a1020] via-[#201018] to-[#301525]" />

      {/* Knowledge particles rising */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400/20"
          style={{
            left: `${5 + i * 5}%`,
            bottom: "-20px",
            fontSize: "12px",
          }}
          animate={{
            y: [0, -600],
            opacity: [0, 0.6, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          {["✦", "◆", "●", "★"][i % 4]}
        </motion.div>
      ))}

      {/* Lightbulb glow effect */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(244, 114, 182, 0.15) 0%, transparent 60%)",
          filter: "blur(50px)",
          top: "20%",
          right: "15%",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Flowing lines representing knowledge transfer */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={i}
            d={`M 0 ${100 + i * 80} Q ${200 + i * 50} ${50 + i * 60} ${400 + i * 100} ${150 + i * 50} T 800 ${100 + i * 70}`}
            fill="none"
            stroke="#f472b6"
            strokeWidth="1"
            strokeDasharray="5 5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// ============================================
// PUBLICATIONS TAB - Academic/Scholarly
// Paper sheets, citations, and scholarly patterns
// ============================================
export function PublicationsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient - Vibrant cyan/teal scholarly */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a2530] via-[#0d1d25] to-[#102830]" />

      {/* Floating paper sheets */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-20 rounded-sm bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [-5 + i * 2, 5 + i * 2, -5 + i * 2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5 + i * 0.5,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Paper lines */}
          <div className="p-2 space-y-1">
            <div className="h-[2px] w-full bg-cyan-400/20 rounded" />
            <div className="h-[2px] w-3/4 bg-cyan-400/15 rounded" />
            <div className="h-[2px] w-full bg-cyan-400/10 rounded" />
            <div className="h-[2px] w-1/2 bg-cyan-400/10 rounded" />
          </div>
        </motion.div>
      ))}

      {/* Citation network lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <motion.circle cx="20%" cy="30%" r="4" fill="#22d3ee" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="40%" cy="50%" r="4" fill="#22d3ee" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} />
        <motion.circle cx="70%" cy="35%" r="4" fill="#22d3ee" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: 1, repeat: Infinity }} />
        <motion.circle cx="60%" cy="70%" r="4" fill="#22d3ee" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: 1.5, repeat: Infinity }} />
        <line x1="20%" y1="30%" x2="40%" y2="50%" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="40%" y1="50%" x2="70%" y2="35%" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="70%" y1="35%" x2="60%" y2="70%" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="60%" y1="70%" x2="20%" y2="30%" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 4" />
      </svg>

      {/* Glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 60%)",
          filter: "blur(60px)",
          top: "30%",
          left: "30%",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </div>
  );
}

// ============================================
// EDUCATION TAB - Growth/Learning
// Growing trees, graduation caps, rising paths
// ============================================
export function EducationBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient - Vibrant emerald/green growth */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a2515] via-[#0d2018] to-[#102a1a]" />

      {/* Rising growth lines */}
      <svg className="absolute inset-0 w-full h-full opacity-15">
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={i}
            d={`M ${100 + i * 150} 500 Q ${120 + i * 150} 400 ${100 + i * 150} 300 T ${80 + i * 150} 100`}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </svg>

      {/* Floating graduation caps */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + (i % 2) * 30}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [-10, 10, -10],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4 + i,
            delay: i * 0.5,
            repeat: Infinity,
          }}
        >
          🎓
        </motion.div>
      ))}

      {/* Growth glow */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 60%)",
          filter: "blur(50px)",
          bottom: "20%",
          right: "20%",
        }}
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -30, 0],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Knowledge sparkles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-emerald-400/50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// AWARDS TAB - Trophy/Achievement
// Golden particles, trophy glows, celebration
// ============================================
export function AwardsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient - Vibrant gold/amber celebratory */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#281a08] via-[#221810] to-[#302010]" />

      {/* Golden confetti particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-10px",
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.sin(i) * 50, 0],
            rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="w-2 h-2"
            style={{
              background: i % 3 === 0 ? "#fbbf24" : i % 3 === 1 ? "#f59e0b" : "#fcd34d",
              clipPath: i % 2 === 0 ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" : "none",
              borderRadius: i % 2 === 0 ? "0" : "50%",
            }}
          />
        </motion.div>
      ))}

      {/* Trophy glow */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.05) 40%, transparent 70%)",
          filter: "blur(60px)",
          top: "20%",
          left: "30%",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Star bursts */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl"
          style={{
            left: `${15 + i * 18}%`,
            top: `${25 + (i % 2) * 40}%`,
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            delay: i * 0.5,
            repeat: Infinity,
          }}
        >
          ⭐
        </motion.div>
      ))}

      {/* Spotlight beams */}
      <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-amber-400/10 via-amber-400/5 to-transparent transform -skew-x-12" />
      <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-amber-400/10 via-amber-400/5 to-transparent transform skew-x-12" />
    </div>
  );
}

// ============================================
// NEWS TAB - Media/Headlines
// Newspaper patterns, broadcast waves
// ============================================
export function NewsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient - Vibrant pink/magenta media */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a1020] via-[#1d1018] to-[#301520]" />

      {/* Broadcast waves */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-400/20"
          style={{
            width: `${200 + i * 150}px`,
            height: `${200 + i * 150}px`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Ticker tape effect */}
      <motion.div
        className="absolute top-[10%] left-0 w-full h-8 bg-gradient-to-r from-transparent via-pink-500/10 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-0 w-full h-8 bg-gradient-to-r from-transparent via-pink-500/10 to-transparent"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Headlines floating */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 rounded bg-pink-400/10"
          style={{
            width: `${80 + Math.random() * 100}px`,
            left: `${Math.random() * 80}%`,
            top: `${20 + i * 12}%`,
          }}
          animate={{
            x: [0, 20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            delay: i * 0.5,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Glow */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(244, 114, 182, 0.1) 0%, transparent 60%)",
          filter: "blur(50px)",
          top: "30%",
          right: "20%",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </div>
  );
}

// ============================================
// LEADERSHIP TAB - Command/Authority
// Crown patterns, hierarchy lines, power flows
// ============================================
export function LeadershipBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient - Vibrant royal purple */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#200d35] via-[#180d28] to-[#281040]" />

      {/* Hierarchy pyramid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <motion.polygon
          points="400,50 100,400 700,400"
          fill="none"
          stroke="#a855f7"
          strokeWidth="2"
          strokeDasharray="10 5"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        {/* Inner pyramid levels */}
        <line x1="250" y1="225" x2="550" y2="225" stroke="#a855f7" strokeWidth="1" strokeDasharray="5 5" opacity="0.3" />
        <line x1="175" y1="312" x2="625" y2="312" stroke="#a855f7" strokeWidth="1" strokeDasharray="5 5" opacity="0.3" />
      </svg>

      {/* Crown glow at top */}
      <motion.div
        className="absolute w-[300px] h-[200px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(168, 85, 247, 0.2) 0%, transparent 60%)",
          filter: "blur(40px)",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Floating crowns */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${25 + i * 25}%`,
            top: `${15 + (i % 2) * 10}%`,
          }}
          animate={{
            y: [0, -10, 0],
            rotate: [-5, 5, -5],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3 + i,
            delay: i * 0.5,
            repeat: Infinity,
          }}
        >
          👑
        </motion.div>
      ))}

      {/* Power connection lines */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[1px] bg-gradient-to-b from-purple-500/30 via-purple-500/10 to-transparent"
          style={{
            height: "150px",
            left: `${10 + i * 12}%`,
            top: "10%",
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Network nodes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-purple-400/30 border border-purple-400/50"
          style={{
            left: `${15 + i * 15}%`,
            top: `${40 + (i % 3) * 15}%`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// MAIN EXPORT - Dynamic Tab Background Selector
// ============================================
interface TabBackgroundProps {
  activeTab: string;
}

export default function TabThemeBackground({ activeTab }: TabBackgroundProps) {
  // Return null for all tabs - no themed backgrounds
  // This keeps the Timeline section clean with just the main section background
  return null;
}
