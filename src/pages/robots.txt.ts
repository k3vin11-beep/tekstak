// WHAT THIS FILE DOES: builds robots.txt, the note that tells Google it may read the site
// and where the sitemap is. The /admin/ area (the CMS login) is kept out of search results.
import type { APIRoute } from "astro";
import site from "../config/site";

export const GET: APIRoute = () => {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin/",
    "",
    `Sitemap: ${new URL("/sitemap-index.xml", site.url).href}`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
