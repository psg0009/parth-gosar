"use client";

import { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/ui/BackToTop";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import ResearchSection from "./components/sections/ResearchSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import SpotlightSection from "./components/sections/SpotlightSection";
import SkillsSection from "./components/sections/SkillsSection";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Add loading class to body during preload
    document.body.classList.add("loading");

    return () => {
      document.body.classList.remove("loading");
    };
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    document.body.classList.remove("loading");
    // Small delay before showing content for smooth transition
    setTimeout(() => setShowContent(true), 100);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main Content */}
      <div
        className={`transition-opacity duration-500 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />

        <main>
          <HeroSection />
          <AboutSection />
          <FeaturesSection />
          <ResearchSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <SpotlightSection />
        </main>

        <Footer />
      </div>

      {/* Back to Top Button - Outside main content wrapper so it's always accessible */}
      <BackToTop />
    </>
  );
}
