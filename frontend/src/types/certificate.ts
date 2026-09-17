/**
 * types/certificate.ts — Certificate domain interfaces.
 *
 * Certificates are completed courses, training badges, and professional
 * credentials issued by external platforms or institutions.
 *
 * Used by: src/data/certificates.ts, Certificates section.
 */

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  /** ISO-8601 date string (YYYY-MM-DD or YYYY-MM). */
  date: string;
  description?: string;
  /** Path to the certificate file under /public, e.g. "/certificates/foo.pdf" */
  fileUrl: string;
  /** Highlights this certificate as a featured showcase block. */
  featured?: boolean;
}
