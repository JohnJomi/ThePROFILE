# Project Plan

## Overview

Build and deploy a production-grade AI Engineer portfolio website demonstrating modern full-stack engineering, AWS infrastructure-as-code, and AI integrations.

---

## Phases

### Phase 1 — Project Initialization ✅
**Goal:** Establish the monorepo skeleton, CI/CD foundation, and documentation before writing any application code.

**Deliverables:**
- [x] Monorepo directory structure (`frontend/`, `infrastructure/`, `docs/`, `.github/`)
- [x] `.gitignore`, root `README.md`
- [x] GitHub Actions CI workflow (lint, type-check, build, CDK synth)
- [x] PR template and issue templates
- [x] `PROJECT_PLAN.md`, `ARCHITECTURE.md`, `REQUIREMENTS.md`, `CHANGELOG.md`

---

### Phase 2 — Frontend Scaffold ✅
**Goal:** Bootstrap the Next.js 15 application with all tooling configured, the design system established, the data layer defined, and a working dev server.

**Deliverables:**
- [x] Next.js 16.2.11 (App Router, TypeScript strict, Tailwind v4, Turbopack, ESLint)
- [x] shadcn/ui initialized (base-nova style, Tailwind v4 compatible)
- [x] Dependencies: Framer Motion, Lucide React, clsx, cva, tailwind-merge, next-themes
- [x] Folder structure: `config/`, `data/`, `providers/`, `services/`, `styles/`, `components/common/`, `components/layout/`
- [x] Prettier, EditorConfig, ESLint (import order, TypeScript strict, prettier compat)
- [x] Fonts: Inter (`--font-sans`) + JetBrains Mono (`--font-mono`) via `next/font`
- [x] Config layer: `site.ts`, `navigation.ts`, `theme.ts`
- [x] Types: one file per domain — profile, project, skill, experience, education, achievement, certification, social, timeline
- [x] Data layer: typed empty arrays for all domains, derived helpers (featuredProjects, skillGroups, timeline)
- [x] Providers: ThemeProvider, TooltipProvider, ReactQueryProvider (stubbed), root Providers composition
- [x] Global CSS: OKLCH design tokens, brand accent slots, base typography, utility classes, keyframes
- [x] Metadata: defaultMetadata + buildMetadata() factory, manifest.ts, all values from siteConfig
- [x] Root `layout.tsx`: fonts, providers, metadata, suppressHydrationWarning
- [x] CHANGELOG.md and PROJECT_PLAN.md updated

**Build status:** ✅ Compiles. TypeScript clean. ESLint clean (0 errors, 0 warnings). 3 static routes generated.

---

### Phase 3 — Core UI Implementation ✅
**Goal:** Build the complete design system, reusable component library, motion utilities, and layout components as the foundation for all portfolio sections.

**Deliverables:**

*Design System*
- [x] `Container`, `Section`, `SectionHeader` — layout primitives with scroll-reveal animation
- [x] `Heading`, `Subheading`, `Paragraph`, `Text`, `GradientText`, `InlineCode` — full typography system
- [x] `Button` (unified variant prop), `PrimaryButton`, `SecondaryButton` — polymorphic, accessible
- [x] `Badge`, `SkillBadge` — 7 variants, proficiency-aware, spring animation
- [x] `Card`, `GlassCard` — animated, hoverable, glass morphism
- [x] `SocialButton` — icon + pill variants, aria-label, external link safety
- [x] `ThemeToggle` — animated icon swap, hydration-safe
- [x] `AnimatedBackground` — dots/gradient/grid decorative backgrounds, aria-hidden
- [x] `ProjectCard`, `TimelineCard` — domain-specific cards
- [x] Barrel export — `src/components/common/index.ts`

*Layout*
- [x] `Navbar` — sticky, scroll-aware backdrop-blur, desktop + mobile responsive
- [x] `Footer` — 3-column responsive, nav + socials + copyright
- [x] Mobile navigation — hamburger, ESC close, body scroll lock, `role="dialog"`, focus management
- [x] Navigation config — `src/config/navigation.ts` typed `NavLink` + `SocialLink`

