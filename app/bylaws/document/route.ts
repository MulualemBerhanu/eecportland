import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "Bylaws Final Draft (Revised).pdf");
    const pdfBuffer = await readFile(filePath);
    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="Bylaws Final Draft (Revised).pdf"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response("Bylaws document not found.", { status: 404 });
  }
}
