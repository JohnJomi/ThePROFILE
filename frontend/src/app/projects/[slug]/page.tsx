import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, ArrowRight, MoveUpRight } from "lucide-react";

import { Section } from "@/components/common";
import { ProjectTitle } from "@/components/sections/ProjectTitle";
import { caseStudies } from "@/data/case-studies";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatStatus(status: string): { label: string; color: string } {
  if (status === "in-progress") {
    return { label: "In Development", color: "bg-accent-gold" };
  }
  if (status === "completed") {
    return { label: "Completed", color: "bg-accent-rust" };
  }
  return { label: status.replace(/-/g, " "), color: "bg-text-primary-inverse" };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const caseStudy = caseStudies[project.slug];
  const status = formatStatus(project.status);
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <Section containerSize="full" className="bg-transparent text-text-primary">
      <div className="section-shell section-pad-y flex flex-col gap-12">
        <div className="flex flex-col gap-8">
          <Link
            href="/projects"
            className="inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.22em] text-text-primary/72 transition-colors hover:text-accent-gold"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All Projects
          </Link>

          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-text-primary/72">
            <span className={cn("size-2 rounded-full", status.color)} />
            <span>{status.label}</span>
            <span className="text-text-primary/50">/</span>
            <span>Case Study</span>
          </div>

          <ProjectTitle title={project.title} />

          <p className="max-w-3xl text-base leading-8 text-text-primary/85 md:text-lg">
            {caseStudy?.summary ?? project.longDescription ?? project.description}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent-gold transition-colors hover:text-text-primary"
              >
                View Source
                <MoveUpRight className="size-4" aria-hidden="true" />
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
          </div>
        </div>

        {caseStudy?.note && (
          <p className="max-w-3xl border-l-2 border-accent-gold bg-bg-secondary/50 px-5 py-4 text-sm leading-7 text-text-primary/85">
            {caseStudy.note}
          </p>
        )}

        <div className="grid gap-12 border-t border-border-hairline pt-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
          <div className="flex flex-col gap-12">
            {caseStudy ? (
              <>
                <section className="flex flex-col gap-4">
                  <h2 className="text-xs uppercase tracking-[0.2em] text-text-primary/72">
                    The Problem
                  </h2>
                  <p className="max-w-2xl text-base leading-8 text-text-primary/90">
                    {caseStudy.problem}
                  </p>
                </section>

                {caseStudy.sections.map((section) => (
                  <section key={section.heading} className="flex flex-col gap-4">
                    <h2 className="font-heading text-2xl leading-[1.1] text-text-primary md:text-3xl">
                      {section.heading}
                    </h2>
                    {section.body && (
                      <p className="max-w-2xl text-base leading-8 text-text-primary/85">
                        {section.body}
                      </p>
                    )}
                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="flex max-w-2xl flex-col gap-2.5">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-3 text-sm leading-7 text-text-primary/85"
                          >
                            <span aria-hidden="true" className="text-accent-gold">
                              —
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.table && (
                      <div className="max-w-2xl overflow-x-auto">
                        <table className="w-full border-collapse text-left text-sm">
                          <thead>
                            <tr className="border-b border-border-hairline">
                              {section.table.headers.map((header) => (
                                <th
                                  key={header}
                                  scope="col"
                                  className="py-3 pr-6 text-xs font-medium uppercase tracking-[0.16em] text-text-primary/72"
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map(([key, value]) => (
                              <tr key={key} className="border-b border-border-hairline/60">
                                <th
                                  scope="row"
                                  className="py-3 pr-6 align-top font-medium text-text-primary"
                                >
                                  {key}
                                </th>
                                <td className="py-3 align-top leading-7 text-text-primary/85">
                                  {value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </section>
                ))}
              </>
            ) : (
              <p className="max-w-2xl text-base leading-8 text-text-primary/85">
                {project.longDescription ?? project.description}
              </p>
            )}
          </div>

          <aside className="flex h-fit flex-col gap-8 lg:sticky lg:top-24">
            <div className="flex flex-col gap-4 border border-border-hairline p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-text-primary/72">
                Technology Stack
              </p>
              {caseStudy?.stack ? (
                <div className="flex flex-col gap-5">
                  {caseStudy.stack.map((group) => (
                    <div key={group.label} className="flex flex-col gap-2">
                      <p className="text-xs font-medium text-text-primary">{group.label}</p>
                      <p className="text-sm leading-7 text-text-primary/85">
                        {group.items.join(" · ")}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-7 text-text-primary/85">{project.tags.join(" · ")}</p>
              )}
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <div className="flex flex-col gap-4 border border-border-hairline p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-text-primary/72">
                  Highlight Features
                </p>
                <ul className="flex flex-col gap-2">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-7 text-text-primary/85"
                    >
                      <span aria-hidden="true" className="text-text-primary/50">
                        •
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {nextProject && nextProject.slug !== project.slug && (
          <div className="flex flex-col gap-3 border-t border-border-hairline pt-8">
            <p className="text-xs uppercase tracking-[0.2em] text-text-primary/72">Next Project</p>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group inline-flex w-fit items-center gap-4 font-heading text-2xl leading-[1.1] text-text-primary transition-colors hover:text-accent-gold md:text-3xl"
            >
              {nextProject.title}
              <ArrowRight
                className="size-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        )}
      </div>
    </Section>
  );
}
