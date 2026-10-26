import type { MetadataRoute } from "next";
import { site } from "@/data";

const routes = ["", "/about", "/projects", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.flatMap((route) => {
    const en = `${site.url}${route || "/"}`;
    const pt = `${site.url}/pt${route}`;
    const languages = { en, pt, "x-default": en };

    return [
      { url: en, lastModified, alternates: { languages } },
      { url: pt, lastModified, alternates: { languages } },
    ];
  });
}
