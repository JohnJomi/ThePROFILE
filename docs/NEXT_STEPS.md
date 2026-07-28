# Next Steps

This document explains exactly what should be implemented next after the documentation session. Another AI model should be able to continue immediately.

---

## Current State

**Phase**: Phase 2 — Portfolio Content Implementation (per PROJECT_PLAN.md, this is the "Phase 4" in the original plan but Phase 2 in our session numbering)

**Architecture**: Complete ✅
**Design System**: Complete ✅
**Data Layer**: Defined but empty ✅
**Documentation**: Complete ✅ (this session)
**Homepage**: Placeholder only — needs real sections

---

## Immediate Next Steps (Priority Order)

### 1. Populate Configuration & Data (Prerequisite)

Before building sections, fill the data sources. Components read from these files — no hardcoded content.

**Files to populate** (all currently empty):

| File | Fields Required |
|------|-----------------|
| `src/config/site.ts` | `name`, `title`, `tagline`, `description`, `url`, `avatarUrl`, `email`, `location`, `social.*` |
| `src/config/navigation.ts` | `socialLinks[].href` (sync with `siteConfig.social`) |
| `src/data/profile.ts` | All `Profile` fields |
| `src/data/projects.ts` | At least 3 `Project` objects with `featured: true` |
| `src/data/skills.ts` | 15+ `Skill` objects across all 6 categories |
| `src/data/experience.ts` | Reverse-chronological `Experience[]` |
| `src/data/education.ts` | Reverse-chronological `Education[]` |
| `src/data/certifications.ts` | `Certification[]` with `active: true` for current |
| `src/data/achievements.ts` | Notable `Achievement[]` |
| `src/data/socials.ts` | `Social[]` with `featured: true` for Navbar/Hero |

**Assets needed**:
- `public/og-image.png` — 1200×630 custom OpenGraph image
- `public/avatar.*` — Profile photo (referenced by `avatarUrl`)

---

### 2. Build Portfolio Sections (In Order)

Create each section as a component in `src/components/sections/` (new folder), then compose in `app/page.tsx`.

**Recommended folder structure**:
```
src/components/
├── common/           # Existing design system (done)
├── layout/           # Existing Navbar, Footer, ThemeToggle (done)
└── sections/         # NEW — page-level sections
    ├── Hero.tsx
    ├── About.tsx
    ├── Skills.tsx
    ├── Experience.tsx
    ├── Projects.tsx
    ├── Certifications.tsx
    ├── Writing.tsx
    └── Contact.tsx
```

#### Section 1: Hero (`Hero.tsx`)

**Location**: `src/components/sections/Hero.tsx`

**Requirements**:
- `animated={false}` on Section (handles own motion)
- `AnimatedBackground variant="gradient"` behind content
- `Heading size="h1"` with `GradientText` accent
- `Paragraph variant="lead"` for tagline
- CTA: `PrimaryButton href="/#projects"` → "View Projects"
- Secondary: `SecondaryButton href="/#contact"` → "Get In Touch"
- Social icons: `featuredSocials` mapped to `SocialButton variant="icon"`
- Responsive: stacked mobile, side-by-side desktop
- Accessibility: semantic `<header>` or `<section>`, proper heading hierarchy

**Data**: `profile` (name, title, tagline), `featuredSocials`

**Motion**: `fadeUpLarge` for title, `fadeUp` for subtitle/buttons, `staggerContainer` for social icons

---

#### Section 2: About (`About.tsx`)

**Location**: `src/components/sections/About.tsx`

**Requirements**:
- `Section id="about"` with `containerSize="narrow"`
- `SectionHeader` with overline "About Me", heading "Who I Am"
- `Paragraph` for `profile.bio`
- Key stats row (optional): years experience, projects completed, certifications
- Top skills: 5-6 `SkillBadge` (expert/proficient) in `staggerContainer`
- `profile.openToWork` → show "Open to opportunities" `Badge variant="success"`

**Data**: `profile`, `skills` (filter top proficiency)

**Motion**: Section stagger + `fadeUp` for paragraphs, `staggerContainer` for skill badges

---

#### Section 3: Skills (`Skills.tsx`)

**Location**: `src/components/sections/Skills.tsx`

