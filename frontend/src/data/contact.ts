import { siteConfig } from "@/config/site";

export interface ContactInfo {
  /** Primary email is `emails[0]`; additional addresses follow it. */
  emails: string[];
  linkedin: string;
  github: string;
  location: string;
  availability: string;
  resumeUrl: string;
}

export const contactInfo: ContactInfo = {
  emails: siteConfig.emails?.length
    ? siteConfig.emails
    : ["john@johnjomi.dev", "johnjomi1234@gmail.com"],
  linkedin: "https://www.linkedin.com/in/john-jomi-68218b316/",
  github: "https://github.com/JohnJomi",
  location: siteConfig.location || "Remote",
  availability:
    "Open to part time-internships, part-time roles, research collaborations, and selective freelance work.",
  resumeUrl: "/resume/John_Jomi_Resume.pdf",
};