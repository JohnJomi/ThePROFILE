"use client";

import { motion } from "framer-motion";

import { Section, SectionHeader } from "@/components/common";
import { skillGroups } from "@/data/skills";
import { fadeUp, staggerContainerSlow } from "@/lib/motion";

export function Skills() {
  return (
    <Section id="skills" containerSize="full" className="bg-bg-secondary text-text-primary">
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

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr_1.2fr] xl:grid-cols-3">
          {skillGroups.map((group) => (
            <motion.section
              key={group.category}
              variants={staggerContainerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-4 border-t border-border-hairline pt-5"
            >
              <motion.h3
                variants={fadeUp}
                className="text-xs font-medium uppercase tracking-[0.22em] text-accent-gold"
              >
                {group.category}
              </motion.h3>

              <div className="flex flex-col gap-3">
                {group.skills.map((skill) => {
                  const isPrimary = skill.proficiency === "expert";
                  return (
                    <div
                      key={skill.name}
                      className="flex items-start gap-3 border-b border-border-hairline pb-3 last:border-b-0 last:pb-0"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 rounded-full bg-accent-gold"
                      />
                      <span className={isPrimary ? "font-medium text-accent-rust" : "text-text-primary/78"}>
                        {skill.name}
                      </span>
                    </div>
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
