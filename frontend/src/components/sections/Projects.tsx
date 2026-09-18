import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Section, SectionHeader } from "@/components/common";
import { ProjectReveal } from "@/components/sections/ProjectReveal";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

/** Slugs rendered as full-width showcase blocks, in display order. */
const showcaseSlugs = [
  "ieee-student-branch-erp",
  "eventra",
  "tycoon-2fa-detection",
  "skin-ai-bot",
] as const;

function formatStatus(status: string): { label: string; color: string } {
  if (status === "in-progress") {
    return { label: "In Development", color: "bg-accent-gold" };
  }
  if (status === "completed") {
    return { label: "Completed", color: "bg-accent-rust" };
  }
  return { label: status.replace(/-/g, " "), color: "bg-text-primary-inverse" };
}

function secondaryLinkLabel(project: Project): string {
  if (project.slug === "hrm-research-repository") return "Repository";
  if (project.slug === "ai-chatbot") return "Demo";
  return "Case Study";
}

/**
 * Splits `items` into `groups` chunks that differ in size by at most one, so the
 * supporting projects spread evenly through the gaps between showcase blocks.
 */
function distribute<T>(items: T[], groups: number): T[][] {
  const chunks: T[][] = Array.from({ length: groups }, () => []);
  items.forEach((item, index) => {
    chunks[index % groups].push(item);
  });
  return chunks;
}

function ShowcaseProject({ project, index }: { project: Project; index: number }) {
  const status = formatStatus(project.status);

  return (
    <article className="grid gap-8 border-t border-border-hairline pt-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-text-primary/60">
          <span className={cn("size-2 rounded-full", status.color)} />
          <span>Featured Project</span>
          <span className="text-text-primary/35">/</span>
          <span className="text-accent-gold">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <h3 className="max-w-3xl font-heading text-4xl leading-[0.96] md:text-5xl lg:text-6xl">
          {project.title}
        </h3>
        <p className="max-w-2xl text-base leading-8 text-text-primary/72 md:text-lg">
          {project.description}
        </p>
        {project.highlights && project.highlights.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-text-primary/60">
              Highlight Features
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-text-primary/72">
              {project.highlights.map((highlight) => (
                <span key={highlight} className="inline-flex items-center gap-3">
                  <span className="text-text-primary/35">•</span>
                  <span>{highlight}</span>
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.2em] text-text-primary/60">
            Technology Stack
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-text-primary/72">
            {project.tags.map((tag, tagIndex) => (
              <span key={tag} className="inline-flex items-center gap-3">
                <span className={tagIndex === 0 ? "hidden" : "text-text-primary/35"}>·</span>
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border border-border-hairline p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-text-primary/60">Project Details</p>
        <div className="space-y-3 text-sm leading-7 text-text-primary/76">
          <p>
            <span className="font-medium text-text-primary">Status:</span> {status.label}
          </p>
          <p>
            <span className="font-medium text-text-primary">Project Links:</span>
          </p>
          <div className="flex flex-col gap-2">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent-gold transition-colors hover:text-text-primary"
              >
                GitHub
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            ) : null}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent-gold transition-colors hover:text-text-primary"
              >
                Live Demo
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            ) : null}
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-accent-gold transition-colors hover:text-text-primary"
            >
              View Case Study
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function SupportingProject({ project }: { project: Project }) {
  const status = formatStatus(project.status);

  return (
    <article className="flex flex-col gap-5 border border-border-hairline p-6">
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-text-primary/60">
        <span className={cn("size-2 rounded-full", status.color)} />
        {status.label}
      </div>
      <h3 className="font-heading text-2xl leading-[1] text-text-primary">{project.title}</h3>
      <p className="text-sm leading-7 text-text-primary/72">{project.description}</p>
      <p className="text-xs uppercase tracking-[0.16em] text-text-primary/60">
        {project.tags.slice(0, 4).join(" · ")}
      </p>
      <div className="mt-auto flex flex-wrap items-center gap-4">
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-gold transition-colors hover:text-text-primary"
          >
            GitHub
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        ) : null}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-accent-gold transition-colors hover:text-text-primary"
        >
          {secondaryLinkLabel(project)}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function Projects() {
  const showcaseProjects = showcaseSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));
  const supportingProjects = projects.filter(
    (project) => !showcaseProjects.some((showcase) => showcase.slug === project.slug),
  );
  const supportingGroups = distribute(supportingProjects, showcaseProjects.length);

  return (
    <Section id="projects" containerSize="full" className="bg-bg-primary text-text-primary">
      <div className="section-shell section-pad-y flex flex-col gap-12">
        <SectionHeader
          align="left"
          overline="Selected Work"
          heading="Projects"
          description="A focused set of portfolio projects spanning enterprise platforms, AI applications, scientific computing, and cybersecurity research tooling."
          overlineClassName="text-accent-gold"
          headingClassName="max-w-3xl text-text-primary"
          descriptionClassName="max-w-2xl text-text-primary/72"
          className="mb-0 max-w-3xl"
        />

        {showcaseProjects.map((project, index) => (
          <div key={project.slug} className="flex flex-col gap-12">
            <ProjectReveal>
              <ShowcaseProject project={project} index={index} />
            </ProjectReveal>
            {supportingGroups[index]?.length > 0 && (
              <div className="grid gap-6 lg:grid-cols-3">
                {supportingGroups[index].map((supporting, order) => (
                  <ProjectReveal key={supporting.slug} order={order} className="flex [&>article]:w-full">
                    <SupportingProject project={supporting} />
                  </ProjectReveal>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
