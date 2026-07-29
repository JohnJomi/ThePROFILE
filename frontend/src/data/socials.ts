/**
 * data/socials.ts — Social media and professional profile links.
 *
 * Populate `href` values with your actual profile URLs.
 * Set `featured: true` for links shown in the Navbar (keep to 3-4 max).
 * All others appear in the Footer.
 *
 * Used by: Navbar, Footer, Contact section, schema.org Person.
 */

import type { Social } from "@/types/social";

export const socials: Social[] = [
	{
		platform: "github",
		label: "GitHub",
		href: "https://github.com/JohnJomi",
		icon: "Github",
		featured: true,
	},
	{
		platform: "linkedin",
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/john-jomi-68218b316/",
		icon: "Linkedin",
		featured: true,
	},
	{
		platform: "email",
		label: "Email",
		href: "mailto:johnjomi1234@gmail.com",
		icon: "Mail",
		featured: true,
	},
];

/** Featured social links shown in the top navigation. */
export const featuredSocials: Social[] = socials.filter((s) => s.featured);
