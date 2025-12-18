"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useIntersection } from "@/app/hooks/useIntersection";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { projects, projectCategories } from "@/app/constants/projects";
import { useState } from "react";

export default function ProjectsSection() {
  const { ref, isVisible } = useIntersection<HTMLElement>({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 6);

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
    <section id="projects" ref={ref} className="section relative">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[200px]" />

      <div className="relative container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-mono mb-4">
              PROJECTS
            </span>
            <h2 className="section-title">
              Featured <span className="gradient-text-accent">Work</span>
            </h2>
            <p className="section-subtitle mx-auto">
              From AI-powered platforms to research breakthroughs
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setShowAll(false);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-accent text-white"
                    : "bg-cyber-card border border-cyber-border text-white/70 hover:border-accent/50 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Show More Button */}
          {filteredProjects.length > 6 && (
            <motion.div
              variants={itemVariants}
              className="text-center mt-10"
            >
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less" : `Show All (${filteredProjects.length})`}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: (typeof projects)[0];
}

function ProjectCard({ project }: ProjectCardProps) {
  const categoryColors: Record<string, string> = {
    ai: "primary",
    research: "secondary",
    startup: "accent",
    web: "primary",
    medical: "glow",
  };

  const categoryGradients: Record<string, string> = {
    ai: "from-primary/20 to-secondary/10",
    research: "from-secondary/20 to-cyan-500/10",
    startup: "from-accent/20 to-primary/10",
    web: "from-primary/20 to-emerald-500/10",
    medical: "from-cyan-500/20 to-emerald-500/10",
  };

  return (
    <Card
      variant="default"
      padding="none"
      className="group h-full flex flex-col overflow-hidden card-shine"
    >
      {/* Header with gradient */}
      <div className={`relative h-36 bg-gradient-to-br ${categoryGradients[project.category] || "from-cyber-card to-cyber-elevated"} p-6`}>
        {/* Animated background glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/10 group-hover:to-secondary/5 transition-all duration-500" />

        {/* Category Badge */}
        <Badge
          variant={categoryColors[project.category] as any}
          size="sm"
          className="absolute top-4 right-4 z-10"
        >
          {project.category.toUpperCase()}
        </Badge>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 text-xs text-primary font-mono bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            FEATURED
          </div>
        )}

        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-border to-transparent" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col relative">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-white/60 text-sm mb-4 flex-1 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 bg-cyber-surface rounded-md text-white/50 border border-cyber-border/50 hover:border-primary/30 hover:text-white/70 transition-all"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-xs px-2.5 py-1 bg-cyber-surface rounded-md text-white/50 border border-cyber-border/50">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-4 border-t border-cyber-border/50">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-white/60 hover:text-primary transition-colors"
              whileHover={{ x: 2 }}
            >
              <Github size={16} />
              Code
            </motion.a>
          )}
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-white/60 hover:text-primary transition-colors"
              whileHover={{ x: 2 }}
            >
              <ExternalLink size={16} />
              Live Demo
            </motion.a>
          )}
          <motion.span
            className="ml-auto"
            initial={{ x: 0, y: 0 }}
            whileHover={{ x: 2, y: -2 }}
          >
            <ArrowUpRight
              size={18}
              className="text-white/30 group-hover:text-primary transition-colors duration-300"
            />
          </motion.span>
        </div>
      </div>
    </Card>
  );
}
