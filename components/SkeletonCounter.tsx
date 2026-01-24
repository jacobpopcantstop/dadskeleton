"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSkeletonHunt } from "@/contexts/SkeletonHuntContext";

export default function SkeletonCounter() {
  const { foundSkeletons, totalSkeletons, isComplete, reset } = useSkeletonHunt();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trapping for modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowModal(false);
      triggerButtonRef.current?.focus();
      return;
    }

    if (e.key !== "Tab" || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement?.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement?.focus();
    }
  }, []);

  useEffect(() => {
    if (showModal) {
      document.addEventListener("keydown", handleKeyDown);
      // Focus first focusable element in modal
      const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showModal, handleKeyDown]);

  const hints = [
    { id: 1, hint: "Look where heroes stand", found: foundSkeletons.has(1) },
    { id: 2, hint: "Newsletters hide secrets", found: foundSkeletons.has(2) },
    { id: 3, hint: "Among the team members", found: foundSkeletons.has(3) },
    { id: 4, hint: "Footers have borders", found: foundSkeletons.has(4) },
    { id: 5, hint: "Show descriptions tell stories", found: foundSkeletons.has(5) },
    { id: 6, hint: "Galleries hold memories", found: foundSkeletons.has(6) },
    { id: 7, hint: "The 'o' in Videos looks suspicious", found: foundSkeletons.has(7) },
    { id: 8, hint: "Generators generate more than ideas", found: foundSkeletons.has(8) },
    { id: 9, hint: "Discord isn't just for chat", found: foundSkeletons.has(9) },
    { id: 10, hint: "404s aren't always errors", found: foundSkeletons.has(10) },
  ];

  return (
    <>
      <motion.button
        ref={triggerButtonRef}
        onClick={() => setShowModal(true)}
        className="fixed bottom-4 right-4 flex items-center gap-2 rounded-full bg-foreground/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm hover:bg-foreground/20 transition-colors z-40 focus:outline-none focus:ring-2 focus:ring-pink focus:ring-offset-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Skeleton hunt progress: ${foundSkeletons.size} of ${totalSkeletons} found`}
      >
        <span>🦴</span>
        <span>
          {foundSkeletons.size}/{totalSkeletons}
        </span>
        {isComplete && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-yellow"
          >
            ✨
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowModal(false);
              triggerButtonRef.current?.focus();
            }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="skeleton-hunt-title"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background border-2 border-foreground/20 rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            >
              <h2 id="skeleton-hunt-title" className="text-2xl font-bold mb-2">Skeleton Hunt</h2>
              <p className="text-foreground/70 mb-4">
                Find all 10 hidden skeletons across the site!
              </p>

              <div className="mb-4 p-4 rounded-lg bg-foreground/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Progress</span>
                  <span className="text-yellow font-bold">
                    {foundSkeletons.size}/{totalSkeletons}
                  </span>
                </div>
                <div className="h-2 bg-foreground/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-pink"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(foundSkeletons.size / totalSkeletons) * 100}%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {isComplete ? (
                <div className="text-center py-4">
                  <p className="text-xl font-bold text-pink mb-4">
                    You found all the skeletons!
                  </p>
                  <Link
                    href="/bone-zone"
                    onClick={() => setShowModal(false)}
                    className="inline-flex items-center justify-center rounded-full bg-yellow px-6 py-3 font-bold text-black hover:bg-yellow/80 transition-colors focus:outline-none focus:ring-2 focus:ring-pink focus:ring-offset-2"
                  >
                    Enter the Bone Zone
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm font-semibold mb-3">Hints:</p>
                  {hints.map((hint) => (
                    <div
                      key={hint.id}
                      className={`flex items-center gap-3 p-2 rounded-lg ${
                        hint.found ? "bg-pink/10" : "bg-foreground/5"
                      }`}
                    >
                      <span className={hint.found ? "opacity-100" : "opacity-30"}>
                        {hint.found ? "💀" : "❓"}
                      </span>
                      <span
                        className={
                          hint.found
                            ? "line-through text-foreground/50"
                            : "text-foreground/70"
                        }
                      >
                        {hint.hint}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={() => {
                    if (confirm("Reset all progress? This cannot be undone.")) {
                      reset();
                    }
                  }}
                  className="text-sm text-foreground/50 hover:text-foreground/70 focus:outline-none focus:underline"
                >
                  Reset Progress
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    triggerButtonRef.current?.focus();
                  }}
                  className="rounded-full bg-foreground/10 px-4 py-2 text-sm font-semibold hover:bg-foreground/20 focus:outline-none focus:ring-2 focus:ring-pink"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
