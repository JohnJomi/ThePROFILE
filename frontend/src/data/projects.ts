/**
 * data/projects.ts — Portfolio projects.
 *
 * Add each project as an object conforming to the Project interface.
 * The `slug` field is used as the URL path: /projects/[slug].
 *
 * Used by: Projects section, /projects/[slug] detail pages,
 *          semantic search index builder.
 */

import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "eventra",
    title: "Eventra — Intelligent Event Management Platform",
    description:
      "Enterprise-grade platform that automates the full lifecycle of complex events, from ticketing and payments to AI-assisted matchmaking and attendee communication.",
    longDescription:
      "Eventra follows a feature-first modular architecture built on Next.js 15 Server Components and Server Actions. Four integrated engines sit behind a central router: an Intelligence engine backed by Google Gemini, a Recommendation engine using pgvector similarity search, a Communication hub for email, SMS and chat, and a Lifecycle engine covering events, ticketing and payments. Data lives in Supabase PostgreSQL with pgvector, accessed through Drizzle ORM, with Clerk handling authentication and middleware-level route protection.",
    tags: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "pgvector",
      "Drizzle ORM",
      "Clerk",
      "Google Gemini",
      "Vector Search",
    ],
    highlights: [
      "Event Lifecycle Automation",
      "AI Matchmaking",
      "Vector Recommendations",
      "Ticketing & Payments",
      "Communication Hub",
      "Clerk Authentication",
      "Server Actions",
      "pgvector Search",
    ],
    githubUrl: "https://github.com/ArrinPaul/Eventra",
    caseStudyUrl: "",
    featured: true,
    status: "in-progress",
    publishedAt: "2026-06-01",
  },
  {
    slug: "tycoon-2fa-detection",
    title: "Tycoon 2FA — AiTM Phishing Detection",
    description:
      "Research prototype that detects Tycoon 2FA and adversary-in-the-middle phishing email by combining four independent detection layers into a single explainable risk verdict.",
    longDescription:
      "The system reads raw RFC-822 messages from a Gmail mailbox in strictly read-only mode and runs them through four layers: L1 header and domain intelligence (authentication results, Reply-To mismatch, domain age, display-name impersonation), L2 URL and redirect-chain analysis (redirect depth, base64 email parameters, CAPTCHA gating, QR-embedded URLs), L3 NLP and ML body analysis (Unicode obfuscation, urgency classification, perplexity and burstiness), and L4 threat-intelligence correlation against URL and domain IOCs. Each layer emits signals with human-readable evidence rather than a bare number, and the layers combine into a composite risk score with a deliver / warn / block verdict. The design goal is defensibility — every claim is backed by a measurement produced by the evaluation harness. It is a read-only research prototype that takes no remediation action.",
    tags: [
      "Python",
      "Security Research",
      "Threat Detection",
      "NLP",
      "Machine Learning",
      "Email Security",
    ],
    highlights: [
      "Header & Domain Intelligence",
      "Redirect Chain Analysis",
      "QR & Base64 URL Extraction",
      "NLP Body Classification",
      "Threat Intel Correlation",
      "Composite Risk Scoring",
      "Explainable Evidence",
      "Read-Only Gmail Ingest",
    ],
    githubUrl: "https://github.com/JohnJomi/Tycoon2FA",
    caseStudyUrl: "",
    featured: true,
    status: "in-progress",
    publishedAt: "2026-08-18",
  },
  {
    slug: "skin-ai-bot",
    title: "SkinAIBot — Medical AI Diagnosis Platform",
    description:
      "Medical AI platform for skin disease diagnosis and analysis, built on a separated two-team architecture that splits the full-stack application from the AI/ML service.",
    longDescription:
      "SkinAIBot deliberately separates the application layer from the AI/ML platform so the two can evolve independently. The stack runs under Docker Compose: a Next.js frontend, a FastAPI application backend, a dedicated AI inference service, and PostgreSQL. Alembic migrations are applied by a one-shot migrate service that gates backend startup, so a fresh volume is always brought to head on first boot. The backend refuses to start without a JWT signing secret, and Compose fails fast when it is absent.",
    tags: [
      "Python",
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "Docker",
      "Alembic",
      "Medical AI",
      "Deep Learning",
    ],
    highlights: [
      "Skin Lesion Classification",
      "Two-Team Architecture",
      "Separated AI Service",
      "JWT Authentication",
      "Alembic Migrations",
      "Dockerized Stack",
      "FastAPI Backend",
      "PostgreSQL Storage",
    ],
    githubUrl: "https://github.com/JohnJomi/SkinAIBot",
    caseStudyUrl: "",
    featured: true,
    status: "in-progress",
    publishedAt: "2026-07-16",
  },
  {
    slug: "zeroproof",
    title: "ZeroProof — Zero-Knowledge Authentication",
    description:
      "Web-based zero-knowledge proof system that lets a user prove knowledge of a secret to a server without the secret, or anything derived from it, ever crossing the network.",
    longDescription:
      "Conventional password authentication requires the client to transmit the secret or a deterministic hash of it, leaving the server holding a value sufficient to impersonate the user. ZeroProof removes the secret from the wire entirely: the server stores only a public commitment that is computationally infeasible to invert, and at login the client produces a zero-knowledge proof of knowledge of the secret behind that commitment. The server can verify the proof but learns nothing it could not have produced itself. Built on Next.js 16 and React 19 with SQLite persistence and Node's native test runner.",
    tags: ["TypeScript", "Next.js", "React", "Cryptography", "Zero-Knowledge Proofs", "SQLite"],
    githubUrl: "https://github.com/JohnJomi/ZeroProof",
    caseStudyUrl: "",
    featured: true,
    status: "in-progress",
    publishedAt: "2026-09-05",
  },
  {
    slug: "spotify-music-recommendation-system",
    title: "Music Recommender — AI-Powered Spotify Recommendations",
    description:
      "Full-stack application that authenticates users through Spotify OAuth, surfaces their top tracks and artists, and generates personalized song recommendations with Google Gemini.",
    longDescription:
      "A Next.js 14 App Router frontend in TypeScript talks to a FastAPI backend that brokers Spotify OAuth 2.0 and Gemini calls. Session-based caching keeps the experience fast — five minutes for tracks and artists, twenty-four hours for generated recommendations — and the UI ships with persistent dark/light theming and a fully responsive layout.",
    tags: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "Google Gemini",
      "Spotify API",
      "OAuth 2.0",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/JohnJomi/Recommendation-Model-",
    liveUrl: "https://recommendation-model-iota.vercel.app",
    caseStudyUrl: "",
    featured: true,
    status: "completed",
    publishedAt: "2026-02-11",
  },
  {
    slug: "ieee-student-branch-erp",
    title: "IEEE Student Branch ERP",
    description:
      "A full-scale enterprise resource planning platform built for IEEE Student Branch operations. The system streamlines society management, finance, event coordination, announcements, authentication, cloud storage, and AI-assisted workflows into a single platform.",
    longDescription:
      "A full-scale enterprise resource planning platform built for IEEE Student Branch operations. The system streamlines society management, finance, event coordination, announcements, authentication, cloud storage, and AI-assisted workflows into a single platform.",
    tags: ["Next.js", "React", "TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL", "Azure"],
    highlights: [
      "Society Management",
      "Event Management",
      "Financial Tracking",
      "Role-Based Authentication",
      "AI Assistant",
      "Azure Cloud Storage",
      "REST APIs",
      "Responsive Dashboard",
    ],
    githubUrl: "https://github.com/JohnJomi",
    liveUrl: "",
    caseStudyUrl: "",
    featured: true,
    status: "in-progress",
    publishedAt: "2026-05-01",
  },
  {
    slug: "health-assist",
    title: "HealthAssist — Health Information Navigator",
    description:
      "Conversational assistant that helps users prepare for a doctor's appointment by organizing symptoms, flagging high-risk situations for escalation, and formulating questions to ask.",
    longDescription:
      "HealthAssist uses Google Gemini to extract structured symptom data — severity, duration and onset — from natural conversation, presenting it in a three-column layout with a chat interface, live symptom tracking and progress visualization. Conversational memory carries full history through the session, and responses render as Markdown for readability. Safety is enforced by both deterministic high-risk word checks and AI-driven escalation. It is explicitly an informational tool, not a diagnostic one.",
    tags: ["Next.js", "TypeScript", "Google Gemini", "LLM", "Healthcare", "React"],
    githubUrl: "https://github.com/JohnJomi/HealthAssistsss",
    caseStudyUrl: "",
    featured: false,
    status: "completed",
    publishedAt: "2026-09-05",
  },
  {
    slug: "support-desk",
    title: "SupportDesk — Ticket Management System",
    description:
      "Full-stack MERN support ticket platform with assignment workflows, customizable statuses, priority levels, department routing, internal notes, ticket merging and audit history.",
    longDescription:
      "A comprehensive customer support system built on MongoDB, Express, React and Node.js. Beyond CRUD, it covers agent assignment, configurable ticket statuses, four priority levels, department-based organization, private internal notes, duplicate ticket merging, and a full change history for every ticket, alongside performance tracking for service-quality reporting.",
    tags: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "REST API"],
    githubUrl: "https://github.com/JohnJomi/SupportDesk-",
    caseStudyUrl: "",
    featured: false,
    status: "completed",
    publishedAt: "2026-09-09",
  },
  {
    slug: "email-ai-classifier",
    title: "Email AI Classifier",
    description:
      "Gmail classification system that uses Google Apps Script and Gemini batch inference to apply hierarchical labels automatically, surfaced through a companion Safari extension.",
    longDescription:
      "The pipeline runs Gmail through Google Apps Script as the backend orchestrator, which batches messages to the Gemini API for hierarchical category classification, applies the resulting labels back to the mailbox, and exposes the classified inbox through a Safari extension UI with its own content scripts and background logic.",
    tags: ["Google Apps Script", "Gemini API", "JavaScript", "Safari Extension", "Automation"],
    githubUrl: "https://github.com/JohnJomi/Email-Classifier-",
    caseStudyUrl: "",
    featured: false,
    status: "completed",
    publishedAt: "2026-03-30",
  },
  {
    slug: "email-form-collector",
    title: "Email Form Collector",
    description:
      "Form builder that sends surveys through a connected Gmail account via OAuth and collects responses on an authenticated dashboard, with encrypted credentials and rate limiting.",
    longDescription:
      "A FastAPI and SQLAlchemy backend with Alembic migrations handles users, forms, fields, campaigns and responses. Security is first-class: password hashing, JWT sessions, encrypted stored credentials, CSRF protection, a sliding-window rate limiter, and server-side answer validation and sanitization. Gmail OAuth drives delivery through a responsive HTML email template, with public unauthenticated endpoints for respondents and a React, TypeScript and Tailwind frontend for the owner. Covered by a 35-test pytest suite.",
    tags: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "Alembic",
      "React",
      "TypeScript",
      "OAuth 2.0",
      "Pytest",
    ],
    githubUrl: "https://github.com/JohnJomi/PhishingForm",
    caseStudyUrl: "",
    featured: false,
    status: "completed",
    publishedAt: "2026-09-10",
  },
  {
    slug: "learnsmart",
    title: "LearnSmart — AI Learning Platform",
    description:
      "Production-oriented AI learning platform built as a NestJS modular monolith, spanning auth, documents, courses, lessons, quizzes, AI generation and progress tracking.",
    longDescription:
      "LearnSmart is structured as a modular monolith in NestJS and TypeScript, backed by PostgreSQL with Prisma, Redis and BullMQ for background job processing, Swagger for API documentation, and Docker for local orchestration. The domain is split into Auth, Users, Documents, Courses, Lessons, Quizzes, AI and Progress modules. The backend scaffold and module boundaries are in place; business endpoints are still being implemented.",
    tags: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Docker"],
    githubUrl: "https://github.com/JohnJomi/LearnSmart",
    caseStudyUrl: "",
    featured: false,
    status: "in-progress",
    publishedAt: "2026-07-24",
  },
  {
    slug: "nasa-seismic-noise-filtering-system",
    title: "NASA Seismic Noise Filtering System",
    description:
      "Scientific computing application that retrieves, processes and filters seismic recordings from NASA's IRIS dataset, with specialized support for Martian data from the InSight mission.",
    longDescription:
      "A Streamlit interface drives ObsPy signal-processing routines to apply multiple noise-reduction algorithms to planetary seismic data. Users configure filter parameters in real time, preview raw against filtered waveforms with interactive plots, and export cleaned results as standardized CSV. The tool supports Earth, Mars and other planetary bodies.",
    tags: [
      "Python",
      "ObsPy",
      "Streamlit",
      "Scientific Computing",
      "Signal Processing",
      "NASA Data",
    ],
    githubUrl: "https://github.com/JohnJomi/seismic-noise-app",
    caseStudyUrl: "",
    featured: false,
    status: "completed",
    publishedAt: "2025-08-22",
  },
  {
    slug: "hrm-research-repository",
    title: "HRM Research Engineering",
    description:
      "Independent research and engineering work on the Hierarchical Reasoning Model, porting the reference implementation to Apple Silicon and hardening its evaluation pipeline.",
    longDescription:
      "A derivative of Sapient's open-source HRM (arXiv:2506.21734), a recurrent reasoning architecture with interacting high-level and low-level modules aimed at structured reasoning tasks such as ARC, Sudoku and Maze. Contributions in this repository are engineering-focused: an Apple Silicon support path that runs MPS/CPU-first without requiring CUDA, FlashAttention compatibility fallbacks, ARC dataset pipeline debugging around split metadata and dataset.json, checkpoint-loading robustness fixes across PyTorch directory and storage formats, small-sample benchmarking runs, and utility scripts for reproducible debugging. Original authors are fully credited and the Apache-2.0 terms are preserved.",
    tags: ["Python", "PyTorch", "Research", "Apple Silicon", "Reasoning Models", "ARC"],
    githubUrl: "https://github.com/JohnJomi/HRM-research-",
    caseStudyUrl: "",
    featured: false,
    status: "completed",
    publishedAt: "2026-05-04",
  },
  {
    slug: "stock-price-prediction",
    title: "Stock Price Prediction with Random Forest",
    description:
      "Regression model that predicts stock closing prices from historical Yahoo Finance data using Random Forest, evaluated with MAE, MSE and R² against actual prices.",
    longDescription:
      "The workflow covers data preprocessing of Yahoo Finance historical market data, feature engineering over Open, High, Low and Volume, Random Forest Regression training, prediction of the closing price, quantitative evaluation with MAE, MSE and R², and visualization of actual against predicted price series.",
    tags: ["Python", "Scikit-learn", "Random Forest", "Machine Learning", "Jupyter", "Finance"],
    githubUrl: "https://github.com/JohnJomi/Stock-Price-Prediction-using-Random-Forest-Regression",
    caseStudyUrl: "",
    featured: false,
    status: "completed",
    publishedAt: "2026-03-12",
  },
  {
    slug: "ai-chatbot",
    title: "AI Chatbot",
    description:
      "Conversational AI assistant built using modern language models and prompt engineering techniques to provide intelligent responses and workflow assistance.",
    tags: ["OpenAI API", "Next.js", "Node.js", "LLM", "Prompt Engineering"],
    githubUrl: "https://github.com/JohnJomi/Chatbot2",
    caseStudyUrl: "",
    liveUrl: "",
    featured: false,
    status: "in-progress",
    publishedAt: "2025-12-25",
  },
];

/** Featured projects — shown on the home page Projects section. */
export const featuredProjects: Project[] = projects.filter((p) => p.featured);
