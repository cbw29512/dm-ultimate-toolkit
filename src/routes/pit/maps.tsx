import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";
import { Input, Label, Select } from "@/components/ui/input";
import { dungeonAscii, generateDungeon, MAP_SIZES, roomAt, type CellKind, type Dungeon } from "@/lib/maps";
import { usePitStore } from "@/lib/pit-store";
import { escapeHtml, printHtml } from "@/lib/print";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pit/maps")({ component: MapsPage });

const CELL_CLASS: Record<CellKind, string> = {
  wall: "bg-bg",
  floor: "bg-raised",
  start: "bg-ok",
  stairs: "bg-muted",
  loot: "bg-warn",
  spawn: "bg-danger",
};

function MapsPage() {
  const lastMap = usePitStore((s) => s.lastMap);
  const setLastMap = usePitStore((s) => s.setLastMap);
  const [size, setSize] = useState<keyof typeof MAP_SIZES>(lastMap?.size ?? "delve");
  const [seed, setSeed] = useState(lastMap?.seed ?? "");
  const [map, setMap] = useState<Dungeon | null>(lastMap);
  const [selectedId, setSelectedId] = useState<string | null>(lastMap?.rooms[0]?.id ?? null);

  const selected = useMemo(
    () => map?.rooms.find((r) => r.id === selectedId) ?? map?.rooms[0] ?? null,
    [map, selectedId],
  );

  function carve(nextSeed = seed) {
    const next = generateDungeon(size, nextSeed || undefined);
    setMap(next);
    setSeed(next.seed);
    setLastMap(next);
    setSelectedId(next.rooms[0]?.id ?? null);
  }

  function printMap() {
    if (!map) return;
    const rooms = map.rooms
      .map(
        (r) =>
          `<tr><td>${escapeHtml(r.name)}</td><td>${r.kind}</td><td>${escapeHtml(r.note)}</td></tr>`,
      )
      .join("");
    printHtml(
      "Toolkit dungeon",
      `<p class="muted">DungeonMaps · DM Ultimate Toolkit · seed ${escapeHtml(map.seed)}</p>
       <h1>${MAP_SIZES[map.size].label}</h1>
       <div class="banner">Hall map. Not a VTT. Not Wizards of the Coast.</div>
       <pre class="map-grid">${escapeHtml(dungeonAscii(map))}</pre>
       <h2>Rooms</h2>
       <table><thead><tr><th>Room</th><th>Kind</th><th>Note</th></tr></thead><tbody>${rooms}</tbody></table>
       <p class="muted">@ entry · ! hostiles · $ loot · > stairs · # stone</p>`,
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Maps</h1>
          <p className="mt-1 max-w-xl text-muted">
            DungeonMaps and DungeonGate, folded in. Carve a floor, click a room, print the night.
            Local, no join codes. Iron Pit will take station fights later.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={printMap} disabled={!map}>
            <Printer className="size-4" />
            Print
          </Button>
        </div>
      </header>

      <Card>
        <CardTitle>Carve</CardTitle>
        <CardDesc>Same seed repeats the floor. Blank seed rolls a new one.</CardDesc>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <Label htmlFor="size">Size</Label>
            <Select id="size" value={size} onChange={(e) => setSize(e.target.value as typeof size)}>
              {Object.entries(MAP_SIZES).map(([key, spec]) => (
                <option key={key} value={key}>
                  {spec.label} · {spec.width}×{spec.height}
                </option>
              ))}
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="seed">Seed</Label>
            <Input id="seed" value={seed} onChange={(e) => setSeed(e.target.value)} placeholder="Leave blank for a new carve" />
          </div>
        </div>
        <Button className="mt-4" onClick={() => carve()}>
          Carve the floor
        </Button>
      </Card>

      {map ? (
        <div className="grid gap-4 lg:grid-cols-[1fr_18rem]">
          <Card className="overflow-x-auto">
            <div className="mb-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-wide text-subtle">
              <span className="inline-flex items-center gap-1"><i className="inline-block size-2.5 bg-ok" /> Entry</span>
              <span className="inline-flex items-center gap-1"><i className="inline-block size-2.5 bg-danger" /> Hostiles</span>
              <span className="inline-flex items-center gap-1"><i className="inline-block size-2.5 bg-warn" /> Loot</span>
              <span className="inline-flex items-center gap-1"><i className="inline-block size-2.5 bg-muted" /> Stairs</span>
            </div>
            <div
              className="inline-grid gap-px bg-line p-px"
              style={{ gridTemplateColumns: `repeat(${map.width}, auto)` }}
              role="img"
              aria-label="Dungeon grid"
            >
              {map.cells.map((cell, i) => {
                const x = i % map.width;
                const y = Math.floor(i / map.width);
                const room = cell === "wall" ? null : roomAt(map, x, y);
                const active = room && room.id === selected?.id;
                return (
                  <button
                    key={`${x}-${y}`}
                    type="button"
                    aria-label={room ? room.name : "Stone"}
                    className={cn(
                      "size-3 md:size-4",
                      CELL_CLASS[cell],
                      active && "ring-1 ring-accent",
                    )}
                    onClick={() => {
                      if (room) setSelectedId(room.id);
                    }}
                  />
                );
              })}
            </div>
            <p className="mt-3 font-mono text-[11px] text-subtle">seed {map.seed.slice(0, 18)}</p>
          </Card>

          <div className="space-y-3">
            {selected ? (
              <Card>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{selected.name}</CardTitle>
                  <Badge>{selected.kind}</Badge>
                </div>
                <CardDesc>{selected.note}</CardDesc>
                {selected.monsterKey ? (
                  <p className="mt-4 text-sm text-muted">
                    Station fight queued for Iron Pit. That room is coming soon — print the map for the table tonight.
                  </p>
                ) : (
                  <p className="mt-4 text-sm text-muted">No station fight in this room.</p>
                )}
                {selected.kind === "loot" ? (
                  <Button className="mt-2 w-full" variant="secondary" asChild>
                    <Link to="/pit/cards">Open lootforge</Link>
                  </Button>
                ) : null}
              </Card>
            ) : null}
            <Card className="p-4">
              <CardTitle className="text-lg">Rooms</CardTitle>
              <ul className="mt-3 space-y-1">
                {map.rooms.map((room) => (
                  <li key={room.id}>
                    <button
                      type="button"
                      className={cn(
                        "w-full rounded-[var(--radius-sm)] px-2 py-2 text-left text-sm",
                        room.id === selected?.id ? "bg-raised text-fg" : "text-muted hover:bg-raised hover:text-fg",
                      )}
                      onClick={() => setSelectedId(room.id)}
                    >
                      {room.name}
                      <span className="mt-0.5 block text-[11px] uppercase tracking-wide text-subtle">{room.kind}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      ) : (
        <Card>
          <CardTitle>No stone yet</CardTitle>
          <CardDesc>Carve a keep for a one-shot, a delve for a session, a ruin for a long night.</CardDesc>
        </Card>
      )}
    </div>
  );
}
