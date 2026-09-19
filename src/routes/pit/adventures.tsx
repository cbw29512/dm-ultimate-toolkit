import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";
import { appsIn } from "@/lib/hub";

export const Route = createFileRoute("/pit/adventures")({ component: AdventuresPage });

function AdventuresPage() {
  const list = appsIn("Adventures").filter((a) => a.slug !== "adventures" && a.slug !== "courtroom-hub");

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Teaching adventures</h1>
        <p className="mt-2 max-w-xl text-muted">
          Every adventure repo stays on the hub until you say to remove it. Private repos are linked, not
          copied. Pair a level 1 table with the starter fight: one fighter, two goblins, the round loops.
        </p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((app) => (
          <Card key={app.slug} className="p-0">
            <a href={app.live ?? app.repo} className="block p-5 no-underline">
              <div className="flex items-start justify-between gap-2">
                <Badge>{app.badge}</Badge>
                <ArrowUpRight className="size-4 text-subtle" />
              </div>
              <CardTitle className="mt-3 text-lg">{app.title}</CardTitle>
              <CardDesc>{app.blurb}</CardDesc>
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}
