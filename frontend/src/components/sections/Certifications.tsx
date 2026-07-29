import { Badge, Button, Card, Container, Section, SectionHeader } from "@/components/common";
import { activeCertifications } from "@/data/certifications";

function formatYear(issuedDate: string): string {
  return issuedDate.split("-")[0] ?? issuedDate;
}

export function Certifications() {
  return (
    <Section id="certifications">
      <Container size="default" className="flex flex-col gap-12">
        <SectionHeader
          overline="Credentials"
          heading="Certifications"
          description="Selected certifications and completed learning milestones across AI, cloud, and full-stack development."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {activeCertifications.map((certification) => (
            <Card key={certification.id} animated hoverable className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold leading-snug tracking-tight">
                    {certification.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{certification.issuer}</p>
                </div>
                <Badge variant="muted" size="sm">
                  {formatYear(certification.issuedDate)}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="success" size="sm">
                  Active
                </Badge>
                {certification.expiryDate ? (
                  <Badge variant="outline" size="sm">
                    Expires {formatYear(certification.expiryDate)}
                  </Badge>
                ) : null}
              </div>

              {certification.credentialUrl ? (
                <Button
                  href={certification.credentialUrl}
                  variant="secondary"
                  size="sm"
                  className="self-start"
                >
                  View Credential
                </Button>
              ) : null}
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}