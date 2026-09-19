import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ALL_CARDS,
  CONDITION_CARDS,
  ITEM_CARDS,
  SPELL_CARDS,
  TIER_LABEL,
  cardByKey,
  generateHoard,
  type HallCard,
  type Hoard,
} from "@/lib/cards";
import { usePitStore } from "@/lib/pit-store";
import { escapeHtml, printHtml } from "@/lib/print";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pit/cards")({ component: CardsPage });

const TABS: { id: "spell" | "item" | "condition" | "loot"; label: string }[] = [
  { id: "spell", label: "Spells" },
  { id: "item", label: "Gear" },
  { id: "condition", label: "Conditions" },
  { id: "loot", label: "Loot" },
];

function CardsPage() {
  const deck = usePitStore((s) => s.deck);
  const toggleDeck = usePitStore((s) => s.toggleDeck);
  const clearDeck = usePitStore((s) => s.clearDeck);
  const lastHoard = usePitStore((s) => s.lastHoard);
  const setLastHoard = usePitStore((s) => s.setLastHoard);
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("spell");
  const [q, setQ] = useState("");
  const [hoard, setHoard] = useState<Hoard | null>(lastHoard);

  const catalog = tab === "spell" ? SPELL_CARDS : tab === "item" ? ITEM_CARDS : CONDITION_CARDS;
  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return catalog.filter(
      (c) => !needle || c.name.toLowerCase().includes(needle) || c.tag.toLowerCase().includes(needle),
    );
  }, [catalog, q]);

  function printDeck() {
    const cards = deck.map(cardByKey).filter((c): c is HallCard => Boolean(c));
    const source = cards.length ? cards : ALL_CARDS.slice(0, 9);
    const html = source
      .map(
        (c) =>
          `<article class="pcard"><div class="kicker">${escapeHtml(c.tag)}</div><h3>${escapeHtml(c.name)}</h3><p class="stat">${escapeHtml(c.stat)}</p><p class="body">${escapeHtml(c.body)}</p><p class="foot">DM Ultimate Toolkit · SRD-shaped · not Wizards of the Coast</p></article>`,
      )
      .join("");
    printHtml(
      "Toolkit card sheet",
      `<p class="muted">DungeonCards · 2.5 × 3.5 in</p>
       <h1>Print deck</h1>
       <div class="banner">Hall summaries. CC-BY SRD-shaped. Confirm wording at your table.</div>
       <div class="sheet">${html}</div>`,
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Cards</h1>
          <p className="mt-1 max-w-xl text-muted">
            DungeonCards, DNDCards, and lootforge. Short, printable, table-ready. Original hall wording with
            SRD-shaped numbers — not a rules reprint.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={printDeck}>
            <Printer className="size-4" />
            Print {deck.length ? `${deck.length} cards` : "sample"}
          </Button>
          <Button variant="ghost" onClick={clearDeck} disabled={!deck.length}>
            Clear deck
          </Button>
        </div>
      </header>

      <div className="flex flex-wrap gap-1">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={cn(
              "h-11 rounded-[var(--radius-sm)] px-4 text-sm",
              tab === item.id ? "bg-raised text-fg" : "text-muted hover:bg-raised hover:text-fg",
            )}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "loot" ? (
        <LootPanel
          hoard={hoard}
          onGenerate={(tier) => {
            const next = generateHoard(tier);
            setHoard(next);
            setLastHoard(next);
          }}
          onAdd={(card) => toggleDeck(card.key)}
          deck={deck}
        />
      ) : (
        <>
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter the catalog" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((card) => (
              <FaceCard key={card.key} card={card} inDeck={deck.includes(card.key)} onToggle={() => toggleDeck(card.key)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function FaceCard({
  card,
  inDeck,
  onToggle,
}: {
  card: HallCard;
  inDeck: boolean;
  onToggle: () => void;
}) {
  return (
    <Card className="flex min-h-56 flex-col p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-subtle">{card.tag}</p>
      <CardTitle className="mt-2 text-lg">{card.name}</CardTitle>
      <p className="mt-1 font-mono text-xs text-fg">{card.stat}</p>
      <CardDesc className="flex-1">{card.body}</CardDesc>
      <Button className="mt-4" size="sm" variant={inDeck ? "secondary" : "default"} onClick={onToggle}>
        {inDeck ? "In print deck" : "Add to deck"}
      </Button>
    </Card>
  );
}

function LootPanel({
  hoard,
  onGenerate,
  onAdd,
  deck,
}: {
  hoard: Hoard | null;
  onGenerate: (tier: Hoard["tier"]) => void;
  onAdd: (card: HallCard) => void;
  deck: string[];
}) {
  return (
    <div className="space-y-4">
      <Card>
        <CardTitle>Lootforge</CardTitle>
        <CardDesc>Party tier, not a treasure-by-CR spreadsheet. Coins plus a few hall items.</CardDesc>
        <div className="mt-4 flex flex-wrap gap-2">
          {(Object.keys(TIER_LABEL) as Hoard["tier"][]).map((tier) => (
            <Button key={tier} variant="secondary" onClick={() => onGenerate(tier)}>
              {TIER_LABEL[tier]}
            </Button>
          ))}
        </div>
      </Card>
      {hoard ? (
        <Card>
          <div className="flex items-start justify-between gap-2">
            <CardTitle>Hoard</CardTitle>
            <Badge>{TIER_LABEL[hoard.tier]}</Badge>
          </div>
          <p className="mt-3 font-mono text-sm text-fg">{hoard.coins}</p>
          <p className="mt-2 text-sm text-muted">{hoard.sparkle}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {hoard.items.map((card) => (
              <FaceCard key={card.key} card={card} inDeck={deck.includes(card.key)} onToggle={() => onAdd(card)} />
            ))}
          </div>
        </Card>
      ) : (
        <Card>
          <CardTitle>Empty chest</CardTitle>
          <CardDesc>Roll a tier after the fight, not before.</CardDesc>
        </Card>
      )}
    </div>
  );
}
