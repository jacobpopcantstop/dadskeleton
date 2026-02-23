"use client";

import { motion } from "framer-motion";
import HiddenSkeleton from "@/components/HiddenSkeleton";

export default function GalleryPage() {
  const images = [
    { id: "1", src: "/photos/paige-and-jacob-only-dsc-0290.jpg", alt: "Paige and Jacob portrait", hasSkeleton: true },
    { id: "2", src: "/photos/just-paige-kim-knife.jpeg", alt: "Kim Knife portrait" },
    { id: "3", src: "/photos/just-jacob-img-9966.jpg", alt: "Jacob portrait" },
    { id: "4", src: "/photos/feat-vince-img-9972.jpg", alt: "Vince featured shot" },
    { id: "5", src: "/photos/paige-and-jacob-only-dsc-0083.jpg", alt: "Paige and Jacob duo shot" },
    { id: "6", src: "/photos/just-paige-img-5421.jpg", alt: "Paige portrait" },
    { id: "7", src: "/photos/just-jacob-dsc-0183.jpg", alt: "Jacob black and white portrait" },
    { id: "8", src: "/photos/rotating-players-ensemble-img-9968.jpg", alt: "Rotating players ensemble" },
    { id: "9", src: "/photos/paige-and-jacob-only-dsc-0164.jpg", alt: "Paige and Jacob stage photo" },
    { id: "10", src: "/photos/paige-and-jacob-only-img-9006.jpg", alt: "Paige and Jacob candid" },
    { id: "11", src: "/photos/feat-vince-img-8992.jpg", alt: "Vince close-up photo" },
    { id: "12", src: "/photos/paige-and-jacob-only-dsc-0222.jpg", alt: "Paige and Jacob portrait 2" },
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
            <div className="relative h-full w-full">
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              {/* Skeleton reveal on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                <span className="text-6xl text-white opacity-30">💀</span>
              </div>
              {/* Hidden Skeleton #6 - Among the photo grid */}
              {image.hasSkeleton && (
                <HiddenSkeleton id={6} className="absolute bottom-2 right-2" size={16} />
              )}
            </div>
          </motion.div>
        ))}
      </div>

    </main>
  );
}
