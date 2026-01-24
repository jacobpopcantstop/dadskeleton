"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MicroButton from "@/components/MicroButton";
import HiddenSkeleton from "@/components/HiddenSkeleton";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {/* ASCII Skeleton Art */}
        <motion.pre
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-pink text-xs sm:text-sm md:text-base font-mono mb-8 inline-block relative"
          aria-hidden="true"
        >
{`     .-.
    (o.o)
     |=|
    __|__
   //.=|=.\\\\
  // .=|=. \\\\
  \\\\ .=|=. //
   \\\\(_=_)//
    (:| |:)
     || ||
     () ()
     || ||
     || ||
    ==' '==`}
          {/* Hidden Skeleton #10 - The 404 itself */}
          <HiddenSkeleton
            id={10}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            size={20}
          />
        </motion.pre>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl font-bold mb-4"
        >
          <span className="text-yellow">4</span>
          <span className="text-pink">0</span>
          <span className="text-yellow">4</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-foreground/70 mb-2"
        >
          This page has been buried...
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-foreground/50 mb-8"
        >
          The bones you seek are not here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/">
            <MicroButton size="lg">
              <span className="mr-2">🦴</span>
              Go Home
            </MicroButton>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-xs text-foreground/30"
        >
          Psst... there might be something hidden here...
        </motion.p>
      </motion.div>
    </main>
  );
}
