/**
 * types/profile.ts — Profile domain interfaces.
 *
 * Used by: src/data/profile.ts, Hero section, About section, metadata.
 */

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  /** Short bio variant for OpenGraph and Twitter Card meta tags. */
  shortBio: string;
  location: string;
  email: string;
  avatarUrl: string;
  /** Whether the owner is currently open to new opportunities. */
  openToWork: boolean;
  /** ISO-8601 date string — used in structured data (schema.org). */
  birthYear?: number;
  pronouns?: string;
}
