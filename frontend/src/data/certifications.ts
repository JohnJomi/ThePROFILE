/**
 * data/certifications.ts — Professional certifications.
 *
 * Include cloud certifications, technical certifications, and
 * completed courses with verifiable credentials.
 *
 * Used by: About/Certifications section, Timeline section.
 */

import type { Certification } from "@/types/certification";

export const certifications: Certification[] = [
	{
		id: "claude-101",
		name: "Claude 101",
		issuer: "Anthropic",
		issuedDate: "2026-07",
		active: true,
	},
	{
		id: "claude-code-in-action",
		name: "Claude Code in Action",
		issuer: "Anthropic",
		issuedDate: "2026-06",
		active: true,
	},
	{
		id: "python-programming-udemy",
		name: "Python Programming",
		issuer: "Udemy",
		issuedDate: "2026-04",
		active: true,
	},
	{
		id: "lnt-full-stack-dev",
		name: "L&T Full Stack Dev",
		issuer: "L&T EduTech",
		issuedDate: "2026-03",
		active: true,
	},
	{
		id: "intro-to-llms-nptel",
		name: "Introduction to LLMs",
		issuer: "NPTEL",
		issuedDate: "2026-02",
		active: true,
	},
	{
		id: "intro-to-aws",
		name: "Introduction to AWS",
		issuer: "Amazon Web Services",
		issuedDate: "2025-12",
		active: true,
	},
];

/** Currently active (non-expired) certifications. */
export const activeCertifications: Certification[] = certifications.filter((c) => c.active);
