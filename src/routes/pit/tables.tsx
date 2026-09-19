import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";
import { Label, Select, Textarea } from "@/components/ui/input";
import { usePitStore } from "@/lib/pit-store";
import { FLORENCE_TABLES } from "@/lib/tables";

export const Route = createFileRoute("/pit/tables")({ component: TablesPage });

function TablesPage() {
  const signals = usePitStore((s) => s.signals);
  const addSignal = usePitStore((s) => s.addSignal);
  const removeSignal = usePitStore((s) => s.removeSignal);
  const [role, setRole] = useState<"player" | "gm" | "venue">("player");
  const [day, setDay] = useState("Tuesday");
  const [system, setSystem] = useState("D&D 5e 2024");
  const [note, setNote] = useState("");

  const matches = useMemo(() => {
    const days = new Set(signals.map((s) => s.day.toLowerCase()));
    return FLORENCE_TABLES.filter(
      (t) => days.size === 0 || [...days].some((d) => t.when.toLowerCase().includes(d.toLowerCase())),
    );
  }, [signals]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Local tables</h1>
        <p className="mt-1 max-w-xl text-muted">
          Dinner, Dice & Dragons, folded into the hall. Florence, South Carolina is the first density — not a wall.
          Production matching still lives on the Netlify Identity stack.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardTitle>Post a signal</CardTitle>
          <CardDesc>Player demand, GM supply, or a spare table. Stored on this device for the desk demo.</CardDesc>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="role">I am</Label>
              <Select id="role" value={role} onChange={(e) => setRole(e.target.value as typeof role)}>
                <option value="player">A player</option>
                <option value="gm">A GM</option>
                <option value="venue">A venue</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="day">Night that works</Label>
              <Select id="day" value={day} onChange={(e) => setDay(e.target.value)}>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </Select>
            </div>
          </div>
          <div className="mt-3">
            <Label htmlFor="sys">System</Label>
            <Select id="sys" value={system} onChange={(e) => setSystem(e.target.value)}>
              <option>D&D 5e 2024</option>
              <option>D&D 5e 2014</option>
              <option>Either 5e</option>
            </Select>
          </div>
          <div className="mt-3">
            <Label htmlFor="note">Note</Label>
            <Textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Travel radius, table tone, snacks" />
          </div>
          <Button className="mt-4" onClick={() => addSignal({ role, day, system, note })}>
            Post signal
          </Button>
        </Card>

        <Card>
          <CardTitle>Your signals</CardTitle>
          {signals.length === 0 ? (
            <CardDesc>None yet. The Florence board below still shows open tables.</CardDesc>
          ) : (
            <ul className="mt-3 space-y-2">
              {signals.map((s) => (
                <li key={s.id} className="flex items-start justify-between gap-3 rounded-[var(--radius-md)] border border-line bg-raised px-3 py-3 text-sm">
                  <span>
                    <span className="text-fg">{s.role}</span>
                    <span className="text-muted"> · {s.day} · {s.system}</span>
                    {s.note ? <span className="mt-1 block text-muted">{s.note}</span> : null}
                  </span>
                  <Button size="sm" variant="ghost" onClick={() => removeSignal(s.id)}>
                    Drop
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-2xl">Florence board</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {matches.map((table) => (
            <Card key={table.id} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg">{table.title}</CardTitle>
                <Badge>{table.roleNeed}</Badge>
              </div>
              <CardDesc>
                {table.when} · {table.place}
              </CardDesc>
              <p className="mt-3 text-sm text-fg">{table.system}</p>
              <p className="mt-1 text-sm text-muted">{table.blurb}</p>
              <p className="mt-3 text-xs uppercase tracking-wide text-subtle">{table.seats}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
