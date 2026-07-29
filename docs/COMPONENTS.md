# Components

This document catalogs the reusable component layer that exists in the repository today. It covers the design-system primitives, layout components, and the shadcn/base-ui wrappers.

## Common Primitives

### Container

File: [frontend/src/components/common/Container.tsx](../frontend/src/components/common/Container.tsx)

Purpose: Constrains horizontal width and provides consistent page gutters.

Props:

```tsx
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "narrow" | "default" | "wide" | "full";
  as?: React.ElementType;
}
```

Dependencies: `class-variance-authority`, `cn()`.

Where used: `Section`, `Navbar` layout conventions, `Footer`, and any future page-level content blocks.

Accessibility notes: It renders semantic meaning via its parent or the `as` prop; by itself it is non-semantic.

Future improvements: A `center` variant would be useful if a centered but unconstrained layout is ever needed.

### Section

File: [frontend/src/components/common/Section.tsx](../frontend/src/components/common/Section.tsx)

Purpose: Wraps a full-width page section, applies vertical spacing, and optionally animates the section on scroll.

Props:

```tsx
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  containerSize?: "narrow" | "default" | "wide" | "full";
  animated?: boolean;
}
```

Dependencies: `Container`, `framer-motion`, `staggerContainer`, `defaultViewport`, `cn()`.

Where used: `Hero` today; intended for every section on the home page.

Accessibility notes: It preserves native section semantics. `id` supports anchor navigation.

Future improvements: Optional background slot or section-level thematic styles could be added later.

### SectionHeader

File: [frontend/src/components/common/Section.tsx](../frontend/src/components/common/Section.tsx)

Purpose: Standard section title block with optional overline and description.

Props:

```tsx
interface SectionHeaderProps {
  overline?: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}
```

Dependencies: `framer-motion`, `fadeUp`, `cn()`.

Where used: Planned for all portfolio sections.

Accessibility notes: Heading semantics are provided by the rendered `<h2>`.

Future improvements: A CTA/action slot would let sections add a button without custom wrappers.

### Card

File: [frontend/src/components/common/Card.tsx](../frontend/src/components/common/Card.tsx)

Purpose: Base content surface with padding variants and optional hover/entrance motion.

Props:

```tsx
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "default" | "lg";
  animated?: boolean;
  hoverable?: boolean;
}
```

Dependencies: `cva`, `framer-motion`, `fadeUp`, `hoverLift`, `cn()`.

Where used: `ProjectCard`, `TimelineCard`, `GlassCard`, and likely future stat/callout blocks.

Accessibility notes: It is non-interactive; clickable cards must be wrapped in a semantic link or button.

Future improvements: A `selected` or `interactive` state could help future dashboards.

### GlassCard

File: [frontend/src/components/common/Card.tsx](../frontend/src/components/common/Card.tsx)

Purpose: Frosted-glass variant of `Card` for floating overlays.

Props: Same as `Card`.

Dependencies: Same as `Card`.

Where used: Not currently used in the repo.

Accessibility notes: Same as `Card`.

Future improvements: Could be used for future hero stats, modals, or floating panels.

### Badge

File: [frontend/src/components/common/Badge.tsx](../frontend/src/components/common/Badge.tsx)

Purpose: Compact label for tags, statuses, and categories.

Props:

```tsx
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "muted" | "brand" | "outline" | "success" | "warning" | "destructive";
  size?: "sm" | "default" | "lg";
}
```

Dependencies: `cva`, `cn()`.

Where used: `SkillBadge`, `ProjectCard`, `TimelineCard`, and future status labels.

Accessibility notes: Renders a `<span>`; add additional semantics if the badge conveys live status.

Future improvements: None required for the current scope.

### SkillBadge

File: [frontend/src/components/common/SkillBadge.tsx](../frontend/src/components/common/SkillBadge.tsx)

Purpose: Animated badge that encodes skill proficiency visually and textually.

Props:

```tsx
interface SkillBadgeProps {
  name: string;
  category?: SkillCategory;
  proficiency?: "expert" | "proficient" | "familiar";
  showIndicator?: boolean;
  className?: string;
}
```

