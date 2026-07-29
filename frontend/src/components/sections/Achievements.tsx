import { Badge, Card, Container, Section, SectionHeader } from "@/components/common";
import { achievements } from "@/data/achievements";

const achievementVariant: Record<string, "brand" | "secondary" | "success" | "muted"> = {
  award: "brand",
  publication: "secondary",
  talk: "success",
  "open-source": "muted",
  competition: "success",
  recognition: "brand",
  other: "muted",
};

export function Achievements() {
  return (
    <Section id="achievements">
      <Container size="default" className="flex flex-col gap-12">
        <SectionHeader
          overline="Recognition"
          heading="Achievements"
          description="A concise view of leadership, academic performance, research, and project execution milestones."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {achievements.map((achievement) => (
            <Card key={achievement.id} animated hoverable className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold leading-snug tracking-tight">
                    {achievement.title}
                  </h3>
                  {achievement.issuer ? (
                    <p className="text-sm text-muted-foreground">{achievement.issuer}</p>
                  ) : null}
                </div>
                <Badge variant={achievementVariant[achievement.type] ?? "muted"} size="sm">
                  {achievement.type.replace("-", " ")}
                </Badge>
              </div>

              {achievement.description ? (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>
              ) : null}

              <p className="text-xs text-muted-foreground">{achievement.date}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}