# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added — Phase 2: Next.js Project Foundation

**Scaffolding & Build**
- Next.js 16.2.11 (App Router, TypeScript strict mode, Tailwind v4, Turbopack, ESLint)
- React 19 with full RSC (React Server Components) support
- `type-check`, `format`, `format:check` scripts added to `package.json`

**Dependencies installed**
- `framer-motion` — animation library
- `lucide-react` — icon library (shadcn/ui compatible)
- `clsx` — conditional className utility
- `class-variance-authority` — component variant API
- `tailwind-merge` — Tailwind class conflict resolution
- `next-themes` — dark/light mode with system preference and localStorage
- `@base-ui/react`, `tw-animate-css` — added by shadcn/ui init

**shadcn/ui**
- Initialized with Tailwind v4 / base-nova style
- `components.json` written (style: base-nova, cssVariables: true, iconLibrary: lucide)
- `src/components/ui/button.tsx` and `src/components/ui/tooltip.tsx` added

**Folder Structure**
- `src/config/` — static configuration objects
- `src/data/` — typed content arrays
- `src/providers/` — React context providers
- `src/services/` — API call functions (future: Bedrock, search)
- `src/styles/` — additional CSS files
- `src/components/common/` — reusable cross-section atoms
- `src/components/layout/` — structural components (Navbar, Footer)

**Formatting & Linting**
- Prettier configured (`.prettierrc`, `.prettierignore`)
- EditorConfig (`.editorconfig`)
- ESLint extended with `eslint-config-prettier`, `@typescript-eslint/eslint-plugin`, `eslint-plugin-import` (import order enforced)

**Fonts** (`src/lib/fonts.ts`)
- Inter — primary sans-serif, variable weight, `--font-sans`
- JetBrains Mono — monospace for code, variable weight, `--font-mono`

**Config Layer** (`src/config/`)
- `site.ts` — single source of truth for identity, SEO, social URLs (all fields empty — fill before deploy)
- `navigation.ts` — typed nav link and social link arrays
- `theme.ts` — semantic design tokens (colorTokens, spacing, fontSize, borderRadius, zIndex, duration, breakpoints)

**Type System** (`src/types/` — one file per domain, no `any`)
- `profile.ts`, `project.ts`, `skill.ts`, `experience.ts`, `education.ts`
- `achievement.ts`, `certification.ts`, `social.ts`, `timeline.ts`

**Data Layer** (`src/data/` — all empty arrays, no placeholder content)
- `profile.ts`, `projects.ts` (+ `featuredProjects`), `skills.ts` (+ `skillGroups`)
- `experience.ts`, `education.ts`, `achievements.ts`, `certifications.ts` (+ `activeCertifications`)
- `socials.ts` (+ `featuredSocials`), `timeline.ts` (unified sorted view assembled from all sources)

**Providers** (`src/providers/`)
- `ThemeProvider.tsx` — next-themes wrapper (attribute=class, defaultTheme=system)
- `TooltipProvider.tsx` — @base-ui/react TooltipProvider (delay=300ms)
- `ReactQueryProvider.tsx` — stubbed passthrough (ready for Phase 4 activation)
- `Providers.tsx` — root composition (ThemeProvider → ReactQueryProvider → TooltipProvider)

**Global CSS** (`src/app/globals.css`)
- Tailwind v4 `@theme inline` with full font and color token mapping
- Brand accent OKLCH slots (`--brand`, `--brand-foreground`, `--brand-muted`) for light and dark modes
- Full `:root` and `.dark` token sets preserving shadcn/ui base-nova palette
- `@layer base` — typography defaults (h1–h6, p, code, pre, a, selection, focus-visible)
- `@layer utilities` — `gradient-text`, `glass-card`, `container-content`, `section-padding`, `text-balance`
- Custom `@keyframes` — `gradient-shift`, `shimmer`, `float`

**Metadata** (`src/lib/metadata.ts`, `src/app/manifest.ts`)
- `defaultMetadata` with full SEO, OpenGraph, Twitter Cards, robots, icons config
- `buildMetadata()` factory for page-specific overrides
- `manifest.ts` — Web App Manifest for PWA support
- All values derived from `siteConfig` — zero hardcoded strings

**Root Layout** (`src/app/layout.tsx`)
- Inter + JetBrains Mono CSS variables applied to `<html>`
- `lang` from `siteConfig.locale`
- `suppressHydrationWarning` for next-themes SSR compatibility
- Single `<Providers>` import

### Changed — Phase 2

- `src/lib/utils.ts` — replaced Phase 1 stub with shadcn/ui canonical version (`cn()` function)
- `src/app/globals.css` — fully rewritten (extended from shadcn init baseline)
- `src/app/layout.tsx` — fully rewritten (replaced scaffold with production layout)
- `src/app/page.tsx` — replaced scaffold default with clean Phase 2 placeholder

### Removed — Phase 2

- `src/lib/constants.ts` — migrated to `src/config/site.ts` and `src/config/navigation.ts`
- `src/types/index.ts` — replaced by per-domain type files in `src/types/`
- Phase 1 `.gitkeep` placeholder files replaced by real files

---

## [0.1.0] — 2026-07-25

### Added — Phase 1: Project Initialization

- Monorepo directory structure (`frontend/`, `infrastructure/`, `docs/`, `.github/`)
- Root `.gitignore` covering Node.js, Next.js, and AWS CDK artifacts
- Root `README.md` with stack overview, repo structure, and getting started guide
- GitHub Actions CI workflow (`ci.yml`) for frontend lint/type-check/build and CDK synth
- Pull request template (`.github/pull_request_template.md`)
- Bug report issue template (`.github/ISSUE_TEMPLATE/bug_report.yml`)
- `docs/PROJECT_PLAN.md` — phased project plan with milestones
- `docs/ARCHITECTURE.md` — system design, AWS services, data flows
- `docs/REQUIREMENTS.md` — functional and non-functional requirements
- `docs/CHANGELOG.md` — this file

---

[Unreleased]: https://github.com/your-username/portfolio/compare/HEAD
[0.1.0]: https://github.com/your-username/portfolio/releases/tag/v0.1.0
