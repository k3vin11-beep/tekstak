# Google Analytics 4 (GA4): how to switch it on

**What it does:** GA4 is Google's free visitor counter. It shows how many people visit the site, which pages they read,
where they come from and what device they use. The client uses it to see if the website is working.

## Steps (about 10 minutes)

1. Sign in to <https://analytics.google.com> with the **client's** Google account (not yours), so the client owns the data.
   Then add yourself as an editor: Admin > Account access management > add your email.
2. Click **Admin > Create > Property**. Name it after the business. Set the time zone to South Africa and currency to ZAR.
3. When asked about the platform, choose **Web** and enter the website address.
4. Google shows a **Measurement ID** that looks like `G-ABC123XYZ9`. Copy it.
5. In this project open `src/content/developer.json` and paste it in:
   ```json
   "ga4Id": "G-ABC123XYZ9"
   ```
6. Save and publish the site. Visit the live site, then in GA4 open **Reports > Realtime**. You should see yourself.
   (Data can take up to a day to appear in the normal reports. Realtime is instant.)

## How it works in this template

- `src/layouts/BaseLayout.astro` adds Google's small tracking script to every page, but **only on the live site**
  and **only when `ga4Id` is filled in**. While you test on your own computer nothing is sent.
- Leave `ga4Id` empty to turn tracking off completely.

## Good to know

- Google menus move around from time to time. If a button is not where this guide says, search the GA4 help for
  "create a web data stream".
- GA4 uses cookies. If the client serves customers in other countries, or wants a cookie notice, talk to them about it
  before launch.
