"use client";

import { motion } from "framer-motion";

import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function JourneyTimeline({ items }: { items: readonly string[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="flex flex-col gap-6"
    >
      {items.map((item, index) => (
        <motion.div key={item} variants={fadeUp} className="relative pl-1">
          <span
            aria-hidden="true"
            className={cn(
              "absolute -left-[2.05rem] top-2 size-3 rounded-full border border-bg-primary",
              index === items.length - 1 ? "bg-accent-gold" : "bg-text-primary",
            )}
          />
          <div className="flex items-center gap-4">
            <p className="text-sm uppercase tracking-[0.2em] text-text-primary/60">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="text-lg font-medium text-text-primary">{item}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
