"use client";

import { useRef } from "react";

import Image from "next/image";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

import { Heading, PrimaryButton, SecondaryButton, Section } from "@/components/common";
import { contactInfo } from "@/data/contact";
import { profile } from "@/data/profile";
import { useHeroScroll } from "@/hooks";
import { fadeUp, fadeUpLarge, staggerContainer } from "@/lib/motion";

import { HeroMarquee } from "./HeroMarquee";

export function Hero() {
  const { name, bio, openToWork } = profile;
  const [firstName, ...restOfName] = (name || "Your Name").split(" ");
  const lastName = restOfName.join(" ");

  const heroRef = useRef<HTMLDivElement>(null);
  const scroll = useHeroScroll(heroRef);
  const { prefersReduced } = scroll;

  return (
    <Section
      id="about"
      animated={false}
      containerSize="full"
      className="relative overflow-hidden bg-bg-primary text-text-primary"
    >
      <div ref={heroRef} className="section-shell section-pad-y relative z-10">
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
              style={prefersReduced ? undefined : { opacity: scroll.eyebrowOpacity }}
              className="text-xs font-medium uppercase tracking-[0.22em] text-[color:var(--accent-gold)]"
            >
              AI Engineer • Full Stack Developer • Researcher {openToWork ? "· OPEN TO WORK" : ""}
            </motion.p>

            <motion.div
              style={
                prefersReduced
                  ? undefined
                  : {
                      y: scroll.nameY,
                      scale: scroll.nameScale,
                      transformOrigin: "left top",
                      willChange: "transform",
                    }
              }
            >
              <Heading as="h1" size="h1" className="max-w-4xl text-text-primary">
                <span className="block">{firstName}</span>
                <span className="block text-accent-rust">{lastName || "Jomi"}</span>
              </Heading>
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={prefersReduced ? undefined : { y: scroll.bioY, opacity: scroll.bioOpacity }}
              className="max-w-2xl text-base leading-8 text-text-primary/72 md:text-lg"
            >
              {bio ||
                "Computer Science undergraduate building AI-powered applications, scalable web platforms, and cloud-native systems. Passionate about creating software that solves real-world problems through thoughtful engineering."}
            </motion.p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              style={
                prefersReduced ? undefined : { y: scroll.buttonsY, opacity: scroll.buttonsOpacity }
              }
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
            <motion.div
              style={
                prefersReduced
                  ? undefined
                  : {
                      y: scroll.portraitY,
                      scale: scroll.portraitScale,
                      opacity: scroll.portraitOpacity,
                      willChange: "transform",
                    }
              }
              className="relative"
            >
              <div className="relative overflow-hidden rounded-t-[220px] rounded-b-[28px] border border-[color:var(--border-hairline)] bg-bg-secondary px-8 py-10 shadow-[inset_0_1px_0_rgb(243_238_227/0.06)]">
                <div className="absolute inset-x-8 top-8 h-px bg-[color:var(--border-hairline)]" />
                <div className="absolute inset-x-8 bottom-8 h-px bg-[color:var(--border-hairline)]" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-[190px] rounded-b-[18px]">
                  <Image
                    src={profile.avatarUrl}
                    alt={`Portrait of ${profile.name}`}
                    fill
                    priority
                    sizes="(max-width: 768px) 80vw, 420px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <div className="absolute z-30 top-6 right-6 hidden size-24 items-center justify-center rounded-full border border-[color:var(--border-hairline)] bg-bg-secondary text-center text-[0.62rem] font-medium uppercase tracking-[0.22em] text-text-primary/80 md:flex">
                <motion.span
                  animate={prefersReduced ? undefined : { rotate: 360 }}
                  transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                  className="block"
                >
                  Open to work ↻
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <HeroMarquee />
      </div>
    </Section>
  );
}
