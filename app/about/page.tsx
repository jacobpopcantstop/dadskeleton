"use client";

import { motion } from "framer-motion";
import HiddenSkeleton from "@/components/HiddenSkeleton";

export default function AboutPage() {
  const teamMembers = [
    { name: "Jacob", role: "Performer / Writer", src: "/photos/just-jacob-img-9966.jpg", alt: "Jacob posing in character for Dad Skeleton promo materials" },
    { name: "Paige", role: "Performer", src: "/photos/just-paige-img-5421.jpg", alt: "Paige portrait from a Dad Skeleton photoshoot" },
    { name: "Vince", role: "Performer", src: "/photos/feat-vince-img-9972.jpg", alt: "Vince featured portrait with stage-style lighting" },
    { name: "Ensemble", role: "Rotating Player", src: "/photos/rotating-players-ensemble-img-9968.jpg", alt: "Rotating players ensemble portrait for the troupe" },
    { name: "Kim Knife", role: "Character", src: "/photos/just-paige-kim-knife.jpeg", alt: "Kim Knife character portrait from a comedy sketch setup" },
    { name: "Cast", role: "Live Show", src: "/photos/paige-and-jacob-only-dsc-0164.jpg", alt: "Cast photo during a live Dad Skeleton performance" },
    { name: "Duo", role: "Sketch Team", src: "/photos/paige-and-jacob-only-dsc-0083.jpg", alt: "Paige and Jacob duo photo used for sketch promotion" },
    { name: "The Troupe", role: "Dad Skeleton", src: "/photos/paige-and-jacob-only-dsc-0222.jpg", alt: "Dad Skeleton troupe portrait featuring core performers" },
  ];

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
        className="mb-16 aspect-[21/9] w-full rounded-lg border-2 border-foreground/10 overflow-hidden group relative"
      >
        <img
          src="/photos/paige-and-jacob-only-dsc-0222.jpg"
          alt="Wide portrait of Dad Skeleton performers in a styled group setup"
          className="h-full w-full object-cover"
        />
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
            className="aspect-[3/4] w-full rounded-lg border-2 border-foreground/10 overflow-hidden group relative"
          >
            <img
              src="/photos/just-jacob-dsc-0183.jpg"
              alt="Black and white portrait of Jacob from a Dad Skeleton shoot"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="aspect-square w-full rounded-lg border-2 border-foreground/10 overflow-hidden group relative"
          >
            <img
              src="/photos/just-paige-dsc-0167.jpg"
              alt="Paige portrait with dramatic stage-style composition"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </aside>
      </div>

      {/* Team Member Grid */}
      <section className="mt-16 pt-16 border-t border-foreground/10 relative">
        <h2 className="text-3xl font-bold mb-8">Meet the Skeletons</h2>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 1) * 0.05 }}
              whileHover={{ y: -8 }}
              className="text-center relative"
            >
              <div className="aspect-square w-full rounded-lg border-2 border-foreground/10 mb-4 overflow-hidden group relative">
                <img
                  src={member.src}
                  alt={member.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {/* Hidden Skeleton #3 - In the 4th team member */}
                {i === 3 && (
                  <HiddenSkeleton id={3} className="absolute bottom-2 right-2" size={14} />
                )}
              </div>
              <p className="font-bold">{member.name}</p>
              <p className="text-sm text-foreground/60">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom Photo Banner */}
      <section className="mt-16 relative">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="aspect-[3/1] w-full rounded-lg border-2 border-foreground/10 overflow-hidden group relative"
        >
          <img
            src="/photos/paige-and-jacob-only-dsc-0240.jpg"
            alt="Panoramic live-performance photo of Dad Skeleton on stage"
            className="h-full w-full object-cover"
          />
        </motion.div>
        {/* Hidden Skeleton #4 - Camouflaged in footer border area */}
        <div className="mt-8 border-t border-foreground/10 pt-4 relative">
          <HiddenSkeleton id={4} className="absolute top-2 right-1/2" size={12} />
        </div>
      </section>
    </main>
  );
}
