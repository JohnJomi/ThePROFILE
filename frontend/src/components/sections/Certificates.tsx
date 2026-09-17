import { ExternalLink } from "lucide-react";

import { Badge, Card, Container, Section, SectionHeader } from "@/components/common";
import { certificates } from "@/data/certificates";

export function Certificates() {
  return (
    <Section id="certificates">
      <Container size="default" className="flex flex-col gap-12">
        <SectionHeader
          overline="Credentials"
          heading="Certificates"
          description="Courses and training programs completed across AI, cloud, and full-stack development."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {certificates.map((certificate) => (
            <Card key={certificate.id} animated hoverable className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold leading-snug tracking-tight">
                    {certificate.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{certificate.issuer}</p>
                </div>
                <Badge variant="brand" size="sm">
                  Certificate
                </Badge>
              </div>

              {certificate.description ? (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {certificate.description}
                </p>
              ) : null}

              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">{certificate.date}</p>
                <a
                  href={certificate.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.12em] text-accent-gold transition-colors hover:text-accent-rust"
                >
                  View
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
