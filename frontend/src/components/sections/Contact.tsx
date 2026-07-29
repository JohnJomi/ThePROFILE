import { Mail, MoveUpRight } from "lucide-react";

import { Button, Section, SectionHeader } from "@/components/common";
import { SocialButton } from "@/components/common/SocialButton";
import { socialIconMap } from "@/components/common/SocialIcons";
import { contactInfo } from "@/data/contact";
import { featuredSocials } from "@/data/socials";

export function Contact() {
  return (
    <Section id="contact" containerSize="full" className="bg-bg-secondary text-text-primary">
      <div className="section-shell section-pad-y flex flex-col gap-12">
        <SectionHeader
          align="left"
          overline="Get In Touch"
          heading="Contact"
          description="Open to opportunities, research conversations, and thoughtful collaboration around AI and full-stack product work."
          overlineClassName="text-accent-gold"
          headingClassName="max-w-3xl text-text-primary"
          descriptionClassName="max-w-2xl text-text-primary/72"
          className="mb-0 max-w-3xl"
        />

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="flex flex-col gap-8">
            <div className="grid gap-4 border-t border-[color:var(--border-hairline)] pt-6 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-text-primary/55">Availability</p>
                <p className="mt-2 text-sm leading-7 text-text-primary/72">{contactInfo.availability}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-text-primary/55">Location</p>
                <p className="mt-2 text-sm leading-7 text-text-primary/72">{contactInfo.location}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button href={`mailto:${contactInfo.email}`} size="lg" icon={<Mail className="size-4" />}>
                Email Me
              </Button>
              <Button href={contactInfo.resumeUrl} variant="secondary" size="lg" icon={<MoveUpRight className="size-4" />}>
                Resume
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-6 border border-[color:var(--border-hairline)] p-6">
            <div className="flex flex-col gap-1">
              <p className="text-xs uppercase tracking-[0.22em] text-text-primary/55">Social Links</p>
              <p className="text-sm leading-7 text-text-primary/72">
                Reach out through the most active public channels.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {featuredSocials.map((social) => (
                <SocialButton
                  key={social.platform}
                  label={social.label}
                  href={social.href}
                  icon={socialIconMap[social.icon] ?? null}
                  variant="pill"
                />
              ))}
            </div>

            <div className="border-t border-[color:var(--border-hairline)] pt-4 text-sm text-text-primary/72">
              <p>
                Email: <span className="text-text-primary">{contactInfo.email}</span>
              </p>
              <p>
                GitHub: <span className="text-text-primary">{contactInfo.github}</span>
              </p>
              <p>
                LinkedIn: <span className="text-text-primary">{contactInfo.linkedin}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
