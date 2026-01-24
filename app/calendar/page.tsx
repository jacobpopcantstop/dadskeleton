"use client";

import { motion } from "framer-motion";
import MicroCard from "@/components/MicroCard";
import HiddenSkeleton from "@/components/HiddenSkeleton";

export default function CalendarPage() {
  const upcomingShows = [
    {
      id: "1",
      title: "The Skeleton Wars",
      date: "February 14, 2025",
      time: "8:00 PM",
      venue: "The Black Box Theater",
      description: "Our flagship production returns with more bones, more chaos, and more laughs.",
    },
    {
      id: "2",
      title: "Improv Night",
      date: "February 21, 2025",
      time: "9:00 PM",
      venue: "Comedy Central Stage",
      description: "Anything can happen when the audience calls the shots.",
    },
    {
      id: "3",
      title: "Sketch Showcase",
      date: "March 1, 2025",
      time: "7:30 PM",
      venue: "The Laugh Factory",
      description: "A curated collection of our best original sketches. Bones rattle at every punchline.",
      hasSkeleton: true,
    },
    {
      id: "4",
      title: "The Skeleton Wars II",
      date: "March 15, 2025",
      time: "8:00 PM",
      venue: "The Black Box Theater",
      description: "The skeletons are back. This time, it's personal.",
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 text-5xl font-bold tracking-tight"
      >
        Upcoming Shows
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12 text-lg text-foreground/70"
      >
        Catch us live! Here&apos;s where you can see Dad Skeleton perform.
      </motion.p>

      {/* Hero Photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.01 }}
        className="mb-12 aspect-[21/9] w-full rounded-lg border-2 border-dashed border-foreground/20 bg-foreground/5 flex items-center justify-center overflow-hidden group relative"
      >
        <span className="text-foreground/40 text-lg">Live Show Photo</span>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
          <span className="text-6xl opacity-10">💀</span>
        </div>
      </motion.div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Shows List */}
        <div className="lg:col-span-2 space-y-6">
          {upcomingShows.map((show, index) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <MicroCard className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 relative">
                    <h2 className="text-2xl font-bold">{show.title}</h2>
                    <p className="mt-2 text-foreground/70">
                      {show.description}
                      {/* Hidden Skeleton #5 - Inside show description */}
                      {show.hasSkeleton && (
                        <HiddenSkeleton id={5} className="inline-block ml-1 align-middle" size={14} />
                      )}
                    </p>
                    <p className="mt-3 text-sm text-foreground/60">{show.venue}</p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end sm:text-right">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="inline-block rounded-full bg-yellow px-4 py-2 text-lg font-bold text-black"
                    >
                      {show.date}
                    </motion.span>
                    <span className="mt-2 text-xl font-semibold text-pink">
                      {show.time}
                    </span>
                  </div>
                </div>
              </MicroCard>
            </motion.div>
          ))}
        </div>

        {/* Sidebar Photos */}
        <aside className="space-y-4">
          {["Show Photo", "Venue Photo", "Audience Photo"].map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className={`${i === 1 ? "aspect-square" : "aspect-[4/3]"} w-full rounded-lg border-2 border-dashed border-foreground/20 bg-foreground/5 flex items-center justify-center overflow-hidden group relative`}
            >
              <span className="text-foreground/40">{label}</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                <span className="text-4xl opacity-10">💀</span>
              </div>
            </motion.div>
          ))}
        </aside>
      </div>

      {/* Bottom Photo Grid */}
      <section className="mt-16 pt-16 border-t border-foreground/10">
        <h2 className="text-2xl font-bold mb-6">Past Shows</h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="aspect-[4/3] rounded-lg border-2 border-dashed border-foreground/20 bg-foreground/5 flex items-center justify-center overflow-hidden group relative"
            >
              <span className="text-foreground/40">Past Show {i}</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                <span className="text-4xl opacity-10">💀</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