Dependencies: `Badge`, `framer-motion`, `scalePop`, `cn()`.

Where used: Planned Skills and About sections.

Accessibility notes: The proficiency is encoded in `aria-label`, which is important because the dot color alone is not sufficient.

Future improvements: Category could be surfaced in the label if the component is reused outside the skills grid.

### ProjectCard

File: [frontend/src/components/common/ProjectCard.tsx](../frontend/src/components/common/ProjectCard.tsx)

Purpose: Displays a portfolio project summary card with optional cover image, badges, and outbound links.

Props:

```tsx
interface ProjectCardProps {
  project: Project;
  className?: string;
}
```

Dependencies: `next/image`, `next/link`, `Badge`, `Card`, GitHub icon, `cn()`.

Where used: Planned Projects section.

Accessibility notes: Title link and external links are labeled; image alt text is derived from the project title.

Future improvements: Could support richer metadata such as role, impact metrics, or featured callouts.

### TimelineCard

File: [frontend/src/components/common/TimelineCard.tsx](../frontend/src/components/common/TimelineCard.tsx)

Purpose: Renders a unified chronological timeline item with type-specific badge styling.

Props:

```tsx
interface TimelineCardProps {
  item: TimelineItem;
  isLast?: boolean;
  className?: string;
}
```

Dependencies: `framer-motion`, `Badge`, `fadeUp`, `cn()`.

Where used: Planned Experience / Timeline section.

Accessibility notes: Uses `<time>` for dates and `aria-current` for current items.

Future improvements: Could support an explicit icon or richer logo treatment for each item type.

### Typography primitives

File: [frontend/src/components/common/Typography.tsx](../frontend/src/components/common/Typography.tsx)

Purpose: Shared typographic primitives with consistent visual styling.

Exports:

```tsx
Heading
Subheading
Paragraph
Text
GradientText
InlineCode
```

Dependencies: `cva`, `cn()`.

Where used: `Hero` today, and intended across all section content.

Accessibility notes: Semantic heading level remains the caller’s responsibility via the `as` prop.

Future improvements: None required, though `GradientText` could eventually become a variant on `Heading`.

### Button and Buttons

Files: [frontend/src/components/common/Button.tsx](../frontend/src/components/common/Button.tsx), [frontend/src/components/common/Buttons.tsx](../frontend/src/components/common/Buttons.tsx)

Purpose: Polymorphic CTA buttons with link/button rendering and Framer Motion tap feedback.

Props:

```tsx
type ButtonProps = PrimaryButtonProps & {
  variant?: "primary" | "secondary";
};
```

Dependencies: `framer-motion`, `tapPress`, `cn()`.

Where used: `Hero` uses `PrimaryButton` and `SecondaryButton` today.

Accessibility notes: External links open in a new tab with proper `rel` values. Disabled links are rendered with `aria-disabled` and `tabIndex=-1`.

Future improvements: A loading state would be the main missing enhancement.

### SocialButton

File: [frontend/src/components/common/SocialButton.tsx](../frontend/src/components/common/SocialButton.tsx)

Purpose: External profile link rendered as either icon-only or icon-plus-label pill.

Props:

```tsx
interface SocialButtonProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  variant?: "icon" | "pill";
  size?: "sm" | "default";
  className?: string;
}
```

Dependencies: `framer-motion`, `hoverScale`, `cn()`.

Where used: `Navbar`, `Footer`, and `Hero`.

Accessibility notes: Returns `null` when `href` is empty, which prevents broken links during configuration work.

Future improvements: A `title` or `description` prop would help if it is used in richer contexts later.

### SocialIcons

File: [frontend/src/components/common/SocialIcons.tsx](../frontend/src/components/common/SocialIcons.tsx)

Purpose: Inline SVG icons for GitHub, LinkedIn, and Twitter/X.

Exports:

```tsx
GithubIcon
LinkedinIcon
TwitterIcon
socialIconMap
```

Dependencies: None beyond React JSX.

