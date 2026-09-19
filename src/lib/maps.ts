import { MONSTERS } from "@/lib/combat";

export type CellKind = "wall" | "floor" | "start" | "stairs" | "loot" | "spawn";

export type RoomKind = "start" | "monster" | "loot" | "stairs" | "empty";

export type DungeonRoom = {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  kind: RoomKind;
  monsterKey?: string;
  note: string;
};

export type Dungeon = {
  seed: string;
  size: keyof typeof MAP_SIZES;
  width: number;
  height: number;
  cells: CellKind[];
  rooms: DungeonRoom[];
};

export const MAP_SIZES = {
  keep: { width: 17, height: 13, rooms: 6, label: "Keep" },
  delve: { width: 21, height: 15, rooms: 8, label: "Delve" },
  ruin: { width: 25, height: 17, rooms: 10, label: "Ruin" },
} as const;

const ROOM_NAMES = [
  "The Dry Well",
  "Ossuary",
  "Guard Post",
  "Scriptorium",
  "Fungal Cellar",
  "Collapsed Hall",
  "Armory",
  "Shrine of Ash",
  "Prison Cistern",
  "False Treasury",
  "Rat Market",
  "The Listening Door",
  "Cold Pantry",
  "Map Room",
  "The Red Stair",
];

const SPAWN_KEYS = ["goblin", "orc", "skeleton", "spider", "hobgoblin", "ogre", "owlbear", "wight"];

function makeRng(seedText: string) {
  let s = 0x9e3779b9;
  for (let i = 0; i < seedText.length; i += 1) {
    s = Math.imul(s ^ seedText.charCodeAt(i), 0x85ebca6b);
  }
  s >>>= 0;
  const next = () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 4294967296;
  };
  return {
    next,
    int: (n: number) => Math.floor(next() * n),
    pick: <T,>(list: readonly T[]) => list[Math.floor(next() * list.length)] as T,
  };
}

function idx(width: number, x: number, y: number) {
  return y * width + x;
}

function overlaps(
  a: { x: number; y: number; w: number; h: number },
  b: { x: number; y: number; w: number; h: number },
  pad = 1,
) {
  return !(a.x + a.w + pad <= b.x || b.x + b.w + pad <= a.x || a.y + a.h + pad <= b.y || b.y + b.h + pad <= a.y);
}

function carveRoom(cells: CellKind[], width: number, room: { x: number; y: number; w: number; h: number }) {
  for (let y = room.y; y < room.y + room.h; y += 1) {
    for (let x = room.x; x < room.x + room.w; x += 1) {
      cells[idx(width, x, y)] = "floor";
    }
  }
}

function carveLine(cells: CellKind[], width: number, height: number, x1: number, y1: number, x2: number, y2: number) {
  let x = x1;
  let y = y1;
  const paint = (px: number, py: number) => {
    if (px <= 0 || py <= 0 || px >= width - 1 || py >= height - 1) return;
    const i = idx(width, px, py);
    if (cells[i] === "wall") cells[i] = "floor";
  };
  paint(x, y);
  while (x !== x2) {
    x += Math.sign(x2 - x);
    paint(x, y);
  }
  while (y !== y2) {
    y += Math.sign(y2 - y);
    paint(x, y);
  }
}

function center(room: { x: number; y: number; w: number; h: number }) {
  return {
    x: room.x + Math.floor(room.w / 2),
    y: room.y + Math.floor(room.h / 2),
  };
}

export function generateDungeon(size: keyof typeof MAP_SIZES, seedText?: string): Dungeon {
  const spec = MAP_SIZES[size];
  const seed =
    seedText?.trim() ||
    Array.from(crypto.getRandomValues(new Uint32Array(2)))
      .map((n) => n.toString(16))
      .join("");
  const rng = makeRng(seed);
  const { width, height } = spec;
  const cells: CellKind[] = Array.from({ length: width * height }, () => "wall");
  const placed: Array<{ x: number; y: number; w: number; h: number }> = [];

  for (let attempt = 0; attempt < 80 && placed.length < spec.rooms; attempt += 1) {
    const w = 3 + rng.int(3);
    const h = 3 + rng.int(3);
    const x = 1 + rng.int(Math.max(1, width - w - 2));
    const y = 1 + rng.int(Math.max(1, height - h - 2));
    const next = { x, y, w, h };
    if (placed.some((room) => overlaps(room, next))) continue;
    placed.push(next);
  }

  if (placed.length < 3) {
    placed.length = 0;
    placed.push({ x: 2, y: 2, w: 4, h: 4 }, { x: width - 7, y: 2, w: 4, h: 4 }, { x: 2, y: height - 6, w: 5, h: 4 });
  }

  for (const room of placed) carveRoom(cells, width, room);
  for (let i = 1; i < placed.length; i += 1) {
    const a = center(placed[i - 1]);
    const b = center(placed[i]);
    carveLine(cells, width, height, a.x, a.y, b.x, b.y);
  }

  const names = [...ROOM_NAMES].sort(() => rng.next() - 0.5);
  const rooms: DungeonRoom[] = placed.map((room, i) => {
    let kind: RoomKind = "empty";
    if (i === 0) kind = "start";
    else if (i === placed.length - 1) kind = "stairs";
    else if (i % 3 === 1) kind = "monster";
    else if (i % 3 === 2) kind = "loot";
    const monsterKey = kind === "monster" ? SPAWN_KEYS[i % SPAWN_KEYS.length] : undefined;
    const monster = monsterKey ? MONSTERS.find((m) => m.key === monsterKey) : undefined;
    const note =
      kind === "start"
        ? "Entry. Light from the stairwell dies here."
        : kind === "stairs"
          ? "Down. The air is colder."
          : kind === "monster"
            ? `${monster?.name ?? "Hostiles"} on station.`
            : kind === "loot"
              ? "Something worth the bag is hidden in the rubble."
              : "Empty enough to catch your breath.";
    const c = center(room);
    cells[idx(width, c.x, c.y)] =
      kind === "start" ? "start" : kind === "stairs" ? "stairs" : kind === "monster" ? "spawn" : kind === "loot" ? "loot" : "floor";
    return {
      id: `room-${i}`,
      name: names[i % names.length],
      ...room,
      kind,
      monsterKey,
      note,
    };
  });

  return { seed, size, width, height, cells, rooms };
}

export const CELL_GLYPH: Record<CellKind, string> = {
  wall: "#",
  floor: ".",
  start: "@",
  stairs: ">",
  loot: "$",
  spawn: "!",
};

export function dungeonAscii(map: Dungeon) {
  const lines: string[] = [];
  for (let y = 0; y < map.height; y += 1) {
    let line = "";
    for (let x = 0; x < map.width; x += 1) {
      line += CELL_GLYPH[map.cells[idx(map.width, x, y)]];
    }
    lines.push(line);
  }
  return lines.join("\n");
}

export function roomAt(map: Dungeon, x: number, y: number) {
  return map.rooms.find((room) => x >= room.x && x < room.x + room.w && y >= room.y && y < room.y + room.h) ?? null;
}
