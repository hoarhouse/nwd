# DCF FOUNDATION SITE — CONTEXT & HANDOFF
*Paste this at the start of a new Claude chat to continue building seamlessly.*

## 0. HOW TO USE THIS DOC
I'm Chris. I'm building a new website for the Domus Communis Foundation (DCF). I am NOT a programmer — Claude gives me exact terminal commands, I paste them into Claude Code (CC) in the Terminal on my Mac, I commit in GitHub Desktop, and the site auto-deploys via Netlify. This document is the full state of the project so a new session can pick up where the last left off.

## 1. WHAT THIS IS
Domus Communis Foundation (DCF) is a Vatican-adjacent, Catholic-inspired non-profit (501(c)(3), EIN 99-1778616) working on ethical AI and technology — data sovereignty, sovereign AI, value-based AI programming — guided by Catholic Social Teaching while serving people of all faiths. It convenes technologists, academia, Nobel laureates, faith leaders, civil society, governments.
- New site (building): local ~/Desktop/nwd, repo github.com/hoarhouse/nwd, live preview nwd-dcf.netlify.app (pending DNS cutover to dcffoundation.org).
- Current live site (old): dcffoundation.org — still live, used as SOURCE OF TRUTH for content/wording. More salesy; our new site is more restrained/editorial.
- Launch target: July 4, 2026.
- KPIs: donor acquisition, member engagement, global awareness. Substance over hype.

## 2. STACK
Eleventy 3, Nunjucks/Liquid (.njk/.md). Netlify auto-deploy on push. Build: npx @11ty/eleventy → outputs to _site/. Design: Source Serif headings, teal accent #11696b, warm off-white bg. Clean Apple-inspired editorial (refs: aeon.co, wellcome.org, niemanlab.org). Data pattern: _data/*.json looped in templates. Round .avatar images with .avatar-initials fallback circles for people.

## 3. HOW WE WORK + NON-NEGOTIABLE RULES
Loop: Claude writes EXACT command → Chris pastes into CC → verify → commit one logical unit in GitHub Desktop → Netlify deploys. Never git add .; never commit _site/ or node_modules.

RULE 1 — CC FREELANCES AND NARRATES FAKE SUCCESS. VERIFY EVERYTHING. CC says "Done!" without running commands, runs only the first of several, or silently rewrites markup/CSS/content. Never trust CC's prose. Verify: for edits use a Python re-read that prints actual count/content; for "did it render" grep the BUILT file in _site/, not source. CC has invented fake events, rewritten Catholic Social Teaching, fabricated emails, renamed CSS classes, and created unrequested files (e.g. a PLACEHOLDER_REPLACEMENT_GUIDE.md). Watch for it. It frequently offers unrequested tasks — decline.

RULE 2 — EDIT METHODS. New file: one cat > path << 'ENDOFFILE' ... ENDOFFILE per message, then cat it back to verify. Surgical edit: python3 -c "..." using Path.read_text()/write_text() with assert anchor in t guard (abort if anchor missing), then re-read and print to verify. create_file-style writes truncate silently over ~50KB — large files MUST use cat/bash. Reading: use sed -n 'A,Bp' and grep -n; avoid cat on long files.

RULE 3 — CACHE GOTCHA. If built _site greps correct but browser shows old content, it's BROWSER CACHE. Hard-reload Cmd+Shift+R or incognito. Pattern: build → grep _site to confirm → hard-reload.

RULE 4 — VERIFY LIVE WITH CHROME MCP (navigate → javascript_exec/get_page_text), NOT web_fetch (returns stale cache).

STYLE: direct, concise, lead with takeaway. Targeted clarifying questions before complex builds (NOTE: Chris dislikes the popup-button question tool — ask in plain text). One verified step at a time. Flag real problems. Don't over-explain. For visual tweaks, show the result and let Chris react.

PHILOSOPHY: Build STRUCTURE + CONTENT correctly first ("good-enough-and-correct"). Do the FULL design/brand/style pass at the END across the whole site. Don't make pieces final-beautiful in isolation. When Chris says something's ugly, the fix is usually LESS decoration / match the editorial restraint, not more.