Where used: `Navbar`, `Footer`, `Hero`.

Accessibility notes: Icons are decorative and should be paired with an accessible label from the parent component.

Future improvements: Add more social icons if the config expands.

### AnimatedBackground

File: [frontend/src/components/common/AnimatedBackground.tsx](../frontend/src/components/common/AnimatedBackground.tsx)

Purpose: Decorative background layer with dots, gradient blobs, or a grid.

Props:

```tsx
interface AnimatedBackgroundProps {
  variant?: "dots" | "gradient" | "grid";
  className?: string;
}
```

Dependencies: React state/effect, `cn()`.

Where used: `Hero`.

Accessibility notes: `aria-hidden` and `pointer-events-none` keep it out of the accessibility tree and interaction flow.

Future improvements: It could optionally expose intensity or color tokens for future sections.

## Layout Components

### Navbar

File: [frontend/src/components/layout/Navbar.tsx](../frontend/src/components/layout/Navbar.tsx)

Purpose: Sticky site navigation with scroll-aware styling, desktop links, mobile drawer, active section highlighting, and theme toggle.

Props: None.

Dependencies: `usePathname`, `useActiveSection`, `AnimatePresence`, `motion`, `Menu`, `X`, `ThemeToggle`, `SocialButton`, `socialIconMap`, navigation config, site config.

Where used: Root layout.

Accessibility notes: Good baseline. It exposes `aria-expanded`, `aria-controls`, dialog semantics for the mobile menu, and focus return to the hamburger button.

Future improvements: The current mobile menu is functional, but once more routes exist it may need route-aware grouping.

### Footer

File: [frontend/src/components/layout/Footer.tsx](../frontend/src/components/layout/Footer.tsx)

Purpose: Site-wide footer with brand, navigation, socials, and copyright.

Props: None.

Dependencies: Navigation config, site config, `SocialButton`, `socialIconMap`, `cn()`.

Where used: Root layout.

Accessibility notes: Uses a footer landmark and a labeled nav region.

Future improvements: If the site gains more route depth, the footer may need more explicit site-map organization.

### ThemeToggle

File: [frontend/src/components/layout/ThemeToggle.tsx](../frontend/src/components/layout/ThemeToggle.tsx)

Purpose: Switches between light and dark mode using `next-themes`.

Props:

```tsx
interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "default";
}
```

Dependencies: `useTheme`, `framer-motion`, `AnimatePresence`, `Sun`, `Moon`, `cn()`.

Where used: `Navbar`.

Accessibility notes: The action-oriented `aria-label` and `aria-pressed` are correct. The mounted placeholder prevents hydration mismatch.

Future improvements: None required.

## Base UI Wrappers

### ui/button

File: [frontend/src/components/ui/button.tsx](../frontend/src/components/ui/button.tsx)

Purpose: Base-ui button primitive wrapped with project tokens.

Where used: Not currently referenced by the custom design-system components, which use their own CTA implementation.

Accessibility notes: It inherits the accessibility behavior of the base-ui primitive.

Future improvements: Decide whether the project should standardize on this primitive or continue using the custom CTA components only.

### ui/tooltip

File: [frontend/src/components/ui/tooltip.tsx](../frontend/src/components/ui/tooltip.tsx)

Purpose: Base-ui tooltip wrapper used by the root tooltip provider.

Where used: [frontend/src/providers/TooltipProvider.tsx](../frontend/src/providers/TooltipProvider.tsx).

Accessibility notes: Uses a portal and ARIA-aware primitives from base-ui.

Future improvements: None required.

## Reuse Assessment

Reusable component quality is generally strong. The current gap is not component quality but missing content composition around those components. The design system is ready for expansion; the app shell is not yet populated with the planned section modules.

**File**: `src/components/common/Button.tsx`

**Purpose**: Single-component API wrapping `PrimaryButton`/`SecondaryButton` via `variant` prop.

**Props**:
```tsx
interface ButtonProps extends ButtonBase {
  variant?: "primary" | "secondary";  // default: "primary"
}
```

