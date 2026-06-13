# DCF Website — Project Context & Handoff

**This document is the single source of truth for this project. Treat it as authoritative. Disregard any older context, memory, or project files about the legacy `dcffoundation.org` static site, the Communio parish platform, Vatican Resources pages, multilingual/Supabase work, or any multi-phase roadmaps. None of that is part of this build.**

This build = **one thing**: a new, statically-generated marketing/content website for the Domus Communis Foundation (DCF), built with Eleventy, living at `~/Desktop/nwd`, deployed to Netlify, launching **July 4, 2026**.

---

## 1. What this project is

A complete rebuild of the DCF public website as a fast, clean, self-assembling static site. It is content-driven (essays, events, newsroom posts, initiatives, a resource library) with a conversion layer (Get Involved, Contact, Donate). The aesthetic is **cinematic and editorial**: dark "chrome" (nav + footer) and a dark full-bleed homepage, with light, comfortable reading pages.

- **Local repo:** `~/Desktop/nwd`
- **GitHub:** `github.com/hoarhouse/nwd` (public, branch `main`)
- **Live preview:** `https://nwd-dcf.netlify.app` (Netlify auto-deploys on every push to `main`, ~1–2 min)
- **Launch:** July 4, 2026 — then DNS cutover to `dcffoundation.org`
- **Org:** Domus Communis Foundation, US 501(c)(3), EIN 99-1778616. Contact email used on the site: `alessio.pecorario@dcffoundation.org`

---

## 2. How we work together (workflow)

Chris is a **non-programmer**. The loop is:

1. Claude provides **exact terminal commands** (no "figure it out" — copy/paste ready).
2. Chris pastes them into **Claude Code (CC)** running in **Terminal on Mac**.
3. Chris commits **one file at a time** in **GitHub Desktop** (NEVER `git add .`).
4. Push → **Netlify auto-deploys**.

Communication: bottom-line first, direct, concise. No padding. Chris values his time — verify before shipping, don't make him chase false "done"s.

**Claude Code routinely fakes success and freelances** (claims "done" without running commands, substitutes simplified markup, renames classes, invents content). **Always verify the built output** — grep/read the actual `_site/` HTML and CSS, don't trust CC's prose.

---

## 3. Tech stack

- **Eleventy 3** (`@11ty/eleventy`), templates in **Nunjucks (`.njk`)** + content in **Markdown (`.md`)**
- Build: `npx @11ty/eleventy` → outputs to `_site/`
- **All CSS lives in one file: `src/assets/css/main.css`** — we **APPEND** to it (never replace), so prior work is preserved.
- Data files: `src/_data/*.json` (looped in templates for repeating structured content)
- Forms: **Netlify Forms** (detected at deploy, not in local build)
- Deploy: Netlify (auto on push)

---

## 4. Design system (LOCKED)

**Fonts**
- `--font-display`: **Bricolage Grotesque** (headings, big display)
- `--font-sans`: **Manrope** (UI, body)
- `--font-serif`: **Source Serif 4** (pull-quotes, drop caps)

**Color tokens** (defined in `:root` in `main.css`)
- `--color-accent`: **bronze `#8A6A2F`** (accent on light reading pages)
- `--accent-chrome`: **champagne gold `#C8AD7E`** (accent on dark chrome nav/footer/hero)
- `--color-text` — **NOTE: it is `--color-text`, NOT `--color-ink`.** (Easy mistake; will silently fail.)
- `--color-bg`, `--color-muted`, `--color-rule`
- `--content-width: 720px`
- Chrome (dark): `--chrome-bg`, `--chrome-bg-2`, `--chrome-text`, `--chrome-muted`, `--chrome-line`

