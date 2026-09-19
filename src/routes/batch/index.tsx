import { createFileRoute, Navigate } from "@tanstack/react-router";
import { liveApps } from "@/lib/hub";
import { useBatchStore } from "@/lib/batch-store";

export const Route = createFileRoute("/batch/")({ component: BatchIndex });

function BatchIndex() {
  const marks = useBatchStore((s) => s.marks);
  const live = liveApps();
  const next = live.find((a) => !marks[a.slug]) ?? live[0];
  if (!next) return <Navigate to="/" />;
  return <Navigate to="/batch/$slug" params={{ slug: next.slug }} />;
}
