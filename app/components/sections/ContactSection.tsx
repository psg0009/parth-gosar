"use client";

import { motion } from "framer-motion";
import { useIntersection } from "@/app/hooks/useIntersection";
import { Mail, MapPin, Github, Linkedin, Copy, Check, ExternalLink, Sparkles } from "lucide-react";
import { useState } from "react";
import FlowingBackground from "../visualizations/FlowingBackground";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "gosar@usc.edu",
    href: "mailto:gosar@usc.edu",
    copyable: true,
    colorClass: "contact-color-cyan",
    description: "Best for research inquiries",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Los Angeles, CA",
    href: null,
    copyable: false,
    colorClass: "contact-color-pink",
    description: "University of Southern California",
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    value: "@psg0009",
    href: "https://github.com/psg0009",
    colorClass: "contact-color-purple",
    stats: "15+ repositories",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "parth-gosar",
    href: "https://www.linkedin.com/in/parth-gosar-04042b1b1",
    colorClass: "contact-color-linkedin",
    stats: "500+ connections",
  },
];

export default function ContactSection() {
  const { ref, isVisible } = useIntersection<HTMLElement>({ threshold: 0.1 });
  const [copied, setCopied] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <p className="text-white/60 max-w-2xl mx-auto">
            Interested in research collaboration, AI projects, or healthcare innovation? Let's build something amazing together.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              const isHovered = hoveredCard === item.label;

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onMouseEnter={() => setHoveredCard(item.label)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative ${item.colorClass}`}
                >
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-cyber-dark/80 backdrop-blur-sm transition-all duration-500 hover:border-white/20">
                    {/* Animated top border */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-[2px] contact-top-border"
                      animate={{ opacity: isHovered ? 1 : 0.3 }}
                    />

                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 contact-glow-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    <div className="relative p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          {/* Icon container with pulse */}
                          <div className="relative">
                            <motion.div
                              className="absolute inset-0 rounded-xl blur-md contact-icon-blur"
                              animate={{ opacity: isHovered ? 0.3 : 0 }}
                            />
                            <div className="relative p-3 rounded-xl border contact-icon-container">
                              <Icon size={22} className="contact-icon" />
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{item.label}</p>
                            {item.href ? (
                              <a
                                href={item.href}
                                className="text-lg font-semibold text-white hover:text-cyan-400 transition-colors flex items-center gap-2"
                              >
                                {item.value}
                                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                              </a>
                            ) : (
                              <p className="text-lg font-semibold text-white">{item.value}</p>
                            )}
                            <p className="text-xs text-white/40 mt-1">{item.description}</p>
                          </div>
                        </div>

                        {item.copyable && (
                          <motion.button
                            type="button"
                            onClick={() => handleCopy(item.value)}
                            className="p-2 rounded-lg border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Copy to clipboard"
                          >
                            {copied ? (
                              <Check size={16} className="text-cyan-400" />
                            ) : (
                              <Copy size={16} className="text-white/40" />
                            )}
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Center Column - Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="relative h-full rounded-2xl overflow-hidden border border-white/10 bg-cyber-dark/80 backdrop-blur-sm">
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
              <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                {/* Main text */}
                <h3 className="text-2xl font-bold text-white mb-8">
                  Ready to Collaborate?
                </h3>

                {/* Email CTA */}
                <motion.a
                  href="mailto:gosar@usc.edu"
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

          {/* Right Column - Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              const isHovered = hoveredCard === link.label;

              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onMouseEnter={() => setHoveredCard(link.label)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group block ${link.colorClass}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-cyber-dark/80 backdrop-blur-sm transition-all duration-500 hover:border-white/20">
                    {/* Animated side accent */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 social-side-accent"
                      animate={{ opacity: isHovered ? 1 : 0.3 }}
                    />

                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 social-glow-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    <div className="relative p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Icon */}
                          <div className="p-3 rounded-xl border social-icon-container">
                            <Icon size={24} className="social-icon" />
                          </div>

                          <div>
                            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{link.label}</p>
                            <p className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                              {link.value}
                            </p>
                            <p className="text-xs text-white/40 mt-1">{link.stats}</p>
                          </div>
                        </div>

                        {/* Arrow */}
                        <motion.div
                          animate={{ x: isHovered ? 5 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ExternalLink size={18} className="text-white/30 group-hover:text-white/60 transition-colors" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.a>
              );
            })}

          </motion.div>
        </div>
      </div>
    </section>
  );
}
