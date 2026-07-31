"use client";

import { motion } from "framer-motion";
import { ArrowRight, ImageUp, Download } from "lucide-react";

import { Heading, PrimaryButton, SecondaryButton, Section } from "@/components/common";
import { contactInfo } from "@/data/contact";
import { profile } from "@/data/profile";
import { fadeUp, fadeUpLarge, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const marqueeItems = [
  "ARTIFICIAL INTELLIGENCE",
  "FULL STACK DEVELOPMENT",
  "CLOUD ENGINEERING",
  "PRODUCTION SYSTEMS",
  "RESEARCH",
  "MODERN WEB APPLICATIONS",
] as const;

const floatingChips = [
  { label: "React", className: "left-[-1.5rem] top-10" },
  { label: "Next.js", className: "right-[-1rem] top-6" },
  { label: "Node.js", className: "left-[-2rem] bottom-20" },
  { label: "Python", className: "right-[-1.5rem] bottom-28" },
  { label: "AWS", className: "left-8 bottom-[-0.75rem]" },
  { label: "Azure", className: "right-10 top-[45%]" },
  { label: "AI", className: "left-[46%] top-[-1.2rem]" },
] as const;

const chipMotion = {
  y: [0, -8, 0],
};

export function Hero() {
  const { name, bio, openToWork } = profile;
  const [firstName, ...restOfName] = (name || "Your Name").split(" ");
  const lastName = restOfName.join(" ");

  return (
    <Section
      id="about"
      animated={false}
      containerSize="full"
      className="relative overflow-hidden bg-bg-primary text-text-primary"
    >
      <div className="section-shell section-pad-y relative z-10">
        <motion.div
          variants={fadeUpLarge}
          initial="hidden"
          animate="visible"
          className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
        >
          <div className="flex flex-col items-start gap-6">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            className="text-xs font-medium uppercase tracking-[0.22em] text-[color:var(--accent-gold)]"
          >
              AI Engineer • Full Stack Developer • Researcher {openToWork ? "· OPEN TO WORK" : ""}
            </motion.p>

            <Heading as="h1" size="h1" className="max-w-4xl text-text-primary">
              <span className="block">{firstName}</span>
              <span className="block text-accent-rust">{lastName || "Jomi"}</span>
            </Heading>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="max-w-2xl text-base leading-8 text-text-primary/72 md:text-lg"
            >
              {bio ||
                "Computer Science undergraduate building AI-powered applications, scalable web platforms, and cloud-native systems. Passionate about creating software that solves real-world problems through thoughtful engineering."}
            </motion.p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-3 sm:flex-row"
            >
              <PrimaryButton
                href="/projects"
                size="lg"
                icon={<ArrowRight className="size-4" aria-hidden="true" />}
                iconPosition="right"
              >
                View Projects
              </PrimaryButton>
              <SecondaryButton
                href={contactInfo.resumeUrl}
                size="lg"
                icon={<Download className="size-4" aria-hidden="true" />}
                iconPosition="left"
              >
                Download Resume
              </SecondaryButton>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative mx-auto w-full max-w-md"
          >
            {floatingChips.map((chip) => (
              <motion.div
                key={chip.label}
                animate={chipMotion}
                transition={{ duration: 6 + chip.label.length * 0.15, repeat: Infinity, ease: "easeInOut" }}
                className={cn(
                  "absolute z-20 rounded-full border border-border-hairline bg-bg-secondary/95 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-text-primary/80 shadow-sm backdrop-blur-sm",
                  chip.className,
                )}
              >
                {chip.label}
              </motion.div>
            ))}
            <div className="absolute -left-6 top-10 hidden size-24 items-center justify-center rounded-full border border-[color:var(--border-hairline)] bg-bg-secondary text-center text-[0.62rem] font-medium uppercase tracking-[0.22em] text-text-primary/80 md:flex">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                className="block"
              >
                Open to work ↻
              </motion.span>
            </div>

            <div className="relative overflow-hidden rounded-t-[220px] rounded-b-[28px] border border-[color:var(--border-hairline)] bg-bg-secondary px-8 py-10 shadow-[inset_0_1px_0_rgb(243_238_227/0.06)]">
              <div className="absolute inset-x-8 top-8 h-px bg-[color:var(--border-hairline)]" />
              <div className="absolute inset-x-8 bottom-8 h-px bg-[color:var(--border-hairline)]" />
              <div className="flex aspect-[4/5] items-center justify-center">
                <div className="flex max-w-xs flex-col items-center gap-5 text-center text-text-primary">
                  <div className="flex size-28 items-center justify-center rounded-full border border-[color:var(--border-hairline)] bg-bg-primary text-accent-gold">
                    <ImageUp className="size-10" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-semibold tracking-tight">Photo placeholder</p>
                    <p className="text-sm leading-6 text-text-primary/68">
                      Replace this with your portrait when you upload one.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-12 overflow-hidden border-y border-[color:var(--border-hairline)] bg-bg-secondary py-4"
        >
          <div className="marquee-ltr flex w-max items-center gap-5">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="flex items-center gap-5 text-xs font-medium uppercase tracking-[0.22em] text-text-primary/80 sm:text-sm"
              >
                <span>{item}</span>
                <span className="text-[color:var(--accent-gold)]">✦</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