**Layout model via `bodyClass`** (set in page front matter):
- `home` → cinematic full-bleed homepage (fixed transparent nav that solidifies on scroll)
- `article` → fixed transparent nav + **full-width `main`** + scroll-to-solid nav. Used by reading pages AND banner pages (essays, events, About, Initiatives, Library, Get Involved, Contact, Donate).
- `writing` / `newsroom` → listing pages
- *(no class)* → default 720px-wide reading page

**Reusable banner classes** (dark gradient/photo hero with title overlaid at bottom):
`.essay-banner`, `.essay-banner-bg` (holds `<img>`), `.essay-banner-inner`, `.essay-banner-plain` (gradient fallback, no photo), `.essay-kicker`, `.essay-publication`, `.essay-title`, `.essay-dek`.

**Aesthetic rules**
- Clean, editorial, restrained. **No boxy tiles / card fills / border boxes** on content bands — use thin top-rules and spacing instead.
- Native-shape photos for scenes; round avatars for identity headshots.
- Footer always has breathing room above it (see global rule in §6).

---

## 5. Site structure — every page (all built & live)

| Page | Source file | Notes |
|---|---|---|
| Homepage | `src/index.njk` | Cinematic dark hero, self-assembling sections (latest event / essays / newsroom), "recent event" band |
| Essay (template) | `src/_includes/essay.njk` | Banner reading layout, Source-Serif drop cap, bronze tags, "← All writing" backlink |
| Event (template) | `src/_includes/event.njk` | Banner driven by `cardImage` front-matter field; speakers (headshots/initials/talks/bios/photos) |
| Event content | `src/events/*.md` | e.g. `may-24-guarding-data-guiding-intelligence.md` |
| Newsroom post (template) | `src/_includes/newsroompost.njk` | Light header, preserves gallery/video/image media |
| Writing index | `src/writing.njk` | Feature card + image grid; image-less items render as dark type-cards |
| Newsroom index | `src/newsroom.njk` | Structured card feed with excerpts + media thumbnails |
| About | `src/about.njk` | Photo banner (`quartey-1.jpg`); mission, CST principles, geo strip, leadership from `team.json`; Cardinal Tomasi featured as Patron (filtered OUT of board grid) |
| Initiatives | `src/initiatives.njk` | Gradient banner; 8 numbered sections + jump-nav from `initiatives.json` |
| Library | `src/library.njk` | Gradient banner; 3 presentation cards (sized thumbnails) + inline PDF viewer JS |
| Get Involved | `src/get-involved.njk` | Gradient banner; Donate band → `/donate/`; partner grid; **working Netlify newsletter form** (`name="newsletter"`); expertise + Contact CTA |
| Contact | `src/contact.njk` | **Working Netlify contact form** (`name="contact"`: Name/Email/Subject dropdown/Message) + email aside. No FAQs. |
| Donate | `src/donate.njk` | Gradient banner; 4 selectable tier cards ($50/$250/$1,000/$5,000+) + custom amount + one-time/monthly; **Donate button is a Stripe placeholder** (interim note routes to Contact) + tax line |
| Base layout | `src/_includes/base.njk` | Nav + footer (shared chrome) |
| Data | `src/_data/team.json`, `src/_data/initiatives.json` | |

**Nav** (in `base.njk`): Home *(hidden on desktop, shown in mobile menu)*, Writing, Newsroom, About, Events, Initiatives, Library, Get Involved, **Donate** (gold button). **Contact lives in the footer**, not the main nav.

**Netlify Forms:** newsletter (`name="newsletter"`) and contact (`name="contact"`). Each has a hidden `form-name` input + a `bot-field` honeypot. They only function once deployed to Netlify; submissions appear in the **Netlify dashboard → Forms**.

---

## 6. What's DONE (recent, verified)

