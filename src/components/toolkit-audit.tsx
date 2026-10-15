import { Check, ClipboardList } from "lucide-react";
import { AUDIT_CHECKED_AT, PROJECT_AUDITS } from "@/lib/toolkit-audit-data";
import { RETIRED_DUPLICATES } from "@/lib/toolkit-audit-schema";
import { TOOLKIT_PROJECTS } from "@/lib/toolkit-projects";

export function ToolkitAudit() {
  const assets = PROJECT_AUDITS.reduce((count, audit) => count + audit.assetCount, 0);
  const complete = PROJECT_AUDITS.filter((audit) => audit.fullAuditCompleted).length;
  return <section id="audit" className="toolkit-audit" aria-labelledby="audit-title">
    <div className="audit-heading"><div><p className="toolkit-eyebrow"><ClipboardList size={14} aria-hidden="true" /> THE WORK IN PROGRESS</p>
      <h2 id="audit-title">Making every tool table-ready.</h2><p>A checked page is the start. Real workflows, saves, rules, and printing come next.</p></div>
      <span>Checked {AUDIT_CHECKED_AT.slice(0, 10)}</span></div>
    <div className="audit-stats"><div><strong>{PROJECT_AUDITS.length}</strong><span>Linked pages checked</span></div><div><strong>{assets}</strong><span>Initial assets checked</span></div><div><strong>{RETIRED_DUPLICATES.length}</strong><span>Hub duplicates retired</span></div><div><strong>{complete}</strong><span>Full audits complete</span></div></div>
    <details className="audit-details"><summary>See audit results and next steps</summary>
      <div className="audit-results">{PROJECT_AUDITS.map((audit) => {
        const project = TOOLKIT_PROJECTS.find((entry) => entry.id === audit.id)!;
        const deliveryPassed = audit.httpStatus === 200 && !audit.assetFailures.length;
        return <article key={audit.id}><div><h3>{project.title}</h3><span className={deliveryPassed ? "audit-delivery-pass" : "audit-delivery-fail"}>{deliveryPassed && <Check size={12} aria-hidden="true" />}{deliveryPassed ? `HTTP 200 · ${audit.assetCount} initial assets` : "Delivery issue found"}</span></div>
          <p>{audit.workflow === "source-tested" ? "19 source checks pass. Live workflow review pending." : "Core workflow review pending."}</p><p><strong>Next:</strong> {audit.nextStep}</p></article>;
      })}</div>
      <div className="audit-cleanup"><h3>One implementation for each job</h3><ul>{RETIRED_DUPLICATES.map((entry) => <li key={entry.route}><Check size={13} aria-hidden="true" /><span>{entry.title}: duplicate hub implementation retired; dedicated tool retained.</span></li>)}</ul><p>Earlier local saves remain untouched and can be exported from the old routes. Iron Pit is excluded from this audit.</p></div>
    </details>
  </section>;
}
