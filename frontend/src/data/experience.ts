/**
 * data/experience.ts — Work experience entries.
 *
 * Entries should be in reverse-chronological order (most recent first).
 * The `endDate` field should be omitted for your current role.
 *
 * Used by: Experience section, resume.
 */

import type { Experience } from "@/types/experience";

export const experience: Experience[] = [
	{
		id: "prophaze-ai-academic-intern",
		company: "Prophaze Technologies",
		companyUrl: "https://www.prophaze.com/",
		role: "AI Academic Intern",
		employmentType: "internship",
		startDate: "2026-04",
		endDate: "2026-05",
		location: "Kochi, India",
		remote: false,
		description:
			"Researched small-footprint language models and hybrid reasoning architectures, benchmarking their viability for on-device and edge AI deployment.",
		highlights: [
			"Researched Small Language Models (SLMs) and Hybrid Reasoning Models (HRMs), evaluating their suitability for real-world AI applications.",
			"Benchmarked on-device AI models across latency, memory usage, inference speed, and deployment feasibility for edge devices.",
			"Performed comparative analysis of generative AI architectures through literature reviews and technical evaluations, documenting key findings for the research team.",
			"Explored optimization strategies for mobile AI deployment, focusing on efficient inference in resource-constrained environments.",
		],
		technologies: [
			"Small Language Models",
			"Hybrid Reasoning Models",
			"Edge AI",
			"Model Benchmarking",
			"Python",
			"PyTorch",
		],
		links: [
			{ label: "HRM Research", url: "https://github.com/JohnJomi/HRM-research-" },
			{ label: "Tiny Recursive Models", url: "https://github.com/JohnJomi/TinyRecursiveModels" },
			{ label: "Phi SLM Cookbook", url: "https://github.com/JohnJomi/PhiCookBook" },
		],
	},
	{
		id: "proddy-ai-full-stack-intern",
		company: "Proddy AI",
		companyUrl: "https://proddyai.app/",
		role: "Full Stack Developer Intern",
		employmentType: "internship",
		startDate: "2025-12",
		endDate: "2026-03",
		location: "Bangalore, India",
		remote: true,
		description:
			"Shipped full-stack features for a modular AI work-management platform, spanning Next.js interfaces and REST API integration across multiple sprints.",
		highlights: [
			"Developed and enhanced full-stack web application features using modern Next.js, improving application functionality and user experience.",
			"Built and integrated REST APIs, streamlining communication between frontend and backend modules for scalable development.",
			"Collaborated with developers using Git-based workflows, participating in code reviews, bug fixes, and feature implementation across multiple sprints.",
			"Optimized application performance by identifying and resolving UI and backend issues, improving overall responsiveness and maintainability.",
		],
		technologies: [
			"Next.js",
			"React",
			"TypeScript",
			"REST APIs",
			"Node.js",
			"Git",
			"GitHub",
		],
	},
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

/**
 * Internships only, most recent first — what the Experience section renders.
 * Other entries stay in `experience` for the resume and future use.
 */
export const internships: Experience[] = experience
	.filter((e) => e.employmentType === "internship")
	.sort((a, b) => b.startDate.localeCompare(a.startDate));
