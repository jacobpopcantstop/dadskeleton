"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface MicroButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

const MicroButton = forwardRef<HTMLButtonElement, MicroButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-bold rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2 focus-visible:ring-offset-background";

    const variantStyles = {
      primary: "bg-pink text-black hover:bg-pink/80",
      secondary: "bg-foreground text-background hover:bg-foreground/80",
      outline: "border-2 border-foreground hover:bg-foreground hover:text-background",
    };

    const sizeStyles = {
      sm: "h-8 px-4 text-sm",
      md: "h-10 px-6",
      lg: "h-12 px-8 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

MicroButton.displayName = "MicroButton";

export default MicroButton;
