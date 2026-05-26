function driveFileIdFromUrl(trimmed: string): string | undefined {
  const fileMatch = trimmed.match(/\/file\/d\/([^/?#]+)/);
  if (fileMatch?.[1]) return decodeURIComponent(fileMatch[1]);

  const idMatch = trimmed.match(/[?&]id=([^&]+)/);
  if (idMatch?.[1]) return decodeURIComponent(idMatch[1].trim());

  return undefined;
}

/** Direct image URL that tends to work in `<img src>` for publicly shared Drive files. */
export function googleDriveDirectImageUrl(fileId: string) {
  return `https://drive.google.com/uc?export=view&id=${encodeURIComponent(fileId)}`;
}

export function normalizeGoogleDriveImageUrl(url?: string): string | undefined {
  if (!url) return undefined;

  const trimmed = url.trim();
  if (!trimmed) return undefined;

  const id = driveFileIdFromUrl(trimmed);
  if (id) {
    return googleDriveDirectImageUrl(id);
  }

  if (trimmed.includes("drive.google.com/uc?export=view&id=")) {
    return trimmed;
  }

  // Fallback: return original URL unchanged.
  return trimmed;
}

export function getGoogleDriveFileId(url?: string): string | undefined {
  if (!url) return undefined;
  return driveFileIdFromUrl(url.trim());
}

export function buildGoogleDriveImageCandidates(url?: string): string[] {
  const normalized = normalizeGoogleDriveImageUrl(url);
  if (!normalized) return [];

  const fileId = getGoogleDriveFileId(normalized);
  if (!fileId) return [normalized];

  // Same-origin proxy first: server-side fetch avoids browser referrer / HTML interstitial issues.
  const proxy = `/api/drive-image?id=${encodeURIComponent(fileId)}`;

  return [
    proxy,
    googleDriveDirectImageUrl(fileId),
    `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w2000`,
    `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w1000`,
    `https://drive.google.com/uc?id=${encodeURIComponent(fileId)}`,
    `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`,
  ];
}
