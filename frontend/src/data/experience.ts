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
		location: "Trivandrum, Kerala, India",
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
		id: "tycoon-2fa-aitm-research",
		company: "Tycoon 2FA — AiTM Phishing Detection",
		companyUrl: "https://github.com/JohnJomi/Tycoon2FA",
		role: "Independent Security Researcher",
		employmentType: "research",
		startDate: "2026-08",
		location: "Remote",
		remote: true,
		description:
			"Designing a multi-layer detection pipeline for Tycoon 2FA and adversary-in-the-middle phishing email, built around an explainable signal model where every detection carries its own evidence.",
		highlights: [
			"Specified a four-layer detection architecture — header and domain intelligence, URL and redirect-chain analysis, NLP/ML body analysis, and threat-intelligence correlation — fused into a single composite risk verdict.",
			"Designed a layer-independent DetectionSignal contract in which each signal emits human-readable evidence rather than a bare number, making per-layer ablation studies possible.",
			"Scoped the prototype to read-only Gmail ingest of raw RFC-822 messages, taking no remediation action, to keep the research within ethical and legal boundaries.",
			"Set a defensibility constraint for the project: every documented claim must trace back to a measurement produced by the evaluation harness.",
			"Filed a copyright application covering the detection methodology; currently under review.",
		],
		technologies: [
			"Python",
			"asyncio",
			"FastAPI",
			"NLP",
			"Machine Learning",
			"Email Security",
			"Threat Intelligence",
			"Gmail API",
		],
		links: [
			{ label: "Repository", url: "https://github.com/JohnJomi/Tycoon2FA" },
			{
				label: "Architecture",
				url: "https://github.com/JohnJomi/Tycoon2FA/blob/main/ARCHITECTURE.md",
			},
			{ label: "Roadmap", url: "https://github.com/JohnJomi/Tycoon2FA/blob/main/ROADMAP.md" },
		],
		statusNote: { label: "Copyright", value: "Filed · Under review" },
	},
];

/**
 * Internships only, most recent first — what the Experience section renders.
 * Other entries stay in `experience` for the resume and future use.
 */
export const internships: Experience[] = experience
	.filter((e) => e.employmentType === "internship")
	.sort((a, b) => b.startDate.localeCompare(a.startDate));

/** Research work, most recent first — rendered below the internships. */
export const researchExperience: Experience[] = experience
	.filter((e) => e.employmentType === "research")
	.sort((a, b) => b.startDate.localeCompare(a.startDate));