**Usage**:
```tsx
import { Button } from "@/components/common";

<Button>Primary action</Button>
<Button variant="secondary" size="lg" icon={<ArrowRight />}>Learn More</Button>
<Button href="https://github.com" icon={<Github />} variant="secondary">View Source</Button>
```

---

## Badges

### Badge

**File**: `src/components/common/Badge.tsx`

**Purpose**: Small inline label for tags, statuses, categories.

**Props**:
```tsx
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "muted" | "brand" | "outline" | "success" | "warning" | "destructive";
  size?: "sm" | "default" | "lg";  // default: "default"
}
```

**Variants**:
| Variant | Light Mode | Dark Mode | Use Case |
|---------|------------|-----------|----------|
| `default` | bg-primary/10 text-primary | bg-primary/10 text-primary | Neutral tags |
| `secondary` | bg-secondary text-secondary-foreground | bg-secondary text-secondary-foreground | Subtle tags |
| `muted` | bg-muted text-muted-foreground | bg-muted text-muted-foreground | Low emphasis |
| `brand` | bg-brand/10 text-brand | bg-brand/10 text-brand | Brand highlights |
| `outline` | border border-border | border border-border | Outlined style |
| `success` | green-500/10 text-green-700 | green-500/10 text-green-400 | Positive states |
| `warning` | amber-500/10 text-amber-700 | amber-500/10 text-amber-400 | Caution states |
| `destructive` | destructive/10 text-destructive | destructive/10 text-destructive | Error/danger |

**Usage**:
```tsx
import { Badge } from "@/components/common";

<Badge variant="brand">AI / ML</Badge>
<Badge variant="success" size="sm">Active</Badge>
<Badge variant="warning" size="sm">In Progress</Badge>
```

**Dependencies**: `class-variance-authority`

**Future Improvements**: Add `icon` prop for leading icon.

---

### SkillBadge

**File**: `src/components/common/SkillBadge.tsx`

**Purpose**: Animated badge for technical skills with proficiency indicator (expert/proficient/familiar).

**Props**:
```tsx
interface SkillBadgeProps {
  name: string;
  category?: SkillCategory;
  proficiency?: "expert" | "proficient" | "familiar";  // default: "proficient"
  showIndicator?: boolean;  // default: true
  className?: string;
}
```

**Proficiency Mapping**:
| Level | Badge Variant | Dot Color |
|-------|---------------|-----------|
| `expert` | `brand` | `bg-brand` |
| `proficient` | `secondary` | `bg-primary/60` |
| `familiar` | `muted` | `bg-muted-foreground/50` |

**Behavior**:
- Wraps `Badge` in `motion.div` with `scalePop` variant
- Designed for use inside `staggerContainer` parent
- `aria-label` encodes name + proficiency for accessibility

**Usage**:
```tsx
import { SkillBadge } from "@/components/common";

<SkillBadge name="TypeScript" proficiency="expert" />
<SkillBadge name="Rust" proficiency="familiar" showIndicator={false} />
```

**Dependencies**: `Badge`, `scalePop` (from `lib/motion`), `framer-motion`

**Future Improvements**: Add `icon` prop for technology logo.

---

## Cards

### Card

**File**: `src/components/common/Card.tsx`

**Purpose**: Base surface component for content grouping. Supports entrance animation and hover lift.

**Props**:
```tsx
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "default" | "lg";  // default: "default"
  animated?: boolean;                           // default: false
  hoverable?: boolean;                          // default: false
}
```

**Padding Variants**:
| Padding | Value |
|---------|-------|
| `none` | (none) |
| `sm` | p-4 |
| `default` | p-5 md:p-6 |
| `lg` | p-6 md:p-8 |

**Behavior**:
- `animated`: Uses `fadeUp` variant — needs `staggerContainer` parent
- `hoverable`: Uses `hoverLift` variant on inner wrapper
- Both can be combined
- Non-interactive `<div>` — parent provides link/button semantics

**Usage**:
```tsx
import { Card } from "@/components/common";

<Card animated hoverable padding="lg">
  <h3>Card Title</h3>
  <p>Content...</p>
</Card>
```

