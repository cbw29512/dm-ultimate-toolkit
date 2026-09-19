import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { usePitStore } from "@/lib/pit-store";

export const Route = createFileRoute("/pit/scribe")({ component: ScribePage });

function ScribePage() {
  const notes = usePitStore((s) => s.scribe);
  const addScribe = usePitStore((s) => s.addScribe);
  const removeScribe = usePitStore((s) => s.removeScribe);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Tabletop Scribe</h1>
        <p className="mt-2 max-w-xl text-muted">
          Session notes on this device. The original repo is private; this is the hub tool, not a clone of that
          code.
        </p>
      </header>

      <Card>
        <CardTitle>New page</CardTitle>
        <div className="mt-4">
          <Label htmlFor="st">Title</Label>
          <Input id="st" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Session 4 · the ford" />
        </div>
        <div className="mt-3">
          <Label htmlFor="sb">What happened</Label>
          <Textarea id="sb" value={body} onChange={(e) => setBody(e.target.value)} rows={6} />
        </div>
        <Button
          className="mt-4"
          onClick={() => {
            if (!title.trim()) return;
            addScribe({ title: title.trim(), body: body.trim() });
            setTitle("");
            setBody("");
          }}
        >
          Save note
        </Button>
      </Card>

      <div className="space-y-3">
        {(notes ?? []).length === 0 ? (
          <Card>
            <CardTitle>Blank vellum</CardTitle>
            <CardDesc>Write the first session.</CardDesc>
          </Card>
        ) : (
          (notes ?? []).map((n) => (
            <Card key={n.id}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-lg">{n.title}</CardTitle>
                  <CardDesc>{new Date(n.when).toLocaleString()}</CardDesc>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeScribe(n.id)}>
                  Drop
                </Button>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-muted">{n.body}</p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
