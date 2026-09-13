"use client";

import { motion } from "framer-motion";

import { Section, SectionHeader } from "@/components/common";
import { internships } from "@/data/experience";
import { fadeUp, staggerContainer } from "@/lib/motion";

function formatDate(iso: string): string {
  const [year, month] = iso.split("-");
  if (!month) return year ?? iso;
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function Experience() {
  return (
    <Section id="experience" containerSize="full" className="bg-bg-primary text-text-primary">
      <div className="section-shell section-pad-y flex flex-col gap-16">
        <SectionHeader
          align="left"
          overline="Professional Journey"
          heading="Experience"
          description="Internships where I researched on-device AI models and shipped production full-stack features."
          overlineClassName="text-accent-gold"
          headingClassName="max-w-3xl text-text-primary"
          descriptionClassName="max-w-2xl text-text-primary/72"
          className="mb-0 max-w-3xl"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-16"
        >
          {internships.map((role, index) => {
            const dateLabel = role.endDate
              ? `${formatDate(role.startDate)} — ${formatDate(role.endDate)}`
              : `${formatDate(role.startDate)} — Present`;

            return (
              <motion.article
                key={role.id}
                variants={fadeUp}
                className="flex flex-col gap-8 border-t border-[color:var(--border-hairline)] pt-8 lg:grid lg:grid-cols-[1fr_18rem] lg:gap-12"
              >
                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-text-primary/55">
                    <span className="text-accent-gold">{String(index + 1).padStart(2, "0")}</span>
                    <span aria-hidden="true">/</span>
                    <span>Internship</span>
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

                    <p className="text-base text-text-primary/88">{role.role}</p>
                  </div>

                  <p className="max-w-2xl text-sm leading-7 text-text-primary/72">
                    {role.description}
                  </p>

                  <ul className="flex max-w-2xl flex-col gap-3">
                    {role.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="relative pl-5 text-sm leading-7 text-text-primary/72"
                      >
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
                  <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-text-primary/50">
                      Duration
                    </p>
                    <time dateTime={role.startDate} className="text-sm text-text-primary/85">
                      {dateLabel}
                    </time>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-text-primary/50">
                      Location
                    </p>
                    <p className="text-sm text-text-primary/85">
                      {role.remote ? `${role.location} · Remote` : role.location}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-text-primary/50">Stack</p>
                    <p className="text-sm leading-6 text-text-primary/72">
                      {role.technologies.join(" · ")}
                    </p>
                  </div>

                  {role.links && role.links.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-text-primary/50">
                        Related Work
                      </p>
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
          })}

          {internships.length === 0 && (
            <motion.p variants={fadeUp} className="text-sm text-text-primary/70">
              No experience entries available yet.
            </motion.p>
          )}
        </motion.div>
      </div>
    </Section>
  );
}
