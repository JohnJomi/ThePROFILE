import {
  BrainCircuit,
  Cloud,
  Code2,
  Globe,
  MonitorSmartphone,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";

import { JourneyTimeline } from "@/components/about/JourneyTimeline";
import { Badge, Button, Card, Container, Section, SectionHeader } from "@/components/common";
import { Hero } from "@/components/sections/Hero";
import { contactInfo } from "@/data/contact";

const focusItems = [
  {
    title: "Building AI-powered products",
    icon: BrainCircuit,
    description: "Turning model capabilities into useful, reliable product experiences.",
  },
  {
    title: "Designing scalable backend systems",
    icon: Workflow,
    description: "Structuring systems that stay clean, maintainable, and production-ready.",
  },
  {
    title: "Exploring cloud-native architecture",
    icon: Cloud,
    description: "Working with infrastructure patterns that support resilient delivery.",
  },
  {
    title: "Researching practical machine learning",
    icon: Sparkles,
    description: "Staying close to techniques that solve real-world problems.",
  },
] as const;

const values = [
  { title: "Problem First", description: "Technology should solve problems." },
  { title: "Clean Architecture", description: "Maintainable code over clever code." },
  { title: "Continuous Learning", description: "Always improving through research and experimentation." },
  { title: "User Experience", description: "Simple products create lasting impact." },
] as const;

const interests = [
  { label: "Artificial Intelligence", icon: BrainCircuit },
  { label: "Cybersecurity", icon: Target },
  { label: "Product Design", icon: MonitorSmartphone },
  { label: "Cloud Computing", icon: Cloud },
  { label: "Research", icon: Sparkles },
  { label: "Photography", icon: Globe },
] as const;

const journey = [
  "Started Computer Science",
  "Discovered Artificial Intelligence",
  "Built Full Stack Applications",
  "Worked on Enterprise Projects",
  "Currently Building AI-first Products",
] as const;

export default function AboutPage() {
  return (
    <>
      <Hero />

      <Section animated={false} className="bg-bg-primary text-text-primary">
        <Container size="default" className="flex flex-col gap-12">
          <SectionHeader
            align="left"
            overline="Introduction"
            heading="About Me"
            description="I am a Computer Science undergraduate with a strong interest in Artificial Intelligence, Full Stack Development, and Cloud Computing. I enjoy building software that combines clean architecture, intelligent systems, and exceptional user experience. Over the past few years I have worked on enterprise software, AI-powered applications, cloud infrastructure, cybersecurity research, and technical leadership within IEEE. I believe technology should solve meaningful problems rather than simply showcase complexity."
            overlineClassName="text-accent-gold"
            headingClassName="max-w-3xl text-text-primary"
            descriptionClassName="max-w-3xl text-text-primary/72"
            className="mb-0"
          />

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="grid gap-6">
              {[
                {
                  title: "AI Engineering",
                  icon: BrainCircuit,
                  description: "Building intelligent software using modern machine learning and LLM technologies.",
                },
                {
                  title: "Full Stack Development",
                  icon: Code2,
                  description: "Developing scalable web applications with modern frontend and backend technologies.",
                },
                {
                  title: "Cloud Computing",
                  icon: Cloud,
                  description: "Deploying secure, production-ready systems using modern cloud infrastructure.",
                },
              ].map((item) => (
                <Card key={item.title} animated hoverable className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex size-12 items-center justify-center rounded-full border border-border-hairline bg-bg-secondary text-accent-gold">
                      <item.icon className="size-6" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-text-primary">{item.title}</h3>
                  <p className="text-sm leading-7 text-text-primary/72">{item.description}</p>
                </Card>
              ))}
            </div>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border-hairline" aria-hidden="true" />
              <div className="flex flex-col gap-6 pl-10">
                <SectionHeader
                  align="left"
                  overline="Journey"
                  heading="My Journey"
                  overlineClassName="text-accent-gold"
                  headingClassName="max-w-2xl text-text-primary text-3xl md:text-4xl lg:text-5xl"
                  className="mb-0"
                />
                <JourneyTimeline items={journey} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section animated={false} className="bg-bg-primary text-text-primary">
        <Container size="default" className="flex flex-col gap-12">
          <SectionHeader
            align="left"
            overline="Focus"
            heading="What I'm Focused On"
            overlineClassName="text-accent-gold"
            headingClassName="max-w-3xl text-text-primary"
            className="mb-0"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {focusItems.map((item) => (
              <Card key={item.title} animated hoverable className="flex flex-col gap-4">
                <div className="flex size-12 items-center justify-center rounded-full border border-border-hairline bg-bg-secondary text-accent-gold">
                  <item.icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-text-primary">{item.title}</h3>
                <p className="text-sm leading-7 text-text-primary/72">{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section animated={false} className="bg-bg-primary text-text-primary">
        <Container size="default" className="flex flex-col gap-12">
          <SectionHeader
            align="left"
            overline="Values"
            heading="How I Build Software"
            overlineClassName="text-accent-gold"
            headingClassName="max-w-3xl text-text-primary"
            className="mb-0"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} animated hoverable className="flex flex-col gap-4">
                <Badge variant="muted" className="self-start">
                  {value.title}
                </Badge>
                <p className="text-sm leading-7 text-text-primary/72">{value.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section animated={false} className="bg-bg-primary text-text-primary">
        <Container size="default" className="flex flex-col gap-12">
          <SectionHeader
            align="left"
            overline="Personal"
            heading="Beyond Development"
            overlineClassName="text-accent-gold"
            headingClassName="max-w-3xl text-text-primary"
            className="mb-0"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {interests.map((interest) => (
              <Card key={interest.label} animated hoverable className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full border border-border-hairline bg-bg-secondary text-accent-gold">
                  <interest.icon className="size-5" aria-hidden="true" />
                </div>
                <p className="text-sm uppercase tracking-[0.16em] text-text-primary/80">{interest.label}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section animated={false} className="bg-bg-primary text-text-primary">
        <Container size="default" className="flex flex-col gap-12">
          <Card animated hoverable className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="flex flex-col gap-4">
              <SectionHeader
                align="left"
                overline="Next Step"
                heading="Let's Build Something Great"
                description="Whether it's building intelligent software, collaborating on research, or developing scalable web applications, I'm always excited to work on meaningful projects."
                overlineClassName="text-accent-gold"
                headingClassName="max-w-3xl text-text-primary"
                descriptionClassName="max-w-2xl text-text-primary/72"
                className="mb-0"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button href="/projects" size="lg">
                View Projects
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Contact Me
              </Button>
            </div>
          </Card>
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-text-primary/55">
            <span>Focused on meaningful software</span>
            <span>•</span>
            <span>Open to collaboration</span>
            <span>•</span>
            <span>Available via {contactInfo.email}</span>
          </div>
        </Container>
      </Section>
    </>
  );
}
