import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexableDeployment } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexableDeployment()) return [];
  const baseUrl = getSiteUrl();

  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
