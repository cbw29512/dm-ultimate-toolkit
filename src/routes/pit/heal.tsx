import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";
import { STARTER_FIGHTER } from "@/lib/combat";
import { POTIONS, rollHitDie, rollPotion } from "@/lib/heal";
import { usePitStore } from "@/lib/pit-store";

export const Route = createFileRoute("/pit/heal")({ component: HealPage });

function HealPage() {
  const [hp, setHp] = useState(4);
  const max = STARTER_FIGHTER.hp;
  const [log, setLog] = useState<string[]>([]);
  const charges = usePitStore((s) => s.healCharges);
  const spendCharge = usePitStore((s) => s.spendCharge);
  const longRestBox = usePitStore((s) => s.longRestBox);

  function drink(key: string) {
    if (!spendCharge()) return;
    const roll = rollPotion(key);
    setHp((n) => Math.min(max, n + roll.total));
    setLog((l) => [`${roll.name}: ${roll.detail}`, ...l].slice(0, 12));
  }

  function rest() {
    const roll = rollHitDie(10, 2);
    setHp((n) => Math.min(max, n + roll.total));
    setLog((l) => [`${roll.name}: ${roll.detail}`, ...l].slice(0, 12));
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Healing Box</h1>
        <p className="mt-2 max-w-xl text-muted">
          Same fighter from the starter fight. Six charges. A long rest fills the box. Not the certified pit.
        </p>
      </header>

      <Card>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>Level 1 Fighter</CardTitle>
          <Badge>
            {hp}/{max} HP · {charges} charges
          </Badge>
        </div>
        <CardDesc>Starts wounded so a potion does something.</CardDesc>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {POTIONS.map((p) => (
            <Button key={p.key} variant="secondary" onClick={() => drink(p.key)} disabled={charges <= 0 || hp >= max}>
              {p.name}
            </Button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button onClick={rest} disabled={hp >= max}>
            Short rest (d10)
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              longRestBox();
              setHp(max);
              setLog((l) => ["Long rest. Box refilled. HP full.", ...l].slice(0, 12));
            }}
          >
            Long rest
          </Button>
        </div>
      </Card>

      <Card>
        <CardTitle>Log</CardTitle>
        {log.length === 0 ? (
          <CardDesc>No drinks yet.</CardDesc>
        ) : (
          <ul className="mt-3 space-y-2 font-mono text-sm text-muted">
            {log.map((line, i) => (
              <li key={`${line}-${i}`}>{line}</li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
