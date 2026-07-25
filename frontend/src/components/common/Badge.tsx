import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Badge — small label for tags, statuses, and categories.
 *
 * Variants mirror shadcn/ui naming so the API feels familiar.
 * All variants respect light/dark mode via CSS variables.
 *
 * Accessibility:
 *   - Renders as <span> (inline, non-interactive)
 *   - Add role="status" on the parent if the badge is a live value
 *
 * Used by: SkillBadge, ProjectCard tags, status indicators.
 */

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary border border-primary/20",
        secondary: "bg-secondary text-secondary-foreground border border-border",
        muted: "bg-muted text-muted-foreground border border-border/60",
        brand: "bg-brand/10 text-brand border border-brand/25",
        outline: "text-foreground border border-border bg-transparent",
        success:
          "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20",
        warning:
          "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20",
        destructive: "bg-destructive/10 text-destructive border border-destructive/20",
      },
      size: {
        sm: "px-2 py-0.5 text-[0.65rem]",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * @example
 * <Badge variant="brand">AI / ML</Badge>
 * <Badge variant="success" size="sm">Active</Badge>
 */
export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { badgeVariants };
