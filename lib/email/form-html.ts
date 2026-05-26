import { escapeHtml } from "@/lib/email/escape-html";
import { siteConfig } from "@/lib/site";

export function formNotificationHtml(
  title: string,
  fields: { label: string; value: string }[],
  submittedAt: string,
) {
  const rows = fields
    .map(
      (f) =>
        `<tr><td style="padding:8px 12px 8px 0;vertical-align:top;font-weight:600;color:#1c2e45;width:140px;">${escapeHtml(f.label)}</td><td style="padding:8px 0;color:#1a2a3a;white-space:pre-wrap;">${escapeHtml(f.value)}</td></tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<body style="font-family:Helvetica,Arial,sans-serif;background:#faf8f5;margin:0;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e4dcd2;border-radius:12px;overflow:hidden;">
    <div style="background:#0b1c2c;color:#fff;padding:20px 24px;">
      <p style="margin:0;font-size:18px;font-weight:bold;">${escapeHtml(siteConfig.name)}</p>
      <p style="margin:8px 0 0;font-size:14px;color:#f1d27a;">${escapeHtml(title)}</p>
    </div>
    <div style="padding:24px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>
      <p style="margin:24px 0 0;font-size:12px;color:#5c6570;">Submitted: ${escapeHtml(submittedAt)} (Pacific)</p>
    </div>
  </div>
</body>
</html>`;
}

export function formNotificationText(
  title: string,
  fields: { label: string; value: string }[],
  submittedAt: string,
) {
  const body = fields.map((f) => `${f.label}: ${f.value}`).join("\n");
  return `${siteConfig.name}\n${title}\n\n${body}\n\nSubmitted: ${submittedAt} (Pacific)`;
}