*Motion*
- [x] Fade variants — `fade`, `fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight`, `fadeUpLarge`
- [x] Scale variants — `scaleIn`, `scalePop`
- [x] Stagger containers — `staggerContainer`, `staggerContainerSlow`
- [x] Hover animations — `hoverLift`, `hoverScale`, `tapPress`
- [x] Page transitions — `pageTransition`, `pageEnter`, `pageExit`
- [x] Scroll-reveal defaults — `defaultViewport`
- [x] Utility helper — `withDelay()`

*Theme*
- [x] `theme.ts` — full token set: colors, spacing, fontSize, fontWeight, lineHeight, borderRadius, shadows, zIndex, duration, easing, transitions, breakpoints + exported TypeScript types
- [x] `globals.css` — OKLCH tokens, light/dark mode, `@theme inline`, base layer typography, utility classes, keyframes

*Hooks*
- [x] `useReducedMotion` — reactive `prefers-reduced-motion` reader
- [x] `useMediaQuery` — named breakpoint or raw query, reactive
- [x] `useScrollReveal` — Framer Motion `useInView` wrapper with design system defaults
- [x] Barrel export — `src/hooks/index.ts`

*Accessibility*
- [x] `MotionConfig reducedMotion="user"` applied globally in `Providers.tsx`
- [x] All interactive components use `focus-visible` rings
- [x] Icons are `aria-hidden`; icon-only buttons have `aria-label`
- [x] Mobile nav uses `role="dialog"`, `aria-modal`, `aria-expanded`, `aria-controls`
- [x] `ThemeToggle` uses `aria-pressed` and action-oriented `aria-label`
- [x] External links use `rel="noopener noreferrer"` throughout

*Documentation*
- [x] `docs/UI_GUIDELINES.md` — design token rules, component API, motion catalogue, a11y checklist
- [x] `docs/PROJECT_PLAN.md` updated
- [x] `docs/CHANGELOG.md` updated

**Build status:** ✅ TypeScript clean. ESLint clean. All components render correctly.

---

### Phase 4 — AI Feature Integration
**Goal:** Add differentiating AI features that demonstrate hands-on AI engineering.

**Deliverables:**
- [ ] AI-powered semantic project search (Amazon Bedrock Titan Embeddings + OpenSearch Serverless)
- [ ] Chat assistant trained on portfolio content (Claude via Bedrock)
- [ ] Activate ReactQueryProvider (install @tanstack/react-query)
- [ ] Optional: RAG demo, embedding visualization

---

### Phase 5 — AWS Infrastructure & Deployment
**Goal:** Deploy the site to AWS Amplify via CDK and wire up CI/CD for continuous deployment.

**Deliverables:**
- [ ] CDK stack: AWS Amplify Hosting
- [ ] CDK stack: API Gateway + Lambda + Bedrock IAM roles
- [ ] Environment variable strategy (SSM Parameter Store)
- [ ] Custom domain + HTTPS (Route 53 + ACM)
- [ ] GitHub Actions deploy workflow (on push to `main`)
- [ ] CloudWatch budget alarm ($20/month threshold)

---

### Phase 6 — Polish & Launch
**Goal:** Production-ready quality bar.

**Deliverables:**
- [ ] Performance audit (Lighthouse ≥ 95 desktop, ≥ 90 mobile)
- [ ] SEO: robots.txt, sitemap.xml, structured data (schema.org Person)
- [ ] Analytics (privacy-first)
- [ ] Fill all `siteConfig` and `data/` fields with real content
- [ ] Final content review
- [ ] `v1.0.0` tag and CHANGELOG entry

---

## Timeline (estimated)

| Phase | Duration | Status |
|---|---|---|
| Phase 1 — Initialization | 1 day | ✅ Done |
| Phase 2 — Frontend Scaffold | 1 day | ✅ Done |
| Phase 3 — Core UI | 1–2 weeks | ✅ Done |
| Phase 4 — AI Features | 1–2 weeks | 🔜 Next |
| Phase 5 — Infrastructure | 3–5 days | — |
| Phase 6 — Polish & Launch | 2–3 days | — |

---

## Current Status

**Active Phase:** Phase 4 — AI Feature Integration

**Before starting Phase 4:**
1. Fill in `src/config/site.ts` with your name, URL, email, and social handles.
2. Fill in `src/data/profile.ts` with your bio and `src/data/projects.ts` with real projects.
3. Activate `ReactQueryProvider` — install `@tanstack/react-query` and wire it up.
4. Review `docs/UI_GUIDELINES.md` before adding any new components.
