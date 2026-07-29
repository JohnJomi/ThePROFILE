# Design.md — John Jomi Portfolio Redesign

## 0. Intent

The current site reads as "default AI-generated dashboard": centered hero, rounded glass card, purple gradient, generic pill badges, soft shadows everywhere. Nothing about it is wrong technically — it's just anonymous.

The reference (Charlotte Evelyn / Rylic Studio photographer portfolio) works because it commits to an **editorial magazine** identity: full-bleed color blocks instead of cards, oversized confident type, asymmetric composition, warm restrained palette, and small hand-crafted details (kicker labels, rotating badges, marquee text) instead of generic UI chrome.

**This document changes UI/UX only.** Same information architecture (About, Projects, Skills, Experience, Contact), same content, same components conceptually — different visual language.

---

## 1. Core Principles (carried over from the reference)

1. **Full-bleed sections, not cards-on-a-background.** Each section (Hero, Skills, Projects, Experience, Contact) is its own full-width color block with a hard edge to the next section — no floating rounded container with padding around it.
2. **Type is the hero, not a photo card.** Name/headline is set very large (editorial serif), doing the visual work a photo would do on the reference site.
3. **Asymmetry over centering.** Nothing sits dead-center. Content is weighted left or right, with secondary elements (badges, tags, mini-cards) breaking the grid slightly.
4. **Warm, confident, restrained palette** — one deep background color per section family, one warm accent, one high-contrast neutral. No gradients, no glow/blur glassmorphism.
5. **Small handcrafted details carry personality**: tracked-out uppercase kicker labels, a rotating circular badge, a horizontal marquee strip, thin hairline rules — these replace generic rounded pill badges.

---

## 2. Color System

Move off purple/violet-on-black (generic "AI SaaS" signal) to a warmer, editorial, tech-appropriate palette:

| Token | Hex (approx) | Usage |
|---|---|---|
| `--bg-primary` | `#1B2620` (deep forest/charcoal-green) | Hero + primary sections |
| `--bg-secondary` | `#12140F` (near-black, warm not blue-black) | Alternating section / footer |
| `--bg-tertiary` | `#F3EEE3` (warm cream/off-white) | Contrast section (e.g. Projects or Experience) |
| `--text-primary` | `#F3EEE3` | Body/heading text on dark sections |
| `--text-primary-inverse` | `#161810` | Body/heading text on cream section |
| `--accent-rust` | `#D9663D` (burnt orange/rust) | Primary CTA, links, highlight word in headline |
| `--accent-gold` | `#E8B93E` (muted mustard) | Secondary accent — badges, underlines, tags |
| `--border-hairline` | `rgba(243,238,227,0.15)` | Dividers instead of shadows |

**Rule:** each full-bleed section uses exactly one background token. Never mix bg-primary and bg-tertiary in the same section. Accent colors (rust/gold) are used sparingly — one per section max as the "pop" — not as a whole button-and-badge family like the current purple.

Remove: purple/indigo gradients, glassmorphism (backdrop-blur cards), soft ambient glow effects.

---

## 3. Typography

| Role | Reference behavior | Applied here |
|---|---|---|
| Display / Name / Section headline | Large serif (e.g. Charlotte Evelyn) | Serif display font — **Fraunces**, **Playfair Display**, or **Instrument Serif** — set 72–120px on desktop, tight leading (0.95), for name in hero and section headlines ("Building AI systems that ship.") |
| Body copy | Clean sans, generous line-height | **Inter** or **General Sans**, 16–18px, 1.6 line-height |
| Kicker / eyebrow labels | Small tracked-out uppercase ("PRO PHOTOGRAPHER") | Same treatment: 11–12px, `letter-spacing: 0.15em`, uppercase, sans, used above every section headline (e.g. "— AI ENGINEER", "— SELECTED WORK") |
| Nav / UI labels | Simple sans, no pill backgrounds | Sans, 14px, no background chip — just spacing + a thin underline on active state |

**Key change:** your name "John Jomi" should be set in the display serif, large, left-aligned, NOT centered, NOT next to a photo card. Let it breathe across ~60–70% of viewport width.

---

## 4. Layout & Section Blueprint

Keep your existing nav items and page sections. Restructure each visually:

### 4.1 Nav
- Left: wordmark/name, small serif or sans-serif, no logo box.
- Center-right: nav links, plain text, small tracked uppercase, active item gets a thin underline (gold) — not a pill/rounded-background highlight.
- Far right: theme toggle only, no icon clutter.
- Full-width hairline border-bottom instead of floating in dark void.

