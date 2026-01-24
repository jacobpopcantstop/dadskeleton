"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSkeletonHunt } from "@/contexts/SkeletonHuntContext";
import Confetti from "@/components/Confetti";
import MicroButton from "@/components/MicroButton";

export default function BoneZonePage() {
  const router = useRouter();
  const { isComplete, justCompleted, clearJustCompleted, reset } = useSkeletonHunt();
  const [showConfetti, setShowConfetti] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && !isComplete) {
      router.push("/");
    }
  }, [isHydrated, isComplete, router]);

  useEffect(() => {
    if (justCompleted) {
      setShowConfetti(true);
      clearJustCompleted();
    }
  }, [justCompleted, clearJustCompleted]);

  // Show loading state during hydration
  if (!isHydrated) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center">
        <div className="text-foreground/50">Loading...</div>
      </main>
    );
  }

  // Redirect happens in useEffect, show nothing while redirecting
  if (!isComplete) {
    return null;
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Confetti isActive={showConfetti} onComplete={() => setShowConfetti(false)} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {/* Dancing Skeleton */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-8xl mb-8 inline-block"
        >
          💀
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl sm:text-6xl font-bold mb-4"
        >
          Welcome to the{" "}
          <span className="animate-gradient-text">Bone Zone</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-foreground/70 mb-12"
        >
          You found all 10 skeletons. You&apos;re officially one of us.
        </motion.p>

        {/* Secret Content */}
        <div className="space-y-12">
          {/* Secret Video */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="border-2 border-pink rounded-lg p-8 bg-pink/5"
          >
            <h2 className="text-2xl font-bold mb-4 text-pink">
              🎬 Secret Bloopers Reel
            </h2>
            <p className="text-foreground/70 mb-6">
              Exclusive content only for true skeleton hunters.
            </p>
            <div className="aspect-video bg-black rounded-lg border-2 border-foreground/20 flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl mb-4 block">🎥</span>
                <span className="text-foreground/50">
                  [Secret Video Embed Here]
                </span>
              </div>
            </div>
          </motion.section>

          {/* Exclusive Wallpapers */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-4">
              🖼️ Exclusive Wallpapers
            </h2>
            <p className="text-foreground/70 mb-6">
              Download Dad Skeleton art for your devices.
            </p>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
              {["Desktop", "Mobile", "Tablet"].map((device, i) => (
                <motion.div
                  key={device}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="aspect-video bg-foreground/5 rounded-lg border-2 border-foreground/20 flex items-center justify-center cursor-pointer hover:border-yellow transition-colors"
                >
                  <div className="text-center">
                    <span className="text-3xl mb-2 block">
                      {["🖥️", "📱", "📲"][i]}
                    </span>
                    <span className="text-sm font-semibold">{device}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Certificate */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="border-4 border-yellow rounded-lg p-8 bg-yellow/5"
          >
            <div className="text-center">
              <span className="text-6xl mb-4 block">🏆</span>
              <h2 className="text-3xl font-bold mb-2 text-yellow">
                Certificate of Bone-ification
              </h2>
              <p className="text-foreground/70 mb-4">
                This certifies that you have successfully located all 10
                hidden skeletons across the Dad Skeleton website.
              </p>
              <p className="text-2xl font-bold">
                You are now officially a{" "}
                <span className="text-pink">Skeleton</span>.
              </p>
            </div>
          </motion.section>

          {/* Share */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Share Your Achievement</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <MicroButton
                onClick={() => {
                  const text = "I found all 10 hidden skeletons on the Dad Skeleton website! 💀🦴 Can you find them all?";
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
                    "_blank"
                  );
                }}
              >
                Share on X
              </MicroButton>
              <MicroButton
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(
                    "I found all 10 hidden skeletons on the Dad Skeleton website! 💀🦴"
                  );
                  alert("Copied to clipboard!");
                }}
              >
                Copy to Clipboard
              </MicroButton>
            </div>
          </motion.section>

          {/* Play Again */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="pt-8 border-t border-foreground/10"
          >
            <p className="text-foreground/50 mb-4">
              Want to hunt again? Reset your progress.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/">
                <MicroButton variant="outline">Back to Home</MicroButton>
              </Link>
              <MicroButton
                variant="secondary"
                onClick={() => {
                  if (confirm("Reset all progress and start the hunt over?")) {
                    reset();
                    router.push("/");
                  }
                }}
              >
                Reset & Hunt Again
              </MicroButton>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </main>
  );
}
