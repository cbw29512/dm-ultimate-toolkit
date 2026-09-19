import { Coffee, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BMC_URL, GITHUB_SPONSORS_URL } from "@/lib/money";
import { useDeskStore } from "@/lib/desk-store";

export function MoneyBar({
  kicker,
  title,
  price,
  href,
  event,
}: {
  kicker: string;
  title: string;
  price: string;
  href: string;
  event: "tip" | "fightPdf" | "tripPdf" | "binder";
}) {
  const track = useDeskStore((s) => s.track);
  const supporter = useDeskStore((s) => s.supporter);
  const markSupporter = useDeskStore((s) => s.markSupporter);

  return (
    <aside className="rounded-[var(--radius-lg)] border border-border bg-raised p-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-subtle">{kicker}</p>
      <p className="mt-1 font-display text-lg text-fg">{title}</p>
      <p className="mt-1 text-sm text-muted">{price}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button asChild>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            onClick={() => track(event === "tip" ? "tip" : event)}
          >
            <Coffee className="size-4" />
            Pay on Ko-fi
          </a>
        </Button>
        <Button variant="secondary" asChild>
          <a href={GITHUB_SPONSORS_URL} target="_blank" rel="noreferrer" onClick={() => track("tip")}>
            GitHub Sponsors
          </a>
        </Button>
        <Button variant="ghost" type="button" onClick={() => markSupporter(!supporter)}>
          <HeartHandshake className="size-4" />
          {supporter ? "Supporter on" : "I already tipped"}
        </Button>
      </div>
      <p className="mt-3 text-xs text-subtle">
        Ko-fi is already live at buymeacoffee.com/divclass016. Core tools stay free. Paid files are how this desk
        eats. {supporter ? "Supporter mode is on for this browser." : null}
      </p>
      <a href={BMC_URL} className="sr-only">
        Ko-fi
      </a>
    </aside>
  );
}
