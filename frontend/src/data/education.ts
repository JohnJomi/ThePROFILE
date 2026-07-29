/**
 * data/education.ts — Education history.
 *
 * Entries should be in reverse-chronological order (most recent first).
 *
 * Used by: About/Education section, Timeline section.
 */

import type { Education } from "@/types/education";

export const education: Education[] = [
	{
		id: "christ-university-btech-cse-ai-ml",
		institution: "Christ University",
		degreeType: "Bachelor's",
		field: "Computer Science & Engineering",
		startDate: "2023-08",
		endDate: "2027-05",
		location: "Bangalore, India",
		gpa: "3.83 / 4.00",
		description:
			"Bachelor of Technology with Artificial Intelligence & Machine Learning (Honors).",
		highlights: [
			"Artificial Intelligence & Machine Learning (Honors)",
			"Data Structures & Algorithms",
			"Database Management Systems",
			"Operating Systems",
			"Computer Networks",
			"Artificial Intelligence",
			"Machine Learning",
			"Software Engineering",
			"Web Development",
			"Cloud Computing",
			"Cybersecurity",
		],
	},
];
