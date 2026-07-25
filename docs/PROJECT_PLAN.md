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

### Phase 2 — Frontend Scaffold
**Goal:** Bootstrap the Next.js 15 application with all tooling configured and a working dev server.

**Deliverables:**
- [ ] `create-next-app` with App Router, TypeScript, Tailwind CSS
- [ ] shadcn/ui initialization and base component installation
- [ ] Framer Motion installed
- [ ] ESLint + Prettier configured
- [ ] `type-check` and `lint` scripts wired up
- [ ] Placeholder `app/page.tsx` confirming the stack works

---

### Phase 3 — Core UI Implementation
**Goal:** Build all portfolio sections as polished, accessible, animated components.

**Deliverables:**
- [ ] Global layout (Navigation, Footer)
- [ ] Hero section with animated headline
- [ ] About / Skills section
- [ ] Projects section (project cards with links)
- [ ] Experience / Timeline section
- [ ] Writing / Blog index (static posts via MDX or Contentlayer)
- [ ] Contact section
- [ ] Dark mode toggle
- [ ] Responsive design (mobile-first)
- [ ] Accessibility audit (WCAG 2.1 AA)

---

### Phase 4 — AI Feature Integration
**Goal:** Add differentiating AI features that demonstrate hands-on AI engineering.

**Deliverables:**
- [ ] AI-powered project search / semantic search (Amazon Bedrock)
- [ ] Chatbot / Q&A assistant trained on portfolio content
- [ ] Skills graph or knowledge visualization
- [ ] Optional: RAG demo or embedding visualization

---

### Phase 5 — AWS Infrastructure & Deployment
**Goal:** Deploy the site to AWS Amplify via CDK and wire up CI/CD for continuous deployment.

**Deliverables:**
- [ ] CDK stack: AWS Amplify Hosting
- [ ] CDK stack: supporting services (API Gateway, Lambda, Bedrock IAM roles)
- [ ] Environment variable strategy (SSM Parameter Store / Secrets Manager)
- [ ] Custom domain + HTTPS (Route 53 + ACM)
- [ ] GitHub Actions deploy workflow (on push to `main`)
- [ ] Monitoring (CloudWatch alarms, cost budget alert)

---

### Phase 6 — Polish & Launch
**Goal:** Production-ready quality bar.

**Deliverables:**
- [ ] Performance audit (Core Web Vitals, Lighthouse ≥ 95)
- [ ] SEO metadata, Open Graph images, sitemap
- [ ] Analytics (privacy-first, e.g., Plausible or AWS Amplify Analytics)
- [ ] Smoke tests for critical paths
- [ ] Final content review
- [ ] `v1.0.0` tag and CHANGELOG entry

---

## Timeline (estimated)

| Phase | Duration |
|---|---|
| Phase 1 — Initialization | 1 day |
| Phase 2 — Frontend Scaffold | 1 day |
| Phase 3 — Core UI | 1–2 weeks |
| Phase 4 — AI Features | 1–2 weeks |
| Phase 5 — Infrastructure | 3–5 days |
| Phase 6 — Polish & Launch | 2–3 days |

---

## Current Status

**Active Phase:** Phase 1 — Project Initialization