**Requirements**:
- `Section id="skills"`
- `SectionHeader` with overline "Technical Skills", heading "Technologies I Use"
- Render `skillGroups` — each category as subsection
- Each group: `Heading as="h3" size="h4"` (category name) + `SkillBadge[]` in `staggerContainer`
- 6 categories: Languages, Frameworks & Libraries, AI/ML, Cloud & Infrastructure, Databases, Tools & Platforms
- Responsive: grid on desktop, stacked mobile

**Data**: `skillGroups`

**Motion**: `staggerContainerSlow` per category, `scalePop` on badges

---

#### Section 4: Experience (`Experience.tsx`)

**Location**: `src/components/sections/Experience.tsx`

**Requirements**:
- `Section id="experience"`
- `SectionHeader` with overline "Professional Journey", heading "Experience"
- Render `timeline` filtered to `type === "experience"` (or use full `timeline` for unified view)
- Each item: `TimelineCard` in `staggerContainer`
- Current role shows "Current" badge
- Company logos if `logoUrl` provided

**Data**: `timeline` (from `data/timeline.ts`)

**Motion**: `staggerContainer` on timeline list, `fadeUp` per card

---

#### Section 5: Projects (`Projects.tsx`)

**Location**: `src/components/sections/Projects.tsx`

**Requirements**:
- `Section id="projects"`
- `SectionHeader` with overline "What I've Built", heading "Featured Projects"
- Render `featuredProjects` → `ProjectCard[]` in `staggerContainer`
- CTA link: `SecondaryButton href="/projects"` → "View All Projects" (future route)
- Max 3-4 projects on home page

**Data**: `featuredProjects`

**Motion**: `staggerContainer` on grid, `fadeUp` per card, `hoverLift` on cards

---

#### Section 6: Certifications (`Certifications.tsx`)

**Location**: `src/components/sections/Certifications.tsx`

**Requirements**:
- `Section id="certifications"`
- `SectionHeader` with overline "Credentials", heading "Certifications"
- Render `activeCertifications` as cards (create `CertificationCard` component or reuse `Card`)
- Each card: issuer logo, name, issuer, issued date, expiry (if any), verify link
- Group by issuer or chronological

**Data**: `activeCertifications`

**Motion**: `staggerContainer`, `fadeUp` per card

---

#### Section 7: Writing (`Writing.tsx`)

**Location**: `src/components/sections/Writing.tsx`

**Requirements**:
- `Section id="writing"`
- `SectionHeader` with overline "Thoughts & Articles", heading "Writing"
- Placeholder for now — links to `/writing` route (future)
- Show 2-3 recent article previews if data exists, else CTA to writing page
- Article preview: title, date, excerpt, tags, read time

**Data**: None yet — create `data/writing.ts` + `types/writing.ts` in future

**Motion**: `fadeUp` for section

---

#### Section 8: Contact (`Contact.tsx`)

**Location**: `src/components/sections/Contact.tsx`

**Requirements**:
- `Section id="contact"` with `containerSize="narrow"`
- `SectionHeader` with overline "Get In Touch", heading "Let's Work Together"
- `Paragraph` — brief invitation
- Contact method: `PrimaryButton href="mailto:{{email}}"` with email icon
- Social links: `featuredSocials` as `SocialButton variant="pill"`
- Location: `profile.location`
- Optional: contact form (future — needs API route)

**Data**: `profile`, `featuredSocials`

**Motion**: `fadeUp` for content, `staggerContainer` for social buttons

---

### 3. Compose Homepage (`app/page.tsx`)

Replace the placeholder with composed sections:

```tsx
import { Section } from "@/components/common";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Writing } from "@/components/sections/Writing";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Writing />
      <Contact />
    </>
  );
}
```

**Note**: Each section handles its own `id` for anchor navigation. The `Navbar` active highlighting will work automatically.

---

### 4. Verify Implementation

After building all sections, run verification checklist:

#### Navigation
- [ ] All `primaryNavLinks` scroll to correct section on home page
- [ ] Active link highlighting works while scrolling
- [ ] Mobile menu opens/closes, ESC closes, focus returns to hamburger
- [ ] Links work from other routes (e.g., `/writing` → `/#about`)

