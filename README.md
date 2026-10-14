# gotte.eco

Marketing site for GOTTË — custom-printed eco-friendly paper cups and bags, made in Prishtinë, Kosovë.

Plain HTML/CSS/JS. No framework, no build step, no bundler — just static files.

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
robots.txt, sitemap.xml   SEO
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

## Contact form

The form on the Contact section posts to Formspree (`https://formspree.io/f/xojbkbzn`). To change where submissions go, update the form's `action` in `index.html` and reconfigure the corresponding Formspree form.

## Language switching

Content is translated client-side via the `T` dictionary in `js/main.js` (English/Albanian). Elements are tagged with `data-key` (text), `data-placeholder-key` (input placeholders), or `data-key-aria` (aria-labels) to opt into translation. The active language is reflected in the URL as `?lang=sq`.
