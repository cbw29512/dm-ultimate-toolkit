import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { parseAndRoll, type DiceResult } from "@/lib/dice";

export const Route = createFileRoute("/pit/dice")({ component: DicePage });

const PRESETS = ["1d20", "1d4", "1d6", "1d8", "1d10", "1d12", "1d100", "2d6+3", "4d6"];

function DicePage() {
  const [formula, setFormula] = useState("1d20");
  const [error, setError] = useState("");
  const [history, setHistory] = useState<DiceResult[]>([]);

  function roll(next = formula, nextMode: "normal" | "adv" | "dis" = "normal") {
    try {
      const result = parseAndRoll(next, nextMode);
      setHistory((h) => [result, ...h].slice(0, 20));
      setError("");
      setFormula(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not roll.");
    }
  }

  const latest = history[0];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Dice</h1>
        <p className="mt-1 max-w-xl text-muted">
          Nothing but a roller. Secure Web Crypto, same posture as the pit. No skins, no shop.
        </p>
      </header>

      <Card className="text-center">
        <p className="text-[11px] uppercase tracking-[0.18em] text-subtle">{latest ? latest.notation : "Ready"}</p>
        <p className="mt-3 font-display text-6xl tabular-nums tracking-tight">{latest ? latest.total : "—"}</p>
        <p className="mt-2 text-sm text-muted">{latest ? latest.detail : "Roll when the table goes quiet."}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button onClick={() => roll(formula, "normal")}>Roll</Button>
          <Button variant="secondary" onClick={() => roll("1d20", "adv")}>
            Advantage
          </Button>
          <Button variant="secondary" onClick={() => roll("1d20", "dis")}>
            Disadvantage
          </Button>
        </div>
        {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      </Card>

      <div className="grid gap-4 md:grid-cols-[1fr_20rem]">
        <Card>
          <Label htmlFor="formula">Notation</Label>
          <Input
            id="formula"
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") roll();
            }}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <Button key={p} size="sm" variant="secondary" onClick={() => roll(p, "normal")}>
                {p}
              </Button>
            ))}
          </div>
        </Card>
        <Card>
          <CardTitle className="text-lg">Log</CardTitle>
          <CardDesc>Last twenty rolls on this device.</CardDesc>
          <ul className="mt-3 max-h-64 space-y-2 overflow-auto font-mono text-xs text-muted">
            {history.length === 0 ? <li>Empty.</li> : null}
            {history.map((row, i) => (
              <li key={`${row.notation}-${i}`} className="border-b border-line pb-2">
                {row.notation} → {row.total}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
