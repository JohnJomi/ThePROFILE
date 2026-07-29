export type PublicationStatus = "in-progress" | "published" | "draft";

export interface Publication {
  id: string;
  title: string;
  category: string;
  abstract: string;
  technologies: string[];
  keywords: string[];
  status: PublicationStatus;
  year: string;
}

export const publications: Publication[] = [
  {
    id: "tycoon-2fa-phishing-detection",
    title: "Detection of Phishing Emails Generated using Tycoon 2FA Phishing Kits",
    category: "Cybersecurity Research",
    abstract:
      "This research investigates how Tycoon 2FA phishing kits generate malicious email campaigns and evaluates detection approaches that combine cybersecurity analysis with AI-assisted classification.",
    technologies: ["Python", "Machine Learning", "Cybersecurity", "Email Security", "Threat Intelligence"],
    keywords: ["Tycoon 2FA", "phishing detection", "email security", "AI-assisted detection", "cybersecurity"],
    status: "in-progress",
    year: "2026",
  },
];