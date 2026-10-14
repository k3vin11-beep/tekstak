// WHAT THIS FILE DOES: tells Astro how to build the site.
//  - site: the live web address (read from src/content/developer.json so you type it once)
//  - sitemap(): automatically builds sitemap-index.xml, the list of pages Google reads
//  - prefetch: starts loading a page when someone hovers a link, so clicks feel instant (speed tuning)
//  - inlineStylesheets: puts the small CSS file inside each page so the browser needs one request fewer (speed tuning)
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { readFileSync } from "node:fs";

const developer = JSON.parse(
  readFileSync(new URL("./src/content/developer.json", import.meta.url), "utf-8")
);

export default defineConfig({
  site: developer.url,
  integrations: [sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  build: { inlineStylesheets: "always" },
});
