import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DeskEvent = "fightPdf" | "tripPdf" | "binder" | "affiliate" | "tip";

type DeskState = {
  amazonTag: string;
  supporter: boolean;
  fightPdfs: number;
  tripPdfs: number;
  binders: number;
  affiliateClicks: number;
  tips: number;
  setAmazonTag: (tag: string) => void;
  markSupporter: (value: boolean) => void;
  track: (event: DeskEvent) => void;
};

export const useDeskStore = create<DeskState>()(
  persist(
    (set) => ({
      amazonTag: "",
      supporter: false,
      fightPdfs: 0,
      tripPdfs: 0,
      binders: 0,
      affiliateClicks: 0,
      tips: 0,
      setAmazonTag: (amazonTag) => set({ amazonTag }),
      markSupporter: (supporter) => set({ supporter }),
      track: (event) =>
        set((s) => {
          if (event === "fightPdf") return { fightPdfs: s.fightPdfs + 1 };
          if (event === "tripPdf") return { tripPdfs: s.tripPdfs + 1 };
          if (event === "binder") return { binders: s.binders + 1 };
          if (event === "affiliate") return { affiliateClicks: s.affiliateClicks + 1 };
          return { tips: s.tips + 1 };
        }),
    }),
    { name: "wilson-works-desk" },
  ),
);

export function useDeskHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const unsub = useDeskStore.persist.onFinishHydration(() => setHydrated(true));
    setHydrated(useDeskStore.persist.hasHydrated());
    return unsub;
  }, []);
  return hydrated;
}
