# UI Guidelines

This document is the single source of truth for design decisions, component conventions, and usage patterns in the portfolio design system. All contributors should follow these guidelines when building or modifying UI components.

---

## Table of Contents

1. [Design Tokens](#design-tokens)
2. [Typography](#typography)
3. [Color System](#color-system)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Motion & Animation](#motion--animation)
7. [Accessibility](#accessibility)
8. [Dark Mode](#dark-mode)
9. [Import Conventions](#import-conventions)

---

## Design Tokens

All design decisions are tokenised. Components must reference semantic tokens — never hard-coded values.

### Where tokens live

| Layer | File | Purpose |
|---|---|---|
| TypeScript | `src/config/theme.ts` | Named token constants for programmatic use and Framer Motion |
| CSS | `src/app/globals.css` | CSS custom properties consumed by Tailwind utility classes |
| Tailwind | `globals.css @theme inline` | Maps Tailwind colour/font utilities to the CSS variables |

### Rule: no magic strings

```tsx
// ✅ Good — uses semantic token via Tailwind class
<div className="bg-brand text-brand-foreground" />

// ✅ Good — uses token constant for inline style / Framer Motion
import { shadows } from "@/config/theme";
style={{ boxShadow: shadows.lg }}

// ❌ Bad — hard-coded colour
<div style={{ color: "#6366f1" }} />
```

---

## Typography

### Components

| Component | Use case |
|---|---|
| `<Heading size="h1–h6">` | All section and page headings |
| `<Subheading>` | Overline labels above headings |
| `<Paragraph>` / `<Text>` | Body copy (`Text` is an alias) |
| `<GradientText>` | Inline animated gradient highlight inside headings |
| `<InlineCode>` | Inline code snippets within prose |

### Size hierarchy

```tsx
// Page-level hero title
<Heading size="h1">Building Intelligent Systems</Heading>

// Section title
<Heading size="h2">Projects</Heading>

// Card title
<Heading as="h3" size="h3">Project Name</Heading>
```

The `as` prop controls the **semantic** HTML element independently from the visual size. Use this to maintain a correct heading hierarchy even when the visual design calls for a different size.

```tsx
// Visual h2 style, but semantic h3 — correct when already inside an h2 section
<Heading as="h3" size="h2">Subsection Title</Heading>
```

### Text variants

```tsx
<Text>Standard body copy (default)</Text>
<Text variant="lead">Larger intro paragraph</Text>
<Text variant="muted">Secondary or supporting text</Text>
<Text variant="small">Caption or fine print</Text>
```

---

## Color System

Colors use OKLCH for perceptual uniformity across light and dark modes. Never specify raw OKLCH values in components — use the CSS variable aliases.

### Semantic color roles

| Token | Use case |
|---|---|
| `background` / `foreground` | Page background and primary text |
| `card` / `card-foreground` | Card surfaces |
| `muted` / `muted-foreground` | Subtle backgrounds and secondary text |
| `brand` / `brand-foreground` | Primary accent (CTA buttons, links, highlights) |
| `brand-muted` | Tinted backgrounds for brand-highlighted areas |
| `border` | Default dividers and component outlines |
| `ring` | Focus rings |
| `destructive` | Error and danger states |

### Brand color

The `--brand` token is the single signature color of the portfolio. It is defined in `globals.css` and varies between light and dark modes. To change the brand color, update both `:root` and `.dark` in `globals.css`. All components will update automatically.

---

## Spacing & Layout

### Container system

The `Container` component controls horizontal width. Always use it — never set `max-w-*` directly on section content.

```tsx
<Container>          {/* max-w-6xl (default) */}
<Container size="narrow">  {/* max-w-3xl — prose/reading */}
<Container size="wide">    {/* max-w-7xl — dashboards */}
<Container size="full">    {/* no max-width */}
```

### Section spacing

Use the `Section` component for every full-width page section. It provides:
- Consistent `py-20 md:py-28` vertical padding via `.section-padding`
- Scroll-triggered stagger animation by default
- An `id` prop for anchor navigation

```tsx
<Section id="about" containerSize="narrow" animated>
  <SectionHeader
    overline="About Me"
    heading="Who I Am"
    description="A paragraph of supporting text."
  />
  {/* section content */}
</Section>
```

### Spacing scale

Use Tailwind's spacing utilities (`p-4`, `gap-6`, etc.) for static layouts. Use the `spacing` object from `theme.ts` only for programmatic/dynamic values (e.g., Framer Motion `y` offsets).

---

## Components

### Import path

All common components are available from the barrel export:

```tsx
import { Button, Card, Heading, Text, Badge, Section } from "@/components/common";
```

### Button

| Prop | Values | Default |
|---|---|---|
| `variant` | `"primary"` \| `"secondary"` | `"primary"` |
| `size` | `"sm"` \| `"default"` \| `"lg"` | `"default"` |
| `href` | string | — (renders `<a>`) |
| `icon` | React node | — |
| `iconPosition` | `"left"` \| `"right"` | `"right"` |

```tsx
<Button>Primary action</Button>
<Button variant="secondary" size="lg" icon={<ArrowRight />}>
  Learn More
</Button>
<Button href="https://github.com" icon={<Github />} variant="secondary">
  View Source
</Button>
```

Passing `href` renders an `<a>` tag. External URLs (`http`/`https`) automatically get `target="_blank" rel="noopener noreferrer"`.

### Card

```tsx
<Card>Static, non-animated card</Card>
<Card animated>Fade-up entrance (needs staggerContainer parent)</Card>
<Card hoverable>Lift + shadow on hover</Card>
<Card animated hoverable>Both</Card>
<GlassCard animated>Frosted glass surface with blur</GlassCard>
```

Padding variants: `none`, `sm`, `default`, `lg`.

### Badge

```tsx
<Badge>Default</Badge>
<Badge variant="brand">AI / ML</Badge>
<Badge variant="success" size="sm">Active</Badge>
```

Variants: `default`, `secondary`, `muted`, `brand`, `outline`, `success`, `warning`, `destructive`.

### SkillBadge

```tsx
<SkillBadge name="TypeScript" proficiency="expert" />
<SkillBadge name="Rust" proficiency="familiar" showIndicator={false} />
```

Use inside a `staggerContainer` so badges animate in sequence.

---

## Motion & Animation

### Principle

Motion should be purposeful, not decorative. Every animation must either communicate state or guide the user's attention. When in doubt, use a slower, subtler variant.

### Animation file

All Framer Motion variants are defined in `src/lib/motion.ts`. Do not define inline variants in components.

```tsx
import { fadeUp, staggerContainer, defaultViewport } from "@/lib/motion";
```

### Variant catalogue

| Export | Use case |
|---|---|
| `fade` | Opacity-only reveal |
| `fadeUp` | Primary scroll-reveal (upward slide + fade) |
| `fadeUpLarge` | Hero elements (larger travel distance) |
| `fadeDown` | Dropdowns, tooltips |
| `fadeLeft` / `fadeRight` | Sidebars, slide-in panels |
| `scaleIn` | Modals, popovers |
| `scalePop` | Badges, tags, interactive elements |
| `staggerContainer` | Parent of staggered children (0.08s stagger) |
| `staggerContainerSlow` | Parent with fewer, larger items (0.15s stagger) |
| `hoverLift` | Card lift on hover |
| `hoverScale` | Icon/small element scale on hover |
| `tapPress` | Button press scale |
| `pageTransition` | Full-page route transition (enter + exit) |
| `pageEnter` | Route enter without exit |
| `pageExit` | Route exit only |
| `defaultViewport` | `whileInView` viewport config (`once: true`) |
| `withDelay(variant, n)` | Delay any variant by `n` seconds |

### Scroll-reveal pattern

```tsx
// ✅ Standard — use whileInView + defaultViewport directly
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={defaultViewport}
/>

// ✅ Stagger list — parent triggers children
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

### Page transitions

```tsx
// In a layout component wrapping page content:
import { AnimatePresence, motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";

<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    variants={pageTransition}
    initial="initial"
    animate="enter"
    exit="exit"
  >
    {children}
  </motion.div>
</AnimatePresence>
```

### Reduced motion

`MotionConfig reducedMotion="user"` is applied globally in `Providers.tsx`. All Framer Motion animations automatically respect `prefers-reduced-motion`. No per-component opt-in is required.

For CSS animations and non-Framer Motion effects, use the `useReducedMotion` hook:

```tsx
import { useReducedMotion } from "@/hooks";

const reducedMotion = useReducedMotion();
return !reducedMotion && <AnimatedBackground />;
```

---

## Accessibility

### Principles

1. **Semantic HTML first.** Use the correct element (`button`, `nav`, `main`, `section`, `article`) before reaching for ARIA.
2. **Visible focus rings.** Every interactive element must have a visible focus ring via `focus-visible:ring-2 focus-visible:ring-ring`. Never use `outline: none` without providing an equivalent.
3. **Color is not the only information channel.** Badges, skill indicators, and status labels always include accessible text or `aria-label`.
4. **Decorative elements are hidden.** Icons, blobs, and decorative images must have `aria-hidden="true"`.
5. **External links announce intent.** External `<a>` elements use `rel="noopener noreferrer"` and rely on the link text to communicate purpose.

### Interactive components checklist

- `<button>` — use `type="button"` to prevent accidental form submission
- Toggle buttons — use `aria-pressed` for binary state (see `ThemeToggle`)
- Modal/drawer — use `role="dialog" aria-modal="true" aria-label="..."` (see Navbar mobile menu)
- Navigation — wrap in `<nav aria-label="...">` (both desktop and mobile)
- Icon-only buttons — always provide `aria-label`
- Loading states — use `aria-busy="true"` and `aria-label` on the loading indicator

### Keyboard navigation

- All interactive elements must be focusable and operable with keyboard alone
- Modal/overlay components must trap focus while open
- `Escape` must dismiss any overlay or dialog (see Navbar mobile menu)
- Skip-to-main-content link recommended for production launch (Phase 6)

### Target sizes

- Minimum touch target: 44×44px (WCAG 2.5.5)
- Icon buttons in the design system use `size-9` (36px) — acceptable for desktop; increase for mobile-only touch targets

---

## Dark Mode

Dark mode is implemented via `next-themes` with `attribute="class"`. The `<html>` element receives a `dark` class when dark mode is active.

Tailwind's `dark:` variant is configured via `@custom-variant dark (&:is(.dark *))` in `globals.css`.

### Rules

1. **Never hardcode dark-specific colors.** Use the semantic token pairs (`muted` / `muted-foreground`, `card` / `card-foreground`, etc.) which automatically adapt.
2. **Brand color in dark mode.** The `--brand` token uses a lighter OKLCH value in dark mode for legibility. This is handled in `globals.css .dark` — no per-component overrides needed.
3. **Test both modes.** Every new component must be reviewed in both light and dark modes before merge.

---

## Import Conventions

### Preferred import paths

```tsx
// Components
import { Button, Card, Heading } from "@/components/common";
import { Navbar } from "@/components/layout/Navbar";

// Hooks
import { useMediaQuery, useReducedMotion, useScrollReveal } from "@/hooks";

// Motion
import { fadeUp, staggerContainer, defaultViewport } from "@/lib/motion";

// Theme tokens
import { shadows, duration, easing, breakpoints } from "@/config/theme";

// Utilities
import { cn } from "@/lib/utils";
```

### Import order (enforced by ESLint)

1. React and Next.js imports
2. Third-party libraries (framer-motion, lucide-react, etc.)
3. Internal modules (`@/config`, `@/lib`, `@/hooks`, `@/types`)
4. Internal components (`@/components/...`)
5. Relative imports (`./ComponentName`)

---

## Images

Always use `next/image` (`<Image>`) rather than a raw `<img>` tag for any image rendered in a component.

```tsx
import Image from "next/image";

// ✅ Good — automatic optimisation, responsive sizing, LCP boost
<div className="relative aspect-video w-full overflow-hidden">
  <Image
    src={coverImage}
    alt="Descriptive alt text"
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    className="object-cover"
  />
</div>

// ❌ Bad — no optimisation, triggers ESLint @next/next/no-img-element warning
<img src={coverImage} alt="..." />
```

For images from external domains, add a `remotePatterns` entry to `next.config.ts`. Before Phase 6 launch, restrict the wildcard `hostname: "**"` to the specific CDN domains you use.

---

*Last updated: Phase 3 — Final Polish Pass*
