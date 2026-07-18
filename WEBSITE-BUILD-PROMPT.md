# BUCKS Website — Full Build Prompt

Copy everything below this line into your LLM of choice (Claude, GPT, whatever) as a single message. It is written to be self-contained — the LLM does not need to see the rest of this repo to build the site, though pointers to the source files are included in case it does have file access.

---

## ROLE

You are a senior front-end developer and brand designer. Build a complete, production-ready marketing website for **BUCKS**, a KDP (Kindle Direct Publishing) ebook imprint in the personal finance / side-income niche. Output **vanilla HTML, CSS, and JavaScript only** — no frameworks (no React/Vue/Next), no build step, no npm install. The site must run by double-clicking `index.html` or dropping the folder on any static host (GitHub Pages, Netlify, Cloudflare Pages, a KDP author-site host, etc.).

Deliver:
- `index.html`
- `css/style.css`
- `js/main.js`
- `assets/` (folder — reference placeholder cover images/icons here; use inline SVG or CSS-drawn placeholders where a real asset doesn't exist yet, do not link to external image CDNs)

Single scrolling landing page with anchor-nav sections, plus a JS-driven modal/detail panel for individual book info (no separate HTML page per book — 20 titles is too many files to hand-maintain).

---

## BRAND BRIEF

**Name:** BUCKS — a KDP ebook imprint for personal finance / side-income guides.

**Positioning:** Money advice for readers whose situation doesn't fit generic budgeting content — irregular income, a specific life transition, a specific household structure, a specific circumstance or life stage. Every title solves one clearly named problem for one clearly named reader.

**Tagline (pick one or rotate in hero/marquee):**
- "Money advice with its spine straight."
- "No shame. No fluff. No apology."

**Voice — apply this to every piece of site copy, not just headlines:**
- Second person, imperative, no hedging. "Stop budgeting like you're sorry for existing," never "You may want to consider…"
- Confident, a little confrontational, but never mocking the reader — bold *on their behalf*, not *at their expense*.
- No jargon, no shame framing, practical over theoretical.
- Short sentences. Direct address. Verbs up front.

**Visual identity mandate (from the brand system):** high-contrast dark backgrounds (black/charcoal), one loud accent color per content pillar, bold condensed sans-serif type, no pastels, no soft illustrations, no stock-photo warmth. This is a spine-straight brand, not a cozy one.

---

## TYPOGRAPHY (hard requirement)

- **Logo / wordmark and every heading (`h1`–`h3`, nav logo, section titles, hero headline, stat numbers)** use **Finger Paint** (Google Font). Import it:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Finger+Paint&family=Archivo+Black&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  ```
  Finger Paint is a chunky hand-drawn display face — great for the logo and short punchy headlines, illegible at body-copy size and in long strings. Never use it for paragraph text, card body copy, form labels, or the book-catalog table data.
- **Body text, card copy, nav links, buttons, form fields** use **Inter** (clean, highly legible, pairs well against a hand-drawn display face).
- **Sub-headers / eyebrow labels / pillar tags / stat labels** (small all-caps kicker text) use **Archivo Black** — a bold condensed sans that reinforces the brand's "condensed sans-serif" mandate without falling back on Finger Paint for anything with more than ~4 words.
- Define these as CSS custom properties so the LLM building this can swap fonts in one place:
  ```css
  --font-display: 'Finger Paint', cursive;
  --font-heading: 'Archivo Black', 'Inter', sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  ```
- `h1`/logo → `var(--font-display)`. `h2`/`h3` → `var(--font-display)` for section titles that are short (2–5 words); if a heading needs to be longer/denser (e.g. a book title in a card), use `var(--font-heading)` instead so it stays legible — flag this exception in a code comment.

---

## COLOR SYSTEM (closed palette — do not introduce colors outside this list)

The site uses the catalog's **default** brand system (not any single book's custom palette — book palettes are locked per-title and never leak into brand-level chrome, per this repo's design rules).

### Base / neutrals

| Token | Hex | Role |
|---|---|---|
| `--black` | `#0a0a0a` | Page background, deepest surface |
| `--charcoal` | `#161616` | Card/section background, one step up from black |
| `--charcoal-light` | `#232323` | Hover/raised surface, input backgrounds |
| `--off-white` | `#f5f4ef` | Primary text on dark |
| `--muted` | `#9a988f` | Secondary/meta text, captions, disabled states |
| `--border` | `#2e2e2c` | Hairline borders/dividers on dark surfaces |

### Pillar accent colors (one loud accent per content pillar — closed set of 3 named colors, cycled across 5 pillars)

The brand spec names exactly three accent colors — amber, red, acid green — for pillar coding. There are five content pillars, so two colors are intentionally reused on a second pillar each (paired by thematic overlap: "earning across time" and "hard personal circumstances"). Adjust the pairing freely — it's a placeholder assignment, not dogma — but do not add a fourth or fifth color into the set.

| Pillar | Accent name | Hex | Used for |
|---|---|---|---|
| 1. Irregular / Non-Traditional Income | Amber | `#f5a623` | Pillar tag, card border/glow, CTA accents on that pillar's cards |
| 2. Life Transitions | Red | `#e63946` | Same |
| 3. Household Structure | Acid Green | `#b4ff3a` | Same |
| 4. Specific Circumstances | Red (reused) | `#e63946` | Same |
| 5. Life Stage | Amber (reused) | `#f5a623` | Same |

CSS variables:
```css
--accent-amber: #f5a623;
--accent-red: #e63946;
--accent-acid: #b4ff3a;
```

### Usage rules
- Never place two accent colors touching/adjacent in the same component — one accent per card/section at a time.
- Accent colors are for: pillar tags, card top-border or left-border, button backgrounds on primary CTAs (rotate which accent the *global* CTA uses — recommend amber as the single "brand CTA" color site-wide, e.g. the newsletter button and nav CTA, so the site has one consistent primary action color and the other accents stay scoped to pillar-coded content only).
- Body text on dark surfaces is always `--off-white` or `--muted`. Never render body paragraphs in an accent color — accents are for emphasis chips, borders, icons, underlines, and buttons only.
- `Book #1 — The Irregular Income Playbook` is the only title with a real, shipped manuscript and its own **locked** interior/cover palette (Olive Leaf `#606c38`, Black Forest `#283618`, Cornsilk `#fefae0`, Light Caramel `#dda15e`, Copper `#bc6c25` — white cover background). When you render Book #1's card/detail panel, you may use a small swatch/cover treatment nodding to that palette (e.g. a mini cover mockup using those five colors) since that's its real, shipped identity — but do not let those five colors bleed into the site's global chrome (nav, hero, footer, other book cards). All other 19 titles are unpublished/roadmap-only and use the pillar-accent system above, not a custom palette, since they don't have one yet.

---

## SITE STRUCTURE (single page, anchor nav)

1. **Announcement banner** (top of page, above nav, dismissible)
2. **Nav bar** (sticky, shrinks on scroll)
3. **Hero** (full viewport, ALL CAPS headline + bold sub-line + stat proof + CTA)
4. **Marquee ticker banner** (scrolling brand-voice one-liners)
5. **About / Brand story** (the BUCKS identity, in voice)
6. **Content pillars** (5 pillar cards, used later as catalog filter)
7. **Catalog — Available Now** (Book #1, full detail)
8. **Catalog — Coming Soon** (Books #2–20, grid, filterable by pillar, sorted by planned date)
9. **Social proof** (500+ customers, animated stat counters, testimonial slider)
10. **Newsletter / release-alert signup**
11. **Footer** (imprint info, pillar links, socials, back-to-top)
12. **Book detail modal** (JS-driven, opens from any catalog card, keyboard-accessible, closes on Esc/backdrop click)

---

## COPY REQUIREMENTS (explicit, do not soften)

- **Hero headline is written in ALL CAPS**, using the brand voice. Example (feel free to punch this up, keep it in voice, keep it caps):
  `STOP BUDGETING LIKE YOU'RE SORRY FOR EXISTING.`
- **The phrase "Learn how to manage and make money" appears prominently in bold** — use it as the hero sub-line or a section eyebrow. Render literally in bold weight, sentence case is fine here since it's the sub-line under an all-caps headline (contrast is the point): `**Learn how to manage and make money — no shame, no fluff, no apology.**`
- **Social proof stat: "500+ customers satisfied"** — render as an animated count-up stat (`0 → 500+`) triggered on scroll into view. Pair with 1–2 supporting stats pulled from real repo facts, not invented ones:
  - `500+` — Customers Satisfied
  - `20` — Titles in the BUCKS Catalog *(from the roadmap: 20-title plan, Jul 18–Aug 16 2026)*
  - `1` — Live Right Now *(Book #1 is the only title with a shipped manuscript/PDF as of this writing — keep this stat honest and update it as more books ship)*
- Keep every other line of copy in BUCKS voice: imperative, second person, no hedging, no apology, no "may want to consider."

---

## FULL CATALOG DATA (embed as a JS array — use exactly this data, sourced from the repo's roadmap file)

```js
const PILLARS = [
  { id: "irregular-income", label: "Irregular / Non-Traditional Income", accent: "var(--accent-amber)" },
  { id: "life-transitions", label: "Life Transitions", accent: "var(--accent-red)" },
  { id: "household-structure", label: "Household Structure", accent: "var(--accent-acid)" },
  { id: "specific-circumstances", label: "Specific Circumstances", accent: "var(--accent-red)" },
  { id: "life-stage", label: "Life Stage", accent: "var(--accent-amber)" },
];

const BOOKS = [
  {
    id: 1, slug: "irregular-income-playbook",
    title: "The Irregular Income Playbook",
    subtitle: "Budgeting When Your Paycheck Changes Every Month",
    reader: "Gig/freelance workers", pillar: "irregular-income",
    angle: "Variable-income budgeting, not fixed-salary advice",
    length: "~18,000 words (~78 pp)", date: "2026-07-18", status: "available",
    blurb: "Your income moves. Every piece of advice built for a salary treats that as a problem to fix. It isn't — it's a fact to plan around. Three moving parts: a floor you budget against, a buffer that catches the bad months, and habits that keep both running without you.",
  },
  {
    id: 2, slug: "debt-free-by-45",
    title: "Debt-Free by 45",
    subtitle: "A Catch-Up System for Late Starters",
    reader: "Adults 40+ with no savings", pillar: "life-stage",
    angle: "Urgency + shame-free tone for late starters",
    length: "~16,000 words (~70 pp)", date: "2026-07-18", status: "coming-soon",
  },
  {
    id: 3, slug: "money-that-works-with-your-brain",
    title: "Money That Works With Your Brain",
    subtitle: "A No-Willpower Budgeting System for ADHD Adults",
    reader: "Neurodivergent adults", pillar: "specific-circumstances",
    angle: "Executive-function-friendly system, not generic budgeting",
    length: "~15,000 words (~65 pp)", date: "2026-07-21", status: "coming-soon",
  },
  {
    id: 4, slug: "quarterly-taxes-made-simple",
    title: "Quarterly Taxes Made Simple",
    subtitle: "A Freelance Creative's Guide to Not Owing the IRS",
    reader: "Freelance creatives", pillar: "irregular-income",
    angle: "Tax-specific, not general freelance finance",
    length: "~14,000 words (~61 pp)", date: "2026-07-21", status: "coming-soon",
  },
  {
    id: 5, slug: "pcs-money-moves",
    title: "PCS Money Moves",
    subtitle: "A Financial Playbook for Military Spouses Who Relocate Every Few Years",
    reader: "Military spouses", pillar: "specific-circumstances",
    angle: "Relocation-specific income/credit continuity",
    length: "~16,000 words (~70 pp)", date: "2026-07-24", status: "coming-soon",
  },
  {
    id: 6, slug: "two-incomes-one-plan",
    title: "Two Incomes, One Plan",
    subtitle: "Merging Finances Without Merging Fights",
    reader: "Newly cohabiting/married couples", pillar: "household-structure",
    angle: "Relationship + money combined framing",
    length: "~17,000 words (~74 pp)", date: "2026-07-24", status: "coming-soon",
  },
  {
    id: 7, slug: "the-cash-first-method",
    title: "The Cash-First Method",
    subtitle: "A Simple Money System for Teens and First Jobs",
    reader: "Teens/young adults", pillar: "life-stage",
    angle: "Analog-first, app-optional approach",
    length: "~12,000 words (~52 pp)", date: "2026-07-27", status: "coming-soon",
  },
  {
    id: 8, slug: "solo-parent-solid-plan",
    title: "Solo Parent, Solid Plan",
    subtitle: "Building a One-Income Household Budget",
    reader: "Single parents", pillar: "household-structure",
    angle: "Single-income household structure specifically",
    length: "~16,000 words (~70 pp)", date: "2026-07-27", status: "coming-soon",
  },
  {
    id: 9, slug: "flexible-income-from-home",
    title: "Flexible Income From Home",
    subtitle: "Side Work That Fits Around Nap Schedules",
    reader: "Stay-at-home parents", pillar: "household-structure",
    angle: "Portability/flexibility as the core constraint",
    length: "~15,000 words (~65 pp)", date: "2026-07-30", status: "coming-soon",
  },
  {
    id: 10, slug: "managing-money-on-disability-income",
    title: "Managing Money on a Fixed or Fluctuating Disability Income",
    subtitle: "",
    reader: "Adults on disability income", pillar: "specific-circumstances",
    angle: "Income-type-specific, rarely covered niche",
    length: "~15,000 words (~65 pp)", date: "2026-07-30", status: "coming-soon",
  },
  {
    id: 11, slug: "credit-from-zero",
    title: "Credit From Zero",
    subtitle: "A Newcomer's Guide to Building a U.S. Financial History",
    reader: "Immigrants new to the U.S.", pillar: "specific-circumstances",
    angle: "Credit-building from no history, not credit repair",
    length: "~15,000 words (~65 pp)", date: "2026-08-02", status: "coming-soon",
  },
  {
    id: 12, slug: "the-debt-free-wedding-planner",
    title: "The Debt-Free Wedding Planner",
    subtitle: "Budgeting Your Big Day Without the Big Loan",
    reader: "Engaged couples", pillar: "life-transitions",
    angle: "Event-specific budgeting niche",
    length: "~14,000 words (~61 pp)", date: "2026-08-02", status: "coming-soon",
  },
  {
    id: 13, slug: "the-sandwich-generations-money-guide",
    title: "The Sandwich Generation's Money Guide",
    subtitle: "Budgeting While Caring for Aging Parents",
    reader: "Adult caregivers", pillar: "household-structure",
    angle: "Dual-dependent financial planning",
    length: "~18,000 words (~78 pp)", date: "2026-08-05", status: "coming-soon",
  },
  {
    id: 14, slug: "summer-income-for-teachers",
    title: "Summer Income for Teachers",
    subtitle: "Side Work That Doesn't Eat Your Break",
    reader: "Teachers", pillar: "irregular-income",
    angle: "Seasonal, profession-specific income gap",
    length: "~13,000 words (~57 pp)", date: "2026-08-05", status: "coming-soon",
  },
  {
    id: 15, slug: "starting-over",
    title: "Starting Over",
    subtitle: "Rebuilding Your Finances After Divorce",
    reader: "Recently divorced adults", pillar: "life-transitions",
    angle: "Emotional + practical rebuild framing",
    length: "~17,000 words (~74 pp)", date: "2026-08-08", status: "coming-soon",
  },
  {
    id: 16, slug: "low-stimulation-income",
    title: "Low-Stimulation Income",
    subtitle: "Side Hustles for Neurodivergent Adults Living Paycheck to Paycheck",
    reader: "Neurodivergent adults", pillar: "specific-circumstances",
    angle: "Income generation angle — distinct from Title #3's budgeting angle",
    length: "~14,000 words (~61 pp)", date: "2026-08-08", status: "coming-soon",
  },
  {
    id: 17, slug: "earning-without-losing-aid",
    title: "Earning Without Losing Aid",
    subtitle: "A Student's Guide to Side Income That Won't Hurt Financial Aid",
    reader: "College students", pillar: "life-stage",
    angle: "Financial-aid-safe income, a real pain point",
    length: "~13,000 words (~57 pp)", date: "2026-08-11", status: "coming-soon",
  },
  {
    id: 18, slug: "50-plus-retirement-catch-up-plan",
    title: "The 50+ Retirement Catch-Up Plan for the Self-Employed",
    subtitle: "",
    reader: "Self-employed adults 50+", pillar: "life-stage",
    angle: "No employer 401(k) — self-employed-specific retirement",
    length: "~17,000 words (~74 pp)", date: "2026-08-11", status: "coming-soon",
  },
  {
    id: 19, slug: "retirement-isnt-the-end-of-income",
    title: "Retirement Isn't the End of Income",
    subtitle: "Part-Time and Passive Options After You Stop Working",
    reader: "Retirees", pillar: "life-stage",
    angle: "Post-retirement supplemental income, not pre-retirement saving",
    length: "~15,000 words (~65 pp)", date: "2026-08-14", status: "coming-soon",
  },
  {
    id: 20, slug: "the-new-baby-budget-reset",
    title: "The New Baby Budget Reset",
    subtitle: "Adjusting Your Finances for One Income (Temporarily or Permanently)",
    reader: "New/postpartum parents", pillar: "life-transitions",
    angle: "Transition-specific, distinct from general parent budgeting",
    length: "~15,000 words (~65 pp)", date: "2026-08-14", status: "coming-soon",
  },
];
```

**Status rule:** `status` is a hand-set field, not auto-computed from date — several titles share a roadmap date with Book #1 but do not have a shipped manuscript yet. Only flip a book to `"available"` when it actually has a finished manuscript/PDF in the repo (`books/NN-slug/output/*.pdf`). Everything else stays `"coming-soon"` and shows its planned date, even if that date has technically passed — never claim a book is available before it is.

**"Coming soon" cards:** show title, subtitle, target reader, one-line angle, pillar tag (color-coded), planned date formatted as "Planned: Jul 21, 2026", and a "Notify Me" micro-CTA that scrolls to the newsletter section. Do not fabricate cover art descriptions or blurbs for unpublished titles beyond what's in the roadmap fields above — the `angle` field is the honest one-liner to show.

**"Available now" card (Book #1):** full detail — title, subtitle, reader, blurb, length, a "Read the Playbook" primary CTA (link placeholder to the actual KDP/Amazon listing — use `href="#"` with a `data-todo="amazon-link"` attribute so it's obvious where the real link goes later), and the modal detail view should surface the Reality Check / Do This Now / The Math box styles from that book's own design system as a small "inside the book" preview strip (three mini boxes, one per style, using that book's locked palette — Olive Leaf/Black Forest/Cornsilk/Light Caramel/Copper — scoped only inside that modal, not bleeding into site chrome).

---

## CSS FEATURES / INTERACTIONS (build all of these)

### Structural / layout
1. **CSS custom properties** for the entire design system (colors, fonts, spacing scale, radii, shadows) declared once in `:root`, no magic values scattered through the stylesheet.
2. **CSS Grid** for the catalog (auto-fill/minmax responsive card grid) and the pillar cards; **Flexbox** for nav, hero content, footer columns.
3. Fully **responsive**: mobile-first breakpoints at minimum `480px / 768px / 1024px / 1280px`. Hamburger nav below 768px.
4. Respect `prefers-reduced-motion: reduce` — wrap every animation/transition in a media query fallback that disables or drastically shortens motion for users who've asked for it. This is not optional.

### Banners
5. **Dismissible announcement banner** above the nav (e.g. "BOOK #1 IS LIVE — READ IT NOW →"), slides up and collapses on close (CSS `max-height` transition, not `display:none` snap), stores dismissal in `localStorage` so it stays closed on repeat visits.
6. **Marquee ticker banner** — infinite horizontal scroll of short brand one-liners ("NO SHAME.", "NO FLUFF.", "NO APOLOGY.", "20 TITLES. ONE VOICE.") using a CSS `@keyframes` translateX loop on a duplicated content track (so it loops seamlessly), `animation-play-state: paused` on hover.

### Scroll-triggered animations
7. **Scroll-reveal on section entry** — cards/sections fade+slide up into place using `IntersectionObserver` toggling a `.is-visible` class that a CSS transition keys off (`opacity`/`transform`), not a JS-driven animation loop.
8. **Animated stat counters** (the 500+ customers stat and friends) — count up from 0 when scrolled into view, triggered once via `IntersectionObserver`, implemented with `requestAnimationFrame`, easing (ease-out cubic), not `setInterval`.
9. **Sticky nav that shrinks/condenses** on scroll (reduce padding, drop shadow appears) via a scroll listener toggling a `.scrolled` class — debounce/throttle with `requestAnimationFrame`, not a raw unthrottled scroll handler.
10. **Progress bar** at the very top of the viewport showing scroll depth through the page (thin accent-colored bar, width tied to scroll position).
11. **Parallax hero background** — a subtle transform-based parallax (background layer moves slower than foreground text on scroll) using `transform: translateY()` tied to scroll position, capped/clamped so it never moves more than ~40px (keep it subtle, not seasick).

### Click / hover / tap animations
12. **Button ripple effect** on click (CSS + minimal JS: inject a `span` at click coordinates, animate `scale`+`opacity` via CSS, remove after animation ends) on all primary CTA buttons.
13. **Card hover lift + tilt** on catalog/pillar cards — `transform: translateY(-6px) rotate3d(...)` on hover with a soft accent-colored glow (`box-shadow` using the card's pillar accent), transition-based, GPU-friendly (`transform`/`opacity` only, no layout-triggering properties).
14. **Book detail modal** — opens on card click with a scale+fade-in animation, backdrop blur (`backdrop-filter: blur()`), closes on Esc key, backdrop click, or close button; focus-trapped while open for accessibility; body scroll locked while modal is open.
15. **Filter tabs** (pillar filter above the catalog grid) — active tab gets an animated underline/pill indicator that slides between tabs (CSS transition on a positioned pseudo-element or a real element repositioned via JS on tab change), filtered-out cards animate out (fade+scale down) rather than snapping away.
16. **Nav link underline animation** — accent-colored underline that grows from center (or left) on hover via `transform: scaleX()`.

### Motion / delight
17. **Testimonial slider/carousel** for the social-proof section — auto-advances every ~5s, pauses on hover/focus, dot navigation, swipeable on touch (basic pointer-event drag, no library).
18. **Page-load intro animation** — logo/wordmark does a quick scale+fade entrance on first paint (guard with `sessionStorage` so it only plays once per session, not on every scroll-triggered re-render).
19. **Newsletter form micro-interaction** — on successful (client-side-validated) submit, button morphs into a checkmark/success state briefly before resetting; invalid email shake-animates the input border in the "red" accent.
20. **Back-to-top button** — fades in after scrolling past the hero, smooth-scrolls to top on click (`scroll-behavior: smooth` or JS `scrollTo` with easing).
21. **Countdown/relative-date badges** on coming-soon cards ("Planned: Aug 2, 2026" — compute and show "in 15 days" style relative text client-side from the book's `date` field vs `new Date()`).

### Nice-to-have (only if time allows, do not sacrifice the above for these)
22. Custom accent-colored text-selection style (`::selection { background: var(--accent-amber); color: var(--black); }`).
23. Grain/noise texture overlay on the hero background (subtle, low-opacity, CSS-generated or a tiny inline SVG filter) to keep the flat black from looking sterile.
24. Cursor-follow glow on the hero section only (a soft radial-gradient blob that trails the pointer via `mousemove`, desktop only — skip on touch).

---

## ACCESSIBILITY / QUALITY BAR

- Semantic HTML throughout (`<nav>`, `<main>`, `<section>`, `<article>` for cards, `<button>` for actionable elements — never a `<div onclick>`).
- All interactive elements keyboard-reachable and operable (modal, filter tabs, carousel, dismissible banner).
- Color contrast: body text on dark backgrounds must meet WCAG AA (off-white `#f5f4ef` on `#0a0a0a`/`#161616` passes comfortably; double-check any accent-on-dark text combos, particularly acid green and amber against charcoal, and fall back to off-white text with accent used only for borders/icons if a combo fails contrast).
- `alt` text on every image; `aria-label`s on icon-only buttons (banner dismiss, modal close, hamburger, carousel dots).
- No horizontal scroll at any breakpoint.
- Lighthouse-sane: no render-blocking font loads without `display=swap`, no layout-shift-inducing image loads (reserve space via `aspect-ratio` on cover placeholders).

---

## FILE PLACEMENT IN THE REPO

This is a brand-wide asset, not tied to any single book, so it lives at the repo root alongside `books/`, in its own `website/` folder — not inside any `books/NN-slug/` directory (those stay strictly per-title per this repo's conventions) and not loose in the repo root.

```
website/
  index.html
  css/
    style.css
  js/
    main.js
  assets/
    (placeholder covers, icons, favicon)
```

---

## SOURCE OF TRUTH / HOW TO KEEP THIS UPDATED

- The full 20-title roadmap (dates, angles, target readers, content coverage) lives in `kdp-personal-finance-roadmap (1).md` at the repo root — re-sync the `BOOKS` array from that file if the roadmap changes.
- When a new title ships (i.e. `books/NN-slug/output/*.pdf` exists), flip that book's `status` to `"available"`, pull its real palette from its `design.md` for the modal preview strip, and update the "Live Right Now" stat count.
- Book #1's design system (palette, box styles, emphasis conventions) lives in `books/01-irregular-income-playbook/design.md` — that's the only title with a real, locked interior palette right now; every other title is roadmap-only and uses the site's generic pillar-accent treatment until it has its own `design.md`.

---

*End of build prompt.*
