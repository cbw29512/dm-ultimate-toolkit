import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/crossing")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