**Dependencies**: `fadeUp`, `hoverLift` (from `lib/motion`), `framer-motion`, `class-variance-authority`

---

### GlassCard

**File**: `src/components/common/Card.tsx`

**Purpose**: Frosted-glass surface for floating over gradient/image backgrounds.

**Props**: Same as `Card` (exported as `GlassCardProps`)

**Visual**: `bg-background/60 backdrop-blur-md border border-border/40` with custom box-shadow

**Usage**:
```tsx
import { GlassCard } from "@/components/common";

<Section>
  <AnimatedBackground variant="gradient" />
  <div className="relative z-10">
    <GlassCard animated padding="lg">Floating content</GlassCard>
  </div>
</Section>
```

---

### ProjectCard

**File**: `src/components/common/ProjectCard.tsx`

**Purpose**: Layout-only card for portfolio projects. All content from `Project` data type.

**Props**:
```tsx
interface ProjectCardProps {
  project: Project;  // from types/project.ts
  className?: string;
}
```

**Layout**:
1. Cover image (optional, aspect-video, Next.js Image with hover scale)
2. Title + status badges (featured, in-progress, archived)
3. 2-line-clamped description
4. Tag chips (max 5, overflow as "+N")
5. Footer: GitHub link | Live Demo + Details link

**Usage**:
```tsx
import { ProjectCard } from "@/components/common";
import { featuredProjects } from "@/data/projects";

<motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={defaultViewport}>
  {featuredProjects.map(project => (
    <motion.div key={project.slug} variants={fadeUp}>
      <ProjectCard project={project} />
    </motion.div>
  ))}
</motion.div>
```

**Dependencies**: `next/image`, `next/link`, `lucide-react` (ArrowUpRight), `Badge`, `Card`, `GithubIcon` (from SocialIcons)

---

### TimelineCard

**File**: `src/components/common/TimelineCard.tsx`

**Purpose**: Layout-only card for a single timeline entry (experience, education, achievement, certification).

**Props**:
```tsx
interface TimelineCardProps {
  item: TimelineItem;  // from types/timeline.ts
  isLast?: boolean;    // hides connector line
  className?: string;
}
```

**Layout**:
- Left connector line (via `border-l` on parent, dot via absolute positioned element)
- Type badge (color-coded: experience=brand, education=secondary, achievement=success, certification=default)
- Title (linked if `url` present)
- Subtitle + date range (uses `<time>` element)
- "Current" badge if `current=true`
- Description (optional)
- Tags (max 8, muted badges)

**Type → Variant Mapping**:
| Type | Badge Variant |
|------|---------------|
| `experience` | `brand` |
| `education` | `secondary` |
| `achievement` | `success` |
| `certification` | `default` |

**Usage**:
```tsx
import { TimelineCard } from "@/components/common";
import { timeline } from "@/data/timeline";

<motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={defaultViewport}>
  {timeline.map((item, index) => (
    <motion.div key={item.id} variants={fadeUp}>
      <TimelineCard item={item} isLast={index === timeline.length - 1} />
    </motion.div>
  ))}
</motion.div>
```

**Dependencies**: `Badge`, `fadeUp` (from `lib/motion`), `framer-motion`

---

## Social

### SocialButton

**File**: `src/components/common/SocialButton.tsx`

**Purpose**: Social link button with icon-only or pill (icon + label) variants.

**Props**:
```tsx
interface SocialButtonProps {
  label: string;           // Accessible label + visible text in pill variant
  href: string;            // Empty string → renders null (no broken links in dev)
  icon: React.ReactNode;   // From socialIconMap
  variant?: "icon" | "pill";  // default: "icon"
  size?: "sm" | "default";    // default: "default"
  external?: boolean;     // default: true
}
```

**Behavior**:
- `href=""` → returns `null` (hides during development)
- External links → `target="_blank" rel="noopener noreferrer"`
- `aria-label` = label
- Icons are `aria-hidden`

