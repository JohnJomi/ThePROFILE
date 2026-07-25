import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Container — layout primitive that constrains content width.
 *
 * The Container has no visual styling — no background, no border, no padding
 * beyond horizontal gutters. It is a pure layout primitive.
 *
 * Variants:
 *   - default   max-w-6xl  (1152px) — standard page sections
 *   - wide      max-w-7xl  (1280px) — full-bleed with generous gutters
 *   - narrow    max-w-3xl  ( 768px) — reading/prose content
 *   - full      max-w-full           — no width constraint
 *
 * Accessibility: renders a generic <div> by default.
 * Consumers provide semantic meaning via `as` or parent elements.
 *
 * Used by: Section, Navbar, Footer, and any component that needs
 *          consistent horizontal padding at the page level.
 */

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      narrow: "max-w-3xl",
      default: "max-w-6xl",
      wide: "max-w-7xl",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
}

export function Container({ className, size, as: Comp = "div", ...props }: ContainerProps) {
  return <Comp className={cn(containerVariants({ size }), className)} {...props} />;
}
