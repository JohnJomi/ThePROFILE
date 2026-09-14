"use client";

import { useRef } from "react";

import Image from "next/image";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

import { Heading, PrimaryButton, SecondaryButton, Section } from "@/components/common";
import { contactInfo } from "@/data/contact";
import { profile } from "@/data/profile";
import { chipWindow, useHeroScroll } from "@/hooks";
import { fadeUp, fadeUpLarge, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { HeroMarquee } from "./HeroMarquee";

/**
 * Floating technology pills.
 *
 * `vector` is the chip's dispersal direction in px at full spread — deterministic,
 * never random, so the constellation breaks apart the same way every scroll.
 * `onMobile: false` chips are hidden below `lg` to keep ~4 pills on small screens.
 */
const floatingChips = [
  {
    label: "AI",
    vector: [-70, -90] as const, // upper-left
    onMobile: true,
    className: "left-1/2 -translate-x-1/2 top-[-2.5rem] md:top-[-3rem] lg:top-[-3.5rem]",
  },
  {
    label: "React",
    vector: [0, -110] as const, // up
    onMobile: true,
    className:
      "left-[-2.5rem] top-[18%] md:left-[-3rem] md:top-[16%] lg:left-[-3.5rem] lg:top-[14%]",
  },
  {
    label: "Next.js",
    vector: [70, -90] as const, // upper-right
    onMobile: true,
    className:
      "right-[-2.5rem] top-[18%] md:right-[-3rem] md:top-[16%] lg:right-[-3.5rem] lg:top-[14%]",
  },
  {
    label: "AWS",
    vector: [-110, 0] as const, // left
    onMobile: false,
    className: "left-[-2.5rem] top-1/2 -translate-y-1/2 md:left-[-3rem] lg:left-[-3.5rem]",
  },
  {
    label: "Azure",
    vector: [110, 0] as const, // right
    onMobile: false,
    className: "right-[-2.5rem] top-1/2 -translate-y-1/2 md:right-[-3rem] lg:right-[-3.5rem]",
  },
  {
    label: "Node.js",
    vector: [-80, 70] as const, // lower-left
    onMobile: false,
    className:
      "left-[-2.5rem] bottom-[18%] md:left-[-3rem] md:bottom-[16%] lg:left-[-3.5rem] lg:bottom-[14%]",
  },
  {
    label: "Python",
    vector: [0, 110] as const, // down
    onMobile: true,
    className:
      "right-[-2.5rem] bottom-[18%] md:right-[-3rem] md:bottom-[16%] lg:right-[-3.5rem] lg:bottom-[14%]",
  },
] as const;

const chipMotion = {
  y: [0, -8, 0],
};

/**
 * HeroChip — one floating pill.
 *
 * Its own component so each chip can own its `useTransform` calls without
 * calling hooks inside a loop. The idle float stays on the inner element and the
 * scroll dispersal rides on the outer wrapper, so the two never fight.
 */
function HeroChip({
  chip,
  index,
  progress,
  chipSpread,
  chipEnd,
  prefersReduced,
}: {
  chip: (typeof floatingChips)[number];
  index: number;
  progress: MotionValue<number>;
  chipSpread: number;
  chipEnd: number;
  prefersReduced: boolean;
}) {
  const { start, end } = chipWindow(index, chipEnd);
  const [vx, vy] = chip.vector;

  const x = useTransform(progress, [start, end], [0, vx * chipSpread]);
  const y = useTransform(progress, [start, end], [0, vy * chipSpread]);
  const opacity = useTransform(
    progress,
    [start, (start + end) / 2, end],
    prefersReduced ? [1, 1, 1] : [1, 0.55, 0],
  );

  return (
    <motion.div
      style={prefersReduced ? undefined : { x, y, opacity }}
      className={cn("absolute z-20", chip.className, chip.onMobile ? "" : "hidden lg:block")}
    >
      <motion.div
        animate={prefersReduced ? undefined : chipMotion}
        transition={{ duration: 6 + chip.label.length * 0.15, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-full border border-border-hairline bg-bg-secondary/95 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-text-primary/80 shadow-sm backdrop-blur-sm"
      >
        {chip.label}
      </motion.div>
    </motion.div>
  );
}

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

          {/*
           * The chips sit OUTSIDE the scaling wrapper on purpose: nested inside
           * it, the portrait's scale would multiply their trajectories and its
           * fade would double up with theirs.
           */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative mx-auto w-full max-w-md"
          >
            {floatingChips.map((chip, index) => (
              <HeroChip
                key={chip.label}
                chip={chip}
                index={index}
                progress={scroll.progress}
                chipSpread={scroll.chipSpread}
                chipEnd={scroll.chipEnd}
                prefersReduced={prefersReduced}
              />
            ))}

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
