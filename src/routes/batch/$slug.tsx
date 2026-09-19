import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";
import { Label, Textarea } from "@/components/ui/input";
import { BATCH_MARKS, markTone, useBatchStore } from "@/lib/batch-store";
import { liveApps, liveNeighbors } from "@/lib/hub";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/batch/$slug")({ component: BatchSitePage });

function BatchSitePage() {
  const { slug } = Route.useParams();
  const { index, total, prev, next, current } = liveNeighbors(slug);
  const mark = useBatchStore((s) => s.marks[slug]);
  const note = useBatchStore((s) => s.notes[slug] ?? "");
  const setMark = useBatchStore((s) => s.setMark);
  const setNote = useBatchStore((s) => s.setNote);
  const queue = liveApps();

  if (!current?.live) return <Navigate to="/batch" />;

  return (
    <div className="space-y-6">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">
        Batch {index + 1} of {total}
      </p>
      <ol className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1">
        {queue.map((app, i) => {
          const active = app.slug === slug;
          return (
            <li key={app.slug}>
              <Link
                to="/batch/$slug"
                params={{ slug: app.slug }}
                title={app.title}
                className={cn(
                  "inline-flex size-10 items-center justify-center rounded-[var(--radius-sm)] font-mono text-xs no-underline tabular-nums",
                  active ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </Link>
            </li>
          );
        })}
      </ol>

      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge tone={markTone(mark)}>{current.group}</Badge>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">{current.title}</h1>
          <p className="mt-2 max-w-xl text-muted">{current.blurb}</p>
          <p className="mt-2 font-mono text-xs text-subtle">{current.live}</p>
        </div>
        <Button asChild>
          <a href={current.live} rel="noreferrer">
            Open site
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <Card>
        <CardTitle>Mark this one</CardTitle>
        <CardDesc>Open the site, look at it, come back, then mark. Next card waits.</CardDesc>
        <div className="mt-4 flex flex-wrap gap-2">
          {BATCH_MARKS.map((m) => (
            <Button
              key={m.key}
              variant={mark === m.key ? "default" : "secondary"}
              onClick={() => setMark(slug, m.key)}
            >
              {m.label}
            </Button>
          ))}
        </div>
        <div className="mt-4">
          <Label htmlFor="note">Note for the next pass</Label>
          <Textarea
            id="note"
            rows={4}
            value={note}
            onChange={(e) => setNote(slug, e.target.value)}
            placeholder="What to keep, fold, or kill"
          />
        </div>
      </Card>

      {current.repo ? (
        <p className="text-sm text-muted">
          Repo:{" "}
          <a href={current.repo} rel="noreferrer" className="underline decoration-border underline-offset-4">
            {current.repo.replace("https://github.com/", "")}
          </a>
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-2">
        {prev ? (
          <Button variant="secondary" asChild>
            <Link to="/batch/$slug" params={{ slug: prev.slug }}>
              <ArrowLeft className="size-4" />
              {prev.title}
            </Link>
          </Button>
        ) : (
          <span />
        )}
        {next ? (
          <Button asChild>
            <Link to="/batch/$slug" params={{ slug: next.slug }}>
              {next.title}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        ) : (
          <Button asChild>
            <Link to="/">Batch done · hub</Link>
          </Button>
        )}
      </div>
    </div>
  );
}