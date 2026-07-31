"use client";

import type { ComponentType } from "react";

import { motion } from "framer-motion";
import { Code2, Cpu, Database, Layers3, Server, Wrench } from "lucide-react";

import { Section, SectionHeader } from "@/components/common";
import { fadeUp, staggerContainerSlow } from "@/lib/motion";

const categoryMeta: Record<string, { icon: ComponentType<{ className?: string }>; summary: string }> = {
  Languages: { icon: Code2, summary: "" },
  "Frameworks & Libraries": { icon: Layers3, summary: "" },
  "Cloud & Infrastructure": { icon: Server, summary: "" },
  "AI / ML": { icon: Cpu, summary: "" },
  Databases: { icon: Database, summary: "" },
  "Tools & Platforms": { icon: Wrench, summary: "" },
};

const skillChapters = [
  {
    id: "foundation",
    overline: "Foundation",
    heading: "Building Starts with Code",
    category: "Languages",
    summary:
      "Every application begins with strong fundamentals. These are the programming languages I use to solve problems, build algorithms, and develop scalable software.",
    chips: ["Python", "Java", "TypeScript", "JavaScript", "SQL", "C"],
  },
  {
    id: "interfaces",
    overline: "Building Interfaces",
    heading: "Creating Modern User Experiences",
    category: "Frameworks & Libraries",
    summary:
      "Designing responsive, fast, and intuitive interfaces using modern frontend technologies.",
    chips: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3"],
  },
  {
    id: "backends",
    overline: "Building Backends",
    heading: "Engineering Reliable APIs",
    category: "Cloud & Infrastructure",
    summary:
      "Developing secure backend services, REST APIs, authentication systems, and scalable server-side applications.",
    chips: ["Node.js", "Express.js", "REST APIs", "Prisma ORM", "Authentication", "API Design"],
  },
  {
    id: "data",
    overline: "Managing Data",
    heading: "Reliable Data Architecture",
    category: "Databases",
    summary:
      "Designing databases and managing data efficiently for modern applications.",
    chips: ["PostgreSQL", "MongoDB", "SQL", "Vector Databases", "Database Design"],
  },
  {
    id: "intelligence",
    overline: "Adding Intelligence",
    heading: "Building AI-Powered Products",
    category: "AI / ML",
    summary:
      "Integrating machine learning models, LLMs, and AI workflows into real-world applications.",
    chips: [
      "OpenAI API",
      "Amazon Bedrock",
      "Claude",
      "LangChain",
      "Hugging Face",
      "TensorFlow",
      "PyTorch",
      "Machine Learning",
      "Prompt Engineering",
      "RAG",
      "AI Agents",
    ],
  },
  {
    id: "deployment",
    overline: "Deploying Systems",
    heading: "Cloud & Infrastructure",
    category: "Cloud & Infrastructure",
    summary:
      "Deploying applications, managing infrastructure, and building cloud-native systems.",
    chips: ["AWS", "Azure", "Docker", "GitHub Actions", "Linux", "Nginx", "CI/CD"],
  },
  {
    id: "workflow",
    overline: "Engineering Workflow",
    heading: "Daily Development Toolkit",
    category: "Tools & Platforms",
    summary:
      "The tools I use every day to design, build, debug, collaborate, and ship software.",
    chips: ["Git", "GitHub", "VS Code", "Postman", "Jupyter Notebook", "Claude Code", "OpenAI Codex", "GitHub Copilot", "Figma", "Terminal"],
  },
] as const;

const editorialPositions = [
  { top: "12%", left: "38%" },
  { top: "25%", left: "18%" },
  { top: "38%", left: "56%" },
  { top: "52%", left: "8%" },
  { top: "66%", left: "48%" },
  { top: "78%", left: "24%" },
  { top: "8%", left: "10%" },
  { top: "20%", left: "58%" },
  { top: "33%", left: "30%" },
  { top: "58%", left: "62%" },
  { top: "84%", left: "42%" },
] as const;

export function Skills() {
  return (
    <Section id="skills" containerSize="full" className="bg-bg-primary text-text-primary">
      <div className="section-shell section-pad-y flex flex-col gap-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            align="left"
            overline="Technical Skills"
            heading="Technologies I Use"
            description="A storytelling view of how I build software from idea to production."
            overlineClassName="text-accent-gold"
            headingClassName="max-w-3xl text-text-primary"
            descriptionClassName="text-text-primary/72 max-w-2xl"
            className="mb-0 max-w-3xl"
          />
        </div>

        <div className="flex flex-col gap-10">
          {skillChapters.map((chapter) => {
            const Icon = categoryMeta[chapter.category]?.icon ?? Wrench;
            const textSizes = [
              "text-[38px]",
              "text-[40px]",
              "text-[36px]",
              "text-[44px]",
              "text-[39px]",
              "text-[37px]",
              "text-[41px]",
              "text-[42px]",
              "text-[40px]",
              "text-[38px]",
              "text-[36px]",
            ];

            return (
              <motion.section
                key={chapter.id}
                variants={staggerContainerSlow}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-18% 0px -18% 0px" }}
                className="flex min-h-[92vh] flex-col justify-center border-t border-border-hairline py-12 first:border-t-0 first:pt-0 lg:py-16"
              >
                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <Icon className="size-5 text-accent-gold" aria-hidden="true" />
                      <motion.h3
                        variants={fadeUp}
                        className="text-xs font-medium uppercase tracking-[0.22em] text-accent-gold"
                      >
                        {chapter.overline}
                      </motion.h3>
                    </div>
                    <motion.h4
                      variants={fadeUp}
                      className="max-w-2xl font-heading text-4xl leading-[0.96] md:text-5xl lg:text-6xl"
                    >
                      {chapter.heading}
                    </motion.h4>
                    <motion.p
                      variants={fadeUp}
                      className="max-w-xl text-base leading-8 text-text-primary/72 md:text-lg"
                    >
                      {chapter.summary}
                    </motion.p>
                  </div>

                  <div className="relative min-h-[68vh] overflow-hidden lg:min-h-[72vh]">
                    {chapter.chips.map((technology, index) => (
                      <motion.span
                        key={technology}
                        variants={fadeUp}
                        whileHover={{
                          opacity: 1,
                          y: -4,
                          color: "var(--accent-gold)",
                          textShadow: "0 0 18px rgb(232 185 62 / 0.35)",
                        }}
                        className={`absolute font-heading font-medium leading-none tracking-tight text-text-primary/35 transition-colors duration-300 ${textSizes[index % textSizes.length]}`}
                        style={{
                          left: editorialPositions[index % editorialPositions.length].left,
                          top: editorialPositions[index % editorialPositions.length].top,
                        }}
                      >
                        {technology}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