#### Motion
- [ ] Hero enters with `fadeUpLarge` (no scroll trigger)
- [ ] Sections reveal on scroll with `fadeUp` stagger
- [ ] Skill badges animate with `scalePop` in sequence
- [ ] Project cards lift on hover (`hoverLift`)
- [ ] Timeline cards animate in sequence
- [ ] `prefers-reduced-motion` respected (all animations instant)

#### Responsiveness
- [ ] Mobile (<640px): single column, stacked nav, readable text
- [ ] Tablet (640-1024px): two-column grids where appropriate
- [ ] Desktop (>1024px): full layouts, proper spacing
- [ ] No horizontal overflow at any breakpoint
- [ ] No layout shift on load

#### Accessibility
- [ ] Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- [ ] Heading hierarchy: h1 (hero) → h2 (sections) → h3 (subsections)
- [ ] Focus visible on all interactive elements
- [ ] Color contrast ≥ 4.5:1 (test light/dark)
- [ ] `aria-label` on icon-only buttons
- [ ] `aria-hidden` on decorative icons/backgrounds
- [ ] `<time>` elements for dates
- [ ] `rel="noopener noreferrer"` on external links

#### Code Quality
- [ ] `npm run lint` — 0 errors, 0 warnings
- [ ] `npm run type-check` — 0 errors
- [ ] `npm run build` — successful production build
- [ ] No unused imports
- [ ] No `any` types (except Framer Motion props where necessary)

---

## Files to Create

### New Components
```
src/components/sections/
├── Hero.tsx
├── About.tsx
├── Skills.tsx
├── Experience.tsx
├── Projects.tsx
├── Certifications.tsx
├── Writing.tsx
├── Contact.tsx
└── index.ts (barrel export)
```

### New Types (if needed)
```
src/types/writing.ts (for future Writing section)
```

### New Data (if needed)
```
src/data/writing.ts (for future Writing section)
```

---

## Dependencies to Install (Future Phases)

| Phase | Package | Purpose |
|-------|---------|---------|
| 4 | `@tanstack/react-query` | Activate `ReactQueryProvider` |
| 4 | `@aws-sdk/client-bedrock-runtime` | Bedrock API calls |
| 4 | `@aws-sdk/client-opensearch` | Semantic search |
| 5 | `aws-cdk-lib`, `constructs` | Infrastructure (already in infrastructure/) |
| 6 | `@vercel/analytics` or similar | Privacy-first analytics |

---

## Technical Debt to Address (During Implementation)

1. **Unify social links**: `config/navigation.ts` `socialLinks` should derive from `data/socials.ts` + `siteConfig.social` — single source of truth.

2. **Add skip link**: `app/layout.tsx` needs `<a href="#main" className="sr-only focus:not-sr-only">Skip to main content</a>` for WCAG 2.4.1.

3. **Restrict image domains**: `next.config.ts` `images.remotePatterns` currently allows `**` — restrict to specific CDN before launch.

4. **Add structured data**: JSON-LD schema.org `Person`, `WebSite`, `Project` in `lib/metadata.ts` or components.

5. **Writing section data model**: Create `types/writing.ts` and `data/writing.ts` when ready.

---

## Commands Reference

```bash
cd frontend

# Development
npm run dev              # Start dev server (Turbopack)

# Quality checks
npm run lint             # ESLint
npm run type-check       # TypeScript strict
npm run build            # Production build
npm run format           # Prettier write
npm run format:check     # Prettier check

# Verify all
npm run lint && npm run type-check && npm run build
```

---

## Estimated Effort

| Task | Estimate |
|------|----------|
| Populate config/data | 30-60 min |
| Hero section | 30 min |
| About section | 20 min |
| Skills section | 30 min |
| Experience section | 30 min |
| Projects section | 30 min |
| Certifications section | 20 min |
| Writing section | 15 min |
| Contact section | 20 min |
| Compose homepage | 10 min |
| Verification & fixes | 30-60 min |
| **Total** | **~4-5 hours** |

---

## Success Criteria

Homepage at `/` renders all 8 sections with:
- Real content from data layer (no placeholders)
- Smooth scroll navigation with active highlighting
- Scroll-reveal animations on all sections
- Hover interactions on cards/buttons
- Responsive at all breakpoints
- Accessible (keyboard, screen reader, contrast)
- Clean build, lint, type-check
- No console errors