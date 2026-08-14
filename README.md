# Eating plan

A single-page reference built around an August 2026 health screening — coronary calcium score, lipids, HbA1c, uric acid and blood pressure — translated into practical Malaysian food choices.

Every numeric claim is sourced. Where Malaysian measurement data doesn't exist (nasi kandar, nasi campur, wantan mee, prawn mee, roti telur), the page says so rather than estimating.

## Publishing this to GitHub Pages

**No git required — use the web UI.**

1. Go to [github.com/new](https://github.com/new). Name it `eating-plan`. Set it to **Public** (GitHub Pages needs a public repo on the free tier). Don't add a README. Click **Create repository**.
2. On the new empty repo page, click **uploading an existing file**.
3. Drag in *all* the files from this folder: `index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`, `icon-180.png`, `apple-touch-icon.png`, `.nojekyll`, `README.md`. Click **Commit changes**.
4. Go to **Settings → Pages**. Under *Source* choose **Deploy from a branch**, branch `main`, folder `/ (root)`. Click **Save**.
5. Wait about a minute. Your URL will be:
   `https://<your-username>.github.io/eating-plan/`

### With git instead

```bash
cd this-folder
git init && git branch -M main
git add -A && git commit -m "Eating plan"
git remote add origin https://github.com/<your-username>/eating-plan.git
git push -u origin main
# then enable Pages in Settings → Pages
```

## Add it to your phone's home screen

Once the URL is live, it installs as an app and works **offline** — useful at a hawker stall with no signal.

- **iPhone (Safari):** open the URL → Share button → *Add to Home Screen*
- **Android (Chrome):** open the URL → ⋮ menu → *Add to Home screen* / *Install app*

## A note on privacy

GitHub Pages requires a **public** repository on the free tier, so anyone with the URL can read this page — and it contains a first name, body measurements and full lab results.

Two mitigations are already in place:

- `index.html` carries `<meta name="robots" content="noindex, nofollow, noarchive">`, which keeps it out of Google and other well-behaved crawlers. The URL is reachable but not discoverable by search.
- No IC number, MRN, date of birth or address appears anywhere in the page.

If that isn't private enough, the options are: a GitHub Pro account (£4/mo) which allows Pages on private repos; or removing the name from the header line in `index.html`, which makes the page effectively anonymous.

## Files

| File | Purpose |
|---|---|
| `index.html` | The entire plan — all CSS and JS inline, no external requests |
| `manifest.webmanifest` | Makes it installable as a home-screen app |
| `sw.js` | Service worker; caches the page for offline use |
| `icon-*.png`, `apple-touch-icon.png` | App icons |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

## Updating it

Edit `index.html` and commit. Pages redeploys in about a minute. The service worker is network-first, so changes appear on the next load rather than being stuck behind the cache. If you change `sw.js` itself, bump the `CACHE` version string at the top.

---

Not medical advice. A summary of published evidence organised around one person's test results, to be read alongside their cardiologist's guidance.
