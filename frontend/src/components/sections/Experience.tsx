"use client";

import { motion } from "framer-motion";

import { Section, SectionHeader } from "@/components/common";
import { internships, researchExperience } from "@/data/experience";
import { fadeUp, staggerContainer } from "@/lib/motion";
import type { Experience as ExperienceEntry } from "@/types/experience";

function formatDate(iso: string): string {
  const [year, month] = iso.split("-");
  if (!month) return year ?? iso;
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function RoleBlock({
  role,
  index,
  kicker,
}: {
  role: ExperienceEntry;
  index: number;
  kicker: string;
}) {
  const dateLabel = role.endDate
    ? `${formatDate(role.startDate)} — ${formatDate(role.endDate)}`
    : `${formatDate(role.startDate)} — Present`;

  // Avoid "Remote · Remote" when the location itself is already "Remote".
  const locationLabel =
    role.remote && role.location.toLowerCase() !== "remote"
      ? `${role.location} · Remote`
      : role.location;

  return (
    <motion.article
      variants={fadeUp}
      className="flex flex-col gap-8 border-t border-[color:var(--border-hairline)] pt-8 lg:grid lg:grid-cols-[1fr_18rem] lg:gap-12"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-text-primary/68">
          <span className="text-accent-gold">{String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden="true">/</span>
          <span>{kicker}</span>
          {!role.endDate && (
            <span className="flex items-center gap-2 text-accent-gold">
              <span className="size-1.5 rounded-full bg-accent-gold" aria-hidden="true" />
              Ongoing
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {role.companyUrl ? (
            <a
              href={role.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="max-w-3xl font-heading text-4xl leading-[0.95] text-text-primary transition-colors hover:text-accent-gold md:text-5xl"
            >
              {role.company}
            </a>
          ) : (
            <h3 className="max-w-3xl font-heading text-4xl leading-[0.95] text-text-primary md:text-5xl">
              {role.company}
            </h3>
          )}

          <p className="text-base text-text-primary/95">{role.role}</p>
        </div>

        <p className="max-w-2xl text-sm leading-7 text-text-primary/85">{role.description}</p>

        <ul className="flex max-w-2xl flex-col gap-3">
          {role.highlights.map((highlight) => (
            <li key={highlight} className="relative pl-5 text-sm leading-7 text-text-primary/85">
              <span
                aria-hidden="true"
                className="absolute left-0 top-[0.7rem] size-1 rounded-full bg-accent-gold"
              />
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      <aside className="flex flex-col gap-6 border-t border-[color:var(--border-hairline)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        {role.statusNote && (
          <div className="flex flex-col gap-1 border-l-2 border-accent-rust pl-3">
            <p className="text-xs uppercase tracking-[0.2em] text-text-primary/65">
              {role.statusNote.label}
            </p>
            <p className="text-sm text-accent-rust">{role.statusNote.value}</p>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <p className="text-xs uppercase tracking-[0.2em] text-text-primary/65">Duration</p>
          <time dateTime={role.startDate} className="text-sm text-text-primary/92">
            {dateLabel}
          </time>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-xs uppercase tracking-[0.2em] text-text-primary/65">Location</p>
          <p className="text-sm text-text-primary/92">{locationLabel}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-text-primary/65">Stack</p>
          <p className="text-sm leading-6 text-text-primary/85">
            {role.technologies.join(" · ")}
          </p>
        </div>

        {role.links && role.links.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.2em] text-text-primary/65">Related Work</p>
            {role.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent-gold/85 underline-offset-4 transition-colors hover:text-accent-gold hover:underline"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </aside>
    </motion.article>
  );
}

export function Experience() {
  return (
    <Section id="experience" containerSize="full" className="bg-transparent text-text-primary">
      <div className="section-shell section-pad-y flex flex-col gap-16">
        <SectionHeader
          reveal
          align="left"
          overline="Professional Journey"
          heading="Experience"
          description="Internships where I researched on-device AI models and shipped production full-stack features, plus independent security research."
          overlineClassName="text-accent-gold"
          headingClassName="max-w-3xl text-text-primary"
          descriptionClassName="max-w-2xl text-text-primary/85"
          className="mb-0 max-w-3xl"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-16"
        >
          {internships.map((role, index) => (
            <RoleBlock key={role.id} role={role} index={index} kicker="Internship" />
          ))}
        </motion.div>

        {researchExperience.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-10 pt-4"
          >
            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.22em] text-accent-gold">Research</p>
              <h3 className="max-w-3xl font-heading text-3xl leading-[1] text-text-primary md:text-4xl">
                Independent Security Research
              </h3>
              <p className="max-w-2xl text-sm leading-7 text-text-primary/85">
                Self-directed work on phishing detection, pursued alongside coursework.
              </p>
            </motion.div>

            {researchExperience.map((role, index) => (
              <RoleBlock key={role.id} role={role} index={index} kicker="Research" />
            ))}
          </motion.div>
        )}
      </div>
    </Section>
  );
}
