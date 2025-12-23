"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/app/lib/utils";
import Button from "../ui/Button";
import Image from "next/image";

const navLinks = [
  { href: "#about", label: "Profile" },
  { href: "#research", label: "Research" },
  { href: "#experience", label: "Timeline" },
  { href: "#projects", label: "Portfolio" },
  { href: "#spotlight", label: "Spotlight" },
  { href: "#skills", label: "Expertise" },
  { href: "#contact", label: "Connect" },
];

const socialLinks = [
  { href: "https://github.com/psg0009", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/parth-gosar-04042b1b1", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:gosar@usc.edu", icon: Mail, label: "Email" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "glass-strong py-4" : "py-6"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between">
            {/* Logo with Profile Photo */}
            <div className="flex items-center gap-3 text-xl md:text-2xl font-display font-bold tracking-wider">
              {/* Profile Photo - clicks to open full image in new tab */}
              <motion.a
                href="/images/spotlight/author_image.jpg"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="relative cursor-pointer block"
                title="Click to view full photo"
              >
                {/* Animated ring */}
                <motion.div
                  className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-primary opacity-80"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                {/* Image container */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-cyber-black">
                  <Image
                    src="/images/spotlight/author_image.jpg"
                    alt="Parth Gosar"
                    fill
                    className="object-cover object-[52%_18%] scale-[1.3]"
                    priority
                  />
                </div>
                {/* Status dot */}
                <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-cyber-black" />
              </motion.a>

              {/* Name - clicks to email */}
              <motion.a
                href="mailto:gosar@usc.edu?subject=Let's%20Connect%20-%20From%20Your%20Portfolio"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-cyan-400">PARTH</span>
                <span className="text-white/60">S</span>
                <span className="text-white">GOSAR</span>
              </motion.a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    "text-sm font-medium transition-colors relative",
                    activeSection === link.href.replace("#", "")
                      ? "text-cyan-400"
                      : "text-white/70 hover:text-white"
                  )}
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                  {activeSection === link.href.replace("#", "") && (
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400"
                      layoutId="activeNav"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Desktop CTA & Social */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-white/60 hover:text-cyan-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <link.icon size={18} />
                  </motion.a>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollToSection("#contact")}
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
              >
                Get in Touch
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute top-[72px] left-0 right-0 bg-cyber-elevated border-b border-cyber-border p-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      "text-lg font-medium text-left py-2 transition-colors",
                      activeSection === link.href.replace("#", "")
                        ? "text-cyan-400"
                        : "text-white/70"
                    )}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {link.label}
                  </motion.button>
                ))}

                <div className="flex items-center gap-4 pt-4 border-t border-cyber-border">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-white/60 hover:text-cyan-400 transition-colors"
                      title={link.label}
                      aria-label={link.label}
                    >
                      <link.icon size={20} />
                    </a>
                  ))}
                </div>

                <Button
                  variant="primary"
                  className="mt-4 bg-cyan-500 hover:bg-cyan-400"
                  onClick={() => scrollToSection("#contact")}
                >
                  Get in Touch
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
