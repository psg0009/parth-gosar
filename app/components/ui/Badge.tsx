"use client";

import { cn } from "@/app/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "muted" | "gradient" | "glow";
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
  icon?: React.ReactNode;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "primary", size = "md", pulse = false, icon, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-300 ease-out select-none";

    const variants = {
      primary:
        "bg-primary/10 text-primary border border-primary/20 hover:border-primary/50 hover:bg-primary/15 hover:shadow-[0_0_20px_rgba(0,255,136,0.15)]",
      secondary:
        "bg-secondary/10 text-secondary border border-secondary/20 hover:border-secondary/50 hover:bg-secondary/15 hover:shadow-[0_0_20px_rgba(0,102,255,0.15)]",
      accent:
        "bg-accent/10 text-accent border border-accent/20 hover:border-accent/50 hover:bg-accent/15 hover:shadow-[0_0_20px_rgba(255,0,102,0.15)]",
      outline:
        "bg-transparent text-white/80 border border-cyber-border hover:border-primary/50 hover:text-primary hover:bg-primary/5",
      muted:
        "bg-cyber-surface text-white/60 border border-cyber-border hover:border-white/20 hover:text-white/80",
      gradient:
        "bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 text-white border border-white/10 hover:border-white/30 backdrop-blur-sm",
      glow:
        "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] hover:text-cyan-300",
    };

    const sizes = {
      sm: "text-xs px-2.5 py-0.5",
      md: "text-sm px-3 py-1",
      lg: "text-base px-4 py-1.5",
    };

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          pulse && "animate-pulse",
          className
        )}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
