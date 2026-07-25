/**
 * Shared TypeScript interfaces and types for the portfolio application.
 */

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  coverImage?: string;
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  publishedAt: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTime?: string;
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string; // undefined = "Present"
  location: string;
  description: string;
  technologies: string[];
}

export interface Skill {
  name: string;
  category: "Languages" | "Frameworks" | "AI/ML" | "Cloud" | "Tools";
  proficiency: "expert" | "proficient" | "familiar";
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
