"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/psg0009", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/parth-gosar-04042b1b1", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:gosar@usc.edu", icon: Mail, label: "Email" },
];

const quickLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const externalLinks = [
  { href: "https://news.engr.psu.edu/2025/gosar-parth-oswald-award-winner.aspx", label: "Oswald Award" },
  { href: "https://www.psu.edu/news/academics/story/four-student-leaders-named-2025-oswald-award-winners", label: "Penn State News" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-cyber-elevated border-t border-cyber-border">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.a
              href="#"
              className="inline-block text-2xl font-display font-bold tracking-wider mb-4"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-primary text-glow">PARTH</span>
              <span className="text-white/60">//</span>
              <span className="text-white">GOSAR</span>
            </motion.a>
            <p className="text-white/60 max-w-md mb-6 leading-relaxed">
              AI/ML Researcher & Software Engineer pursuing MS in Computer Science 
              (AI) at USC. Passionate about building innovative solutions that make 
              a positive impact.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-cyber-card border border-cyber-border rounded-lg text-white/60 hover:text-primary hover:border-primary/50 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <link.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured In */}
          <div>
            <h4 className="text-white font-semibold mb-4">Featured In</h4>
            <ul className="space-y-3">
              {externalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-primary transition-colors text-sm inline-flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink size={12} />
                  </a>
                </li>
              ))}
            </ul>

            {/* Status */}
            <div className="mt-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs text-white/40">Available for opportunities</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-cyber-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">
            © {currentYear} Parth Gosar. All rights reserved.
          </p>
          <p className="text-sm text-white/40">
            Built with Next.js & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
