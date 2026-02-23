"use client";

import { motion } from "framer-motion";
import MicroButton from "@/components/MicroButton";
import MicroCard from "@/components/MicroCard";
import HiddenSkeleton from "@/components/HiddenSkeleton";

export default function GetInvolvedPage() {
  const communityGridPhotos = [
    { src: "/photos/just-paige-dsc-0127.jpg", alt: "Paige in character during a community-focused performance session" },
    { src: "/photos/just-jacob-img-6636.jpg", alt: "Jacob portrait used for classes and participation callouts" },
    { src: "/photos/feat-vince-img-9968.jpg", alt: "Vince promo portrait tied to troupe workshops and events" },
    { src: "/photos/rotating-players-ensemble-img-1507.jpg", alt: "Rotating players image representing the wider Dad Skeleton community" },
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 text-5xl font-bold tracking-tight"
      >
        Get Involved
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-16 text-lg text-foreground/70"
      >
        Join the Dad Skeleton community. Submit your work, take a class, or hang out with us.
      </motion.p>

      {/* Photo Banner Placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.01 }}
        className="mb-16 aspect-[3/1] w-full rounded-lg border-2 border-foreground/10 overflow-hidden group relative"
      >
        <img
          src="/photos/rotating-players-ensemble-dsc-0183.jpg"
          alt="Dad Skeleton community banner featuring performers and rotating players"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Submit to Skeleton Wars */}
        <section className="lg:col-span-2">
          <MicroCard className="p-8" enableTilt={false}>
            <h2 className="text-3xl font-bold mb-2">
              Submit to <span className="text-yellow">The Skeleton Wars</span>
            </h2>
            <p className="text-foreground/70 mb-8">
              Got a sketch, monologue, or comedic piece? Submit it for consideration
              in our flagship show. We&apos;re always looking for fresh bones.
            </p>

            <a
              href="https://forms.gle/bnsKBsB5kbADLWRw6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MicroButton size="lg">Submit via Google Form</MicroButton>
            </a>
          </MicroCard>
        </section>

        {/* Sidebar - Classes & Discord */}
        <aside className="space-y-8">
          {/* Take a Class */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <MicroCard className="p-6">
              <h2 className="text-2xl font-bold mb-4">Take a Class</h2>
              <p className="text-foreground/70 mb-6">
                Learn improv, sketch writing, and character work from the Dad Skeleton team.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  { name: "Improv 101", level: "Beginner" },
                  { name: "Improv 201", level: "Intermediate" },
                  { name: "Sketch Writing", level: "All Levels" },
                ].map((cls) => (
                  <motion.div
                    key={cls.name}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between"
                  >
                    <span className="font-semibold">{cls.name}</span>
                    <span className="text-sm text-yellow">{cls.level}</span>
                  </motion.div>
                ))}
              </div>

              <a href="mailto:dadskeletoncomedy@gmail.com" className="w-full">
                <MicroButton variant="outline" className="w-full">
                  Inquire About Classes
                </MicroButton>
              </a>
            </MicroCard>
          </motion.div>

          {/* Join Discord */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <MicroCard className="p-6 border-pink bg-pink/5 relative">
              <h2 className="text-2xl font-bold mb-4">Join Our Discord</h2>
              <p className="text-foreground/70 mb-6">
                Hang out with fellow comedy nerds, get show announcements first, and
                participate in community events.
              </p>

              <a
                href="https://discord.gg/tFahckMgzm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MicroButton className="w-full">Join Discord</MicroButton>
              </a>

              <p className="mt-4 text-sm text-foreground/50 text-center">
                1,200+ members
              </p>
              {/* Hidden Skeleton #9 - In the Discord section */}
              <HiddenSkeleton id={9} className="absolute bottom-2 right-2" size={14} />
            </MicroCard>
          </motion.div>

          {/* Photo Placeholder */}
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="aspect-square w-full rounded-lg border-2 border-foreground/10 overflow-hidden group relative"
          >
            <img
              src="/photos/just-paige-dsc-0167.jpg"
              alt="Portrait image for the classes and community sidebar section"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </aside>
      </div>

      {/* Bottom Photo Grid */}
      <section className="mt-16">
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {communityGridPhotos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 1) * 0.05 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="aspect-square rounded-lg border-2 border-foreground/10 overflow-hidden group relative"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
