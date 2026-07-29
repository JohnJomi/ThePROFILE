/**
 * data/experience.ts — Work experience entries.
 *
 * Entries should be in reverse-chronological order (most recent first).
 * The `endDate` field should be omitted for your current role.
 *
 * Used by: Experience section, Timeline section, resume.
 */

import type { Experience } from "@/types/experience";

export const experience: Experience[] = [
	{
		id: "ieee-student-branch-treasurer",
		company: "IEEE Student Branch, Christ University",
		companyUrl: "https://github.com/IEEE-CU",
		role: "Student Branch Treasurer",
		employmentType: "volunteer",
		startDate: "2025-01",
		location: "Bangalore, India",
		remote: false,
		description:
			"Manage branch finances and support the planning and execution of student-led technical initiatives.",
		highlights: [
			"Managed finances for a student branch of approximately 400 IEEE student members.",
			"Prepared and maintained annual budgets, income tracking, expenses, and reimbursements.",
			"Coordinated funding for technical events, workshops, hackathons, and IEEE activities.",
			"Streamlined financial tracking and reimbursement processes across multiple IEEE societies.",
		],
		technologies: ["Excel", "Google Sheets", "Notion", "Project Management"],
	},
	{
		id: "personal-projects-ai-full-stack-developer",
		company: "Personal Projects",
		role: "AI & Full Stack Developer",
		employmentType: "freelance",
		startDate: "2024-01",
		location: "Remote",
		remote: true,
		description:
			"Build AI-powered web applications, scalable backend systems, and modern frontend experiences.",
		highlights: [
			"Integrated large language models into practical web applications.",
			"Built REST APIs and backend services with a focus on maintainability and scale.",
			"Designed responsive frontend interfaces using modern React and Next.js patterns.",
			"Worked across cloud platforms and deployment workflows for production-ready delivery.",
		],
		technologies: [
			"Next.js",
			"React",
			"TypeScript",
			"Node.js",
			"Express",
			"MongoDB",
			"PostgreSQL",
			"Prisma",
			"Python",
			"FastAPI",
			"AWS",
			"Azure",
			"Docker",
			"Git",
			"GitHub",
		],
	},
	{
		id: "independent-research-cybersecurity",
		company: "Independent Research",
		role: "Research Author",
		employmentType: "volunteer",
		startDate: "2026-01",
		location: "Remote",
		remote: true,
		description:
			"Researching detection of phishing emails generated using Tycoon 2FA phishing kits.",
		highlights: [
			"Studying Tycoon 2FA attack infrastructure and phishing email characteristics.",
			"Researching detection methodologies for malicious email campaigns.",
			"Evaluating AI-assisted email detection techniques for practical effectiveness.",
			"Preparing a publishable research paper on the investigation.",
		],
		technologies: [
			"Python",
			"Machine Learning",
			"Cybersecurity",
			"Email Security",
			"Threat Intelligence",
		],
	},
];