- Full cinematic design system applied across **every** page.
- **Conversion layer** built: Get Involved, Contact (Netlify form), Donate (tiers + Stripe placeholder).
- **Nav flip:** "Get Involved *Soon*" → real link; gold **Donate** button added; Contact moved to footer.
- **Footer breathing room** (global, future-proof): `body:not(.home) main { padding-bottom: 5rem; }` — every non-home page gets a guaranteed gap above the footer.
- **Mobile nav fixed:** the old slide-in drawer was broken (transform/transition cascade conflict). Replaced with a **full-screen vertical menu** (display-toggle + `!important`, hamburger fixed top-right at `z-index:1002` to close). Lives in a `@media (max-width: 700px)` block at the end of `main.css`. Verified live.
- **Muller "recent event" band crop fix:** `.cine-scene-bg img[src*="muller-1"] { object-position: 50% 3%; }` (his head was being center-cropped off).
- **Event banner de-duplicated:** swapped the May-24 event's `cardImage` from `pecorario-1.jpg` (= the homepage hero) to `tomasi-1.jpg`.

---

## 7. What's OPEN (the live to-do list, prioritized)

1. **Homepage hero photo — DECISION NEEDED.** The current hero (`pecorario-1.jpg`, Alessio center-frame) fundamentally fights the big overlaid headline: his face sits at ~25–40% of a landscape photo, and on normal laptop heights the headline block fills the hero and lands on his face. **Verified that object-position and a compact 2-line headline can't fix it** — on short viewports there's nowhere for the text to go. The fix must be the photo or the layout:
   - **Option A (recommended):** source a hero photo with headroom / negative space (wide establishing shot, or subject framed lower or off to one side). Best result, keeps the cinematic look. Drop-in once a file is provided.
   - **Option B:** change the hero layout so text and photo don't overlap (text in a solid band below, or a split). Robust, no new asset, different look.
   - Available May-24 photos are all single-subject mid-frame shots (same problem) except `muller-1` (face high), who is a guest, not ideal as the foundation's hero.

2. **Finish the mobile sweep.** Nav is fixed. Still to verify across every page at phone width: horizontal overflow, the Contact/Donate/newsletter **forms**, the **donate tier cards**, the **partner/expertise grids**, and the **footer**. *(Note: the Chrome MCP browser window won't shrink below ~606px viewport, and screenshots can freeze — verify with JS geometry, see §10.)*

3. **SEO / discoverability layer** (serves the "global awareness" goal; do before DNS cutover): `sitemap.xml`, RSS feed, `robots.txt` that **welcomes AI crawlers** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended), `llms.txt`, schema.org JSON-LD (Organization + Article), Open Graph / Twitter cards.

4. **Privacy-first analytics:** Plausible or Fathom (explicitly **NOT** Google). Needs a provider choice + account. One script tag.

5. **DNS cutover** to `dcffoundation.org` for July 4.

6. **CMS:** git-based, self-owned (**Decap** or **Sveltia**) for sovereignty alignment. After the design is fully done. Make the homepage hero **data-driven** first (so a future "breaking news" hero takeover is possible).

