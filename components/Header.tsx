"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedLink from "./AnimatedLink";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRattling, setIsRattling] = useState(false);

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/videos", label: "Videos" },
    { href: "/calendar", label: "Calendar" },
    { href: "/gallery", label: "Gallery" },
    { href: "/tools", label: "Tools" },
    { href: "/get-involved", label: "Get Involved" },
  ];

  const handleLogoClick = () => {
    setIsRattling(true);
    setTimeout(() => setIsRattling(false), 500);
  };

  return (
    <header className="border-b border-foreground/10 bg-background">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="group flex items-center gap-3"
        >
          <Image
            src="/logo.png"
            alt="Dad Skeleton logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border border-foreground/20 object-cover"
            priority
          />
          <motion.span
            className={`text-2xl font-bold tracking-tight inline-block ${
              isRattling ? "animate-rattle" : ""
            }`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="text-pink group-hover:animate-wiggle inline-block">Dad</span>{" "}
            <span className="text-yellow group-hover:animate-wiggle inline-block" style={{ animationDelay: "0.1s" }}>Skeleton</span>
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <AnimatedLink href={link.href}>
                {link.label}
              </AnimatedLink>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Button */}
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            animate={{
              rotate: mobileMenuOpen ? 45 : 0,
              y: mobileMenuOpen ? 8 : 0,
            }}
            className="block w-6 h-0.5 bg-foreground"
          />
          <motion.span
            animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
            className="block w-6 h-0.5 bg-foreground"
          />
          <motion.span
            animate={{
              rotate: mobileMenuOpen ? -45 : 0,
              y: mobileMenuOpen ? -8 : 0,
            }}
            className="block w-6 h-0.5 bg-foreground"
          />
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="md:hidden border-t border-foreground/10 overflow-hidden"
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((link, index) => (
            <motion.li
              key={link.href}
              initial={{ x: -20, opacity: 0 }}
              animate={{
                x: mobileMenuOpen ? 0 : -20,
                opacity: mobileMenuOpen ? 1 : 0,
              }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-lg font-semibold uppercase tracking-wide transition-colors ${
                  pathname === link.href
                    ? "text-pink"
                    : "text-foreground hover:text-pink"
                }`}
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </header>
  );
}
