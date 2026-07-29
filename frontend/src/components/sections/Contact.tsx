import { Button, Card, Container, Section, SectionHeader } from "@/components/common";
import { SocialButton } from "@/components/common/SocialButton";
import { socialIconMap } from "@/components/common/SocialIcons";
import { contactInfo } from "@/data/contact";
import { featuredSocials } from "@/data/socials";

export function Contact() {
  return (
    <Section id="contact">
      <Container size="default" className="flex flex-col gap-12">
        <SectionHeader
          overline="Get In Touch"
          heading="Contact"
          description="Open to opportunities, research conversations, and thoughtful collaboration around AI and full-stack product work."
        />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card animated hoverable className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-muted-foreground">Availability</p>
              <p className="text-base leading-relaxed">{contactInfo.availability}</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-muted-foreground">Location</p>
              <p className="text-base">{contactInfo.location}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={`mailto:${contactInfo.email}`} size="lg">
                Email
              </Button>
              <Button href={contactInfo.resumeUrl} variant="secondary" size="lg">
                Resume
              </Button>
            </div>
          </Card>

          <Card animated hoverable className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold tracking-tight">Social Links</h3>
              <p className="text-sm text-muted-foreground">
                Reaching out through the most active public channels.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {featuredSocials.map((social) => (
                <SocialButton
                  key={social.platform}
                  label={social.label}
                  href={social.href}
                  icon={socialIconMap[social.icon] ?? null}
                  variant="pill"
                  size="sm"
                />
              ))}
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                Email: <span className="text-foreground">{contactInfo.email}</span>
              </p>
              <p>
                GitHub: <span className="text-foreground">{contactInfo.github}</span>
              </p>
              <p>
                LinkedIn: <span className="text-foreground">{contactInfo.linkedin}</span>
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}