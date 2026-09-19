import { ExternalLink } from "lucide-react";

import { Section, SectionHeader } from "@/components/common";
import { ProjectReveal } from "@/components/sections/ProjectReveal";
import { certificates } from "@/data/certificates";
import type { Certificate } from "@/types/certificate";

function CertificateRow({ certificate, index }: { certificate: Certificate; index: number }) {
  return (
    <article className="grid gap-4 border-t border-border-hairline py-10 md:grid-cols-[5rem_1fr] md:gap-8 lg:grid-cols-[6rem_1fr_auto] lg:items-start lg:py-12">
      <p className="font-heading text-4xl leading-none text-accent-gold md:text-5xl">
        {String(index + 1).padStart(2, "0")}
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.22em] text-text-primary/60">
          <span>{certificate.issuer}</span>
          <span className="text-text-primary/35">/</span>
          <span>{certificate.date}</span>
        </div>
        <h3 className="max-w-3xl font-heading text-3xl leading-[1] md:text-4xl">
          {certificate.title}
        </h3>
        {certificate.description ? (
          <p className="max-w-2xl text-base leading-8 text-text-primary/72">
            {certificate.description}
          </p>
        ) : null}
      </div>

      <a
        href={certificate.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-accent-gold transition-colors hover:text-text-primary md:col-start-2 lg:col-start-3"
      >
        View Certificate
        <ExternalLink className="size-4" aria-hidden="true" />
      </a>
    </article>
  );
}

export function Certificates() {
  return (
    <Section id="certifications" containerSize="full" className="bg-bg-primary text-text-primary">
      <div className="section-shell section-pad-y flex flex-col gap-12">
        <SectionHeader
          align="left"
          overline="Credentials"
          heading="Certifications"
          description="Courses and training programs completed across AI, cloud, and full-stack development."
          overlineClassName="text-accent-gold"
          headingClassName="max-w-3xl text-text-primary"
          descriptionClassName="max-w-2xl text-text-primary/72"
          className="mb-0 max-w-3xl"
        />

        <div className="flex flex-col">
          {certificates.map((certificate, index) => (
            <ProjectReveal key={certificate.id} from={index % 2 ? "right" : "left"}>
              <CertificateRow certificate={certificate} index={index} />
            </ProjectReveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
