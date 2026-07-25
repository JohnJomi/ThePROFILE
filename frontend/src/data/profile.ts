/**
 * data/profile.ts — Personal profile information.
 *
 * Fill in all fields before deploying.
 * This is the only file that should contain personal identity data.
 * Components read from here via import — never hardcode in JSX.
 *
 * Used by: Hero section, About section, metadata, schema.org Person.
 */

import type { Profile } from "@/types/profile";

export const profile: Profile = {
  name: "",
  title: "",
  tagline: "",
  bio: "",
  shortBio: "",
  location: "",
  email: "",
  avatarUrl: "",
  openToWork: false,
};
