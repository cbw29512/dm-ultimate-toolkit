import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/pit/courtroom")({ component: CourtPage });

function CourtPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Dungeon Courtroom</h1>
        <p className="mt-2 max-w-xl text-muted">
          Court is in session on its own site. This hub does not rewrite that project. Open it, then browser
          back returns here.
        </p>
      </header>
      <Card>
        <CardTitle>Live courtroom</CardTitle>
        <CardDesc>dungeoncourtroom.netlify.app plus the pipeline repo on GitHub.</CardDesc>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild>
            <a href="https://dungeoncourtroom.netlify.app">Open courtroom</a>
          </Button>
          <Button variant="secondary" asChild>
            <a href="https://github.com/cbw29512/dungeoncourtroom">Repo</a>
          </Button>
          <Button variant="ghost" asChild>
            <a href="https://github.com/cbw29512/dungeoncourtroom-pipeline">Pipeline</a>
          </Button>
        </div>
      </Card>
    </div>
  );
}
