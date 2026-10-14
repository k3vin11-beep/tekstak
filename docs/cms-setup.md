# CMS setup (for you, the developer): one time per client

**What the CMS is:** a friendly editing screen at `yoursite.co.za/admin/` where the client can change text and photos
without touching code. It is **Decap CMS**, a free open-source tool. When the client clicks **Publish**, Decap saves the
change to the GitHub repository, and your host (Vercel or Netlify) rebuilds the site. The change is usually live in a
minute or two.

## What is already done for you

- `public/admin/index.html` loads the editor.
- `public/admin/config.yml` lists exactly what the client can edit (business details, home, about, services, gallery,
  pricing, our work, FAQ, blog page, and the blog posts themselves). Anything not listed there (like the GA4 ID or the
  schema facts in `developer.json`) is safe from accidental edits.
- Uploaded photos go to `src/assets/uploads/` and are optimised automatically.

## What you must do for each client

1. Put the project in its **own GitHub repository** for that client.
2. Open `public/admin/config.yml` and change:
   ```yaml
   repo: YOUR-GITHUB-USERNAME/YOUR-REPO-NAME
   ```
3. Set up the **login** (see below).
4. Make sure each person who will edit has a **GitHub account** and has been added to the repo as a collaborator
   with write access. (This is the main drawback of this setup: the client needs a free GitHub account.)
5. Open `/admin/` on the live site, log in, change something small, click **Publish**, and watch the site update.
   **Always do this test before you tell the client it works.**

## The login: the part to test carefully

Decap's GitHub login needs a small "OAuth" helper in the middle. You have two ways to provide it. Tools and menus change,
so check <https://decapcms.org/docs/> for the current steps before each setup.

**Route A: host the site on Netlify.** Netlify can supply the login helper. You create a GitHub "OAuth app"
(GitHub > Settings > Developer settings > OAuth Apps), then add its Client ID and Secret in Netlify under the site's
access settings. No code to write. `netlify.toml` is already included.

**Route B: any host (for example Vercel).** Run your own login helper. Decap's docs list ready-made ones
("external OAuth clients"). Once it is running, uncomment this line in `config.yml` and point it at your helper:
```yaml
base_url: https://your-oauth-proxy.example.com
```

> Netlify's older "Identity + Git Gateway" login (which let clients log in without a GitHub account) is marked
> deprecated in Netlify's docs, so this template does not use it.

## Testing on your own computer (optional)

```
npm install
npx decap-server        # in one terminal window
npm run dev             # in another, then open http://localhost:4321/admin/
```
`local_backend: true` in `config.yml` makes the CMS edit your local files instead of GitHub (only on localhost).

## Things to tell clients

- Edits take a minute or two to appear on the live site.
- They can only change what the form shows. Layout and design changes come to you.
- Every edit is saved in GitHub's history, so a mistake can always be undone.
