# Components

This document catalogs every reusable component in the design system. Components are organized by category.

---

## Layout Primitives

### Container

**File**: `src/components/common/Container.tsx`

**Purpose**: Horizontal width constraint for page content. Pure layout primitive — no visual styling.

**Props**:
```tsx
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "narrow" | "default" | "wide" | "full";  // default: "default"
  as?: React.ElementType;                           // default: "div"
}
```

**Variants**:
| Size | Max Width | Use Case |
|------|-----------|----------|
| `narrow` | 768px (max-w-3xl) | Reading/prose content |
| `default` | 1152px (max-w-6xl) | Standard page sections |
| `wide` | 1280px (max-w-7xl) | Full-bleed with generous gutters |
| `full` | 100% | No width constraint |

**Usage**:
```tsx
import { Container } from "@/components/common";

<Container size="default">
  <Section>...</Section>
</Container>

<Container size="narrow" as="main">
  <article>...</article>
</Container>
```

**Dependencies**: `clsx`, `tailwind-merge` (via `cn`), `class-variance-authority`

**Future Improvements**: Add `center` variant for centered content without max-width constraint.

---

### Section

**File**: `src/components/common/Section.tsx`

**Purpose**: Full-width page section wrapper with consistent vertical padding and scroll-triggered stagger animation.

**Props**:
```tsx
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;                    // Anchor target for navigation
  containerSize?: "narrow" | "default" | "wide" | "full";  // default: "default"
  animated?: boolean;             // default: true
}
```

**Behavior**:
- Wraps content in `Container` with `.section-padding` (py-20 md:py-28)
- When `animated=true`: uses `staggerContainer` variant + `whileInView` + `defaultViewport`
- Children with `variants` prop receive staggered entrance

**Usage**:
```tsx
import { Section, SectionHeader } from "@/components/common";

<Section id="about" containerSize="narrow" animated>
  <SectionHeader
    overline="About Me"
    heading="Who I Am"
    description="A paragraph of supporting text."
  />
  <p>Section content...</p>
</Section>
```

**Dependencies**: `Container`, `staggerContainer`, `defaultViewport` (from `lib/motion`), `framer-motion`

**Future Improvements**: Add `background` prop for optional background color/image.

---

### SectionHeader

**File**: `src/components/common/Section.tsx` (exported from same file)

**Purpose**: Standardized header for every portfolio section — overline, heading, optional description.

**Props**:
```tsx
interface SectionHeaderProps {
  overline?: string;              // Small label above heading
  heading: string;                // Primary section title
  description?: string;           // Supporting paragraph
  align?: "left" | "center";      // default: "center"
  className?: string;
}
```

**Usage**:
```tsx
<SectionHeader
  overline="What I've Built"
  heading="Projects"
  description="Selected work demonstrating AI engineering and full-stack development."
  align="center"
/>
```

**Dependencies**: `fadeUp` (from `lib/motion`), `framer-motion`

**Future Improvements**: Add `action` slot for CTA button in header.

---

## Typography

### Heading

**File**: `src/components/common/Typography.tsx`

**Purpose**: Typographically consistent heading at any level. Polymorphic `as` prop separates semantic HTML from visual size.

**Props**:
```tsx
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";  // default: "h2"
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}
```

**Size Scale**:
| Size | Mobile | Desktop |
|------|--------|---------|
| `h1` | 4xl | 6xl |
| `h2` | 3xl | 4xl |
| `h3` | 2xl | 3xl |
| `h4` | xl | 2xl |
| `h5` | lg | xl |
| `h6` | base | lg |

**Usage**:
```tsx
import { Heading } from "@/components/common";

<Heading size="h1">Building Intelligent Systems</Heading>
<Heading as="h3" size="h2">Visual h2, Semantic h3</Heading>
```

**Dependencies**: `class-variance-authority`

**Future Improvements**: Add `gradient` prop to apply gradient text automatically.

---

### Subheading

**File**: `src/components/common/Typography.tsx`

