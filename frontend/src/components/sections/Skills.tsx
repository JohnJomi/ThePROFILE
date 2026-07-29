"use client";

import { motion } from "framer-motion";

import { Container, Section, SectionHeader, SkillBadge } from "@/components/common";
import { skillGroups } from "@/data/skills";
import { fadeUp, staggerContainerSlow } from "@/lib/motion";

export function Skills() {
  return (
    <Section id="skills">
      <Container size="default" className="flex flex-col gap-12">
        <SectionHeader
          overline="Technical Skills"
          heading="Technologies I Use"
          description="A focused stack for building AI-powered products, modern web applications, and reliable cloud-backed systems."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <motion.section
              key={group.category}
              variants={staggerContainerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-4"
            >
              <motion.h3 variants={fadeUp} className="text-lg font-semibold tracking-tight">
                {group.category}
              </motion.h3>

              <motion.div variants={staggerContainerSlow} className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    proficiency={skill.proficiency}
                  />
                ))}
              </motion.div>
            </motion.section>
          ))}
        </div>
      </Container>
    </Section>
  );
}