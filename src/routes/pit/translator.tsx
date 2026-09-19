import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";
import { Label, Select, Textarea } from "@/components/ui/input";
import { TONGUES, translateTongue } from "@/lib/languages";

export const Route = createFileRoute("/pit/translator")({ component: TranslatorPage });

function TranslatorPage() {
  const [text, setText] = useState("Speak friend and enter.");
  const [tongue, setTongue] = useState("elvish");
  const out = useMemo(() => translateTongue(text, tongue), [text, tongue]);
  const meta = TONGUES.find((t) => t.key === tongue);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Language translator</h1>
        <p className="mt-2 max-w-xl text-muted">
          Fan ciphers for passing notes at the table. Not official D&D scripts, fonts, or product identity.
        </p>
      </header>

      <Card>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="tongue">Tongue</Label>
            <Select id="tongue" value={tongue} onChange={(e) => setTongue(e.target.value)}>
              {TONGUES.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.name}
                </option>
              ))}
            </Select>
            <p className="mt-2 text-sm text-muted">{meta?.hint}</p>
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="src">Common</Label>
          <Textarea id="src" value={text} onChange={(e) => setText(e.target.value)} rows={5} />
        </div>
        <div className="mt-4">
          <Label htmlFor="out">{meta?.name ?? "Out"}</Label>
          <Textarea id="out" readOnly value={out} rows={5} />
        </div>
        <Button
          className="mt-4"
          variant="secondary"
          onClick={() => {
            void navigator.clipboard.writeText(out);
          }}
        >
          Copy cipher
        </Button>
        <CardDesc className="mt-3">
          Private translator repo is listed on the hub. This page does not copy that code.
        </CardDesc>
      </Card>
    </div>
  );
}
