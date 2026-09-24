"use client";

import { motion } from "framer-motion";

import { blurIn } from "@/lib/motion";

export function ProjectTitle({ title }: { title: string }) {
  return (
    <motion.h1
      variants={blurIn}
      initial="hidden"
      animate="visible"
      className="max-w-4xl font-heading text-4xl leading-[0.96] md:text-5xl lg:text-6xl"
    >
      {title}
    </motion.h1>
  );
}
