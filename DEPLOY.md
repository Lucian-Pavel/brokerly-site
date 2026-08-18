# brokerly.az website — deploy guide

Static site, no build step. Contents: `index.html`, `privacy.html`, `terms.html`, `styles.css`, `site.js`, `logo.jpg`, `favicon.png`, `apple-touch-icon.png`.

## Before going live — placeholders to review

1. **Panel URL**: all CTAs point to `https://app.brokerly.az`. Search-replace if the panel lives elsewhere.
2. **Email**: `info@brokerly.az` used in footer + legal pages.
3. **Beta metrics**: the trust strip's ×3 / 92% figures are placeholders footnoted as beta feedback — replace with real numbers before heavy ad traffic.
4. **og:image**: currently `https://brokerly.az/logo.jpg` (square). For richer social embeds, add a 1200×630 screenshot later.
5. **Accepted contrast exception**: white text on the brand CTA orange #E88625 measures 2.67:1 (below WCAG AA). This is a locked brand rule from the CRM; all other text passes ≥4.5:1. Revisit only if you're willing to darken the CTA.

## Deploy options (pick one)

**Netlify (fastest)** — go to https://app.netlify.com/drop, drag the `site` folder in. Then Site settings → Domain → add `brokerly.az` and set the DNS records Netlify shows you at your .az registrar.

**Cloudflare Pages** — Dashboard → Workers & Pages → Create → Upload assets → upload the folder. Add custom domain `brokerly.az` (easiest if DNS is already on Cloudflare).

**GitHub Pages** — new repo, push these files to root, Settings → Pages → deploy from `main`. Add `CNAME` file containing `brokerly.az`, point an A/ALIAS record at GitHub Pages IPs.

**Any shared hosting** — upload the folder contents to the web root via FTP/cPanel. Nothing else needed.

## DNS for brokerly.az

At your registrar (e.g. AzInTelecom/whois.az reseller): `A`/`ALIAS` record for `@` → host IP, `CNAME` for `www` → apex. TLS: all options above issue Let's Encrypt certificates automatically; for shared hosting enable it in cPanel.

## Notes

- Language toggle (AZ default / EN) persists via localStorage; per-page titles switch too.
- Design tokens are copied 1:1 from CRM v5.97 (`:root` block in `styles.css`). If the CRM palette changes, update that block only.
- Fonts: **Manrope** (display, from the IG kit) + **Inter** (body). Both fully support Azerbaijani Ə/ə — do not reintroduce Sora on the site, it lacks the ə glyph and causes mixed rendering.
- Wording: **rieltor** everywhere (never "makler"). A patched CRM copy `brokerly-crm-v5.97-rieltor.html` sits next to this folder — apply the same 8 replacements in your build.py source blocks so the next CRM version ships with it.
- Plans: Pulsuz 0 / Standart 24 / PRO 49 AZN/ay — feature split per plan is still marketing copy; align with real plan limits before launch. Terms page §3 lists the same prices; keep them in sync.
- Demo section data (KPIs, listings, map chips, kanban names) is illustrative and labeled as such on the page.
