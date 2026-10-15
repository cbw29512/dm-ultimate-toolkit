export type WorkflowAudit = "pending" | "source-tested" | "browser-tested" | "blocked";

export type ProjectAudit = Readonly<{
  id: string;
  checkedAt: string;
  httpStatus: number | null;
  assetCount: number;
  assetFailures: readonly string[];
  workflow: WorkflowAudit;
  fullAuditCompleted: boolean;
  evidence: string;
  nextStep: string;
}>;

export type RetiredDuplicate = Readonly<{
  route: "/pit/forge" | "/pit/bestiary" | "/pit/cards";
  projectId: string;
  title: string;
  reason: string;
}>;

// A duplicate is retired from execution, while its existing saves remain untouched.
export const RETIRED_DUPLICATES: readonly RetiredDuplicate[] = [
  { route: "/pit/forge", projectId: "character-forge", title: "Character Forge",
    reason: "The hub's simplified generator duplicated the specialist builder and claimed validation it did not perform." },
  { route: "/pit/bestiary", projectId: "dm-forge", title: "Monster cards",
    reason: "The hub's shortened combat catalog duplicated monster references and omitted source abilities." },
  { route: "/pit/cards", projectId: "rules-cards", title: "Rules & Roll Cards",
    reason: "The hub's unversioned spell and condition summaries duplicated the edition-labeled reference library." },
];
