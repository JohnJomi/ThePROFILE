"use client";

import { useEffect, useRef, useState } from "react";

import { motion, useScroll, useTransform } from "framer-motion";

import { useMediaQuery, useReducedMotion } from "@/hooks";

/**
 * ProjectReveal — scroll effect for the Projects page, with separate
 * behaviour per device class.
 *
 * Desktop (lg+): scroll-scrubbed. Progress is tied to the element's position
 * in the viewport, so it fades in as it arrives and out as it leaves the top,
 * fully reversible in both scroll directions, every time. `order` shifts the window slightly so cards
 * in one row land left to right.
 *
 * Mobile (<lg): in-view fade-up that replays in both directions (blocks fade
 * out when they leave the viewport and back in on return). Scrubbing on touch
 * fights momentum scrolling, so this is a triggered animation, not a scrub.
 *
 * The effect engages only after mount, so server-rendered content is fully
 * visible and never depends on JS to be readable. Reduced motion disables it.
 */

interface ProjectRevealProps {
  children: React.ReactNode;
  /** Position within a row of siblings; offsets the desktop scrub window. */
  order?: number;
  /** Direction the block travels in from on desktop. */
  from?: "up" | "left" | "right";
  className?: string;
}

export function ProjectReveal({ children, order = 0, from = "up", className }: ProjectRevealProps) {
  const isDesktop = useMediaQuery("lg");
  const prefersReduced = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted || prefersReduced) return <div className={className}>{children}</div>;

  return isDesktop ? (
    <DesktopReveal order={order} from={from} className={className}>
      {children}
    </DesktopReveal>
  ) : (
    <MobileReveal className={className}>{children}</MobileReveal>
  );
}

function DesktopReveal({ children, order = 0, from = "up", className }: ProjectRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Full pass through the viewport: in on entry, held, out as it leaves the top.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const shift = 0.05 * order;
  const stops = [0, 0.22 + shift, 0.78, 1];
  const opacity = useTransform(scrollYProgress, stops, [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, stops, [from === "up" ? 64 : 24, 0, 0, -40]);
  const x = useTransform(scrollYProgress, stops, [
    from === "left" ? -56 : from === "right" ? 56 : 0,
    0,
    0,
    0,
  ]);

  return (
    <motion.div ref={ref} style={{ opacity, y, x }} className={className}>
      {children}
    </motion.div>
  );
}

function MobileReveal({ children, className }: ProjectRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-6% 0px -6% 0px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
