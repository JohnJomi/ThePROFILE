/**
 * data/timeline.ts — Unified chronological timeline.
 *
 * Assembles a single sorted array from experience, education,
 * achievements, and certifications. The Timeline/Experience section
 * renders this array — it doesn't need to know the source of each item.
 *
 * Sorted: most recent first (descending by date).
 *
 * Used by: Experience/Timeline section.
 */

import type { TimelineItem } from "@/types/timeline";

import { achievements } from "./achievements";
import { certifications } from "./certifications";
import { education } from "./education";
import { experience } from "./experience";

const experienceItems: TimelineItem[] = experience.map((e) => ({
  id: e.id,
  type: "experience",
  title: e.role,
  subtitle: e.company,
  date: e.startDate,
  endDate: e.endDate,
  description: e.description,
  tags: e.technologies,
  url: e.companyUrl,
  logoUrl: e.companyLogoUrl,
  current: !e.endDate,
}));

const educationItems: TimelineItem[] = education.map((e) => ({
  id: e.id,
  type: "education",
  title: `${e.degreeType} in ${e.field}`,
  subtitle: e.institution,
  date: e.startDate,
  endDate: e.endDate,
  description: e.description,
  url: e.institutionUrl,
  logoUrl: e.logoUrl,
  current: !e.endDate,
}));

const achievementItems: TimelineItem[] = achievements.map((a) => ({
  id: a.id,
  type: "achievement",
  title: a.title,
  subtitle: a.issuer ?? "",
  date: a.date,
  description: a.description,
  url: a.url,
  current: false,
}));

const certificationItems: TimelineItem[] = certifications.map((c) => ({
  id: c.id,
  type: "certification",
  title: c.name,
  subtitle: c.issuer,
  date: c.issuedDate,
  endDate: c.expiryDate,
  url: c.credentialUrl,
  current: c.active,
}));

/** All timeline items sorted most-recent-first. */
export const timeline: TimelineItem[] = [
  ...experienceItems,
  ...educationItems,
  ...achievementItems,
  ...certificationItems,
].sort((a, b) => b.date.localeCompare(a.date));
