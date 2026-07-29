# Architecture

## System Overview

The repository is a single Next.js frontend plus a placeholder AWS CDK infrastructure tree. The frontend is the only implemented product surface today: a themed, motion-enabled App Router site with a root layout, a hero section, shared design-system components, typed config, and an empty but fully modeled data layer.

The current runtime architecture is intentionally simple:

1. Next.js App Router renders the root shell from [frontend/src/app/layout.tsx](../frontend/src/app/layout.tsx).
2. Global providers supply theme, Framer Motion reduced-motion handling, tooltip context, and a stubbed React Query wrapper.
3. The home page in [frontend/src/app/page.tsx](../frontend/src/app/page.tsx) currently renders the hero and placeholder anchor targets only.
4. Shared components consume typed data from `src/config` and `src/data` rather than hardcoded content.
5. Infrastructure is not yet implemented; [infrastructure/bin](../infrastructure/bin) and [infrastructure/lib](../infrastructure/lib) are stubs.

## Repository Layout

| Path | Purpose |
|---|---|
| [frontend/src/app](../frontend/src/app) | App Router entry points, root layout, metadata, global CSS, manifest |
| [frontend/src/components/common](../frontend/src/components/common) | Reusable design-system components and primitives |
| [frontend/src/components/layout](../frontend/src/components/layout) | Header, footer, and theme toggle |
| [frontend/src/components/sections](../frontend/src/components/sections) | Page sections; currently only Hero exists |
| [frontend/src/config](../frontend/src/config) | Site identity, navigation, and design-token constants |
| [frontend/src/data](../frontend/src/data) | Typed content sources and derived arrays |
| [frontend/src/hooks](../frontend/src/hooks) | Custom hooks for viewport, motion, and active-section behavior |
| [frontend/src/lib](../frontend/src/lib) | Fonts, metadata factory, motion variants, and utilities |
| [frontend/src/providers](../frontend/src/providers) | Client-side provider composition |
| [frontend/src/types](../frontend/src/types) | Domain interfaces used by the data layer |
| [frontend/public](../frontend/public) | Static icons and manifest assets |
| [infrastructure](../infrastructure) | CDK scaffold only |
| [docs](../docs) | Repository documentation and audit output |

## Application Flow

### Render Path

`layout.tsx` wraps the document body with `Providers`, `Navbar`, `main`, and `Footer`. The page body is a static, mostly server-rendered composition; only interactive components and motion wrappers are client components.

### Request Flow

There is no implemented API layer yet. The architecture docs and requirements describe future AI chat and semantic search endpoints, but no route handlers exist in the source tree today.

### Content Flow

The application is designed to be data-first:

`src/config/site.ts` and `src/config/navigation.ts` define identity and navigation.

`src/data/*.ts` defines typed content arrays and derived views.

Shared components read from those modules and render the visible UI.

This pattern keeps future content updates out of JSX and makes the site maintainable once the data is populated.

## Routing

Only the root route is implemented.

| Route | State | Notes |
|---|---|---|
| `/` | Implemented | Hero plus placeholder anchor targets |
| `/projects` | Not implemented | Documented in plan, no page file exists |
| `/projects/[slug]` | Not implemented | Data model exists, route does not |
| `/writing` | Not implemented | Mentioned in navigation, no page file exists |
| `/writing/[slug]` | Not implemented | Not scaffolded |
| `/api/*` | Not implemented | No route handlers present |

The navigation model already uses `/#section-id` links so future routes can jump back to anchored home-page sections from anywhere in the site.

## Providers

The root provider composition in [frontend/src/providers/Providers.tsx](../frontend/src/providers/Providers.tsx) is:

1. `ThemeProvider` from `next-themes`
2. `MotionConfig` with `reducedMotion="user"`
3. `ReactQueryProvider` as a no-op stub
4. `TooltipProvider` from the base-ui tooltip wrapper

The order matters: theme must wrap all UI, motion must be globally aware of accessibility preferences, and tooltips should inherit theme styling.

## State Management

