import type { MetadataRoute } from "next";

const baseUrl = "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/projects", "/contact"];

  return routes.flatMap((route) => {
    const enPath = route || "/";
    const ptPath = route ? `/pt${route}` : "/pt";

    return [
      {
        url: `${baseUrl}${enPath}`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}${ptPath}`,
        lastModified: new Date(),
      },
    ];
  });
}