**Usage**:
```tsx
import { SocialButton } from "@/components/common";
import { GithubIcon } from "@/components/common/SocialIcons";

<SocialButton label="GitHub" href="https://github.com/username" icon={<GithubIcon />} />
<SocialButton label="LinkedIn" href="https://linkedin.com/in/username" icon={<LinkedinIcon />} variant="pill" />
```

**Dependencies**: `PrimaryButton`/`SecondaryButton` patterns (inline implementation)

---

### SocialIcons

**File**: `src/components/common/SocialIcons.tsx`

**Purpose**: Inline SVG brand icons (GitHub, LinkedIn, Twitter/X) — consistent 1em sizing, currentColor fill.

**Exports**:
- `GithubIcon`, `LinkedinIcon`, `TwitterIcon` — components
- `socialIconMap` — registry mapping string keys to components

**Usage**:
```tsx
import { socialIconMap } from "@/components/common/SocialIcons";

<SocialButton icon={socialIconMap.Github} ... />
```

**Dependencies**: None (inline SVG)

**Future Improvements**: Add more platforms (YouTube, Dev.to, Medium, Bluesky, Mastodon) to match `SocialPlatform` type.

---

## Background

### AnimatedBackground

**File**: `src/components/common/AnimatedBackground.tsx`

**Purpose**: Purely decorative animated gradient/dot/grid background. Renders client-only to avoid SSR mismatch.

**Props**:
```tsx
interface AnimatedBackgroundProps {
  variant?: "dots" | "gradient" | "grid";  // default: "dots"
  className?: string;
}
```

**Variants**:
| Variant | Description |
|---------|-------------|
| `dots` | Subtle radial dot grid (opacity 0.35 light / 0.15 dark) |
| `gradient` | Three radial brand-color blobs with float animation |
| `grid` | Fine line grid (opacity 0.04 light / 0.07 dark) |

**Behavior**:
- `aria-hidden="true"`, `pointer-events-none`
- Only renders after `useEffect` mount (client-side)
- Respects `prefers-reduced-motion` via `motion-safe:` CSS prefix
- Parent must be `relative overflow-hidden`

**Usage**:
```tsx
import { AnimatedBackground } from "@/components/common";

<Section id="hero" animated={false}>
  <AnimatedBackground variant="gradient" />
  <div className="relative z-10">
    <Heading size="h1">Title</Heading>
  </div>
</Section>
```

**Dependencies**: `framer-motion` not used (CSS animations only)

---

## Layout Components

### Navbar

**File**: `src/components/layout/Navbar.tsx`

**Purpose**: Sticky top navigation with desktop links, mobile drawer, theme toggle, active section highlighting.

**Features**:
- Transparent at top → backdrop-blur + border after 10px scroll
- Desktop: inline nav links + social icons + theme toggle
- Mobile: hamburger → full-height slide-down menu (AnimatePresence + fadeDown)
- Active section tracking via `useActiveSection` hook (IntersectionObserver)
- Route links (`/writing`) active on pathname match
- Anchor links (`/#about`) active when section visible (home page only)
- ESC closes mobile menu, focus returns to hamburger
- Body scroll lock when mobile menu open
- `role="dialog" aria-modal="true"` on mobile menu

**Dependencies**: `primaryNavLinks`, `socialLinks` (config/navigation), `siteConfig` (config/site), `ThemeToggle`, `SocialButton`, `socialIconMap`, `useActiveSection`, `fadeDown` (lib/motion)

**Props**: None (self-contained)

---

### Footer

**File**: `src/components/layout/Footer.tsx`

**Purpose**: Site-wide footer with brand, navigation links, social buttons, copyright.

**Layout**:
- Mobile: stacked (brand → nav → socials → copyright)
- Desktop: 3-column (brand | nav | socials)

**Dependencies**: `primaryNavLinks`, `socialLinks` (config/navigation), `siteConfig` (config/site), `SocialButton`, `socialIconMap`

**Props**: None

---

### ThemeToggle

**File**: `src/components/layout/ThemeToggle.tsx`

