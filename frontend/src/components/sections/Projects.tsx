import { Container, ProjectCard, Section, SectionHeader } from "@/components/common";
import { featuredProjects } from "@/data/projects";

export function Projects() {
  return (
    <Section id="projects">
      <Container size="default" className="flex flex-col gap-12">
        <SectionHeader
          overline="Selected Work"
          heading="Projects"
          description="A focused set of portfolio projects spanning enterprise platforms, AI applications, scientific computing, and cybersecurity research tooling."
        />

        {featuredProjects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Projects will appear here once data is available.</p>
        )}
      </Container>
    </Section>
  );
}