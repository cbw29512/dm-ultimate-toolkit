import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MONSTERS } from "@/lib/combat";

export const Route = createFileRoute("/pit/bestiary")({ component: BestiaryPage });

function BestiaryPage() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return MONSTERS.filter(
      (m) =>
        !needle ||
        m.name.toLowerCase().includes(needle) ||
        (m.kind ?? "").toLowerCase().includes(needle) ||
        (m.cr ?? "").includes(needle),
    );
  }, [q]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Bestiary</h1>
          <p className="mt-1 max-w-xl text-muted">
            Monster Card Forge, folded in. SRD-shaped cards for the toolkit. Iron Pit will use this catalog when it
            lands — not this pass.
          </p>
        </div>
        <Badge tone="warn">Iron Pit · coming soon</Badge>
      </header>

      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by name, kind, or CR" />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((m) => (
          <Card key={m.key} className="p-4">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg">{m.name}</CardTitle>
              <Badge>CR {m.cr}</Badge>
            </div>
            <CardDesc>
              {m.kind} · AC {m.ac} · HP {m.hp}
            </CardDesc>
            <p className="mt-3 font-mono text-xs text-muted">
              +{m.atk} · {m.attacks}× {m.dmgDice}d{m.dmgSides}+{m.dmgMod}
            </p>
            <p className="mt-2 text-sm text-muted">{m.note}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
