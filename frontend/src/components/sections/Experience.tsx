"use client";

import { motion } from "framer-motion";

import { Section, SectionHeader } from "@/components/common";
import { timeline } from "@/data/timeline";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { TimelineItem } from "@/types/timeline";

function formatDate(iso: string): string {
  const [year, month] = iso.split("-");
  if (!month) return year ?? iso;
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function typeMeta(type: TimelineItem["type"]) {
  switch (type) {
    case "experience":
      return { label: "Experience", color: "text-text-primary" };
    case "education":
      return { label: "Education", color: "text-text-primary/88" };
    case "achievement":
      return { label: "Achievement", color: "text-accent-rust" };
    case "certification":
      return { label: "Certification", color: "text-accent-gold" };
  }
}

export function Experience() {
  const itemsWithYearLabels = timeline.map((item, index) => {
    const currentYear = item.date.slice(0, 4);
    const previousYear = index > 0 ? timeline[index - 1]?.date.slice(0, 4) : null;
    return {
      item,
      currentYear,
      showYear: index === 0 || currentYear !== previousYear,
    };
  });

  return (
    <Section id="experience" containerSize="full" className="bg-bg-primary text-text-primary">
      <div className="section-shell section-pad-y flex flex-col gap-12">
        <SectionHeader
          align="left"
          overline="Professional Journey"
          heading="Experience & Education"
          description="A reverse-chronological view of professional experience and academic progress."
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
          className="relative flex flex-col gap-10"
        >
          <div className="absolute left-3 top-2 bottom-2 w-px bg-[color:var(--border-hairline)]" aria-hidden="true" />
          {itemsWithYearLabels.map(({ item, currentYear, showYear }) => {
            const meta = typeMeta(item.type);
            const dateLabel = item.endDate
              ? `${formatDate(item.date)} — ${formatDate(item.endDate)}`
              : item.current
                ? `${formatDate(item.date)} — Present`
                : formatDate(item.date);

            return (
              <motion.article key={`${item.type}-${item.id}`} variants={fadeUp} className="relative pl-10">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-[0.35rem] top-2 size-3 rounded-full border border-bg-primary",
                    item.current ? "bg-accent-gold" : "bg-text-primary",
                  )}
                />

                {showYear && (
                  <div className="mb-4 pt-1 text-xs uppercase tracking-[0.22em] text-text-primary/55">
                    {currentYear}
                  </div>
                )}

                <div className="flex flex-col gap-3 border-t border-[color:var(--border-hairline)] pt-5">
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em]">
                    <span className={meta.color}>{meta.label}</span>
                    {item.current && (
                      <span className="flex items-center gap-2 text-accent-gold">
                        <span className="size-1.5 rounded-full bg-accent-gold" aria-hidden="true" />
                        Current
                      </span>
                    )}
                  </div>

                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="max-w-3xl font-heading text-2xl leading-[1] text-text-primary transition-colors hover:text-accent-gold md:text-3xl"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <h3 className="max-w-3xl font-heading text-2xl leading-[1] text-text-primary md:text-3xl">
                      {item.title}
                    </h3>
                  )}

                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-text-primary/72">
                    <span>{item.subtitle}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={item.date}>{dateLabel}</time>
                  </div>

                  {item.description && (
                    <p className="max-w-3xl text-sm leading-7 text-text-primary/72">
                      {item.description}
                    </p>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <p className="max-w-3xl text-xs uppercase tracking-[0.16em] text-text-primary/60">
                      {item.tags.join(" · ")}
                    </p>
                  )}
                </div>
              </motion.article>
            );
          })}

          {timeline.length === 0 && (
            <motion.p variants={fadeUp} className="text-sm text-text-primary/70">
              No timeline entries available yet.
            </motion.p>
          )}
        </motion.div>
      </div>
    </Section>
  );
}
