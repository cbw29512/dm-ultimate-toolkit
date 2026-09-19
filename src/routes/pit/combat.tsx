import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";
import {
  STARTER_FIGHTER,
  STARTER_GOBLINS,
  runFight,
  type Combatant,
  type FightResult,
} from "@/lib/combat";
import { IRON_PIT_LIVE } from "@/lib/money";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pit/combat")({ component: StarterFightPage });

function StarterFightPage() {
  const [result, setResult] = useState<FightResult | null>(null);

  function fight() {
    setResult(runFight([STARTER_FIGHTER], STARTER_GOBLINS));
  }

  const heroes = result?.heroes ?? [];
  const goblins = result?.monsters ?? [];

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge>Starter loop</Badge>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">Fighter vs two goblins</h1>
          <p className="mt-2 max-w-xl text-muted">
            Level 1 fighter: AC 16, 12 HP, +5 to hit, 1d8+3. Two goblins: AC 15, 7 HP, +4, 1d6+2. Initiative,
            then the round loops until one side is down. This is not the certified Iron Pit engine.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={fight}>{result ? "Fight again" : "Fight"}</Button>
          <Button variant="ghost" asChild>
            <a href={IRON_PIT_LIVE}>Open live Iron Pit</a>
          </Button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <FighterCard who={STARTER_FIGHTER} live={heroes[0]} />
        <FighterCard who={STARTER_GOBLINS[0]} live={goblins[0]} label="Goblin 1" />
        <FighterCard who={STARTER_GOBLINS[1]} live={goblins[1]} label="Goblin 2" />
      </div>

      {result ? (
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle>
              {result.winner === "hero"
                ? "Fighter stands"
                : result.winner === "monster"
                  ? "Goblins stand"
                  : "Draw"}
            </CardTitle>
            <Badge>{result.rounds} rounds</Badge>
          </div>
          <CardDesc>Every d20 is in the log. Fight again rerolls the loop.</CardDesc>
          <ol className="mt-4 max-h-[28rem] space-y-2 overflow-y-auto font-mono text-sm text-muted">
            {result.log.map((line) => (
              <li key={line.id} className={cn(line.kind === "win" && "text-fg", line.kind === "down" && "text-danger")}>
                {line.round > 0 ? `R${line.round} · ` : ""}
                {line.text}
              </li>
            ))}
          </ol>
        </Card>
      ) : (
        <Card>
          <CardTitle>Waiting on initiative</CardTitle>
          <CardDesc>Hit Fight. The loop runs itself — no extra abilities, no multiattack on the fighter.</CardDesc>
        </Card>
      )}
    </div>
  );
}

function FighterCard({
  who,
  live,
  label,
}: {
  who: { name: string; ac: number; hp: number; note: string };
  live?: Combatant;
  label?: string;
}) {
  const hp = live?.currentHp ?? who.hp;
  const max = live?.maxHp ?? who.hp;
  const pct = Math.max(0, Math.round((hp / max) * 100));
  return (
    <Card>
      <p className="text-[11px] uppercase tracking-wide text-subtle">{label ?? who.name}</p>
      <CardTitle className="mt-1 text-lg">{label ?? who.name}</CardTitle>
      <p className="mt-2 font-mono text-sm tabular-nums text-fg">
        AC {who.ac} · HP {hp}/{max}
      </p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-raised">
        <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-3 text-sm text-muted">{who.note}</p>
    </Card>
  );
}