### 4.2 Hero (About landing)
- Full-bleed `bg-primary` (forest) section, generous vertical padding (120–160px).
- Left-aligned column (~60% width):
  - Kicker: `— AI ENGINEER · OPEN TO WORK` (text only, small dash/dot prefix, no pill chips)
  - Name in huge serif, two lines if needed, one word in `--accent-rust` (mirrors "sketchbook" in reference)
  - Sub-line in sans, muted `text-primary` at 70% opacity
  - Two CTAs: one solid rust-fill button ("View Projects"), one outline/ghost button ("Contact Me") — square-ish corners (4–6px radius), not full pill
- Right side, ~35–40% width: replace the placeholder card with an **asymmetric photo treatment** — an arch-top or circle-crop portrait frame (like Charlotte's photo), NOT a bordered rectangle card. If no photo yet, keep the upload placeholder but inside this arch shape, on transparent bg, no glass panel.
- Small rotating circular badge (like "SHOOT FOR THE MOON") could hold something like "OPEN TO WORK ↻" or a tech icon — optional accent detail, positioned overlapping the photo edge.
- Bottom of hero: a thin horizontal strip (can be `bg-secondary`, near-black) containing a **marquee** of your core value props separated by a small diamond/star glyph — mirrors "Born To Break ✦ Non Conventional ✦" — e.g. "Practical AI Products ✦ Reliable Web Systems ✦ Cloud-Native ✦ Full-Stack ✦" scrolling horizontally.

### 4.3 Skills — current state → redesign

**What you have now:** kicker "TECHNICAL SKILLS" (already purple, already tracked-caps — good bones), serif-less bold headline "Technologies I Use", centered subtitle, then 6 category columns (Languages, Frameworks & Libraries, AI/ML, Cloud & Infrastructure, Databases, Tools & Platforms) each holding rounded dark pill badges with a small dot, some highlighted purple/filled to signal "primary" skill.

**Keep:** the category-column structure, the dot-prefix on each tag, the "primary skill" emphasis concept.

**Change:**
- Section keeps full-bleed `bg-secondary` (near-black), but headline moves to the display serif ("Technologies I Use" in Fraunces/Playfair, ~56–64px) and the kicker becomes `— TECHNICAL SKILLS` in `--accent-gold` instead of purple.
- Category headers ("Languages", "AI / ML", etc.) shift from plain bold sans to small tracked-caps labels with a thin gold underline beneath, echoing the kicker style — gives each column its own mini "section" feel like the reference's repeated eyebrow-label pattern.
- **Kill the rounded pill/chip look entirely.** Replace with a simple list: dot (existing) + label, left-aligned, stacked vertically per column, separated by a 1px hairline (`--border-hairline`) rather than each tag having its own dark rounded background. This directly mirrors the reference's habit of never boxing small text in chips.
- "Primary skill" emphasis (currently purple-filled pill) becomes: label rendered in `--accent-rust` text color + medium weight, no background — emphasis through color/weight, not a filled shape.
- Layout: nudge from perfectly symmetric 3-column grid to a slightly asymmetric one — e.g. Languages + Frameworks narrower (2 cols worth of width) on the left, AI/ML given more breathing room on the right as your headline skill group, similar to how the reference lets one column dominate.
- Optional stat strip above the columns (new, matches reference's Personal/Experimental/Commercial tab row): "6 CORE DOMAINS — 30+ TOOLS — AI-FIRST STACK" as three plain text blocks separated by hairlines, no card backgrounds.

### 4.4 Projects — current state → redesign

**What you have now:** kicker "SELECTED WORK" (purple), bold headline "Projects", centered subtitle, then a 2×2 grid of equal-weight dark rounded cards. Each card: title + "Featured"/"In Progress" pill badges (purple/amber fill), description, tech-tag pills, "Details →" link bottom-right.

**Keep:** the 2×2 grid concept, status badges, tech tags, "Details →" affordance — these are functionally fine, just need the visual language changed.

**Change:**
- Switch this section's background to `bg-tertiary` (cream, `#F3EEE3`) with `text-primary-inverse` — this is the one deliberate light section on the page, exactly like the reference's cream "I bring joy and creativity" block. It's the biggest single move that will make the page feel edited rather than templated.
- Kicker becomes `— SELECTED WORK` in `--accent-rust`, headline "Projects" moves to display serif, can add one italic accent word if you rename it e.g. "Selected *Work*".
- **Promote one project to a large featured layout** (matches reference's single hero-project treatment) instead of 4 equal cards: pick your most impressive project (e.g. "IEEE Student Branch ERP") and give it a full-width or 60/40 split treatment — large serif title, 2-line description, tech tags as plain text separated by "·" instead of pills, and a solid rust or dark rectangular "View Project →" button (not the current pill link). The remaining 3 projects drop into a smaller 3-up row below, in a simplified card style.
- For all project cards: replace rounded dark-card-on-dark-bg with a bordered flat panel — 1px hairline border, no fill color, no shadow, since the section background itself is already the cream contrast.
- Status badges ("Featured", "In Progress"): drop the pill/chip shape, render as small tracked-uppercase text label with a colored dot before it (dot color = amber for "In Progress", rust for "Featured") — consistent with the dot-prefix pattern already used elsewhere in your Skills section, now applied for visual cohesion.
- Tech tags under each project: plain text separated by a middle-dot (·) or thin vertical rule, not individual pill backgrounds — e.g. `Next.js · React · TypeScript · Node.js`.

### 4.5 Experience — current state → redesign

**What you have now:** kicker "PROFESSIONAL JOURNEY" (purple), bold headline "Experience & Education", centered subtitle, then a long vertical stack of equal-weight dark rounded cards — each with a colored dot + a filled pill-label ("Certification" = purple pill, "Achievement" = green pill, "Experience" = blue/purple filled pill, "Education" = plain pill), title, org · date range, a "Current" pill badge, description, and (for Experience-type entries) a row of tech-tag pills.

**Keep:** the reverse-chronological structure, the type-labeling system (Certification/Achievement/Experience/Education), the "Current" indicator — these are good IA decisions, just need the same de-carding + retyping treatment.

**Change:**
- Full-bleed `bg-primary` (forest) for this section — alternates with the cream Projects section above it, keeping the page's color-block rhythm going down.
- Kicker `— PROFESSIONAL JOURNEY` in `--accent-gold`, headline "Experience & Education" in display serif.
- **Replace the card-per-entry pattern with a true editorial timeline:** a single vertical hairline rule running down the left side, with each entry's colored dot sitting directly on that line (this is a very standard, elegant "journey" pattern and reads much more custom than repeated bordered boxes). No card background/border around each entry — just consistent vertical spacing (32–40px) between entries.
- Type label ("Certification", "Achievement", "Experience", "Education") drops the filled-pill shape entirely — becomes small tracked-uppercase text directly above the entry title, colored per type (e.g. gold for Certification, rust for Achievement, off-white for Experience/Education) instead of colored pill backgrounds. This keeps your color-coding system but in the kicker-label style used throughout the rest of the site.
- Entry title moves to serif, medium size (28–32px) — org/date/description stay in sans as they are now.
- "Current" indicator: instead of a green filled pill, use a small dot + the word "Current" in `--accent-gold`, positioned right after the date range, no background shape.
- Tech tags on Experience-type entries: same treatment as Projects — plain text separated by "·" rather than individual pill chips.
- Because this list is long (certifications + achievements + experience + education all interleaved), consider grouping with subtle section dividers (a slightly heavier hairline, or a small uppercase group label like "2026", "2025") so the timeline doesn't feel like one undifferentiated scroll — the reference handles long content by breaking it into clearly labeled chapters, which this timeline currently lacks.

### 4.6 Contact
- Full bleed, could reuse `bg-secondary` (near-black) like the reference's black strip.
- Large serif headline ("Let's build something.") left-aligned.
- Contact button styled like reference's "CONTACT WITH ME" block: large rust-fill rectangle (not pill), bold, right-aligned or as its own block — could literally be a big tappable rectangle rather than a small button.
- Social icons as plain line icons with a thin rule, not circular icon buttons.

---

## 5. Component Rules (replacing current generic patterns)

| Current pattern | Replace with |
|---|---|
| Rounded pill badges ("AI ENGINEER", "Open to work") | Plain uppercase kicker text with a dash/dot prefix, no background |
| Glass/blur rounded card for photo | Arch-top or circular organic crop, no border, no shadow |
| Purple gradient primary button | Solid rust or gold fill, 4–6px radius, no gradient |
| Soft drop shadows on cards | Hairline 1px borders (`--border-hairline`) as separators instead of elevation |
| Centered symmetric hero | Left-weighted asymmetric hero, ~60/40 split |
| Dark card containers floating on dark bg | Full-bleed section backgrounds; no nested cards unless truly needed (e.g. individual project entries in a grid) |

---

## 6. Motion (optional, matches editorial feel over "AI product" feel)

- Marquee strips scroll continuously, linear, no easing (mirrors reference ticker).
- Section headlines fade/slide up 20px on scroll into view, once, no looping glow.
- Avoid: pulsing glows, gradient shimmer, floating/bobbing card animations — these read as "generic AI template."

---

## 7. What NOT to change

- Site structure/IA: About, Projects, Skills, Experience, Contact stay as-is.
- Content/copy itself (beyond restyling headline treatment).
- Underlying framework/component architecture — this is a re-skin (colors, type, spacing, shapes), not a rebuild.

---

## 8. Open decisions for you to confirm

- Serif font choice: Fraunces (warmer, more characterful) vs Playfair Display (more classic/high-contrast) vs Instrument Serif (more modern/thin) — happy to mock up all three headline treatments.
- Whether Projects section becomes the cream/light section, or whether you'd rather keep the whole site dark and use the cream tone only as a rare accent block.
- Real photo vs. continuing with placeholder — the arch-crop shape works with either.
