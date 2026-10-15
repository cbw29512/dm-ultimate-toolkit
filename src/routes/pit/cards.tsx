import { createFileRoute } from "@tanstack/react-router";
import { CanonicalTool } from "@/components/canonical-tool";

export const Route = createFileRoute("/pit/cards")({
  component: () => <CanonicalTool route="/pit/cards" />,
});
