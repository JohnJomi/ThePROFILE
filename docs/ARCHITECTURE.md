# Architecture

## System Overview

The portfolio is a statically-rendered Next.js 15 site hosted on AWS Amplify, with optional server-side AI features backed by AWS Lambda and Amazon Bedrock. All infrastructure is defined as code using AWS CDK (TypeScript).

```
┌─────────────────────────────────────────────────────────────────┐
│                          User Browser                           │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AWS Amplify Hosting                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Next.js 15 (App Router)                     │   │
│  │  Static pages + Server Components + Route Handlers       │   │
│  └──────────────────────────────────────────────────────────┘   │
│  CloudFront CDN  •  Custom Domain (Route 53 + ACM)              │
└────────────────────────────┬────────────────────────────────────┘
                             │ API calls (optional AI features)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API Gateway (HTTP API)                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AWS Lambda (Node.js 20)                      │
│  ┌─────────────────────┐   ┌───────────────────────────────┐    │
│  │  Chat / Q&A Handler │   │  Semantic Search Handler      │    │
│  └──────────┬──────────┘   └──────────────┬────────────────┘    │
└─────────────┼────────────────────────────┼────────────────────┘
              │                            │
              ▼                            ▼
┌─────────────────────────┐   ┌────────────────────────────────┐
│   Amazon Bedrock        │   │   Amazon OpenSearch Serverless  │
│   (Claude / Titan)      │   │   (vector search index)        │
└─────────────────────────┘   └────────────────────────────────┘
```

---

## AWS Services

| Service | Purpose |
|---------|---------|
| AWS Amplify | Static site hosting, CI/CD, environment config |
| Amazon CloudFront | CDN, edge caching (managed by Amplify) |
| AWS Certificate Manager | TLS certificate for custom domain |
| Amazon Route 53 | DNS for custom domain |
| Amazon API Gateway (HTTP) | REST interface for AI Lambda functions |
| AWS Lambda | Serverless compute for AI feature handlers |
| Amazon Bedrock | Foundation models (Claude for chat, Titan for embeddings) |
| Amazon OpenSearch Serverless | Vector index for semantic project search |
| AWS Systems Manager (SSM) | Non-secret environment variables |
| AWS Secrets Manager | API keys and sensitive config |
| Amazon CloudWatch | Logs, metrics, alarms |
| AWS CDK | Infrastructure-as-code for all of the above |

---

## Frontend Architecture

### Directory Structure

