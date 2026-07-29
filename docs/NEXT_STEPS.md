# Next Steps

This is the shortest path to a useful next development session.

## Prerequisites

1. Populate [frontend/src/config/site.ts](../frontend/src/config/site.ts) with real identity and SEO values.
2. Populate all files in [frontend/src/data](../frontend/src/data) with real portfolio content.
3. Add the missing static assets referenced by metadata and manifest if they are meant to ship.

## Recommended Build Order

### 1. Fill Identity Data

Start with `siteConfig` and `profile`. Every other section depends on these values, and metadata is currently incomplete without them.

### 2. Populate Social Links

Fill `socials.ts` and keep `navigation.ts` synchronized so the navbar, footer, and hero all point to real URLs.

### 3. Populate Content Collections

Add real records to `projects`, `skills`, `experience`, `education`, `certifications`, and `achievements`. These are the actual content sources for the future sections.

### 4. Compose the Missing Sections

Add the planned section components under [frontend/src/components/sections](../frontend/src/components/sections) and replace the placeholder anchors in `app/page.tsx` with actual content sections.

### 5. Add Route Pages

Create the future `/projects` and `/writing` routes only after the home page content is stable.

### 6. Introduce SEO Completeness

Add `robots.txt`, `sitemap.xml`, and structured data once the content is real.

### 7. Implement Infrastructure

Only after the frontend content is stable should the AWS CDK app and deployment pipeline be added.

## Task Characteristics

Every next task should be small, independent, and reviewable. The safest near-term work is data population, because it does not require architecture changes and it immediately unlocks the visible UI.

## Immediate Action Items

1. Populate `site.ts` and `profile.ts`.
2. Add at least three featured projects.
3. Add realistic skill categories and proficiency levels.
4. Add current and past experience entries.
5. Add social URLs so the navbar and footer stop rendering empty placeholders.
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