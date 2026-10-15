import { createFileRoute } from "@tanstack/react-router";
import { LockKeyhole, Swords } from "lucide-react";

export const Route = createFileRoute("/pit/combat")({ component: IronPitPlaceholder });

function IronPitPlaceholder() {
  return (
    <section className="mx-auto max-w-2xl rounded-3xl border border-border bg-surface px-6 py-16 text-center">
      <Swords size={48} className="mx-auto text-warn" aria-hidden="true" />
      <p className="mt-6 text-xs uppercase tracking-widest text-muted">Reserved space</p>
      <h1 className="mt-3 font-display text-4xl">The Iron Pit</h1>
      <p className="mx-auto mt-5 max-w-md text-muted">Your automated combat simulator has a place here. This is a placeholder while the rest of the toolkit comes together.</p>
      <p className="mt-7 inline-flex items-center gap-2 text-sm text-muted"><LockKeyhole size={15} aria-hidden="true" /> Engine and existing site remain separate</p>
    </section>
  );
}
