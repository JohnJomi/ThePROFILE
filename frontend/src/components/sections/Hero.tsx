"use client";

import { motion } from "framer-motion";
import { ArrowRight, ImageUp, Mail } from "lucide-react";

import { Heading, PrimaryButton, SecondaryButton, Section } from "@/components/common";
import { profile } from "@/data/profile";
import { fadeUp, fadeUpLarge, staggerContainer } from "@/lib/motion";

const marqueeItems = [
  "Practical AI Products",
  "Reliable Web Systems",
  "Cloud-Native Delivery",
  "Full-Stack Craft",
  "Product Thinking",
  "Production-Ready Systems",
] as const;

export function Hero() {
  const { name, tagline, bio, openToWork } = profile;
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
              — AI ENGINEER {openToWork ? "· OPEN TO WORK" : ""}
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
              {tagline || bio || "Building intelligent systems that solve real problems."}
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
                href="/contact"
                size="lg"
                icon={<Mail className="size-4" aria-hidden="true" />}
                iconPosition="left"
              >
                Contact Me
              </SecondaryButton>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative mx-auto w-full max-w-md"
          >
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
