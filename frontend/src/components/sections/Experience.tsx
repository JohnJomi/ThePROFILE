"use client";

import { motion } from "framer-motion";

import { Container, Section, SectionHeader, TimelineCard } from "@/components/common";
import { timeline } from "@/data/timeline";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Experience() {
  return (
    <Section id="experience">
      <Container size="default" className="flex flex-col gap-12">
        <SectionHeader
          overline="Professional Journey"
          heading="Experience & Education"
          description="A reverse-chronological view of professional experience and academic progress."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative flex flex-col"
        >
          {timeline.map((item, index) => (
            <TimelineCard
              key={`${item.type}-${item.id}`}
              item={item}
              isLast={index === timeline.length - 1}
            />
          ))}

          {timeline.length === 0 && (
            <motion.p variants={fadeUp} className="text-sm text-muted-foreground">
              No timeline entries available yet.
            </motion.p>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}