```
frontend/src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (fonts, theme, metadata, providers)
│   ├── page.tsx            # Home page — composed of Section components
│   ├── globals.css         # Global styles, design tokens, Tailwind v4 @theme
│   ├── manifest.ts         # Web App Manifest (PWA)
│   ├── projects/           # /projects route (future: project listing)
│   ├── writing/            # /writing route (future: MDX blog)
│   └── api/                # Route Handlers (proxies to Lambda)
├── components/
│   ├── common/             # Reusable design system components
│   │   ├── index.ts        # Barrel export
│   │   ├── Section.tsx     # Full-width section wrapper + scroll-reveal
│   │   ├── Container.tsx   # Horizontal width constraint
│   │   ├── Card.tsx        # Animated surface component
│   │   ├── Badge.tsx       # Label/tag component
│   │   ├── SkillBadge.tsx  # Proficiency-aware skill badge
│   │   ├── ProjectCard.tsx # Project display card
│   │   ├── TimelineCard.tsx# Experience/education timeline entry
│   │   ├── Buttons.tsx     # PrimaryButton / SecondaryButton (polymorphic)
│   │   ├── Button.tsx      # Unified Button with variant prop
│   │   ├── Typography.tsx  # Heading, Subheading, Paragraph, GradientText
│   │   ├── SocialIcons.tsx # Inline SVG brand icons
│   │   ├── SocialButton.tsx# Social link button (icon/pill variants)
│   │   ├── AnimatedBackground.tsx # Decorative background blobs
│   │   └── Container.tsx
│   ├── layout/             # Structural components
│   │   ├── Navbar.tsx      # Sticky nav, mobile drawer, active section
│   │   ├── Footer.tsx      # 3-column footer, nav + socials
│   │   └── ThemeToggle.tsx # Light/dark toggle with animated icon
│   └── ui/                 # shadcn/ui primitives
│       ├── button.tsx
│       └── tooltip.tsx
├── config/                 # Static configuration (single source of truth)
│   ├── site.ts             # Identity, SEO, contact, social URLs
│   ├── navigation.ts       # NavLink[] + SocialLink[] arrays
│   └── theme.ts            # Design token constants (TS + types)
├── data/                   # Typed content arrays (data layer)
│   ├── profile.ts          # Profile (name, title, bio, etc.)
│   ├── projects.ts         # Project[] + featuredProjects
│   ├── skills.ts           # Skill[] + skillGroups (derived)
│   ├── experience.ts       # Experience[]
│   ├── education.ts        # Education[]
│   ├── certifications.ts   # Certification[] + activeCertifications
│   ├── achievements.ts     # Achievement[]
│   ├── socials.ts          # Social[] + featuredSocials
│   └── timeline.ts         # Unified TimelineItem[] (derived from all above)
├── hooks/                  # Custom React hooks
│   ├── index.ts            # Barrel export
│   ├── useActiveSection.ts # IntersectionObserver for nav highlighting
│   ├── useMediaQuery.ts    # Reactive media query listener
│   ├── useReducedMotion.ts # prefers-reduced-motion reader
│   └── useScrollReveal.ts  # Framer Motion useInView wrapper
├── lib/                    # Shared utilities
│   ├── utils.ts            # cn() = clsx + tailwind-merge
│   ├── motion.ts           # All Framer Motion variants + helpers
│   ├── metadata.ts         # SEO metadata factory
│   └── fonts.ts            # next/font configurations
├── providers/              # React context providers
│   ├── Providers.tsx       # Root composition (Theme → MotionConfig → ReactQuery → Tooltip)
│   ├── ThemeProvider.tsx   # next-themes wrapper
│   ├── TooltipProvider.tsx # @base-ui/react TooltipProvider
│   └── ReactQueryProvider.tsx # @tanstack/react-query (stubbed)
└── types/                  # Domain interfaces (one file per domain)
    ├── profile.ts
    ├── project.ts
    ├── skill.ts
    ├── experience.ts
    ├── education.ts
    ├── certification.ts
    ├── achievement.ts
    ├── social.ts
    └── timeline.ts
```

---

## Routing

| Route | Description | Rendering |
|-------|-------------|-----------|
| `/` | Home page — composed of Section components | Static (SSG) |
| `/projects` | Project listing (planned) | Static (SSG) |
| `/projects/[slug]` | Project detail page (planned) | Static (SSG) |
| `/writing` | Writing/blog listing (planned) | Static (SSG) |
| `/writing/[slug]` | Article detail (planned) | Static (SSG) |
| `/api/chat` | AI chat proxy → Lambda | Server (Route Handler) |
| `/api/search` | Semantic search proxy → Lambda | Server (Route Handler) |

**Navigation convention**: All section anchors use `/#section-id` format so they work from any route. The `Navbar` maps over `primaryNavLinks` from `config/navigation.ts`.

---

## Providers

The root `Providers` component (`src/providers/Providers.tsx`) composes all context providers in a specific order:

```tsx
<ThemeProvider>                    // 1. Outermost — applies theme to all children
  <MotionConfig reducedMotion="user">  // 2. Global Framer Motion config
    <ReactQueryProvider>          // 3. Data fetching context (stubbed)
      <TooltipProvider>           // 4. UI tooltip context (needs theme)
        {children}
      </TooltipProvider>
    </ReactQueryProvider>
  </MotionConfig>
</ThemeProvider>
```

**Adding a new provider**: Add it to `Providers.tsx` in the correct position — never directly in `layout.tsx`.

---

## State Management

| Layer | Mechanism | Use Case |
|-------|-----------|----------|
| Server State | `@tanstack/react-query` (stubbed) | API calls to AI Lambda functions |
| Client UI State | React `useState` / `useReducer` | Mobile menu, theme toggle, form inputs |
| Theme | `next-themes` (via `ThemeProvider`) | Light/dark/system preference |
| Animation Config | `MotionConfig` (Framer Motion) | Global `reducedMotion="user"` |
| Derived Data | Pure functions in `data/*.ts` | `featuredProjects`, `skillGroups`, `timeline` |

