"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const socialLinks = [
    { label: "YouTube", href: "https://www.youtube.com/@DadSkeleton" },
    { label: "Instagram", href: "https://instagram.com/dadskeleton" },
    { label: "TikTok", href: "https://tiktok.com/@dadskeleton" },
    { label: "Discord", href: "https://discord.gg/tFahckMgzm" },
  ];

  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Videos", href: "/videos" },
    { label: "Calendar", href: "/calendar" },
    { label: "Gallery", href: "/gallery" },
    { label: "Get Involved", href: "/get-involved" },
  ];

  return (
    <footer className="border-t border-foreground/10 bg-foreground/5">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-pink">Dad</span>{" "}
                <span className="text-yellow">Skeleton</span>
              </span>
            </Link>
            <p className="mt-4 text-foreground/60 text-sm">
              Comedy troupe bringing improv, sketches, and live shows.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Pages</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground/60 hover:text-pink transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 mb-6">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-pink transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-sm text-foreground/60">
              <p>
                <a
                  href="mailto:dadskeletoncomedy@gmail.com"
                  className="hover:text-pink transition-colors"
                >
                  dadskeletoncomedy@gmail.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+17606136451"
                  className="hover:text-pink transition-colors"
                >
                  (760) 613-6451
                </a>
              </p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-foreground/10 text-center text-sm text-foreground/40"
        >
          <p>&copy; {new Date().getFullYear()} Dad Skeleton. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
