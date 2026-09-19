import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";
import { Input, Label, Select } from "@/components/ui/input";
import { BACKGROUNDS, CLASSES, SPECIES, forgeHero, type ForgedHero } from "@/lib/forge";
import { escapeHtml, printHtml } from "@/lib/print";

export const Route = createFileRoute("/pit/forge")({ component: ForgePage });

function ForgePage() {
  const [species, setSpecies] = useState("");
  const [className, setClassName] = useState("");
  const [background, setBackground] = useState("");
  const [level, setLevel] = useState(5);
  const [edition, setEdition] = useState<"2024" | "2014">("2024");
  const [method, setMethod] = useState<"array" | "roll">("array");
  const [name, setName] = useState("");
  const [hero, setHero] = useState<ForgedHero | null>(null);

  function forge() {
    const next = forgeHero({
      species: species || undefined,
      className: className || undefined,
      background: background || undefined,
      level,
      edition,
      method,
      name,
    });
    setHero(next);
  }

  function printSheet() {
    if (!hero) return;
    const stats = Object.entries(hero.stats)
      .map(([k, v]) => `<tr><td>${k.toUpperCase()}</td><td>${v}</td></tr>`)
      .join("");
    printHtml(
      `${hero.name} · ${hero.className}`,
      `<p class="muted">Character Forge · DM Ultimate Toolkit · ${hero.edition} SRD-flavored</p>
       <h1>${escapeHtml(hero.name)}</h1>
       <p>${escapeHtml(hero.species)} ${escapeHtml(hero.className)} ${hero.level} · ${escapeHtml(hero.background)}</p>
       <p>HP ${hero.hp} · AC ${hero.ac} · Speed ${hero.speed} · ${escapeHtml(hero.attackLine)}</p>
       <h2>Abilities</h2>
       <table><tbody>${stats}</tbody></table>
       <p>${escapeHtml(hero.feature)}</p>
       <p class="muted">Invalid combinations are rejected by leaving blanks random among legal SRD-shaped options. Not a VTT export. Not Wizards of the Coast.</p>`,
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Character Forge</h1>
        <p className="mt-1 max-w-xl text-muted">
          Pick what matters. Unchecked fields stay random among legal options. Send the card to Combat when it is ready.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1fr_22rem]">
        <Card>
          <CardTitle>What matters</CardTitle>
          <CardDesc>Blank means random. That is the Forge Original surprise path.</CardDesc>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Leave blank to draw one" />
            </div>
            <div>
              <Label htmlFor="level">Level</Label>
              <Select id="level" value={String(level)} onChange={(e) => setLevel(Number(e.target.value))}>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="species">Species</Label>
              <Select id="species" value={species} onChange={(e) => setSpecies(e.target.value)}>
                <option value="">Random</option>
                {SPECIES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="class">Class</Label>
              <Select id="class" value={className} onChange={(e) => setClassName(e.target.value)}>
                <option value="">Random</option>
                {CLASSES.map((c) => (
                  <option key={c.name}>{c.name}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="bg">Background</Label>
              <Select id="bg" value={background} onChange={(e) => setBackground(e.target.value)}>
                <option value="">Random</option>
                {BACKGROUNDS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="ed">Rules</Label>
              <Select id="ed" value={edition} onChange={(e) => setEdition(e.target.value as "2024" | "2014")}>
                <option value="2024">2024</option>
                <option value="2014">2014</option>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant={method === "array" ? "default" : "secondary"} onClick={() => setMethod("array")}>
              Standard array
            </Button>
            <Button variant={method === "roll" ? "default" : "secondary"} onClick={() => setMethod("roll")}>
              Roll 4d6 drop low
            </Button>
          </div>
          <Button className="mt-5" onClick={forge}>
            Forge the verified build
          </Button>
        </Card>

        <Card>
          {hero ? (
            <>
              <Badge>{hero.edition}</Badge>
              <CardTitle className="mt-3">{hero.name}</CardTitle>
              <CardDesc>
                {hero.species} {hero.className} {hero.level} · {hero.background}
              </CardDesc>
              <dl className="mt-4 grid grid-cols-3 gap-2 font-mono text-xs tabular-nums">
                {Object.entries(hero.stats).map(([k, v]) => (
                  <div key={k} className="rounded-[var(--radius-sm)] border border-line bg-raised px-2 py-2">
                    <dt className="uppercase text-subtle">{k}</dt>
                    <dd className="text-sm text-fg">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-fg">
                HP {hero.hp} · AC {hero.ac} · {hero.attackLine}
              </p>
              <p className="mt-2 text-sm text-muted">{hero.feature}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button variant="secondary" onClick={printSheet}>
                  <Printer className="size-4" />
                  PDF
                </Button>
              </div>
            </>
          ) : (
            <>
              <CardTitle>Your hero awaits</CardTitle>
              <CardDesc>Forge a build to see the card. Invalid combos never display — they reroll into a legal one.</CardDesc>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