| Concern | Mechanism | Status |
|---|---|---|
| Theme | `next-themes` | Implemented |
| UI state | React state hooks | Implemented for mobile nav and theme toggle |
| Motion | Framer Motion variants in `src/lib/motion.ts` | Implemented |
| Server/data fetching | React Query | Stubbed |
| Content data | Typed static modules in `src/data` | Implemented but empty |

There is no global store. That is appropriate for the current scope because the site is content-driven rather than workflow-driven.

## Theme System

Theme is split across three layers:

1. [frontend/src/config/theme.ts](../frontend/src/config/theme.ts) defines semantic token names in TypeScript.
2. [frontend/src/app/globals.css](../frontend/src/app/globals.css) binds those tokens to OKLCH values and Tailwind v4 `@theme inline` variables.
3. `ThemeProvider` applies the `dark` class to the root element through `next-themes`.

This is a strong structure because it keeps colors semantic, makes dark mode class-based, and keeps motion/config values in one place.

## Motion System

All shared motion variants live in [frontend/src/lib/motion.ts](../frontend/src/lib/motion.ts). The codebase uses a centralized motion language rather than component-local variants.

Used primitives include:

| Category | Variants |
|---|---|
| Fade | `fade`, `fadeUp`, `fadeUpLarge`, `fadeDown`, `fadeLeft`, `fadeRight` |
| Scale | `scaleIn`, `scalePop` |
| Stagger | `staggerContainer`, `staggerContainerSlow` |
| Hover/tap | `hoverLift`, `hoverScale`, `tapPress` |
| Page transitions | `pageTransition`, `pageEnter`, `pageExit` |
| Viewport defaults | `defaultViewport` |
| Helpers | `withDelay()` |

The hero uses `withDelay` locally for a few staged entrance effects; the rest of the site is intended to consume the shared motion module directly.

## Navigation

[frontend/src/config/navigation.ts](../frontend/src/config/navigation.ts) is the single source of truth for top-level navigation and social links.

`Navbar` reads the anchor and route links from that file, and `Footer` uses the same arrays so the site stays consistent.

Active section highlighting is driven by `useActiveSection`, which uses `IntersectionObserver` only on the home page. Route links use `usePathname`.

## Data Flow

The intended flow is:

`src/data/*.ts` → shared UI components → section composition in `app/page.tsx` → static HTML.

Derived arrays are computed locally in the data layer to avoid duplicate state:

| Source | Derived export | Purpose |
|---|---|---|
| `projects.ts` | `featuredProjects` | Home-page spotlight projects |
| `skills.ts` | `skillGroups` | Category-based skill rendering |
| `certifications.ts` | `activeCertifications` | Show valid certifications only |
| `socials.ts` | `featuredSocials` | Prominent social links |
| `experience.ts` + `education.ts` + `achievements.ts` + `certifications.ts` | `timeline` | Unified chronological view |

## Component Hierarchy

Current implemented hierarchy:

`layout.tsx`
→ `Providers`
→ `Navbar`
→ `main`
→ `Hero`
→ placeholder section anchors
→ `Footer`

The component tree is intentionally shallow. The reusable component layer is complete, but only the hero is actually composed into the page today.

## Dependency Relationships

| Module | Depends on |
|---|---|
| `app/layout.tsx` | `siteConfig`, fonts, metadata, providers, layout components |
| `app/page.tsx` | `Hero` |
| `components/layout/Navbar.tsx` | navigation config, site config, active-section hook, social icons, theme toggle |
| `components/layout/Footer.tsx` | navigation config, site config, social button/icon components |
| `components/sections/Hero.tsx` | profile data, featured socials, motion helpers, common primitives |
| `components/common/*` | motion helpers, design tokens, typed data, utility `cn()` |
| `data/timeline.ts` | data domain files and timeline type |

## Infrastructure Boundary

Infrastructure is documented in the plan but not built. There are no stacks, constructs, or deployment definitions yet. That means the current boundary between frontend and infrastructure is conceptual only.

## Architectural Assessment

Strengths:

