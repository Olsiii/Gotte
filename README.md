# gotte.eco

Marketing site for GOTTË — custom-printed eco-friendly paper cups and bags, made in Prishtinë, Kosovë.

The site itself is plain HTML/CSS/JS — no framework, no build step, no bundler. There's also a small admin panel for editing site text, backed by a handful of zero-dependency Vercel serverless functions under `api/` (see **Admin panel** below); that part does need a few things configured before it works.

## Structure

```
index.html          Main single-page site (hero, about, products, contact)
privacy.html         Privacy policy page
css/styles.css        All styling, including responsive breakpoints
js/main.js            EN/SQ language switcher, marquee, product modal, contact form, nav
images/               Site images
  products/            Reserved for additional product photos (currently empty)
  about/               Reserved for about-section photos, e.g. team/facility (currently empty)
  hero/                Reserved for additional/rotating hero images (currently empty)
files/                 Drop downloadable assets here, e.g. gotte-catalog.pdf for the
                       "Download full catalog" button on the Products section
content/overrides.json Site-text overrides saved by the admin panel — {} by default;
                       served as-is to the live site, don't hand-edit unless you mean it
admin/                 Password-gated admin UI (index.html + admin.js + admin.css)
api/                   Vercel serverless functions backing the admin panel
robots.txt, sitemap.xml   SEO (robots.txt also blocks /admin and /api from being crawled)
```

## Running locally

No install needed. From this directory:

```
python3 -m http.server 8000
```

then open `http://localhost:8000/index.html`. (Opening the HTML file directly via `file://` mostly works too, but a local server avoids edge cases with relative paths and the contact form.)

## Deploying

Static files only — upload the contents of this directory to any static host (e.g. Netlify, Vercel, GitHub Pages, or a plain web server) and point `gotte.eco` at it. No build command required.

Configured for Vercel specifically via `vercel.json` (zero-config static deploy, plus security headers including a Content-Security-Policy) and `.vercelignore` (excludes `.vscode/` from the deployed output).

**CSP maintenance note:** `vercel.json`'s CSP allows the inline JSON-LD `<script>` block in `index.html` via a `sha256-...` hash instead of `'unsafe-inline'`, so a compromised third-party script can't inject arbitrary JS. If you ever edit that JSON-LD content, you must recompute the hash and update it in `vercel.json`, otherwise the CSP will silently block the script (structured data just stops rendering — no visible error). To recompute:

```
python3 -c "
import re, hashlib, base64
html = open('index.html', encoding='utf-8').read()
m = re.search(r'<script type=\"application/ld\+json\">(.*?)</script>', html, re.S)
h = hashlib.sha256(m.group(1).encode('utf-8')).digest()
print('sha256-' + base64.b64encode(h).decode())
"
```

## Admin panel

At `/admin`, password-gated, for editing the site's text (both languages) without touching code. It does **not** manage quote/contact submissions — those already have attachments, search, and export in your [Formspree dashboard](https://formspree.io/forms), so the admin panel just links there instead of duplicating it.

**How it works:** saving in the admin panel commits `content/overrides.json` straight to this repo via the GitHub API. Vercel is already watching this repo and redeploys on every push, so a save becomes a commit becomes a new deploy — the live site picks it up in about a minute, not instantly. The main site fetches that file as a plain static asset at boot and layers it over the hardcoded defaults in `js/main.js`'s `T` dictionary (a blank field in the admin just means "keep the default").

**Required setup (in the Vercel project's dashboard → Settings → Environment Variables), before any of this works:**

| Variable | What it's for | How to get one |
|---|---|---|
| `ADMIN_PASSWORD` | The password the `/admin` login form checks. | Pick one. There's only a single shared password — no per-user accounts. |
| `ADMIN_SESSION_SECRET` | Signs the login session cookie. | A long random string: `openssl rand -hex 32` |
| `GITHUB_TOKEN` | Lets the admin panel commit content changes to this repo. | A GitHub personal access token scoped to **this repo only**, with Contents: Read & write permission (fine-grained PAT) — ideally not a token with broader access than that. |
| `GITHUB_REPO` | Which repo to commit to. | `owner/repo`, e.g. `olsisopi1/gotte` |
| `GITHUB_BRANCH` | Which branch to commit to. | Defaults to `main` if unset |

Without `ADMIN_PASSWORD`/`ADMIN_SESSION_SECRET` set, `/admin` fails closed (nobody can log in) rather than silently allowing access. Without the `GITHUB_*` vars, login still works but saving content will fail with a clear error.

**Verification note:** the auth, session, and content-editing logic was tested end-to-end locally (login, wrong-password, session expiry, save, and the optimistic-concurrency conflict case all pass against the real route handlers) with the GitHub calls swapped for a local fake. The literal GitHub API request shape is written against their stable, long-documented Contents API, but hasn't been exercised against a real token/repo — worth a quick real save-and-check after you deploy and set the env vars above.

## Contact form

The form on the Contact section posts to Formspree (`https://formspree.io/f/xojbkbzn`). To change where submissions go, update the form's `action` in `index.html` and reconfigure the corresponding Formspree form.

## Language switching

Content is translated client-side via the `T` dictionary in `js/main.js` (English/Albanian). Elements are tagged with `data-key` (text), `data-placeholder-key` (input placeholders), or `data-key-aria` (aria-labels) to opt into translation. The active language is reflected in the URL as `?lang=sq`.

`T` holds the hardcoded defaults; `content/overrides.json` (editable from `/admin`, see **Admin panel** above) is layered on top of it at boot, key by key, so an edit there doesn't require a code change or touching `T` directly.
