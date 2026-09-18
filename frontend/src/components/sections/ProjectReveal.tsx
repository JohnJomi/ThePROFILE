"use client";

import { useEffect, useRef, useState } from "react";

import { motion, useScroll, useTransform } from "framer-motion";

import { useMediaQuery, useReducedMotion } from "@/hooks";

/**
 * ProjectReveal — scroll effect for the Projects page, with separate
 * behaviour per device class.
 *
 * Desktop (lg+): scroll-scrubbed. Progress is tied to the element's position
 * in the viewport, so it fades and rises as the reader scrolls it into place
 * and rewinds on the way back up. `order` shifts the window slightly so cards
 * in one row land left to right.
 *
 * Mobile (<lg): one-shot in-view fade-up. Scrubbing on touch fights momentum
 * scrolling and leaves half-faded content under the thumb, so each block
 * simply fades up once when it enters view.
 *
 * The effect engages only after mount, so server-rendered content is fully
 * visible and never depends on JS to be readable. Reduced motion disables it.
 */

interface ProjectRevealProps {
  children: React.ReactNode;
  /** Position within a row of siblings; offsets the desktop scrub window. */
  order?: number;
  className?: string;
}

export function ProjectReveal({ children, order = 0, className }: ProjectRevealProps) {
  const isDesktop = useMediaQuery("lg");
  const prefersReduced = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted || prefersReduced) return <div className={className}>{children}</div>;

  return isDesktop ? (
    <DesktopReveal order={order} className={className}>
      {children}
    </DesktopReveal>
  ) : (
    <MobileReveal className={className}>{children}</MobileReveal>
  );
}

function DesktopReveal({ children, order = 0, className }: ProjectRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${0.98 - order * 0.05}`, `start ${0.6 - order * 0.05}`],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [64, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

function MobileReveal({ children, className }: ProjectRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
