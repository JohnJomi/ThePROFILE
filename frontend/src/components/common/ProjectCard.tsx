import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

import { Badge } from "./Badge";
import { Card } from "./Card";
import { GithubIcon } from "./SocialIcons";

/**
 * ProjectCard — layout-only card for a portfolio project.
 *
 * Renders structured project data into a consistent card layout.
 * No hardcoded content — all text comes from the `project` prop.
 *
 * Layout (top to bottom):
 *   [Cover image — optional, aspect-video]
 *   Title + status badges
 *   2-line-clamped description
 *   Tag chips (max 5, overflow shown as "+N")
 *   Footer: GitHub link (left) | Live Demo + Details (right)
 *
 * Accessibility:
 *   - Card title is a <Link> with descriptive aria-label
 *   - External links have aria-label naming the destination
 *   - Cover image alt is derived from project title
 *
 * Used by: Projects section.
 */

export interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: Readonly<ProjectCardProps>) {
  const { slug, title, description, tags, coverImage, githubUrl, liveUrl, status, featured } =
    project;

  return (
    <Card
      animated
      hoverable
      padding="none"
      className={cn(
        "group flex flex-col overflow-hidden",
        featured
          ? "border-white/25 bg-white/82 shadow-[0_24px_70px_rgb(15_23_42/0.14),0_6px_20px_rgb(15_23_42/0.08)] dark:border-white/15 dark:bg-white/12 dark:shadow-[0_30px_90px_rgb(0_0_0/0.46),0_8px_24px_rgb(0_0_0/0.2)]"
          : "border-white/15 bg-white/75 shadow-[0_14px_40px_rgb(15_23_42/0.1),0_2px_10px_rgb(15_23_42/0.05)] dark:border-white/10 dark:bg-white/10 dark:shadow-[0_18px_60px_rgb(0_0_0/0.34)]",
        className,
      )}
    >
      {/* Cover image */}
      {coverImage && (
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={coverImage}
            alt={`${title} project cover`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        {/* Title + status badges */}
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/projects/${slug}`}
            className="text-lg font-semibold leading-snug tracking-tight hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            aria-label={`View ${title} project details`}
          >
            {title}
          </Link>
          <div className="flex shrink-0 items-center gap-1.5">
            {featured && (
              <Badge variant="brand" size="sm">
                Featured
              </Badge>
            )}
            {status === "in-progress" && (
              <Badge variant="warning" size="sm">
                In Progress
              </Badge>
            )}
            {status === "archived" && (
              <Badge variant="muted" size="sm">
                Archived
              </Badge>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">{description}</p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 5).map((tag) => (
              <Badge key={tag} variant="muted" size="sm">
                {tag}
              </Badge>
            ))}
            {tags.length > 5 && (
              <Badge variant="muted" size="sm">
                +{tags.length - 5}
              </Badge>
            )}
          </div>
        )}

        {/* Footer links */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} source code on GitHub`}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <GithubIcon className="size-3.5" />
                Source
              </a>
            )}
          </div>
          <div className="flex items-center gap-3">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} live demo`}
                className="inline-flex items-center gap-1 text-xs font-medium text-brand hover:text-brand/80 transition-colors"
              >
                Live Demo
                <ArrowUpRight className="size-3" aria-hidden="true" />
              </a>
            )}
            <Link
              href={`/projects/${slug}`}
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Details →
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
