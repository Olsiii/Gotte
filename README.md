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
admin/                 Password-gated admin UI (index.html + admin.js + admin.css)
api/                   Vercel serverless functions: contact form (contact.js), site text (content.js), admin
robots.txt, sitemap.xml   SEO (robots.txt also blocks /admin and /api from being crawled)
```

## Running locally

No install needed. From this directory:

```
python3 -m http.server 8000
```

then open `http://localhost:8000/index.html`. (Opening the HTML file directly via `file://` mostly works too, but a local server avoids edge cases with relative paths and the contact form.)

## Deploying

Deploy to Vercel (no build command). The pages are static, but the contact form and admin panel rely on the serverless functions in `api/`, so a plain static host won't run them.

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

At `/admin`, password-gated, for editing the site's text (both languages) without touching code. Contact/quote submissions aren't stored here — they arrive by email (see **Contact form** below).

**How it works:** saved text is stored in a small Upstash Redis database (free tier). The live site fetches it from `/api/content` at boot and layers it over the hardcoded defaults in `js/main.js`'s `T` dictionary (a blank field in the admin just means "keep the default"). Changes show up within about 10 seconds — no redeploy.

**Setup:**

1. Vercel dashboard → your project → **Storage** → **Create Database** → **Upstash for Redis** (free plan) → connect it to this project. That sets `KV_REST_API_URL` and `KV_REST_API_TOKEN` automatically.
2. Vercel dashboard → **Settings → Environment Variables**, add:

| Variable | What it's for |
|---|---|
| `ADMIN_PASSWORD` | The password the `/admin` login form checks. Single shared password, no per-user accounts. |
| `ADMIN_SESSION_SECRET` | Signs the login cookie. A long random string: `openssl rand -hex 32` |

3. Redeploy so the new variables take effect.

Without `ADMIN_PASSWORD`/`ADMIN_SESSION_SECRET`, `/admin` fails closed (nobody can log in). Without the Redis database, login works but loading/saving text shows a "Storage is not connected" error, and the live site just keeps its defaults.

The admin panel needs the `api/` functions, so it only works on Vercel (or `vercel dev`), not with `python3 -m http.server`.

## Contact form

The form posts to `/api/contact`, which emails each submission — with the attached logo/artwork, if any — via [Resend](https://resend.com) (free tier: 3,000 emails/month). Replying to the email replies to the customer. Attachments are capped at 4MB because Vercel limits request bodies to ~4.5MB.

**Setup:**

1. Sign up at resend.com → **Domains** → add `gotte.eco` and add the DNS records it shows at your domain registrar. Wait for it to show "Verified".
2. Resend → **API Keys** → create one.
3. Vercel → **Settings → Environment Variables**, add:

| Variable | Example |
|---|---|
| `RESEND_API_KEY` | `re_...` |
| `CONTACT_TO` | `info@gotte.eco` (comma-separate for several inboxes) |
| `CONTACT_FROM` | `GOTTË <quotes@gotte.eco>` — must be on the verified domain |

4. Redeploy.

Before the domain is verified you can leave `CONTACT_FROM` unset: it falls back to Resend's test sender, which can only deliver to the email address your Resend account was created with — handy for a first test.

## Language switching

Content is translated client-side via the `T` dictionary in `js/main.js` (English/Albanian). Elements are tagged with `data-key` (text), `data-placeholder-key` (input placeholders), or `data-key-aria` (aria-labels) to opt into translation. The active language is reflected in the URL as `?lang=sq`.

`T` holds the hardcoded defaults; text saved from `/admin` (see **Admin panel** above) is layered on top of it at boot, key by key, so an edit there doesn't require a code change or touching `T` directly.
