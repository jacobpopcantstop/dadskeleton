"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MicroButton from "@/components/MicroButton";
import HiddenSkeleton from "@/components/HiddenSkeleton";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl font-bold tracking-tight sm:text-7xl"
          >
            <span className="text-pink">Dad</span>{" "}
            <span className="text-yellow">Skeleton</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-xl text-foreground/70"
          >
            Comedy troupe bringing improv, sketches, and live shows
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="/calendar">
              <MicroButton size="lg">See Upcoming Shows</MicroButton>
            </Link>
            <Link href="/videos">
              <MicroButton variant="outline" size="lg">
                Watch Videos
              </MicroButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Hero Photo Banner */}
      <section className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.01 }}
          className="relative aspect-[21/9] w-full rounded-lg border-2 border-dashed border-foreground/20 bg-foreground/5 flex items-center justify-center overflow-hidden group"
          role="img"
          aria-label="Hero banner showing Dad Skeleton comedy troupe performance"
        >
          <span className="text-foreground/40 text-lg" aria-hidden="true">Hero Photo / Performance Shot</span>
          {/* Hidden Skeleton #1 - Inside hero photo */}
          <HiddenSkeleton id={1} className="absolute bottom-4 right-4" size={18} />
          {/* Skeleton reveal on hover */}
          <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl opacity-10">💀</span>
          </div>
        </motion.div>
      </section>

      {/* Next Show Section */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-8 text-center text-3xl font-bold">
            Next Show:{" "}
            <span className="text-yellow">The Skeleton Wars</span>
          </h2>
          <p className="mx-auto max-w-2xl text-center text-lg text-foreground/70">
            Our flagship production returns February 14th. Bones will rattle.
            Laughs will echo. Don&apos;t miss the most skeletal comedy event of the year.
          </p>
          <div className="mt-8 text-center">
            <Link
              href="/calendar"
              className="text-lg font-semibold text-pink hover:underline inline-flex items-center gap-2 group"
            >
              Get tickets{" "}
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                className="inline-block"
              >
                &rarr;
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Photo Grid */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="aspect-[4/3] rounded-lg border-2 border-dashed border-foreground/20 bg-foreground/5 flex items-center justify-center overflow-hidden group relative"
            >
              <span className="text-foreground/40">Photo {i}</span>
              {/* Skeleton reveal on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                <span className="text-4xl opacity-10">💀</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="border-t border-foreground/10 bg-foreground/5 relative">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4"
            >
              Stay in the Loop
            </motion.h2>
            <p className="text-foreground/70 mb-8 max-w-xl mx-auto">
              Get show announcements, behind-the-scenes content, and exclusive updates
              delivered straight to your inbox.
            </p>

            <a
              href="https://dadskeleton.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MicroButton size="lg">Subscribe on Substack</MicroButton>
            </a>
          </div>
        </div>
        {/* Hidden Skeleton #2 - Newsletter section corner */}
        <HiddenSkeleton id={2} className="absolute bottom-2 left-2" size={14} />
      </section>

      {/* Bottom Photo Banner */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
          className="aspect-[3/1] w-full rounded-lg border-2 border-dashed border-foreground/20 bg-foreground/5 flex items-center justify-center overflow-hidden group relative"
          role="img"
          aria-label="Dad Skeleton team group photo"
        >
          <span className="text-foreground/40 text-lg" aria-hidden="true">Team Photo</span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
            <span className="text-6xl opacity-10">💀</span>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
