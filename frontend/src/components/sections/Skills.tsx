"use client";

import type { ComponentType } from "react";

import { motion } from "framer-motion";
import { Cpu, Database, Layers3, Server, Wrench, Code2 } from "lucide-react";

import { Section, SectionHeader } from "@/components/common";
import { skillGroups } from "@/data/skills";
import { fadeUp, staggerContainerSlow } from "@/lib/motion";
import { cn } from "@/lib/utils";

const categoryMeta: Record<string, { icon: ComponentType<{ className?: string }>; summary: string }> = {
  Languages: { icon: Code2, summary: "Core languages I use to build and ship software." },
  "Frameworks & Libraries": { icon: Layers3, summary: "Frontend and backend tools for modern product work." },
  "AI / ML": { icon: Cpu, summary: "AI tooling, model workflows, and applied machine learning." },
  "Cloud & Infrastructure": { icon: Server, summary: "Deployment, APIs, and infrastructure foundations." },
  Databases: { icon: Database, summary: "Data storage and retrieval systems I work with regularly." },
  "Tools & Platforms": { icon: Wrench, summary: "Daily drivers for development, collaboration, and delivery." },
};

export function Skills() {
  return (
    <Section id="skills" containerSize="full" className="bg-bg-primary text-text-primary">
      <div className="section-shell section-pad-y flex flex-col gap-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            align="left"
            overline="Technical Skills"
            heading="Technologies I Use"
            description="A focused stack for building AI-powered products, modern web applications, and reliable cloud-backed systems."
            overlineClassName="text-accent-gold"
            headingClassName="max-w-3xl text-text-primary"
            descriptionClassName="text-text-primary/72 max-w-2xl"
            className="mb-0 max-w-3xl"
          />

          <div className="grid gap-3 text-sm uppercase tracking-[0.2em] text-text-primary/70 sm:grid-cols-3 lg:max-w-2xl lg:text-right">
            <div className="border-t border-border-hairline pt-3">6 Core Domains</div>
            <div className="border-t border-border-hairline pt-3">30+ Tools</div>
            <div className="border-t border-border-hairline pt-3">AI-First Stack</div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <motion.section
              key={group.category}
              variants={staggerContainerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex h-full flex-col gap-5 border border-border-hairline bg-bg-secondary/35 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const Icon = categoryMeta[group.category]?.icon ?? Wrench;
                      return <Icon className="size-4 text-accent-gold" aria-hidden="true" />;
                    })()}
                    <motion.h3
                      variants={fadeUp}
                      className="text-xs font-medium uppercase tracking-[0.22em] text-accent-gold"
                    >
                      {group.category}
                    </motion.h3>
                  </div>
                  <p className="text-sm leading-7 text-text-primary/72">
                    {categoryMeta[group.category]?.summary}
                  </p>
                </div>

                <div className="rounded-full border border-border-hairline px-3 py-1 text-xs uppercase tracking-[0.18em] text-text-primary/60">
                  {group.skills.length}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const isPrimary = skill.proficiency === "expert";
                  const Icon = isPrimary ? Cpu : Wrench;
                  return (
                    <span
                      key={skill.name}
                      className={cn(
                        "inline-flex items-center gap-2 border px-3 py-2 text-sm leading-none",
                        isPrimary
                          ? "border-accent-gold/35 bg-[rgba(232,185,62,0.12)] text-text-primary"
                          : "border-border-hairline bg-[rgba(243,238,227,0.04)] text-text-primary/80",
                      )}
                    >
                      <Icon className="size-3.5" aria-hidden="true" />
                      {skill.name}
                    </span>
                  );
                })}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </Section>
  );
}
