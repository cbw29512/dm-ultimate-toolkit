import { createFileRoute } from "@tanstack/react-router";
import { CanonicalTool } from "@/components/canonical-tool";

export const Route = createFileRoute("/pit/bestiary")({
  component: () => <CanonicalTool route="/pit/bestiary" />,
});
