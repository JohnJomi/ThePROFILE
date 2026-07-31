/**
 * data/projects.ts — Portfolio projects.
 *
 * Add each project as an object conforming to the Project interface.
 * The `slug` field is used as the URL path: /projects/[slug].
 *
 * Used by: Projects section, /projects/[slug] detail pages,
 *          semantic search index builder.
 */

import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "ieee-student-branch-erp",
    title: "IEEE Student Branch ERP",
    description:
      "A full-scale enterprise resource planning platform built for IEEE Student Branch operations. The system streamlines society management, finance, event coordination, announcements, authentication, cloud storage, and AI-assisted workflows into a single platform.",
    longDescription:
      "A full-scale enterprise resource planning platform built for IEEE Student Branch operations. The system streamlines society management, finance, event coordination, announcements, authentication, cloud storage, and AI-assisted workflows into a single platform.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Azure",
    ],
    githubUrl: "https://github.com/JohnJomi",
    liveUrl: "",
    caseStudyUrl: "",
    featured: true,
    status: "in-progress",
    publishedAt: "2026-05-01",
  },
  {
    slug: "nasa-seismic-noise-filtering-system",
    title: "NASA Seismic Noise Filtering System",
    description:
      "Scientific computing application developed to process and filter Martian seismic recordings using NASA InSight mission data. The platform removes environmental noise, visualizes seismic events, and enables cleaner geological analysis.",
    tags: ["Python", "ObsPy", "Streamlit", "Scientific Computing", "Signal Processing"],
    githubUrl: "https://github.com/JohnJomi",
    caseStudyUrl: "",
    featured: true,
    status: "completed",
    publishedAt: "2025-08-01",
  },
  {
    slug: "pix-hub",
    title: "Pix-Hub",
    description:
      "Full-stack event management platform featuring AI-powered recommendations, participant management, authentication, chatbot integration, and modern web technologies.",
    tags: ["Next.js", "Node.js", "MongoDB", "Express", "AI"],
    githubUrl: "https://github.com/JohnJomi",
    caseStudyUrl: "",
    featured: true,
    status: "in-progress",
    publishedAt: "2025-12-01",
  },
  {
    slug: "spotify-music-recommendation-system",
    title: "Spotify Music Recommendation System",
    description:
      "Machine learning powered recommendation system that analyzes listening behaviour and recommends personalized music using similarity algorithms and user preference modelling.",
    tags: ["Python", "Machine Learning", "Recommendation System", "Data Analysis"],
    githubUrl: "https://github.com/JohnJomi",
    caseStudyUrl: "",
    featured: true,
    status: "completed",
    publishedAt: "2025-09-01",
  },
  {
    slug: "hrm-research-repository",
    title: "HRM Research Repository",
    description:
      "Research-focused repository developed to organize human resource management datasets, documentation, literature reviews, and experimental findings in a structured manner.",
    tags: ["Research", "Python", "Documentation", "Data Processing"],
    githubUrl: "https://github.com/JohnJomi",
    caseStudyUrl: "",
    featured: true,
    status: "completed",
    publishedAt: "2025-07-01",
  },
  {
    slug: "ai-chatbot",
    title: "AI Chatbot",
    description:
      "Conversational AI assistant built using modern language models and prompt engineering techniques to provide intelligent responses and workflow assistance.",
    tags: ["OpenAI API", "Next.js", "Node.js", "LLM", "Prompt Engineering"],
    githubUrl: "https://github.com/JohnJomi",
    caseStudyUrl: "",
    liveUrl: "",
    featured: true,
    status: "in-progress",
    publishedAt: "2026-01-01",
  },
];

/** Featured projects — shown on the home page Projects section. */
export const featuredProjects: Project[] = projects.filter((p) => p.featured);
