import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/pit/")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
