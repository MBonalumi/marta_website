---
description: How to deploy the Astro site to GitHub Pages
---

# Deploy to GitHub Pages

This workflow builds and deploys `marta_website` to GitHub Pages via GitHub Actions.

## One-time GitHub Setup (do this once)

1. Push the project to GitHub if not already done.
2. On GitHub, go to **Settings → Pages**.
3. Under **Source**, select **GitHub Actions** (not "Deploy from a branch").
4. Save. That's it — the next push to `main` will trigger a deploy.

## How Deployments Work

Every push to the `main` branch automatically triggers `.github/workflows/deploy.yml`, which:
1. Checks out the code
2. Installs npm dependencies (`npm ci`)
3. Builds the site (`npm run build`)
4. Publishes `dist/` to GitHub Pages

The site will be live at: **https://mbonalumi.github.io/marta_website/**

You can also trigger a deploy manually from the **Actions** tab on GitHub → select the workflow → **Run workflow**.

---

## Switching to `martadegani.it` (custom domain)

When the domain is ready, two steps are needed:

### 1. Update `astro.config.mjs`

```js
// Replace the current site + base with:
site: 'https://www.martadegani.it',
// Remove the `base` line entirely (or set base: '/')
```

### 2. Add a `CNAME` file

Create `public/CNAME` (no extension) with just:

```
martadegani.it
```

Astro will copy it into `dist/` at build time, telling GitHub Pages which domain to serve.

### 3. Configure DNS with your domain registrar

Add these DNS records pointing to GitHub's servers:

| Type  | Host | Value              |
|-------|------|--------------------|
| A     | @    | 185.199.108.153    |
| A     | @    | 185.199.109.153    |
| A     | @    | 185.199.110.153    |
| A     | @    | 185.199.111.153    |
| CNAME | www  | mbonalumi.github.io |

### 4. Enable HTTPS on GitHub

In **Settings → Pages**, tick **Enforce HTTPS** (appears once the domain is verified, may take a few minutes after DNS propagates).
