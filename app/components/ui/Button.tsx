"use client";

import { cn } from "@/app/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "glow" | "gradient";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      isLoading,
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-all duration-300 ease-out rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none active:scale-[0.98] select-none";

    const variants = {
      primary:
        "bg-primary text-black hover:bg-primary/90 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(0,255,136,0.5)] focus-visible:ring-primary active:shadow-[0_0_20px_rgba(0,255,136,0.6)]",
      secondary:
        "bg-secondary text-white hover:bg-secondary/90 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(0,102,255,0.5)] focus-visible:ring-secondary active:shadow-[0_0_20px_rgba(0,102,255,0.6)]",
      accent:
        "bg-accent text-white hover:bg-accent/90 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(255,0,102,0.5)] focus-visible:ring-accent active:shadow-[0_0_20px_rgba(255,0,102,0.6)]",
      outline:
        "border-2 border-primary text-primary bg-transparent hover:bg-primary/10 hover:shadow-[0_0_25px_rgba(0,255,136,0.25)] focus-visible:ring-primary hover:border-primary/80",
      ghost:
        "text-white/80 bg-transparent hover:bg-white/5 hover:text-primary focus-visible:ring-white/20 hover:shadow-none",
      glow:
        "bg-cyan-500 text-black hover:bg-cyan-400 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] focus-visible:ring-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.3)]",
      gradient:
        "bg-gradient-to-r from-primary via-secondary to-accent text-white hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,255,136,0.4)] focus-visible:ring-primary bg-[length:200%_100%] hover:bg-right transition-all duration-500",
    };

    const sizes = {
      sm: "text-sm px-4 py-2 gap-2 min-h-[36px]",
      md: "text-base px-6 py-3 gap-2 min-h-[44px]",
      lg: "text-lg px-8 py-4 gap-3 min-h-[52px]",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <span className="transition-transform duration-200 group-hover:-translate-x-0.5">
                {icon}
              </span>
            )}
            {children}
            {icon && iconPosition === "right" && (
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                {icon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
