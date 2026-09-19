import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BATCH_MARKS, markTone, useBatchStore, useHydrated } from "@/lib/batch-store";
import {
  HUB_APPS,
  grouped,
  liveApps,
  repoOnlyApps,
  workbenchApps,
  type HubApp,
} from "@/lib/hub";
import { BMC_URL } from "@/lib/money";

export const Route = createFileRoute("/")({ component: HubHome });

function HubHome() {
  const live = liveApps();
  const bench = workbenchApps();
  const repos = repoOnlyApps();
  const marks = useBatchStore((s) => s.marks);
  const ready = useHydrated();
  const done = ready ? live.filter((a) => marks[a.slug]).length : 0;
  const next = (ready ? live.find((a) => !marks[a.slug]) : live[0]) ?? live[0];
  const pct = live.length ? Math.round((done / live.length) * 100) : 0;

  return (
    <div className="space-y-14">
      <section className="max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">
          One link for every D&D site
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          The D&D door.
        </h1>
        <p className="mt-4 text-muted">
          Open a live site, come back, mark it, next. Families sit together so duplicates are
          obvious. Nothing here that is not D&D.
        </p>
        <dl className="mt-6 grid grid-cols-3 gap-3 max-w-md">
          <Stat n={live.length} label="Live sites" />
          <Stat n={repos.length} label="Repos only" />
          <Stat n={bench.length} label="On this hub" />
        </dl>
        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-raised" aria-hidden>
          <div className="h-full bg-accent transition-[width] duration-300" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 text-sm text-subtle">
          Batch {done}/{live.length} marked
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {next ? (
            <Button asChild>
              <Link to="/batch/$slug" params={{ slug: next.slug }}>
                {done === 0 ? "Start the batch" : "Continue the batch"}
              </Link>
            </Button>
          ) : null}
          <Button variant="secondary" asChild>
            <a href="#live">Jump to live sites</a>
          </Button>
        </div>
      </section>

      <nav aria-label="On this page" className="flex flex-wrap gap-2 text-sm">
        <a href="#live" className="text-muted underline decoration-border underline-offset-4">
          Live
        </a>
        <a href="#repos" className="text-muted underline decoration-border underline-offset-4">
          Repos
        </a>
        <a href="#workbench" className="text-muted underline decoration-border underline-offset-4">
          Workbench
        </a>
      </nav>

      <section id="live" className="scroll-mt-20 space-y-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Live sites</h2>
        {grouped(live).map((family) => (
          <div key={family.group} className="space-y-3">
            <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">
              {family.group}
              {family.apps.length > 1 ? ` · ${family.apps.length} doors` : ""}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {family.apps.map((app) => (
                <SiteCard
                  key={app.slug}
                  app={app}
                  index={live.findIndex((a) => a.slug === app.slug) + 1}
                  mark={ready ? marks[app.slug] : undefined}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section id="repos" className="scroll-mt-20 space-y-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Repos with no live site</h2>
        {grouped(repos).map((family) => (
          <div key={family.group} className="space-y-3">
            <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">{family.group}</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {family.apps.map((app) => (
                <RepoCard key={app.slug} app={app} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section id="workbench" className="scroll-mt-20 space-y-4">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Workbench on this hub</h2>
        <p className="text-sm text-muted">Folded here so a “fold in” mark has a place to land.</p>
        {grouped(bench).map((family) => (
          <div key={family.group}>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">{family.group}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {family.apps.map((app) => (
                <Button key={app.slug} variant="secondary" asChild>
                  <Link to={app.to!}>{app.title}</Link>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </section>

      <p className="text-xs text-subtle">
        {HUB_APPS.length} D&D doors listed. Not Wizards of the Coast.{" "}
        <a href={BMC_URL} className="text-muted underline decoration-border underline-offset-4">
          Buy Me a Coffee
        </a>
      </p>
    </div>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-surface px-3 py-3">
      <dt className="text-[11px] uppercase tracking-wide text-subtle">{label}</dt>
      <dd className="mt-1 font-display text-2xl font-semibold tabular-nums">{n}</dd>
    </div>
  );
}

function SiteCard({ app, index, mark }: { app: HubApp; index: number; mark?: string }) {
  const markLabel = BATCH_MARKS.find((m) => m.key === mark)?.label;
  return (
    <article className="flex flex-col rounded-[var(--radius-xl)] border border-border bg-surface p-5 shadow-[var(--shadow-panel)]">
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-xs tabular-nums text-subtle">{String(index).padStart(2, "0")}</span>
        <Badge tone={markTone(mark)}>{markLabel ?? "Unmarked"}</Badge>
      </div>
      <h4 className="mt-4 font-display text-xl font-semibold tracking-tight text-fg">{app.title}</h4>
      <p className="mt-2 flex-1 text-sm text-muted">{app.blurb}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button size="sm" asChild>
          <Link to="/batch/$slug" params={{ slug: app.slug }}>
            Review
          </Link>
        </Button>
        <Button size="sm" variant="ghost" asChild>
          <a href={app.live} rel="noreferrer">
            Open site
            <ArrowUpRight className="size-3.5" />
          </a>
        </Button>
      </div>
    </article>
  );
}

function RepoCard({ app }: { app: HubApp }) {
  return (
    <a
      href={app.repo}
      rel="noreferrer"
      className="block rounded-[var(--radius-xl)] border border-border bg-surface p-5 no-underline shadow-[var(--shadow-panel)] transition-colors hover:border-muted"
    >
      <div className="flex items-start justify-between gap-2">
        <Badge>Repo</Badge>
        <ArrowUpRight className="size-4 text-subtle" />
      </div>
      <h4 className="mt-4 font-display text-xl font-semibold tracking-tight text-fg">{app.title}</h4>
      <p className="mt-2 text-sm text-muted">{app.blurb}</p>
    </a>
  );
}