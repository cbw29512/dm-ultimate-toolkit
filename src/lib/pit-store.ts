import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CombatantTemplate } from "@/lib/combat";
import type { Dungeon } from "@/lib/maps";
import type { Hoard } from "@/lib/cards";
import { CHARGE_MAX } from "@/lib/heal";

export type TomeEntry = {
  id: string;
  title: string;
  body: string;
  when: string;
};

export type TableSignal = {
  id: string;
  role: "player" | "gm" | "venue";
  system: string;
  day: string;
  note: string;
};

export const BOARD_SLOTS = ["Location", "Site", "Area", "NPCs", "Monsters", "Hazards", "Treasure"] as const;
export type BoardSlot = (typeof BOARD_SLOTS)[number];
export type BoardState = Record<BoardSlot, string>;

export const EMPTY_BOARD: BoardState = {
  Location: "",
  Site: "",
  Area: "",
  NPCs: "",
  Monsters: "",
  Hazards: "",
  Treasure: "",
};

export type Quest = {
  id: string;
  title: string;
  done: boolean;
};

type PitState = {
  queuedHeroes: CombatantTemplate[];
  queuedMonsters: CombatantTemplate[];
  tome: TomeEntry[];
  scribe: TomeEntry[];
  signals: TableSignal[];
  board: BoardState;
  quests: Quest[];
  deck: string[];
  lastMap: Dungeon | null;
  lastHoard: Hoard | null;
  healCharges: number;
  queueHero: (hero: CombatantTemplate) => void;
  queueMonster: (monster: CombatantTemplate) => void;
  clearQueue: () => void;
  addTome: (entry: Omit<TomeEntry, "id" | "when">) => void;
  removeTome: (id: string) => void;
  addScribe: (entry: Omit<TomeEntry, "id" | "when">) => void;
  removeScribe: (id: string) => void;
  addSignal: (signal: Omit<TableSignal, "id">) => void;
  removeSignal: (id: string) => void;
  setBoardSlot: (slot: BoardSlot, value: string) => void;
  addQuest: (title: string) => void;
  toggleQuest: (id: string) => void;
  removeQuest: (id: string) => void;
  toggleDeck: (key: string) => void;
  clearDeck: () => void;
  setLastMap: (map: Dungeon | null) => void;
  setLastHoard: (hoard: Hoard | null) => void;
  spendCharge: () => boolean;
  longRestBox: () => void;
};

export const usePitStore = create<PitState>()(
  persist(
    (set, get) => ({
      queuedHeroes: [],
      queuedMonsters: [],
      tome: [],
      scribe: [],
      signals: [],
      board: EMPTY_BOARD,
      quests: [],
      deck: [],
      lastMap: null,
      lastHoard: null,
      healCharges: CHARGE_MAX,
      queueHero: (hero) =>
        set((s) => ({ queuedHeroes: [...s.queuedHeroes, hero].slice(-6) })),
      queueMonster: (monster) =>
        set((s) => ({ queuedMonsters: [...s.queuedMonsters, monster].slice(-6) })),
      clearQueue: () => set({ queuedHeroes: [], queuedMonsters: [] }),
      addTome: (entry) =>
        set((s) => ({
          tome: [
            { ...entry, id: crypto.randomUUID(), when: new Date().toISOString() },
            ...s.tome,
          ].slice(0, 40),
        })),
      removeTome: (id) => set((s) => ({ tome: s.tome.filter((t) => t.id !== id) })),
      addScribe: (entry) =>
        set((s) => ({
          scribe: [
            { ...entry, id: crypto.randomUUID(), when: new Date().toISOString() },
            ...(s.scribe ?? []),
          ].slice(0, 40),
        })),
      removeScribe: (id) => set((s) => ({ scribe: (s.scribe ?? []).filter((t) => t.id !== id) })),
      addSignal: (signal) =>
        set((s) => ({
          signals: [{ ...signal, id: crypto.randomUUID() }, ...s.signals].slice(0, 20),
        })),
      removeSignal: (id) => set((s) => ({ signals: s.signals.filter((t) => t.id !== id) })),
      setBoardSlot: (slot, value) =>
        set((s) => ({ board: { ...(s.board ?? EMPTY_BOARD), [slot]: value } })),
      addQuest: (title) =>
        set((s) => ({
          quests: [{ id: crypto.randomUUID(), title, done: false }, ...s.quests].slice(0, 12),
        })),
      toggleQuest: (id) =>
        set((s) => ({
          quests: s.quests.map((q) => (q.id === id ? { ...q, done: !q.done } : q)),
        })),
      removeQuest: (id) => set((s) => ({ quests: s.quests.filter((q) => q.id !== id) })),
      toggleDeck: (key) =>
        set((s) => ({
          deck: s.deck.includes(key) ? s.deck.filter((k) => k !== key) : [...s.deck, key].slice(0, 18),
        })),
      clearDeck: () => set({ deck: [] }),
      setLastMap: (lastMap) => set({ lastMap }),
      setLastHoard: (lastHoard) => set({ lastHoard }),
      spendCharge: () => {
        if (get().healCharges <= 0) return false;
        set((s) => ({ healCharges: s.healCharges - 1 }));
        return true;
      },
      longRestBox: () => set({ healCharges: CHARGE_MAX }),
    }),
    { name: "iron-pit-hall" },
  ),
);
