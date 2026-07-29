"use client";

import { motion } from "framer-motion";
import { ImageUp, ArrowRight, Mail, Sparkles } from "lucide-react";
import {
  siDocker,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siOpenjdk,
  siPython,
  siReact,
  siTypescript,
} from "simple-icons";

import {
  Section,
  Heading,
  GradientText,
  PrimaryButton,
  SecondaryButton,
  AnimatedBackground,
} from "@/components/common";
import { profile } from "@/data/profile";
import { fadeUp, fadeUpLarge, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const MARQUEE_ITEMS = [
  { label: "Python", icon: siPython },
  { label: "Java", icon: siOpenjdk },
  { label: "TypeScript", icon: siTypescript },
  { label: "React", icon: siReact },
  { label: "Next.js", icon: siNextdotjs },
  { label: "Node.js", icon: siNodedotjs },
  { label: "Docker", icon: siDocker },
  { label: "PostgreSQL", icon: siPostgresql },
  { label: "AWS", icon: null },
] as const;

/**
 * Hero — above-the-fold introduction section.
 *
 * Renders:
 *   - Animated gradient background
 *   - Two-column introduction with copy and photo placeholder
 *   - Name + title with gradient accent
 *   - Tagline / short bio
 *   - Primary CTA (scroll to projects) + Secondary CTA (contact)
 *   - Tech stack marquee under the intro
 *
 * Uses `animated={false}` on Section — handles its own entrance via
 * `fadeUpLarge` on the content wrapper so it's visible immediately on load.
 *
 * Data source: `profile` (name, title, tagline)
 */

export function Hero() {
  const { name, title, tagline, bio, openToWork } = profile;

  return (
    <Section
      id="about"
      animated={false}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <AnimatedBackground variant="gradient" />

      <div className="relative z-10 w-full">
        <motion.div
          variants={fadeUpLarge}
          initial="hidden"
          animate="visible"
          className={cn(
            "mx-auto w-full max-w-7xl rounded-[2rem] border border-border/70 bg-card/80 p-4 shadow-[0_24px_80px_rgb(15_23_42/0.08)] backdrop-blur-xl",
            "dark:border-white/10 dark:bg-card/70 dark:shadow-[0_30px_90px_rgb(0_0_0/0.24)]",
          )}
        >
          <div className="rounded-[1.65rem] border border-dashed border-brand/20 bg-background/70 px-6 py-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.2)] sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="flex flex-col gap-6 text-left">
                <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-4 py-1.5 text-xs font-semibold tracking-[0.28em] text-brand uppercase">
                    <Sparkles className="size-3.5" aria-hidden="true" />
                    AI Engineer
                  </span>
                  {openToWork && (
                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                      Open to work
                    </span>
                  )}
                </motion.div>

                <Heading as="h1" size="h1" className="max-w-3xl">
                  {name || "Your Name"}
                  <GradientText>.</GradientText>
                </Heading>

                <motion.p
                  variants={withDelay(fadeUp, 0.08)}
                  initial="hidden"
                  animate="visible"
                  className="max-w-2xl text-xl font-medium text-brand md:text-2xl"
                >
                  {title || "AI Engineer & Full Stack Developer"}
                </motion.p>

                <motion.p
                  variants={withDelay(fadeUp, 0.16)}
                  initial="hidden"
                  animate="visible"
                  className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg"
                >
                  {tagline || bio || "Building intelligent systems that solve real problems."}
                </motion.p>

                <motion.div
                  variants={withDelay(staggerContainer, 0.24)}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-3 pt-2 sm:flex-row"
                >
                  <PrimaryButton
                    href="/#projects"
                    size="lg"
                    icon={<ArrowRight className="size-4" aria-hidden="true" />}
                    iconPosition="right"
                  >
                    View Projects
                  </PrimaryButton>
                  <SecondaryButton
                    href={`mailto:${profile.email || "hello@example.com"}`}
                    size="lg"
                    icon={<Mail className="size-4" aria-hidden="true" />}
                    iconPosition="left"
                  >
                    Contact Me
                  </SecondaryButton>
                </motion.div>
              </div>

              <motion.div
                variants={withDelay(fadeUp, 0.1)}
                initial="hidden"
                animate="visible"
                className="mx-auto flex w-full max-w-md justify-center"
              >
                <div className="relative w-full overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-brand/10 via-background to-card/90 p-4 shadow-[0_18px_50px_rgb(15_23_42/0.08)] dark:from-brand/15 dark:via-background dark:to-card/70">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.5),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.14),transparent_35%)] opacity-70 dark:opacity-100" />
                  <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[1.5rem] border border-dashed border-border/70 bg-background/70 px-6 text-center shadow-[inset_0_1px_0_rgb(255_255_255/0.22)]">
                    <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
                    <div className="absolute inset-x-6 bottom-6 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
                    <div className="absolute left-6 top-6 size-4 rounded-full border border-brand/20 bg-brand/15" />
                    <div className="absolute bottom-6 right-6 size-4 rounded-full border border-brand/20 bg-brand/15" />
                    <div className="flex max-w-xs flex-col items-center gap-4">
                      <div className="flex size-24 items-center justify-center rounded-full border border-brand/20 bg-brand/10 text-brand shadow-[0_16px_40px_rgb(124_58_237/0.16)]">
                        <ImageUp className="size-10" aria-hidden="true" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xl font-semibold tracking-tight text-foreground">
                          Your photo goes here
                        </p>
                        <p className="text-sm leading-6 text-muted-foreground">
                          Replace this placeholder with your portrait when you’re ready.
                        </p>
                      </div>
                      <div className="rounded-full border border-border/70 bg-background/80 px-4 py-2 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                        Profile image placeholder
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={withDelay(fadeUp, 0.28)}
            initial="hidden"
            animate="visible"
            className="relative mt-6 overflow-hidden rounded-[1.5rem] border border-border/70 bg-background/80 px-4 py-4 shadow-[0_14px_36px_rgb(15_23_42/0.06)]"
          >
            <div className="flex items-center justify-between gap-4 pb-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="size-2 rounded-full bg-brand" aria-hidden="true" />
                Tech stack and skills
              </div>
              <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                Marquee
              </span>
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background via-background/80 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background via-background/80 to-transparent" />

            <div className="overflow-hidden py-1">
              <div className="marquee-ltr flex w-max items-center gap-3">
                {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
                  <TechMarqueeItem key={`${item.label}-${index}`} item={item} />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

type TechMarqueeItemProps = {
  item: (typeof MARQUEE_ITEMS)[number];
};

function TechMarqueeItem({ item }: TechMarqueeItemProps) {
  return (
    <div className="flex min-w-[11rem] items-center gap-3 rounded-full border border-border/70 bg-card/85 px-4 py-3 shadow-[0_10px_26px_rgb(15_23_42/0.05)] backdrop-blur-sm dark:bg-card/80">
      {item.icon ? (
        <div
          className="flex size-10 items-center justify-center rounded-full text-white shadow-sm"
          style={{ backgroundColor: `#${item.icon.hex}` }}
          aria-hidden="true"
        >
          <svg
            className="size-5"
            role="img"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={item.icon.path} />
          </svg>
        </div>
      ) : (
        <div className="flex size-10 items-center justify-center rounded-full bg-[#FF9900]/12 text-xs font-bold tracking-[0.2em] text-[#FF9900]">
          AWS
        </div>
      )}

      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-foreground">{item.label}</span>
        <span className="text-xs text-muted-foreground">Selected skill</span>
      </div>
    </div>
  );
}

/**
 * Creates a delayed variant of any base variant set.
 * Re-exported locally to avoid importing from motion.ts for a single helper.
 */
function withDelay(variants: typeof fadeUp, delaySeconds: number) {
  return {
    ...variants,
    visible: {
      ...(typeof variants.visible === "object" ? variants.visible : {}),
      transition: {
        ...(typeof variants.visible === "object" &&
        "transition" in variants.visible &&
        typeof variants.visible.transition === "object"
          ? variants.visible.transition
          : {}),
        delay: delaySeconds,
      },
    },
  };
}