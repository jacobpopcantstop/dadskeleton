"use client";

import { motion } from "framer-motion";
import HiddenSkeleton from "@/components/HiddenSkeleton";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-5xl font-bold tracking-tight"
      >
        About Us
      </motion.h1>

      {/* Hero Photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.01 }}
        className="mb-16 aspect-[21/9] w-full rounded-lg border-2 border-dashed border-foreground/20 bg-foreground/5 flex items-center justify-center overflow-hidden group relative"
      >
        <span className="text-foreground/40 text-lg">Troupe Photo</span>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
          <span className="text-6xl opacity-10">💀</span>
        </div>
      </motion.div>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border-l-4 border-pink pl-6"
            >
              <h2 className="mb-4 text-2xl font-bold">Our Troupe</h2>
              <p className="text-lg leading-relaxed text-foreground/80">
                Dad Skeleton is a comedy troupe dedicated to bringing laughter through
                improv, sketch comedy, and live performances. We blend absurdist
                humor with sharp wit to create unforgettable shows.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="border-l-4 border-yellow pl-6"
            >
              <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
              <p className="text-lg leading-relaxed text-foreground/80">
                We believe comedy should be bold, inclusive, and boundary-pushing.
                Our mission is to create a space where audiences can escape the
                ordinary and experience the unexpected.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="border-l-4 border-pink pl-6"
            >
              <h2 className="mb-4 text-2xl font-bold">The Team</h2>
              <p className="text-lg leading-relaxed text-foreground/80">
                Our performers come from diverse backgrounds in theater, comedy, and
                the arts. Together, we craft shows that are equal parts chaos and
                brilliance.
              </p>
            </motion.div>
          </section>
        </div>

        {/* Sidebar Photos */}
        <aside className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="aspect-[3/4] w-full rounded-lg border-2 border-dashed border-foreground/20 bg-foreground/5 flex items-center justify-center overflow-hidden group relative"
          >
            <span className="text-foreground/40">Photo</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
              <span className="text-4xl opacity-10">💀</span>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="aspect-square w-full rounded-lg border-2 border-dashed border-foreground/20 bg-foreground/5 flex items-center justify-center overflow-hidden group relative"
          >
            <span className="text-foreground/40">Photo</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
              <span className="text-4xl opacity-10">💀</span>
            </div>
          </motion.div>
        </aside>
      </div>

      {/* Team Member Grid */}
      <section className="mt-16 pt-16 border-t border-foreground/10 relative">
        <h2 className="text-3xl font-bold mb-8">Meet the Skeletons</h2>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8 }}
              className="text-center relative"
            >
              <div className="aspect-square w-full rounded-lg border-2 border-dashed border-foreground/20 bg-foreground/5 flex items-center justify-center mb-4 overflow-hidden group relative">
                <span className="text-foreground/40">Headshot</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                  <span className="text-4xl opacity-10">💀</span>
                </div>
                {/* Hidden Skeleton #3 - In the 4th team member */}
                {i === 4 && (
                  <HiddenSkeleton id={3} className="absolute bottom-2 right-2" size={14} />
                )}
              </div>
              <p className="font-bold">Team Member {i}</p>
              <p className="text-sm text-foreground/60">Performer</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom Photo Banner */}
      <section className="mt-16 relative">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="aspect-[3/1] w-full rounded-lg border-2 border-dashed border-foreground/20 bg-foreground/5 flex items-center justify-center overflow-hidden group relative"
        >
          <span className="text-foreground/40 text-lg">Performance Photo</span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
            <span className="text-6xl opacity-10">💀</span>
          </div>
        </motion.div>
        {/* Hidden Skeleton #4 - Camouflaged in footer border area */}
        <div className="mt-8 border-t border-foreground/10 pt-4 relative">
          <HiddenSkeleton id={4} className="absolute top-2 right-1/2" size={12} />
        </div>
      </section>
    </main>
  );
}
