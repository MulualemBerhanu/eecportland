/** Normalize paths so `/about` and `/about/` match. */
export function normalizeRoute(path: string) {
  if (!path || path === "/") return "/";
  const base = path.split("?")[0]?.split("#")[0] ?? path;
  return base.length > 1 && base.endsWith("/") ? base.slice(0, -1) : base;
}

export function isSameRoute(pathname: string, href: string) {
  return normalizeRoute(pathname) === normalizeRoute(href);
}

export function scrollToPageTop(reduceMotion?: boolean | null) {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: reduceMotion ? "auto" : "smooth",
  });
}
