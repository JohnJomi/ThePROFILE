"use client";

import type { ComponentType } from "react";

import { Code2, Cpu, Database, Layers3, Server, Wrench } from "lucide-react";

import { Section, SectionHeader } from "@/components/common";
import { SkillsChapter } from "@/components/sections/SkillsChapter";

const categoryMeta: Record<
  string,
  { icon: ComponentType<{ className?: string }>; summary: string }
> = {
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
    summary: "Designing databases and managing data efficiently for modern applications.",
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
      "Claude",
      "LangChain",
      "Hugging Face",
      "TensorFlow",
      "PyTorch",
      "Machine Learning",
      "Prompt Engineering",
      "AI Agents",
    ],
  },
  {
    id: "deployment",
    overline: "Deploying Systems",
    heading: "Cloud & Infrastructure",
    category: "Cloud & Infrastructure",
    summary: "Deploying applications, managing infrastructure, and building cloud-native systems.",
    chips: ["AWS", "Azure", "Docker", "GitHub Actions", "Linux", "Nginx", "CI/CD"],
  },
  {
    id: "workflow",
    overline: "Engineering Workflow",
    heading: "Daily Development Toolkit",
    category: "Tools & Platforms",
    summary: "The tools I use every day to design, build, debug, collaborate, and ship software.",
    chips: [
      "Git",
      "GitHub",
      "VS Code",
      "Jupyter Notebook",
      "Claude Code",
      "GitHub Copilot",
      "Figma",
    ],
  },
] as const;

export function Skills() {
  return (
    <Section id="skills" containerSize="full" className="bg-transparent text-text-primary">
      <div className="section-shell section-pad-y flex flex-col gap-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            reveal
            align="left"
            overline="Technical Skills"
            heading="Technologies I Use"
            description="A storytelling view of how I build software from idea to production."
            overlineClassName="text-accent-gold"
            headingClassName="max-w-3xl text-text-primary"
            descriptionClassName="text-text-primary/85 max-w-2xl"
            className="mb-0 max-w-3xl"
          />
        </div>

        <div className="flex flex-col gap-10">
          {skillChapters.map((chapter) => (
            <SkillsChapter
              key={chapter.id}
              overline={chapter.overline}
              heading={chapter.heading}
              summary={chapter.summary}
              chips={chapter.chips}
              icon={categoryMeta[chapter.category]?.icon ?? Wrench}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
