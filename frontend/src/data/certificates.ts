/**
 * data/certificates.ts — Completed courses, training badges, and credentials.
 *
 * Each entry links to the original certificate file served from
 * /public/certificates.
 *
 * Used by: Certificates section.
 */

import type { Certificate } from "@/types/certificate";

export const certificates: Certificate[] = [
  {
    id: "aws-academy-cloud-foundations",
    title: "AWS Academy Graduate — Cloud Foundations",
    issuer: "AWS Academy",
    date: "2026-08",
    description:
      "20-hour training badge covering core AWS cloud concepts, services, and architecture fundamentals.",
    fileUrl: "/certificates/aws-academy-cloud-foundations.pdf",
    featured: true,
  },
  {
    id: "nptel-intro-to-llms",
    title: "Introduction to Large Language Models (LLMs)",
    issuer: "NPTEL — IIT Madras",
    date: "2025-10",
    description:
      "12-week NPTEL certification on LLM fundamentals, completed with a consolidated score of 54%.",
    fileUrl: "/certificates/nptel-intro-to-llms.pdf",
    featured: true,
  },
  {
    id: "anthropic-claude-code-in-action",
    title: "Claude Code in Action",
    issuer: "Anthropic",
    date: "2026-03",
    description: "Hands-on certification on using Claude Code for real-world development workflows.",
    fileUrl: "/certificates/anthropic-claude-code-in-action.pdf",
    featured: true,
  },
  {
    id: "anthropic-claude-101",
    title: "Claude 101",
    issuer: "Anthropic",
    date: "2026-03",
    description: "Foundational certification covering Claude's capabilities and effective usage.",
    fileUrl: "/certificates/anthropic-claude-101.pdf",
  },
  {
    id: "infosys-software-engineering",
    title: "Software Engineering",
    issuer: "Infosys Springboard",
    date: "2026-09",
    description: "Course completion certificate covering core software engineering principles and practices.",
    fileUrl: "/certificates/infosys-software-engineering.pdf",
  },
  {
    id: "infosys-network-fundamentals",
    title: "Network Fundamentals",
    issuer: "Infosys Springboard",
    date: "2026-03",
    description: "Course completion certificate covering the fundamentals of computer networks.",
    fileUrl: "/certificates/infosys-network-fundamentals.pdf",
  },
  {
    id: "lt-advanced-js-frameworks",
    title: "Advanced JavaScript Frontend Frameworks (Angular / React)",
    issuer: "L&T EduTech — CollegeConnect Programme",
    date: "2026-03",
    description: "Completed with First Class during the Nov 2025 – Mar 2026 CollegeConnect cohort.",
    fileUrl: "/certificates/lt-advanced-js-frameworks.pdf",
  },
  {
    id: "lt-frontend-ui-ux",
    title: "Front End UI and UX Developer",
    issuer: "L&T EduTech — CollegeConnect Programme",
    date: "2025-10",
    description: "Completed with First Class during the Jun 2025 – Oct 2025 CollegeConnect cohort.",
    fileUrl: "/certificates/lt-frontend-ui-ux.pdf",
  },
  {
    id: "udemy-python-programming",
    title: "Python Programming",
    issuer: "Udemy",
    date: "2025-09",
    description: "Course completion certificate covering Python programming fundamentals.",
    fileUrl: "/certificates/udemy-python-programming.jpg",
  },
];