7. **Stripe wiring** on the Donate page (Chris's account exists; Chris handles the integration). Remove the interim "contact us" note once wired.

8. **Real board-member bios:** Chris supplies the facts, Claude formats. Currently only Cardinal Tomasi has a bio.

**Parked:** custom thank-you page for form submissions (Netlify default for now); a real FAQ; weaving event photos inline into recap narrative.

---

## 8. Verification discipline (MANDATORY)

- After any write, **re-read the actual file** (Python `Path.read_text()`), don't trust that it wrote.
- **Grep/read the built `_site/` HTML and CSS**, not CC's description, to confirm a change landed.
- A purple/blue underlined default link in a screenshot = proof the CSS didn't apply.
- Commit **one file at a time** in GitHub Desktop. Never `git add .`.
- After committing + pushing, give Netlify ~1–2 min, then **hard-refresh** (Cmd+Shift+R).

---

## 9. Hard-won technical learnings / gotchas

- **Large files truncate.** `create_file` (and CC's file tools) silently truncate files over ~50–63KB. For anything large, write via **Python `Path.write_text()`** in a bash heredoc.
- **`--color-text`, NOT `--color-ink`.** Using the wrong token fails silently.
- **APPEND to `main.css`** (`cat styles.css >> …` or Python `+=`). Never overwrite it — it holds all prior work.
- **CSS overrides:** when an existing rule misbehaves, append a more-specific rule (or `!important`) at the **end** of `main.css` — later source order + higher specificity wins, without editing fragile mid-file rules. (This is how the mobile nav was fixed.)
- **Apostrophes in YAML front matter** must be real `'` characters, not `&#39;` HTML entities.
- **Netlify Forms** must have the form HTML present at build with a hidden `form-name` input + honeypot; Netlify detects forms at **deploy**, so they won't "work" in a local build.
- **macOS Downloads permission can drop for CC mid-session** (TCC privacy). Workaround: drag files via **Finder** into `~/Desktop/nwd/`, install from the project root (`cp file.njk src/…`), then `rm` the loose root copies. Permanent fix: System Settings → Privacy & Security → Files and Folders → grant Downloads access to the terminal app, relaunch. **Best practice: just put new files directly in `~/Desktop/nwd/`, not Downloads.**
- **`object-position` for photo banners:** to keep a subject's head/face in frame, compute it from the image. A subject whose head is at the very top of the image needs a low Y% (e.g. `50% 3%`); the value `Y = headFraction` yields a consistent small headroom across all viewport sizes.

---

## 10. Tooling notes

- **Chrome MCP** (live-site auditing): reliable pattern is `tabs_context_mcp(createIfEmpty:true)` → `navigate` → `javascript_tool (javascript_exec)` with targeted `getBoundingClientRect`/`getComputedStyle` queries. 
  - **Screenshots frequently freeze** ("renderer unresponsive") — rely on JS geometry measurements instead.
  - **`resize_window` won't shrink the viewport below ~606px** — you cannot get a true 390px phone viewport this way. Verify mobile via JS at the narrowest available width + by reading the `@media` rules directly.
  - To fetch repo files for inspection: `curl https://raw.githubusercontent.com/hoarhouse/nwd/main/src/...` (raw.githubusercontent works from the bash tool).
- **Canva MCP**: used to generate essay cover images (in `src/assets/covers/`).

---

## 11. Photo / asset inventory

- **Event photos:** `src/assets/events/may-24/` — `pecorario-1` (homepage hero + Alessio's speaker photo), `muller-1` (homepage "recent event" band, `object-position: 50% 3%`), `tomasi-1` (event banner + Tomasi's speaker photo), `quartey-1` (About banner + speaker), plus `papp-1`, `garcia-1`, `quaicoe-1`, `priest-1` (event speaker photos). All are 1600×1066-ish single-subject shots.
- **Team headshots:** `src/assets/team/*.jpg` (e.g. `pecorario.jpg`, `tomasi.jpg`).
- **Essay covers:** `src/assets/covers/*.png`.
- **Library files:** `src/assets/library/` — three sets of `.pdf` + `.pptx` + `-thumb.png`.

---

## 12. Content integrity rules

- **No fabrication, ever.** Every claim must be grounded in the live site, source files, or facts Chris provides. If something's missing, **flag the gap** — don't invent events, names, emails, or bios.
- **"Holy See," not "Vatican,"** for institutional references (editorial standard).
- Avoid "ethics/ethical" in taglines unless specifically in a "value-based AI" context.
- The old blog brands — **Dignitas, Wisdom Brief, Code to Conscience — are retired.** Essays use only a topical `category` (e.g. DIGITAL SOVEREIGNTY, FAITH & TECHNOLOGY). Do not reintroduce them.
- Cardinal Tomasi is featured as **Patron** on About and is **filtered out of the board grid** (he was appearing twice).

---

*End of context. This file supersedes all prior project memory and notes for the DCF website build.*
