"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface AnimatedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function AnimatedLink({ href, children, className = "", onClick }: AnimatedLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative inline-block text-sm font-semibold uppercase tracking-wide transition-colors ${
        isActive ? "text-pink" : "text-foreground hover:text-pink"
      } ${className}`}
    >
      <motion.span
        className="relative"
        whileHover={{ y: -1 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-pink"
        initial={{ width: isActive ? "100%" : 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ originX: 0 }}
      />
      {isActive && (
        <motion.span
          className="absolute bottom-0 left-0 h-0.5 w-full bg-pink"
          layoutId="activeNavUnderline"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}
