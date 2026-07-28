"use client";

import { motion } from "framer-motion";

import {
  Section,
  Heading,
  Paragraph,
  GradientText,
  PrimaryButton,
  SecondaryButton,
  AnimatedBackground,
} from "@/components/common";
import { socialIconMap } from "@/components/common/SocialIcons";
import { featuredSocials } from "@/data/socials";
import { profile } from "@/data/profile";
import { fadeUp, fadeUpLarge, staggerContainer, defaultViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ArrowRight, Mail } from "lucide-react";

/**
 * Hero — above-the-fold introduction section.
 *
 * Renders:
 *   - Animated gradient background
 *   - Name + title with gradient accent
 *   - Tagline / short bio
 *   - Primary CTA (scroll to projects) + Secondary CTA (contact)
 *   - Featured social links
 *
 * Uses `animated={false}` on Section — handles its own entrance via
 * `fadeUpLarge` on the content wrapper so it's visible immediately on load.
 *
 * Data source: `profile` (name, title, tagline) + `featuredSocials`
 */

export function Hero() {
  const { name, title, tagline } = profile;

  return (
    <Section id="hero" animated={false} className="relative min-h-screen flex items-center overflow-hidden">
      <AnimatedBackground variant="gradient" />

      <div className="relative z-10 w-full">
        <motion.div
          variants={fadeUpLarge}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 text-center"
        >
          {/* Name */}
          <Heading as="h1" size="h1" className="max-w-3xl">
            {name || "Your Name"}
            <GradientText>.</GradientText>
          </Heading>

          {/* Title */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-xl md:text-2xl text-brand font-medium max-w-xl"
          >
            {title || "AI Engineer & Full Stack Developer"}
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={withDelay(fadeUp, 0.1)}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            {tagline || "Building intelligent systems that solve real problems."}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={withDelay(staggerContainer, 0.2)}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
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
              Get In Touch
            </SecondaryButton>
          </motion.div>

          {/* Social Links */}
          {featuredSocials.length > 0 && (
            <motion.div
              variants={withDelay(staggerContainer, 0.3)}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 pt-2"
            >
              {featuredSocials.map((social) => (
                <motion.a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className={cn(
                    "size-10 rounded-lg flex items-center justify-center",
                    "text-muted-foreground hover:text-brand hover:bg-muted",
                    "transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  {socialIconMap[social.icon as keyof typeof socialIconMap] ?? null}
                </motion.a>
              ))}
            </motion.div>
          )}

          {/* Scroll indicator */}
          <motion.div
            variants={withDelay(fadeUp, 0.5)}
            initial="hidden"
            animate="visible"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
            aria-hidden="true"
          >
            <svg
              className="size-6 text-muted-foreground/50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </Section>
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