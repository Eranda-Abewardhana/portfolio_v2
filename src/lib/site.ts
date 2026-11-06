type SiteEnvironment = Record<string, string | undefined>;

/** Use one stable origin for metadata, structured data, and crawler endpoints. */
export function getSiteUrl(environment: SiteEnvironment = process.env): string {
  const candidates = [
    environment.NEXT_PUBLIC_SITE_URL,
    environment.VERCEL_PROJECT_PRODUCTION_URL,
    environment.VERCEL_URL,
  ];

  for (const candidate of candidates) {
    if (!candidate?.trim()) continue;
    try {
      const value = candidate.trim();
      const url = new URL(value.includes("://") ? value : `https://${value}`);
      if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) continue;
      return url.origin;
    } catch {
      // An invalid optional override must not break the site or its build.
    }
  }

  return "http://localhost:3000";
}

export function isIndexableDeployment(environment: SiteEnvironment = process.env): boolean {
  if (environment.NODE_ENV === "development") return false;
  if (environment.VERCEL_ENV && environment.VERCEL_ENV !== "production") return false;
  if (environment.VERCEL_TARGET_ENV && environment.VERCEL_TARGET_ENV !== "production") return false;
  const { hostname } = new URL(getSiteUrl(environment));
  return !(
    hostname === "localhost" ||
    hostname === "[::1]" ||
    hostname.endsWith(".localhost") ||
    hostname.startsWith("127.") ||
    hostname === "0.0.0.0"
  );
}

export function getGoogleVerification(environment: SiteEnvironment = process.env): string | undefined {
  const value = (environment.GOOGLE_SITE_VERIFICATION || environment.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION)?.trim();
  if (!value) return undefined;
  // Accept either Google's content value or the HTML tag copied from Search Console.
  if (value.startsWith("<")) {
    if (!/name\s*=\s*["']google-site-verification["']/i.test(value)) return undefined;
    return value.match(/content\s*=\s*["']([^"']+)["']/i)?.[1];
  }
  return value;
}
