/**
 * data/achievements.ts — Notable achievements and recognitions.
 *
 * Include awards, publications, conference talks, notable open-source
 * contributions, competition results, and press mentions.
 *
 * Used by: About/Achievements section, Timeline section.
 */

import type { Achievement } from "@/types/achievement";

export const achievements: Achievement[] = [
	{
		id: "ieee-student-branch-treasurer",
		title: "IEEE Student Branch Treasurer",
		type: "recognition",
		issuer: "IEEE Student Branch, Christ University",
		date: "2025-01",
		description: "Serving as Treasurer while supporting branch operations and technical initiatives.",
	},
	{
		id: "managing-400-ieee-members",
		title: "Managed approximately 400 IEEE student members",
		type: "recognition",
		issuer: "IEEE Student Branch, Christ University",
		date: "2025-01",
		description: "Managed finances and transparent reporting for a large student organization.",
	},
	{
		id: "organized-hackathons-workshops",
		title: "Organized hackathons and technical workshops",
		type: "recognition",
		issuer: "IEEE Student Branch, Christ University",
		date: "2025-01",
		description: "Helped plan and execute large-scale hackathons, workshops, and IEEE activities.",
	},
	{
		id: "built-multiple-ai-applications",
		title: "Built multiple AI-powered applications",
		type: "open-source",
		issuer: "Personal Projects",
		date: "2024-01",
		description: "Shipped practical AI products and full-stack prototypes across multiple stacks.",
	},
	{
		id: "cybersecurity-research",
		title: "Research in Cybersecurity",
		type: "publication",
		issuer: "Independent Research",
		date: "2026-01",
		description: "Investigating Tycoon 2FA phishing kits and AI-assisted detection methods.",
	},
	{
		id: "academic-performance",
		title: "Strong academic performance (3.83 GPA)",
		type: "award",
		issuer: "Christ University",
		date: "2026-01",
		description: "Maintaining a 3.83 / 4.00 GPA in Computer Science & Engineering.",
	},
];
