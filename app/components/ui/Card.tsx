"use client";

import { cn } from "@/app/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "glass" | "glow" | "gradient" | "shimmer" | "medical";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  borderGlow?: "primary" | "secondary" | "accent" | "cyan" | "none";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      hover = true,
      padding = "md",
      borderGlow = "none",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = "rounded-xl transition-all duration-300 ease-out relative overflow-hidden";

    const variants = {
      default: "bg-cyber-card border border-cyber-border",
      elevated: "bg-cyber-elevated border border-cyber-border shadow-lg shadow-black/20",
      glass:
        "bg-cyber-card/70 backdrop-blur-xl border border-cyber-border/50 shadow-lg shadow-black/10",
      glow: "bg-cyber-card border border-cyber-border shadow-[0_0_20px_rgba(0,255,136,0.1)]",
      gradient:
        "bg-gradient-to-br from-cyber-card via-cyber-elevated to-cyber-surface border border-cyber-border/50",
      shimmer:
        "bg-cyber-card border border-cyber-border before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent",
      medical:
        "bg-gradient-to-br from-cyber-card to-cyan-950/20 border border-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.1)]",
    };

    const hoverStyles = hover
      ? "hover:border-primary/50 hover:shadow-[0_0_40px_rgba(0,255,136,0.12)] hover:-translate-y-1 hover:scale-[1.01]"
      : "";

    const borderGlowStyles = {
      none: "",
      primary: "ring-1 ring-primary/20 hover:ring-primary/40",
      secondary: "ring-1 ring-secondary/20 hover:ring-secondary/40",
      accent: "ring-1 ring-accent/20 hover:ring-accent/40",
      cyan: "ring-1 ring-cyan-500/20 hover:ring-cyan-500/40",
    };

    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          hoverStyles,
          borderGlowStyles[borderGlow],
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
