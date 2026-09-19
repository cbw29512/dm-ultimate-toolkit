import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const BATCH_MARKS = [
  { key: "keep", label: "Keep live" },
  { key: "fold", label: "Fold in" },
  { key: "park", label: "Park" },
  { key: "later", label: "Later" },
] as const;

export type BatchMark = (typeof BATCH_MARKS)[number]["key"];

export function markTone(mark?: BatchMark | string): "muted" | "ok" | "warn" | "accent" {
  if (mark === "keep") return "ok";
  if (mark === "fold") return "accent";
  if (mark === "park") return "warn";
  return "muted";
}

type BatchState = {
  marks: Record<string, BatchMark>;
  notes: Record<string, string>;
  setMark: (slug: string, mark: BatchMark) => void;
  setNote: (slug: string, note: string) => void;
};

export const useBatchStore = create<BatchState>()(
  persist(
    (set) => ({
      marks: {},
      notes: {},
      setMark: (slug, mark) => set((s) => ({ marks: { ...s.marks, [slug]: mark } })),
      setNote: (slug, note) => set((s) => ({ notes: { ...s.notes, [slug]: note } })),
    }),
    { name: "dnd-site-batch" },
  ),
);

export function useHydrated() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}