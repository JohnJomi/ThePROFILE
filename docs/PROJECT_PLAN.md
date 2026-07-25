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

### Phase 3 — Core UI Implementation
**Goal:** Build all portfolio sections as polished, accessible, animated components.

**Deliverables:**
- [ ] Global layout (Navbar with dark mode toggle, Footer)
- [ ] Hero section with animated headline
- [ ] About / Skills section
- [ ] Projects section (project cards with links)
- [ ] Experience / Timeline section
- [ ] Writing / Blog index (static posts via MDX)
- [ ] Contact section
- [ ] Responsive design (mobile-first, tested on 375px → 1440px)
- [ ] Accessibility audit (WCAG 2.1 AA, VoiceOver tested)

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
| Phase 3 — Core UI | 1–2 weeks | 🔜 Next |
| Phase 4 — AI Features | 1–2 weeks | — |
| Phase 5 — Infrastructure | 3–5 days | — |
| Phase 6 — Polish & Launch | 2–3 days | — |

---

## Current Status

**Active Phase:** Phase 3 — Core UI Implementation

**Before starting Phase 3:**
1. Fill in `src/config/site.ts` with your name, URL, email, and social handles.
2. Fill in `src/data/profile.ts` with your bio.
3. Add at least one entry to `src/data/projects.ts` for early testing.
