"use client";

import { motion } from "framer-motion";
import { useIntersection } from "@/app/hooks/useIntersection";
import { Mail, Sparkles } from "lucide-react";
import FlowingBackground from "../visualizations/FlowingBackground";

export default function ContactSection() {
  const { ref, isVisible } = useIntersection<HTMLElement>({ threshold: 0.1 });

  return (
    <section id="contact" ref={ref} className="section relative overflow-hidden">
      {/* Flowing Background - unified with other sections */}
      <FlowingBackground />

      {/* Green/Primary theme for Contact */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />

      <div className="relative container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-2 mb-6 rounded-full border border-primary/30 bg-primary/5"
            whileHover={{ scale: 1.02 }}
          >
            <Sparkles size={16} className="text-primary" />
            <span className="text-primary text-sm font-mono tracking-wider">LET'S CONNECT</span>
            <Sparkles size={16} className="text-primary" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Start a <span className="bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">Conversation</span>
          </h2>
                  </motion.div>

        {/* Main CTA - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-lg rounded-2xl overflow-hidden border border-white/10 bg-cyber-dark/80 backdrop-blur-sm">
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-30"
              style={{
                background: "linear-gradient(135deg, rgba(0,255,136,0.2), transparent, rgba(34,211,238,0.2))",
              }}
            />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/40 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-cyan-500/40 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-purple-500/40 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-pink-500/40 rounded-br-2xl" />

            {/* Scanlines effect */}
            <div className="absolute inset-0 opacity-5 pointer-events-none scanline-bg" />

            {/* Animated top line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Content */}
            <div className="relative flex flex-col items-center justify-center p-12 text-center">
              {/* Email CTA */}
              <motion.a
                href="mailto:parthgosar8@gmail.com"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl overflow-hidden border border-primary/50 bg-primary/10 hover:bg-primary/20 transition-all"
                whileHover={{ scale: 1.02, borderColor: "rgba(0, 255, 136, 0.8)" }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Button glow on hover */}
                <div className="absolute inset-0 blur-xl bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                <span className="relative text-primary font-semibold group-hover:text-white transition-colors">Send me an email</span>
                <Mail size={18} className="relative text-primary group-hover:text-white transition-colors" />
              </motion.a>

              {/* Decorative corner elements */}
              <div className="absolute top-4 right-4 flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full bg-primary/60"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>
              <div className="absolute bottom-4 left-4 flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full bg-cyan-400/60"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
