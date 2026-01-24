"use client";

import { motion } from "framer-motion";
import HiddenSkeleton from "@/components/HiddenSkeleton";

export default function GalleryPage() {
  const images = [
    { id: "1", alt: "The Skeleton Wars performance", placeholder: "SKW-01" },
    { id: "2", alt: "Improv night crowd shot", placeholder: "IMP-02" },
    { id: "3", alt: "Behind the scenes rehearsal", placeholder: "BTS-03" },
    { id: "4", alt: "Cast photo 2024", placeholder: "CAST-04" },
    { id: "5", alt: "Live sketch performance", placeholder: "SKT-05", hasSkeleton: true },
    { id: "6", alt: "Comedy club exterior", placeholder: "VEN-06" },
    { id: "7", alt: "Backstage moments", placeholder: "BTS-07" },
    { id: "8", alt: "Audience reactions", placeholder: "AUD-08" },
    { id: "9", alt: "Costume design showcase", placeholder: "COS-09" },
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 text-5xl font-bold tracking-tight"
      >
        Gallery
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12 text-lg text-foreground/70"
      >
        Production stills, sketch photos, and moments from our shows.
      </motion.p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.03, y: -4 }}
            className="group aspect-square overflow-hidden rounded-lg border-2 border-foreground/10 bg-foreground/5 hover:border-pink transition-colors relative"
          >
            <div className="flex h-full w-full items-center justify-center bg-black text-white relative">
              <div className="text-center">
                <span className="block text-3xl font-bold text-pink">
                  {image.placeholder}
                </span>
                <span className="mt-2 block text-xs text-white/60">
                  {image.alt}
                </span>
              </div>
              {/* Skeleton reveal on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                <span className="text-6xl opacity-10">💀</span>
              </div>
              {/* Hidden Skeleton #6 - Among the photo grid */}
              {image.hasSkeleton && (
                <HiddenSkeleton id={6} className="absolute bottom-2 right-2" size={16} />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 text-center text-sm text-foreground/50"
      >
        Replace placeholders with actual images in the public/ directory
      </motion.p>
    </main>
  );
}
