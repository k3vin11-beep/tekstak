# Google Search Console: how to set it up

**What it does:** Search Console is Google's free tool that tells you how the site appears in Google Search: which
searches show the site, how many people click, and whether Google found any problems. Submitting the sitemap here
helps Google find every page faster.

## Steps

1. Sign in to <https://search.google.com/search-console> with the **client's** Google account (add yourself as an
   owner or full user afterwards).
2. Click **Add property**. The easiest option for this template is **URL prefix**: type the full address, for example
   `https://www.yourbusiness.co.za/`.
3. Choose the **HTML tag** verification method. Google shows a line like:
   `<meta name="google-site-verification" content="AbC123...">`
   Copy **only the value inside content="..."**.
4. Open `src/content/developer.json` and paste it:
   ```json
   "googleSiteVerification": "AbC123..."
   ```
5. Publish the site, wait a minute, then click **Verify** in Search Console.
6. Open **Sitemaps** in the left menu and submit: `sitemap-index.xml`
   (the template builds this file for you automatically).

## How it works in this template

- `BaseLayout.astro` prints the verification tag on every page when `googleSiteVerification` is filled in.
- `@astrojs/sitemap` (set up in `astro.config.mjs`) creates `sitemap-index.xml` each time the site is built.
- `robots.txt` (made by `src/pages/robots.txt.ts`) points Google to the sitemap.

## After setup

Check back in a week. The **Pages** report shows which pages Google has indexed. New sites can take days to weeks to
appear in search, so do not panic if it is slow.
