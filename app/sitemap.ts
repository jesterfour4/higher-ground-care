import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://highergroundcare.com";
  return [
    "", "/services","/the-center","/community","/about","/referrals","/privacy","/land-acknowledgement"
  ].map(p=>({ url: `${base}${p || "/"}`, lastModified: new Date() }));
}