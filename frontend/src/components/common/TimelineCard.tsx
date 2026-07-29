"use client";

import { motion } from "framer-motion";

import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { TimelineItem, TimelineItemType } from "@/types/timeline";

import { Badge } from "./Badge";

/**
 * TimelineCard — layout-only card for a single timeline entry.
 *
 * Renders a TimelineItem with a vertical connector line on the left.
 * The vertical line is drawn via a CSS pseudo-element on the parent list
 * (managed by the timeline section, not this component).
 *
 * Layout:
 *   ● [dot]  Type badge
 *            Title
 *            Subtitle  ·  Date range
 *            Description (optional)
 *            [Tag] [Tag] ...
 *
 * Type → color mapping:
 *   experience    → brand
 *   education     → secondary
 *   achievement   → success
 *   certification → default
 *
 * Accessibility:
 *   - Uses <time> elements for machine-readable dates
 *   - Current/active items have aria-current="true"
 *
 * Used by: Experience/Timeline section.
 */

const typeVariant: Record<
  TimelineItemType,
  "brand" | "secondary" | "success" | "default"
> = {
  experience: "brand",
  education: "secondary",
  achievement: "success",
  certification: "default",
};

const typeLabel: Record<TimelineItemType, string> = {
  experience: "Experience",
  education: "Education",
  achievement: "Achievement",
  certification: "Certification",
};

function formatDate(iso: string): string {
  const [year, month] = iso.split("-");
  if (!month) return year ?? iso;
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export interface TimelineCardProps {
  item: TimelineItem;
  /** Whether this is the last card in the list (hides the connector line). */
  isLast?: boolean;
  className?: string;
}

export function TimelineCard({ item, isLast = false, className }: Readonly<TimelineCardProps>) {
  const { type, title, subtitle, date, endDate, description, tags, url, current } = item;

  let dateLabel = formatDate(date);
  if (endDate) {
    dateLabel = `${formatDate(date)} – ${formatDate(endDate)}`;
  } else if (current) {
    dateLabel = `${formatDate(date)} – Present`;
  }

  return (
    <motion.div
      variants={fadeUp}
      aria-current={current ? "true" : undefined}
      className={cn(
        "relative mb-4 rounded-2xl border border-white/15 bg-white/75 p-5 pl-10",
        "shadow-[0_14px_40px_rgb(15_23_42/0.08),0_2px_10px_rgb(15_23_42/0.04),inset_0_1px_0_rgb(255_255_255/0.45)] backdrop-blur-xl",
        "transition-all duration-300 ease-out dark:border-white/10 dark:bg-white/10",
        "dark:shadow-[0_20px_60px_rgb(0_0_0/0.34),0_2px_10px_rgb(0_0_0/0.18),inset_0_1px_0_rgb(255_255_255/0.08)]",
        className,
      )}
    >
      {/* Connector dot */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute left-4 top-6 size-[18px] flex-shrink-0 rounded-full border-2",
          "border-background bg-border shadow-[0_4px_10px_rgb(15_23_42/0.12)]",
          current && "border-brand bg-brand",
        )}
      />

      {/* Content */}
      <div className="flex flex-col gap-2">
        {/* Type badge */}
        <Badge variant={typeVariant[type]} size="sm">
          {typeLabel[type]}
        </Badge>

        {/* Title */}
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-semibold leading-snug hover:text-brand transition-colors focus-visible:outline-none focus-visible:underline"
          >
            {title}
          </a>
        ) : (
          <p className="text-base font-semibold leading-snug">{title}</p>
        )}

        {/* Subtitle and date */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <span>{subtitle}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={date}>{dateLabel}</time>
          {current && (
            <Badge variant="success" size="sm">
              Current
            </Badge>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.slice(0, 8).map((tag) => (
              <Badge key={tag} variant="muted" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
