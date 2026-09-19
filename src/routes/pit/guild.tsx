import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";
import { appsIn } from "@/lib/hub";

export const Route = createFileRoute("/pit/guild")({ component: GuildPage });

function GuildPage() {
  const doors = appsIn("Guild").filter((a) => a.slug !== "ltg-hub");

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Light Tower Guild</h1>
        <p className="mt-2 max-w-xl text-muted">
          Florence club. Several live doors still exist. Each card goes to that site. Browser back returns to
          this page, then Hub returns home. lighttowerguild.tech is down.
        </p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2">
        {doors.map((app) => (
          <Card key={app.slug} className="p-0">
            <a href={app.live ?? app.repo} className="block p-5 no-underline">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg">{app.title}</CardTitle>
                <ArrowUpRight className="size-4 text-subtle" />
              </div>
              <CardDesc>{app.blurb}</CardDesc>
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}
