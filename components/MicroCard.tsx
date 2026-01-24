"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ReactNode, MouseEvent } from "react";

interface MicroCardProps {
  children: ReactNode;
  className?: string;
  enableTilt?: boolean;
}

export default function MicroCard({ children, className = "", enableTilt = true }: MicroCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!enableTilt) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={enableTilt ? { rotateX, rotateY, transformStyle: "preserve-3d" } : {}}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`border-2 border-foreground/10 rounded-lg hover:border-pink transition-colors ${className}`}
    >
      {children}
    </motion.div>
  );
}
