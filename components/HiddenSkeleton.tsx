"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSkeletonHunt } from "@/contexts/SkeletonHuntContext";

interface HiddenSkeletonProps {
  id: number;
  className?: string;
  size?: number;
}

export default function HiddenSkeleton({ id, className = "", size = 16 }: HiddenSkeletonProps) {
  const { foundSkeletons, findSkeleton } = useSkeletonHunt();
  const [isAnimating, setIsAnimating] = useState(false);
  const isFound = foundSkeletons.has(id);

  const handleClick = () => {
    if (isFound || isAnimating) return;
    setIsAnimating(true);
    findSkeleton(id);
  };

  if (isFound && !isAnimating) {
    return null;
  }

  return (
    <AnimatePresence>
      {(!isFound || isAnimating) && (
        <motion.button
          onClick={handleClick}
          initial={{ opacity: 0.2, scale: 1 }}
          animate={{ opacity: 0.2, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 1.5,
            rotate: 45,
          }}
          whileHover={{ opacity: 0.8, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={() => {
            if (isAnimating) {
              setIsAnimating(false);
            }
          }}
          className={`hidden-skeleton cursor-pointer select-none ${className}`}
          style={{
            fontSize: size,
            lineHeight: 1,
            background: "none",
            border: "none",
            padding: 0,
          }}
          aria-label="Hidden skeleton - click to find!"
        >
          <span role="img" aria-hidden="true">💀</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
