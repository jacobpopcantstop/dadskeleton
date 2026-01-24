"use client";

import { motion } from "framer-motion";
import MicroCard from "@/components/MicroCard";
import HiddenSkeleton from "@/components/HiddenSkeleton";

export default function VideosPage() {
  // Add video IDs from your YouTube channel here
  // Get the video ID from the URL: youtube.com/watch?v=VIDEO_ID
  const videos = [
    {
      id: "1",
      title: "Coming Soon",
      embedUrl: null, // Replace with: "https://www.youtube.com/embed/VIDEO_ID"
    },
    {
      id: "2",
      title: "Coming Soon",
      embedUrl: null,
    },
    {
      id: "3",
      title: "Coming Soon",
      embedUrl: null,
    },
    {
      id: "4",
      title: "Coming Soon",
      embedUrl: null,
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 text-5xl font-bold tracking-tight relative inline-block"
      >
        Vide
        <span className="relative inline-block">
          <span>o</span>
          {/* Hidden Skeleton #7 - In the 'o' of Videos */}
          <HiddenSkeleton id={7} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={12} />
        </span>
        s
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 text-lg text-foreground/70"
      >
        Watch our latest sketches, live performances, and behind-the-scenes content.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-12"
      >
        <a
          href="https://www.youtube.com/@DadSkeleton"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-pink hover:underline font-semibold"
        >
          Subscribe on YouTube &rarr;
        </a>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <MicroCard className="overflow-hidden" enableTilt={false}>
              <div className="aspect-video overflow-hidden border-b-4 border-purple-pink bg-black flex items-center justify-center">
                {video.embedUrl ? (
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                ) : (
                  <span className="text-white/40 text-lg">Video Coming Soon</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold group-hover:text-pink transition-colors">
                  {video.title}
                </h3>
              </div>
            </MicroCard>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