## 4. SITE STRUCTURE
Nav (src/_includes/base.njk): Home, Writing, Newsroom, About, Events, Initiatives, Library, Get Involved (greyed "Soon").
Key files: homepage src/index.njk; layout/nav/footer src/_includes/base.njk; essay layout src/_includes/essay.njk, listing src/writing.njk; event layout src/_includes/event.njk (avatar img + avatar-initials fallback); newsroom post layout src/_includes/newsroompost.njk, folder data src/newsroom/newsroom.json auto-tags posts as "posts"; about data src/_data/team.json, headshots src/assets/team/*.jpg; CSS src/assets/css/main.css (single stylesheet). Assets: src/assets/covers/ (16:9 1280x720), /library/, /events/may-7/ and /may-24/, /team/, /news/.
Homepage order: 1 Mission (home-intro) 2 Key Concepts (3 concepts, plain editorial text, de-boxed) 3 Initiatives (lead + 8 program names as inline text links → /initiatives/) 4 Who We Convene (framing + 6 categories inline) 5 Events (smart: upcoming if any else most-recent past as recap card w/ image) 6 Writing (3 recent essays as cards) 7 Newsroom (3 recent posts, TITLE+DATE only, text-only by design) 8 Footer (org + 501c3 + EIN + tax-deductible + CST tagline).

## 5. WHAT'S BUILT (DONE)
- Writing: 16 essays migrated from 3 old blogs into ONE Writing section, category-only kickers. 12 of 16 have covers. The 4 without = the Code-to-Conscience profiles.
- Library: /library/ page, 3 decks (PDF + thumbnail + PDF/PPTX download).
- Events: May 7 ("The Conversation Begins") and May 24 ("Guarding Data, Guiding Intelligence", 11 speakers, photos, 5 countries). Speakers show round headshots where available (Pecorario, Tomasi, Papp) + initials-circle fallback for other 8.
- Homepage messaging: Key Concepts + Initiatives + Who We Convene, de-boxed to clean editorial text.
- Homepage Events block: smart upcoming-vs-recent w/ image card.
- Newsroom: 3 real fact-based posts (May 24 recap, May 15 Library milestone, May 7 recap), all links verified 200. Replaced old "Testing..." placeholders on homepage.
- Trust footer: legal/EIN/tax-deductible + tagline.

## 6. WHAT'S LEFT (prioritized for July 4)
HIGH — conversion layer (site currently has NO conversion path): 1 Get Involved (un-grey nav, build /get-involved/ — partner/volunteer/subscribe). 2 Contact (/contact/, use events@dcffoundation.org). 3 Donate (placeholder button in nav → /support/ page; DECISION: placeholder only, no payment processor yet — team call with Alessio).
MEDIUM: 4 Rewrite 7 Code-to-Conscience profiles (weak/dated; rewriting gets them covers). 5 Vatican Resources rebuild (~60 real docs, needs PDF-sourcing decision; ~18 Wisdom Brief article links currently dead). 6 FAQs (~22 LLM-optimized pages exist in old repo; depend on Vatican Resources; likely post-launch).
LAUNCH: 7 SEO (sitemap.xml, RSS, llms.txt, schema.org JSON-LD, robots.txt allowing GPTBot/ClaudeBot/PerplexityBot/Google-Extended, OG/Twitter cards). 8 Analytics (Plausible or Fathom, NOT Google — sovereignty). 9 DNS cutover to dcffoundation.org.
FINISHER: 10 Full design/brand/style pass across whole site (typography, color, whitespace, imagery, polish) — absorbs parked items below.

## 7. KNOWN BUGS / PARKED
- Newsroom gallery bug: multi-image gallery forces all images to same box (680x850) instead of native proportions. Single-image + video formats work fine. Fix = let each image keep native aspect ratio (like tall-image post, renders 323x574). Not launch-critical.
- Homepage whitespace: too much up top; bands are text-only/no imagery so page only comes alive at photo feed. Deferred to design pass.
- May 24 photos: only 8 of ~22 pulled (rest 404'd on old live site). When old-site images fixed (by Csaba, old-site dev), re-pull more photos + real headshots for the 8 on initials + 2nd photos + 3 remote contributors.
- Newsroom test posts: 5 old "Testing..." posts still in src/newsroom/ (below homepage 3-newest slice so not on homepage, but DO show on /newsroom/ index). 3 (video/gallery/tall-image) are useful FORMAT REFERENCES; 2 are pure text, deletable. Cleanup parked.
- Minor CSS debt: duplicate :root blocks and conflicting .avatar size rules in stylesheet — verify before design pass.

## 8. CONVENTIONS
- Covers: 16:9, 1280x720, src/assets/covers/, named by slug. (Canva "YouTube thumbnail" export = exactly 1280x720.)
- NO FABRICATION EVER — Vatican-adjacent foundation. Content must be real/verifiable. Use old live site as source of truth for official wording (concept definitions, initiatives, convene categories). Chris checks with Alessio on names/claims.
- People (reference): Alessio Pecorario (DCF CEO, Vatican Dicastery), Cardinal Silvano Maria Tomasi (Patron), Zoltan Papp (tech), Antal Kuthy, Enzo Cursio, Caterina Ferrara, Dr. James Muller (physician, Nobel co-laureate via IPPNW). Csaba = old-site dev.
- Avatars: round .avatar for headshots; .avatar-initials circles fallback.

## 9. IMMEDIATE NEXT STEP
Build the conversion layer (Get Involved + Contact + Donate placeholder) — highest value for donor/member goals.

NOTE: Chris's git commits are all named "ss" to save time — commit history is NOT a useful record. THIS doc is the real record of project state. Update it at the end of a good session.
