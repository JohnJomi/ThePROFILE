/**
 * types/certification.ts — Certification domain interfaces.
 *
 * Used by: src/data/certifications.ts, About/Certifications section.
 */

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuerLogoUrl?: string;
  /** ISO-8601 date string (YYYY-MM). */
  issuedDate: string;
  /** ISO-8601 date string (YYYY-MM). Omit for non-expiring certs. */
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  /** Whether this certification is currently valid. */
  active: boolean;
}
