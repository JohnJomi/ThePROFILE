import { Badge, Card, Container, Section, SectionHeader } from "@/components/common";
import { publications } from "@/data/publications";

const statusVariant: Record<string, "brand" | "secondary" | "success" | "warning" | "muted"> = {
  draft: "muted",
  "in-progress": "warning",
  published: "success",
};

export function Publications() {
  return (
    <Section id="publications">
      <Container size="default" className="flex flex-col gap-12">
        <SectionHeader
          overline="Research"
          heading="Publications"
          description="A working research paper focused on phishing detection and cybersecurity analysis."
        />

        <div className="grid gap-6">
          {publications.map((publication) => (
            <Card key={publication.id} animated hoverable className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-semibold tracking-tight">{publication.title}</h3>
                  <p className="text-sm text-muted-foreground">{publication.category}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant={statusVariant[publication.status] ?? "muted"} size="sm">
                    {publication.status.replace("-", " ")}
                  </Badge>
                  <Badge variant="outline" size="sm">
                    {publication.year}
                  </Badge>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {publication.abstract}
              </p>

              {publication.technologies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {publication.technologies.map((technology) => (
                    <Badge key={technology} variant="secondary" size="sm">
                      {technology}
                    </Badge>
                  ))}
                </div>
              ) : null}

              {publication.keywords.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {publication.keywords.map((keyword) => (
                    <Badge key={keyword} variant="muted" size="sm">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}