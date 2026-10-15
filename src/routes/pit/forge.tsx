import { createFileRoute } from "@tanstack/react-router";
import { CanonicalTool } from "@/components/canonical-tool";

export const Route = createFileRoute("/pit/forge")({
  component: () => <CanonicalTool route="/pit/forge" />,
});