1. Clean separation between config, data, components, hooks, and utilities.
2. Strong use of typed domain models and derived arrays.
3. Centralized motion, theme, and metadata systems.
4. Good accessibility defaults in the layout and interactive components.

Weaknesses:

1. Most content modules are empty, so the architecture is ahead of the data.
2. The documented route surface is larger than the implemented route surface.
3. Infrastructure is still a stub.
4. There is some overlap between docs and code about the current project phase.

The architecture is coherent and maintainable, but the repository is still in scaffold mode rather than launch-ready mode.

### Reduced Motion

`MotionConfig reducedMotion="user"` in `Providers.tsx` makes **all** Framer Motion animations respect `prefers-reduced-motion` automatically. For CSS animations, use the `useReducedMotion` hook:

```tsx
const reducedMotion = useReducedMotion();
return !reducedMotion && <AnimatedBackground />;
```

---

## Theme System

### Token Layers

| Layer | File | Purpose |
|-------|------|---------|
| TypeScript | `src/config/theme.ts` | Named constants for programmatic use (Framer Motion, inline styles) |
| CSS | `src/app/globals.css` | CSS custom properties consumed by Tailwind utilities |
| Tailwind | `globals.css @theme inline` | Maps Tailwind class names (`bg-brand`) to CSS variables (`var(--brand)`) |

### Color Tokens (Semantic)

| Token Pair | Use Case |
|------------|----------|
| `background` / `foreground` | Page background, primary text |
| `card` / `card-foreground` | Card surfaces |
| `muted` / `muted-foreground` | Subtle backgrounds, secondary text |
| `brand` / `brand-foreground` | Primary accent (CTAs, links, highlights) |
| `brand-muted` | Tinted backgrounds for brand-emphasized areas |
| `border` | Default dividers, component outlines |
| `ring` | Focus rings |
| `destructive` | Error/danger states |

### Brand Color

The `--brand` token is the **single signature color**. Defined in `globals.css` for both `:root` (light) and `.dark` (dark) using OKLCH. Changing it updates every component automatically.

### Dark Mode

Implemented via `next-themes` with `attribute="class"`. The `<html>` element receives a `dark` class. Tailwind's `dark:` variant is configured via:

```css
@custom-variant dark (&:is(.dark *));
```

**Rule**: Never hardcode dark-specific colors. Use semantic token pairs which adapt automatically.

---

## Build & Deploy

### Local Development

```bash
cd frontend
npm run dev          # Turbopack dev server
npm run type-check   # TypeScript strict check
npm run lint         # ESLint
npm run build        # Production build (static export)
```

### CI/CD (GitHub Actions)

Workflow: `.github/workflows/ci.yml`

1. `npm ci`
2. `npm run lint`
3. `npm run type-check`
4. `npm run build`
5. `cd ../infrastructure && npx cdk synth`

### Production Deploy

1. Push to `main` → GitHub Actions runs CI
2. On success, Amplify auto-deploys the `frontend` build output
3. CDK stacks deploy infrastructure changes (if any)

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **App Router + RSC** | Next.js 15 standard; enables streaming, server components, better layout composition |
| **Static export (SSG)** | Portfolio is content-heavy, interactivity-light — optimal for CDN caching |
| **Data-driven components** | Single source of truth; content updates don't require code changes |
| **Framer Motion variants in `lib/motion.ts`** | Consistent motion language; global tuning; reduced-motion compliance |
| **`next-themes` with class strategy** | No flash, SSR-compatible, works with Tailwind `dark:` variant |
| **CDK over raw CloudFormation** | TypeScript type-safety, composable L3 constructs, better DX |
| **Amplify over Vercel** | Demonstrates AWS expertise; keeps entire stack in AWS |
| **OpenSearch Serverless over Pinecone** | No third-party dependency; demonstrates AWS AI ecosystem breadth |
| **OKLCH color tokens** | Perceptual uniformity; consistent light/dark adaptation |
| **Polymorphic Button** (`href` → `<a>`) | Single component for button and link semantics; accessibility correct |
| **`useActiveSection` with IntersectionObserver** | Performant scroll-spy; no scroll listeners; works with anchor navigation |