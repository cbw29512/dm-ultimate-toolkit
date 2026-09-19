import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { BOARD_SLOTS, EMPTY_BOARD, usePitStore } from "@/lib/pit-store";
import { escapeHtml, printHtml } from "@/lib/print";

export const Route = createFileRoute("/pit/tome")({ component: TomePage });

function TomePage() {
  const tome = usePitStore((s) => s.tome);
  const addTome = usePitStore((s) => s.addTome);
  const removeTome = usePitStore((s) => s.removeTome);
  const board = usePitStore((s) => s.board) ?? EMPTY_BOARD;
  const setBoardSlot = usePitStore((s) => s.setBoardSlot);
  const quests = usePitStore((s) => s.quests) ?? [];
  const addQuest = usePitStore((s) => s.addQuest);
  const toggleQuest = usePitStore((s) => s.toggleQuest);
  const removeQuest = usePitStore((s) => s.removeQuest);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [quest, setQuest] = useState("");

  function printAll() {
    const slots = BOARD_SLOTS.map(
      (slot) => `<h2>${slot}</h2><p>${escapeHtml(board[slot] || "—")}</p>`,
    ).join("");
    const questHtml = quests
      .map((q) => `<li>${q.done ? "[x] " : "[ ] "}${escapeHtml(q.title)}</li>`)
      .join("");
    const sections = tome
      .map(
        (e) =>
          `<h2>${escapeHtml(e.title)}</h2><p class="muted">${escapeHtml(e.when.slice(0, 10))}</p><p>${escapeHtml(e.body)}</p>`,
      )
      .join("");
    printHtml(
      "TomeForge journal",
      `<h1>Session board</h1>
       <div class="banner">DNDWebTTRPG seven-slot board plus TomeForge. Stored in this browser only.</div>
       ${slots}
       <h2>Quests</h2>
       <ul>${questHtml || "<li>None.</li>"}</ul>
       <h1>Campaign tome</h1>
       ${sections || "<p>Empty tome.</p>"}`,
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Tome & board</h1>
          <p className="mt-1 max-w-xl text-muted">
            TomeForge plus the DNDWebTTRPG seven-slot board. Location, site, area, faces, fights, hazards, treasure —
            then write the page after. Stays on this device.
          </p>
        </div>
        <Button variant="secondary" onClick={printAll}>
          <Printer className="size-4" />
          Print session
        </Button>
      </header>

      <section className="space-y-3">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">Live board</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {BOARD_SLOTS.map((slot) => (
            <Card key={slot} className="p-4">
              <Label htmlFor={`slot-${slot}`}>{slot}</Label>
              <Textarea
                id={`slot-${slot}`}
                value={board[slot] ?? ""}
                onChange={(e) => setBoardSlot(slot, e.target.value)}
                placeholder={
                  slot === "Location"
                    ? "The ford at Duskwater"
                    : slot === "Monsters"
                      ? "Two orcs, a goblin in the reeds"
                      : ""
                }
              />
            </Card>
          ))}
        </div>
      </section>

      <Card>
        <CardTitle>Quest tracker</CardTitle>
        <CardDesc>No extra column on the board. Check them off here.</CardDesc>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Input value={quest} onChange={(e) => setQuest(e.target.value)} placeholder="Get the miller her mill back" />
          <Button
            disabled={!quest.trim()}
            onClick={() => {
              addQuest(quest.trim());
              setQuest("");
            }}
          >
            Add quest
          </Button>
        </div>
        {quests.length ? (
          <ul className="mt-4 space-y-2">
            {quests.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] border border-line bg-raised px-3 py-2 text-sm"
              >
                <button type="button" className="flex-1 text-left text-fg" onClick={() => toggleQuest(item.id)}>
                  <span className={item.done ? "text-subtle line-through" : ""}>{item.title}</span>
                </button>
                <Button size="sm" variant="ghost" onClick={() => removeQuest(item.id)}>
                  Drop
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted">No quests posted.</p>
        )}
      </Card>

      <Card>
        <CardTitle>New page</CardTitle>
        <div className="mt-4">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Session 12 · the ford" />
        </div>
        <div className="mt-3">
          <Label htmlFor="body">What happened</Label>
          <Textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <Button
          className="mt-4"
          disabled={!title.trim() || !body.trim()}
          onClick={() => {
            addTome({ title: title.trim(), body: body.trim() });
            setTitle("");
            setBody("");
          }}
        >
          Add to tome
        </Button>
      </Card>

      <div className="space-y-3">
        {tome.length === 0 ? (
          <Card>
            <CardTitle>Empty spine</CardTitle>
            <CardDesc>Write the first page after the session, not during it.</CardDesc>
          </Card>
        ) : (
          tome.map((entry) => (
            <Card key={entry.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-lg">{entry.title}</CardTitle>
                  <CardDesc>{entry.when.slice(0, 10)}</CardDesc>
                </div>
                <Button size="sm" variant="ghost" onClick={() => removeTome(entry.id)}>
                  Remove
                </Button>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-muted">{entry.body}</p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
