import { ExternalLink } from "lucide-react";

import { Section, SectionHeader } from "@/components/common";
import { certificates } from "@/data/certificates";
import type { Certificate } from "@/types/certificate";

/**
 * Splits `items` into `groups` chunks that differ in size by at most one, so the
 * supporting certificates spread evenly through the gaps between showcase blocks.
 */
function distribute<T>(items: T[], groups: number): T[][] {
  const chunks: T[][] = Array.from({ length: groups }, () => []);
  items.forEach((item, index) => {
    chunks[index % groups].push(item);
  });
  return chunks;
}

function ShowcaseCertificate({ certificate, index }: { certificate: Certificate; index: number }) {
  return (
    <article className="grid gap-8 border-t border-border-hairline pt-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-text-primary/60">
          <span className="size-2 rounded-full bg-accent-gold" />
          <span>Featured Certification</span>
          <span className="text-text-primary/35">/</span>
          <span className="text-accent-gold">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <h3 className="max-w-3xl font-heading text-4xl leading-[0.96] md:text-5xl lg:text-6xl">
          {certificate.title}
        </h3>
        <p className="max-w-2xl text-base leading-8 text-text-primary/72 md:text-lg">
          {certificate.description}
        </p>
      </div>

      <div className="flex flex-col gap-4 border border-border-hairline p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-text-primary/60">
          Certification Details
        </p>
        <div className="space-y-3 text-sm leading-7 text-text-primary/76">
          <p>
            <span className="font-medium text-text-primary">Issuer:</span> {certificate.issuer}
          </p>
          <p>
            <span className="font-medium text-text-primary">Issued:</span> {certificate.date}
          </p>
          <a
            href={certificate.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-gold transition-colors hover:text-text-primary"
          >
            View Certificate
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

function SupportingCertificate({ certificate }: { certificate: Certificate }) {
  return (
    <article className="flex flex-col gap-5 border border-border-hairline p-6">
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-text-primary/60">
        <span className="size-2 rounded-full bg-text-primary-inverse" />
        {certificate.issuer}
      </div>
      <h3 className="font-heading text-2xl leading-[1] text-text-primary">{certificate.title}</h3>
      {certificate.description ? (
        <p className="text-sm leading-7 text-text-primary/72">{certificate.description}</p>
      ) : null}
      <p className="text-xs uppercase tracking-[0.16em] text-text-primary/60">{certificate.date}</p>
      <div className="mt-auto flex flex-wrap items-center gap-4">
        <a
          href={certificate.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent-gold transition-colors hover:text-text-primary"
        >
          View Certificate
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function Certificates() {
  const showcaseCertificates = certificates.filter((certificate) => certificate.featured);
  const supportingCertificates = certificates.filter((certificate) => !certificate.featured);
  const supportingGroups = distribute(supportingCertificates, showcaseCertificates.length);

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

        {showcaseCertificates.map((certificate, index) => (
          <div key={certificate.id} className="flex flex-col gap-12">
            <ShowcaseCertificate certificate={certificate} index={index} />
            {supportingGroups[index]?.length > 0 && (
              <div className="grid gap-6 lg:grid-cols-3">
                {supportingGroups[index].map((supporting) => (
                  <SupportingCertificate key={supporting.id} certificate={supporting} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
