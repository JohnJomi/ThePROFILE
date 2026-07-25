/**
 * data/certifications.ts — Professional certifications.
 *
 * Include cloud certifications, technical certifications, and
 * completed courses with verifiable credentials.
 *
 * Used by: About/Certifications section, Timeline section.
 */

import type { Certification } from "@/types/certification";

export const certifications: Certification[] = [];

/** Currently active (non-expired) certifications. */
export const activeCertifications: Certification[] = certifications.filter((c) => c.active);
