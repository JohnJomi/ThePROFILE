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
  name: "John Jomi",
  title: "AI Engineer & Full-Stack Developer",
  tagline: "Building practical AI products, reliable web experiences, and cloud-native systems.",
  bio:
    "AI engineer and full-stack developer focused on applied machine learning, product engineering, and cloud delivery. I enjoy building clear, production-ready interfaces around intelligent systems and shipping software that is useful, maintainable, and easy to trust. Open to full-time, contract, and advisory opportunities.",
  shortBio:
    "AI engineer and full-stack developer focused on applied ML, product engineering, and cloud delivery.",
  location: "Remote",
  email: "johnjomi1234@gmail.com",
  avatarUrl: "/avatar-placeholder.png",
  openToWork: true,
};