**No global state library** (Redux, Zustand) — the portfolio is primarily static content with minimal interactivity.

---

## Data Flow

### Static Content (Home Page Sections)

```
data/*.ts (typed arrays)
       │
       ▼
components/common/*.tsx (Section, Card, TimelineCard, ProjectCard, etc.)
       │
       ▼
app/page.tsx (composes sections)
       │
       ▼
Static HTML at build time
```

All content is **data-driven** — components receive typed props from the data layer. No hardcoded strings in JSX.

### Derived Data

Several data files export computed arrays to avoid duplication:

| Source | Derived Export | Computation |
|--------|----------------|-------------|
| `projects.ts` | `featuredProjects` | `projects.filter(p => p.featured)` |
| `skills.ts` | `skillGroups` | `skills.reduce()` grouped by `category` |
| `certifications.ts` | `activeCertifications` | `certifications.filter(c => c.active)` |
| `socials.ts` | `featuredSocials` | `socials.filter(s => s.featured)` |
| `experience.ts` + `education.ts` + `achievements.ts` + `certifications.ts` | `timeline.ts` → `timeline` | Mapped to `TimelineItem` + sorted by `date` descending |

---

## Component Hierarchy

```
app/layout.tsx
├── Providers
│   ├── ThemeProvider
│   ├── MotionConfig
│   ├── ReactQueryProvider
│   └── TooltipProvider
├── Navbar
│   ├── primaryNavLinks (config)
│   ├── socialLinks (config)
│   ├── ThemeToggle
│   └── Mobile menu (AnimatePresence + fadeDown)
├── main
│   └── app/page.tsx
│       ├── Section#hero (animated={false})
│       │   ├── AnimatedBackground (gradient)
│       │   ├── Heading (h1)
│       │   ├── Paragraph (lead)
│       │   ├── PrimaryButton (CTA)
│       │   └── SocialButtons
│       ├── Section#about
│       │   ├── SectionHeader
│       │   ├── Paragraph (bio)
│       │   └── SkillBadges (staggerContainer)
│       ├── Section#skills
│       │   ├── SectionHeader
│       │   └── SkillGroups → SkillBadge[] (stagger)
│       ├── Section#experience
│       │   ├── SectionHeader
│       │   └── TimelineCard[] (staggerContainer)
│       ├── Section#projects
│       │   ├── SectionHeader
│       │   └── ProjectCard[] (staggerContainer)
│       ├── Section#certifications
│       │   ├── SectionHeader
│       │   └── Certification cards
│       ├── Section#writing
│       │   ├── SectionHeader
│       │   └── Article previews
│       └── Section#contact
│           ├── SectionHeader
│           ├── Contact form / email link
│           └── SocialButtons
└── Footer
    ├── Brand + tagline
    ├── primaryNavLinks
    └── socialLinks
```

---

## Motion System

All Framer Motion variants are defined in **`src/lib/motion.ts`** — no inline variants in components.

### Variant Categories

| Category | Variants |
|----------|----------|
| **Fade** | `fade`, `fadeUp`, `fadeUpLarge`, `fadeDown`, `fadeLeft`, `fadeRight` |
| **Scale** | `scaleIn`, `scalePop` |
| **Stagger Containers** | `staggerContainer` (0.08s), `staggerContainerSlow` (0.15s) |
| **Hover/Tap** | `hoverLift`, `hoverScale`, `tapPress` |
| **Page Transitions** | `pageTransition`, `pageEnter`, `pageExit` |
| **Viewport Config** | `defaultViewport` (`once: true`, `margin: "-80px"`) |
| **Utility** | `withDelay(variant, seconds)` |

### Scroll-Reveal Pattern

```tsx
// Standard element
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={defaultViewport}
/>

// Staggered list (parent triggers children)
<motion.ul
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={defaultViewport}
>
  {items.map(item => (
    <motion.li key={item.id} variants={fadeUp} />
  ))}
</motion.ul>
```

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