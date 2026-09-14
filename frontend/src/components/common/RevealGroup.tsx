"use client";

import { motion } from "framer-motion";

import { defaultViewport, staggerContainer, staggerContainerSlow } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * RevealGroup — supplies the variant driver a grid of `Card animated` needs.
 *
 * `Card animated` declares `variants={fadeUp}` but has no `initial`/`animate` of
 * its own, so it only animates when an ancestor propagates variant state. On
 * pages whose sections are `animated={false}` there is no such ancestor and the
 * cards never move. Wrapping a grid in this component provides the missing
 * `staggerContainer` driver, so the existing card variants come alive with no
 * changes to the cards themselves.
 *
 * Deliberately a one-shot in-view reveal rather than a scroll-scrubbed one:
 * content cards that re-animate on every scroll direction change are
 * distracting and hurt readability. The scrubbed choreography belongs to the
 * hero and the section headings.
 *
 * Reduced motion needs no handling here — these are variant animations, which
 * `<MotionConfig reducedMotion="user" />` in Providers collapses automatically.
 *
 * @example
 * <RevealGroup className="grid gap-6 md:grid-cols-2">
 *   {items.map((i) => <Card key={i.id} animated hoverable>…</Card>)}
 * </RevealGroup>
 */

export interface RevealGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Use the slower 0.15s stagger. Good for 3-or-fewer large items. */
  slow?: boolean;
  // Omit native drag events that conflict with Framer Motion's drag API
  onDrag?: never;
  onDragEnd?: never;
  onDragEnter?: never;
  onDragExit?: never;
  onDragLeave?: never;
  onDragOver?: never;
  onDragStart?: never;
}

export function RevealGroup({ className, slow = false, children, ...props }: RevealGroupProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={slow ? staggerContainerSlow : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}
