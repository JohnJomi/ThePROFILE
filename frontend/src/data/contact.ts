import { siteConfig } from "@/config/site";

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  location: string;
  availability: string;
  resumeUrl: string;
}

export const contactInfo: ContactInfo = {
  email: siteConfig.email || "johnjomi1234@gmail.com",
  linkedin: "https://www.linkedin.com/in/john-jomi-68218b316/",
  github: "https://github.com/JohnJomi",
  location: siteConfig.location || "Remote",
  availability:
    "Open to internships, full-time roles, research collaborations, and selective freelance work.",
  resumeUrl: "/resume/John_Jomi_Resume.pdf",
};