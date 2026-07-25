import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Typography.tsx — typed typographic components.
 *
 * Exports: Heading, Subheading, Paragraph, GradientText, InlineCode
 *
 * Design decisions:
 *   - Uses cva for variant management (consistent with shadcn/ui patterns)
 *   - Polymorphic `as` prop lets callers control the HTML element
 *     independently from the visual style (e.g., <Heading as="p"> for SEO)
 *   - All components accept className for escape-hatch overrides
 *   - No hardcoded colors — uses CSS variables via Tailwind tokens
 *
 * Accessibility:
 *   - Heading hierarchy is the caller's responsibility via `as` prop
 *   - Components render semantically correct HTML by default
 *   - No ARIA attributes added — consumers add context-specific ARIA
 */

// ─── Heading ──────────────────────────────────────────────────────────────────

const headingVariants = cva("font-heading font-semibold tracking-tight text-foreground", {
  variants: {
    size: {
      h1: "text-4xl md:text-5xl lg:text-6xl leading-[1.1]",
      h2: "text-3xl md:text-4xl leading-[1.15]",
      h3: "text-2xl md:text-3xl leading-[1.2]",
      h4: "text-xl md:text-2xl leading-[1.25]",
      h5: "text-lg md:text-xl leading-snug",
      h6: "text-base md:text-lg leading-snug",
    },
  },
  defaultVariants: { size: "h2" },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /** HTML element to render. Defaults to the element matching `size`. */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

/**
 * Heading — renders a typographically consistent heading at any level.
 *
 * @example
 * <Heading size="h1">Hello World</Heading>
 * <Heading as="h3" size="h2">Visual h2, semantic h3</Heading>
 */
export function Heading({ as, size = "h2", className, children, ...props }: HeadingProps) {
  const Tag = as ?? (size as "h1" | "h2" | "h3" | "h4" | "h5" | "h6") ?? "h2";
  return (
    <Tag className={cn(headingVariants({ size }), className)} {...props}>
      {children}
    </Tag>
  );
}

// ─── Subheading ───────────────────────────────────────────────────────────────

const subheadingVariants = cva(
  "font-mono font-semibold uppercase tracking-widest text-brand",
  {
    variants: {
      size: {
        sm: "text-[0.65rem]",
        default: "text-xs",
        lg: "text-sm",
      },
    },
    defaultVariants: { size: "default" },
  },
);

export interface SubheadingProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof subheadingVariants> {
  as?: "p" | "span" | "div";
}

/**
 * Subheading — overline label rendered in monospace uppercase.
 * Typically placed above a section heading to provide context.
 *
 * @example
 * <Subheading>What I've Built</Subheading>
 * <Heading size="h2">Projects</Heading>
 */
export function Subheading({ as: Tag = "p", size, className, ...props }: SubheadingProps) {
  return <Tag className={cn(subheadingVariants({ size }), className)} {...props} />;
}

// ─── Paragraph ────────────────────────────────────────────────────────────────

const paragraphVariants = cva("text-foreground leading-relaxed", {
  variants: {
    variant: {
      default: "text-base",
      lead: "text-lg text-muted-foreground",
      muted: "text-sm text-muted-foreground",
      small: "text-sm",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {
  as?: "p" | "span" | "div";
}

/**
 * Paragraph — body text with consistent leading and color.
 *
 * @example
 * <Paragraph>Standard body text.</Paragraph>
 * <Paragraph variant="lead">A larger intro paragraph.</Paragraph>
 * <Paragraph variant="muted">Secondary supporting text.</Paragraph>
 */
export function Paragraph({ as: Tag = "p", variant, className, ...props }: ParagraphProps) {
  return <Tag className={cn(paragraphVariants({ variant }), className)} {...props} />;
}

// ─── GradientText ─────────────────────────────────────────────────────────────

/**
 * GradientText — inline text with an animated gradient fill.
 *
 * Renders as a <span> by default so it can be nested inside headings.
 * The gradient direction and colors are controlled by className overrides.
 *
 * Default gradient: brand → foreground (subtle, theme-aware).
 *
 * @example
 * <Heading size="h1">
 *   Building <GradientText>intelligent</GradientText> systems
 * </Heading>
 */
export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "div" | "p";
}

export function GradientText({ as: Tag = "span", className, ...props }: GradientTextProps) {
  return (
    <Tag
      className={cn(
        "bg-gradient-to-r from-brand via-brand/80 to-foreground",
        "bg-clip-text text-transparent",
        className,
      )}
      {...props}
    />
  );
}

// ─── InlineCode ───────────────────────────────────────────────────────────────

/**
 * InlineCode — styled inline code snippet.
 * Distinct from the <code> block in globals.css — this is for inline use
 * within prose, such as skill names or command references.
 *
 * @example
 * <Paragraph>Run <InlineCode>npm run dev</InlineCode> to start.</Paragraph>
 */
export function InlineCode({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        "font-mono text-[0.875em] font-medium",
        "rounded-md bg-muted px-1.5 py-0.5",
        "text-foreground",
        className,
      )}
      {...props}
    />
  );
}

// ─── Text (alias for Paragraph) ───────────────────────────────────────────────

/**
 * Text — semantic alias for Paragraph.
 *
 * Exported as `Text` to match the design system spec.
 * All props are identical to Paragraph — use whichever name reads
 * more naturally at the call site.
 *
 * @example
 * <Text>Standard body copy.</Text>
 * <Text variant="lead">Larger intro paragraph.</Text>
 * <Text variant="muted">Secondary note.</Text>
 */
export const Text = Paragraph;
export type TextProps = ParagraphProps;
