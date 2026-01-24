"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";

const TOTAL_SKELETONS = 10;
const STORAGE_KEY = "dad-skeleton-hunt";

interface SkeletonHuntContextType {
  foundSkeletons: Set<number>;
  findSkeleton: (id: number) => void;
  isComplete: boolean;
  totalSkeletons: number;
  reset: () => void;
  justCompleted: boolean;
  clearJustCompleted: () => void;
}

const SkeletonHuntContext = createContext<SkeletonHuntContextType | null>(null);

export function SkeletonHuntProvider({ children }: { children: ReactNode }) {
  const [foundSkeletons, setFoundSkeletons] = useState<Set<number>>(new Set());
  const [isHydrated, setIsHydrated] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFoundSkeletons(new Set(parsed));
      } catch {
        // Invalid data, start fresh
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever foundSkeletons changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...foundSkeletons]));
    }
  }, [foundSkeletons, isHydrated]);

  const findSkeleton = useCallback((id: number) => {
    setFoundSkeletons((prev) => {
      if (prev.has(id)) return prev;
      const newSet = new Set(prev);
      newSet.add(id);
      // Check if this completes the hunt
      if (newSet.size === TOTAL_SKELETONS) {
        setJustCompleted(true);
      }
      return newSet;
    });
  }, []);

  const reset = useCallback(() => {
    setFoundSkeletons(new Set());
    setJustCompleted(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const clearJustCompleted = useCallback(() => {
    setJustCompleted(false);
  }, []);

  const isComplete = foundSkeletons.size === TOTAL_SKELETONS;

  return (
    <SkeletonHuntContext.Provider
      value={{
        foundSkeletons,
        findSkeleton,
        isComplete,
        totalSkeletons: TOTAL_SKELETONS,
        reset,
        justCompleted,
        clearJustCompleted,
      }}
    >
      {children}
    </SkeletonHuntContext.Provider>
  );
}

export function useSkeletonHunt() {
  const context = useContext(SkeletonHuntContext);
  if (!context) {
    throw new Error("useSkeletonHunt must be used within a SkeletonHuntProvider");
  }
  return context;
}
