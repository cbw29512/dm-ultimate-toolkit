import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Hub", match: (p: string) => p === "/" },
  { to: "/batch", label: "Batch", match: (p: string) => p.startsWith("/batch") },
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-[var(--radius-sm)] focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-20 border-b border-line bg-bg/92 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-baseline gap-2 no-underline">
            <span className="font-display text-lg font-semibold tracking-tight text-fg">DM Ultimate Toolkit</span>
            <span className="text-xs text-subtle max-sm:hidden">One door. Every D&D site.</span>
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-1">
            {NAV.map((item) => {
              const active = item.match(pathname);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "inline-flex h-11 items-center rounded-[var(--radius-sm)] px-3 text-sm no-underline",
                    active ? "bg-raised text-fg" : "text-muted hover:bg-raised hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main id="main" className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8">
        {children}
      </main>
    </div>
  );
}