**Purpose**: Icon button switching light/dark mode with animated Sun/Moon swap.

**Props**:
```tsx
interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "default";  // default: "default"
}
```

**Behavior**:
- `mounted` guard prevents hydration mismatch
- `AnimatePresence` swaps icons with scale+fade+rotate animation
- Controlled by `next-themes` — no local state
- `aria-label` reflects action ("Switch to dark mode"), not state
- `aria-pressed` indicates current mode

**Dependencies**: `next-themes` (`useTheme`), `lucide-react` (Sun, Moon), `framer-motion` (AnimatePresence)

---

## Providers

### Providers (Root Composition)

**File**: `src/providers/Providers.tsx`

**Purpose**: Composes all application-level providers in correct order.

**Structure**:
```tsx
<ThemeProvider>
  <MotionConfig reducedMotion="user">
    <ReactQueryProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </ReactQueryProvider>
  </MotionConfig>
</ThemeProvider>
```

**Usage**: Single import in `app/layout.tsx`

---

### ThemeProvider

**File**: `src/providers/ThemeProvider.tsx`

**Purpose**: Wraps `next-themes` `ThemeProvider` with config.

**Config**: `attribute="class"`, `defaultTheme="system"`, `enableSystem=true`

---

### TooltipProvider

**File**: `src/providers/TooltipProvider.tsx`

**Purpose**: Wraps `@base-ui/react` `TooltipProvider` with delay.

**Config**: `delay={300}`

---

### ReactQueryProvider

**File**: `src/providers/ReactQueryProvider.tsx`

**Purpose**: Stubbed passthrough — ready for `@tanstack/react-query` activation in Phase 4.

---

## Hooks

### useActiveSection

**File**: `src/hooks/useActiveSection.ts`

**Purpose**: Tracks which page section is currently in viewport using IntersectionObserver.

**Signature**:
```tsx
function useActiveSection(sectionIds: string[]): string | null
```

**Behavior**:
- Observes elements by ID
- Returns topmost visible section (checked in provided order)
- `rootMargin: "-10% 0px -60% 0px"` — triggers before section fully enters
- Doesn't reset when between sections (keeps last active highlighted)

**Usage**:
```tsx
const activeSection = useActiveSection(["about", "projects", "skills", "experience", "contact"]);
```

---

### useMediaQuery

**File**: `src/hooks/useMediaQuery.ts`

**Purpose**: Reactive media query listener.

**Signature**:
```tsx
function useMediaQuery(query: string): boolean
```

**Named Breakpoints** (via `breakpoints` from `config/theme.ts`):
```tsx
const isMobile = useMediaQuery(breakpoints.sm);   // < 640px
const isTablet = useMediaQuery(breakpoints.md);   // < 768px
const isDesktop = useMediaQuery(breakpoints.lg);  // < 1024px
```

---

### useReducedMotion

**File**: `src/hooks/useReducedMotion.ts`

**Purpose**: Reactive `prefers-reduced-motion` reader.

**Signature**:
```tsx
function useReducedMotion(): boolean
```

**Usage**:
```tsx
const reducedMotion = useReducedMotion();
return !reducedMotion && <AnimatedBackground variant="gradient" />;
```

---

### useScrollReveal

**File**: `src/hooks/useScrollReveal.ts`

**Purpose**: Wrapper around Framer Motion's `useInView` with design system defaults.

**Signature**:
```tsx
function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: UseInViewOptions
): [React.RefObject<T>, boolean]
```

**Defaults**: `once: true`, `margin: "-80px"`

**Usage**:
```tsx
const [ref, isInView] = useScrollReveal();
return <div ref={ref}>{isInView ? <AnimatedCounter /> : 0}</div>;
```

---

## Utility

### cn

**File**: `src/lib/utils.ts`

**Purpose**: Class name utility combining `clsx` + `tailwind-merge`.

**Signature**:
```tsx
function cn(...inputs: ClassValue[]): string
```

**Usage**:
```tsx
<div className={cn("base-classes", conditional && "conditional-classes", props.className)} />
```