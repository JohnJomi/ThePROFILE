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
		slug: "cybersecurity-research-toolkit",
		title: "Cybersecurity Research Toolkit",
		description:
			"Research utilities and detection techniques for Tycoon 2FA phishing campaigns.",
		tags: ["Python", "Machine Learning", "Cybersecurity"],
		featured: true,
		status: "in-progress",
		publishedAt: "2026-07-01",
	},
	{
		slug: "ieee-student-branch-erp",
		title: "IEEE Student Branch ERP",
		description:
			"Enterprise platform for managing IEEE Student Branch operations, finance, events, announcements, authentication, and AI assistance.",
		tags: [
			"Next.js",
			"React",
			"TypeScript",
			"Node.js",
			"Express",
			"Prisma",
			"PostgreSQL",
			"Azure Blob Storage",
			"AWS",
			"Docker",
		],
		featured: true,
		status: "in-progress",
		publishedAt: "2026-05-01",
	},
	{
		slug: "ai-event-management-platform",
		title: "AI Event Management Platform",
		description:
			"AI-powered event management platform that recommends events, automates participant engagement, and provides chatbot assistance.",
		tags: ["Next.js", "Node.js", "MongoDB", "Express", "Gemini API"],
		featured: true,
		status: "completed",
		publishedAt: "2025-12-01",
	},
	{
		slug: "seismic-noise-filtering-system",
		title: "Seismic Noise Filtering System",
		description:
			"Signal-processing platform that filters Martian seismic data using ObsPy and visualizes seismic events.",
		tags: ["Python", "ObsPy", "Streamlit", "Scientific Computing"],
		featured: true,
		status: "completed",
		publishedAt: "2025-08-01",
	},
];

/** Featured projects — shown on the home page Projects section. */
export const featuredProjects: Project[] = projects.filter((p) => p.featured);