**Purpose**: Overline label in monospace uppercase — typically placed above a section heading.

**Props**:
```tsx
interface SubheadingProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "default" | "lg";  // default: "default"
  as?: "p" | "span" | "div";
}
```

**Usage**:
```tsx
import { Subheading, Heading } from "@/components/common";

<Subheading>What I've Built</Subheading>
<Heading size="h2">Projects</Heading>
```

**Dependencies**: `class-variance-authority`

---

### Paragraph / Text

**File**: `src/components/common/Typography.tsx`

**Purpose**: Body text with consistent leading and color. `Text` is an exported alias for `Paragraph`.

**Props**:
```tsx
interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "default" | "lead" | "muted" | "small";  // default: "default"
  as?: "p" | "span" | "div";
}
```

**Variants**:
| Variant | Style | Use Case |
|---------|-------|----------|
| `default` | text-base | Standard body copy |
| `lead` | text-lg text-muted-foreground | Larger intro paragraph |
| `muted` | text-sm text-muted-foreground | Secondary supporting text |
| `small` | text-sm | Caption/fine print |

**Usage**:
```tsx
import { Paragraph, Text } from "@/components/common";

<Paragraph>Standard body text.</Paragraph>
<Paragraph variant="lead">Larger intro paragraph.</Paragraph>
<Text variant="muted">Secondary note.</Text>
```

---

### GradientText

**File**: `src/components/common/Typography.tsx`

**Purpose**: Inline text with animated gradient fill. Renders as `<span>` by default for nesting inside headings.

**Props**:
```tsx
interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "div" | "p";
}
```

**Usage**:
```tsx
import { Heading, GradientText } from "@/components/common";

<Heading size="h1">
  Building <GradientText>intelligent</GradientText> systems
</Heading>
```

**Dependencies**: Uses CSS `.gradient-text` utility from `globals.css`

---

### InlineCode

**File**: `src/components/common/Typography.tsx`

**Purpose**: Styled inline code snippet for prose (skill names, commands, etc.).

**Props**: `React.HTMLAttributes<HTMLElement>`

**Usage**:
```tsx
import { Paragraph, InlineCode } from "@/components/common";

<Paragraph>
  Run <InlineCode>npm run dev</InlineCode> to start.
</Paragraph>
```

---

## Buttons

### PrimaryButton / SecondaryButton

**File**: `src/components/common/Buttons.tsx`

**Purpose**: Polymorphic buttons — render as `<button>` by default, or `<a>` when `href` is supplied. Includes Framer Motion tap animation.

**Shared Props**:
```tsx
type ButtonBase = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";  // default: "right"
  size?: "sm" | "default" | "lg";   // default: "default"
};

type PrimaryButtonProps = ButtonBase & (
  | { href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBase>
  | { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBase>
);
```

**Size Classes**:
| Size | Height | Padding | Text | Icon |
|------|--------|---------|------|------|
| `sm` | 32px (h-8) | px-3.5 | text-sm | size-3.5 |
| `default` | 40px (h-10) | px-5 | text-sm | size-4 |
| `lg` | 48px (h-12) | px-7 | text-base | size-5 |

**Behavior**:
- External hrefs (`http/https`) → `target="_blank" rel="noopener noreferrer"`
- `disabled` → `aria-disabled`, `tabIndex=-1`, `pointer-events-none`, `opacity-50`
- Framer Motion `tapPress` variant: scale 0.97 on tap

**Usage**:
```tsx
import { PrimaryButton, SecondaryButton } from "@/components/common";

<PrimaryButton>View Projects</PrimaryButton>
<PrimaryButton href="https://github.com" icon={<Github />}>Source</PrimaryButton>
<SecondaryButton variant="secondary" size="lg" href="/projects">All Projects</SecondaryButton>
```

**Dependencies**: `framer-motion` (`tapPress` from `lib/motion`)

**Future Improvements**: Add `loading` prop with spinner state.

---

### Button (Unified)

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