import { useState } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { TOOLKIT_PROJECTS } from "@/lib/toolkit-projects";
import { RETIRED_DUPLICATES, type RetiredDuplicate } from "@/lib/toolkit-audit-schema";
import { earlierWorkbenchBackup } from "@/lib/toolkit-legacy-backup";

export function CanonicalTool({ route }: { route: RetiredDuplicate["route"] }) {
  const [message, setMessage] = useState("");
  const decision = RETIRED_DUPLICATES.find((entry) => entry.route === route)!;
  const project = TOOLKIT_PROJECTS.find((entry) => entry.id === decision.projectId)!;
  const destination = project.destination;

  function downloadEarlierData() {
    let url: string | undefined;
    try {
      // Read the original key without rewriting or migrating any previous data.
      const backup = earlierWorkbenchBackup(localStorage);
      if (backup.status === "empty") { setMessage("No earlier workbench save was found on this device."); return; }
      if (backup.status === "error") { setMessage(backup.message); return; }
      url = URL.createObjectURL(new Blob([backup.json], { type: "application/json" }));
      const anchor = document.createElement("a");
      anchor.href = url; anchor.download = "toolkit-earlier-workbench-backup.json";
      document.body.append(anchor); anchor.click(); anchor.remove();
      setMessage("Your earlier workbench data was downloaded. It remains saved on this device.");
    } catch (error) {
      console.error("[toolkit] Cannot export earlier workbench data", error);
      setMessage("The backup could not be downloaded. Your saved data has not been changed.");
    } finally {
      if (url) URL.revokeObjectURL(url);
    }
  }

  return <section className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-7 md:p-10">
    <p className="text-xs uppercase tracking-widest text-warn">One tool for this job</p>
    <h1 className="mt-3 font-display text-3xl">{decision.title}</h1>
    <p className="mt-4 leading-7 text-muted">Use the dedicated tool for this workflow. The hub's duplicate version has been retired.</p>
    {destination.kind === "external" && <a href={destination.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-fg">Open {project.title}<ArrowUpRight size={16} aria-hidden="true" /></a>}
    <div className="mt-8 border-t border-border pt-5"><h2 className="text-sm font-semibold">Earlier workbench saves</h2>
      <p className="mt-2 text-sm leading-6 text-muted">Old saves remain on this device. You can download a safety copy; automatic import into the dedicated tool is not available yet.</p>
      <button type="button" onClick={downloadEarlierData} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-fg"><Download size={15} aria-hidden="true" />Download earlier local data</button>
      <p role="status" className="mt-2 text-sm text-muted">{message}</p>
    </div>
  </section>;
}
