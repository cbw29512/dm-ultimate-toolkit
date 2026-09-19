import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BackToHub } from "@/components/back-to-hub";

export const Route = createFileRoute("/batch")({ component: BatchLayout });

function BatchLayout() {
  return (
    <div className="space-y-6">
      <BackToHub />
      <Outlet />
    </div>
  );
}
