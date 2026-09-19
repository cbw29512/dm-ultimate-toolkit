export function printHtml(title: string, body: string) {
  const frame = document.createElement("iframe");
  frame.setAttribute("aria-hidden", "true");
  frame.style.position = "fixed";
  frame.style.right = "0";
  frame.style.bottom = "0";
  frame.style.width = "0";
  frame.style.height = "0";
  frame.style.border = "0";
  document.body.appendChild(frame);

  const doc = frame.contentDocument;
  if (!doc) {
    frame.remove();
    return;
  }

  doc.open();
  doc.write(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(title)}</title>
    <style>
      :root { color-scheme: light; }
      body {
        font-family: Georgia, "Times New Roman", serif;
        color: #1c1915;
        background: #fff;
        margin: 28px;
        line-height: 1.45;
      }
      h1 { font-size: 22px; margin: 0 0 6px; }
      h2 { font-size: 15px; margin: 22px 0 8px; letter-spacing: 0.04em; text-transform: uppercase; }
      p, li { font-size: 13px; }
      .muted { color: #5e584f; font-size: 11px; }
      .banner {
        border: 1px solid #d8d1c6;
        padding: 10px 12px;
        margin: 12px 0 18px;
        font-size: 12px;
      }
      table { width: 100%; border-collapse: collapse; margin: 8px 0 16px; }
      th, td { border-bottom: 1px solid #e6e0d6; text-align: left; padding: 6px 4px; font-size: 12px; vertical-align: top; }
      th { color: #5e584f; font-weight: 600; }
      .warn { color: #8a3b2b; }
      .map-grid { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 9px; line-height: 9px; letter-spacing: 0; white-space: pre; }
      .sheet { display: flex; flex-wrap: wrap; gap: 10px; }
      .pcard { width: 2.5in; height: 3.5in; border: 1px solid #1c1915; padding: 12px; box-sizing: border-box; display: flex; flex-direction: column; page-break-inside: avoid; }
      .pcard h3 { font-size: 16px; margin: 4px 0 8px; }
      .kicker { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #5e584f; }
      .stat { font-size: 12px; font-weight: 600; margin: 0 0 8px; }
      .body { font-size: 12px; flex: 1; }
      .foot { font-size: 10px; color: #5e584f; border-top: 1px solid #e6e0d6; padding-top: 8px; margin-top: 8px; }
      @media print { body { margin: 16px; } }
    </style>
  </head>
  <body>${body}</body>
</html>`);
  doc.close();

  const run = () => {
    frame.contentWindow?.focus();
    frame.contentWindow?.print();
    window.setTimeout(() => frame.remove(), 800);
  };

  if (frame.contentWindow?.document.readyState === "complete") run();
  else frame.onload = run;
}

export function escapeHtml(value: string) {
  const amp = "&" + "amp;";
  const lt = "&" + "lt;";
  const gt = "&" + "gt;";
  const quot = "&" + "quot;";
  return value
    .replaceAll("&", amp)
    .replaceAll("<", lt)
    .replaceAll(">", gt)
    .replaceAll('"', quot);
}
