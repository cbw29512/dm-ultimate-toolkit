import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function BackToHub() {
  return (
    <Link
      to="/"
      className="inline-flex h-11 items-center gap-2 text-sm text-muted no-underline hover:text-fg"
    >
      <ArrowLeft className="size-4" />
      Back to hub
    </Link>
  );
}
