/**
 * data/case-studies.ts — Long-form project write-ups.
 *
 * Rendered at /projects/[slug]. Keyed by the `slug` field in data/projects.ts;
 * a project without an entry here falls back to its longDescription.
 *
 * Source of truth is each repository's own README and architecture docs. When a
 * repo's documentation changes, update it there first and mirror it here.
 */

import type { CaseStudy } from "@/types/project";

export const caseStudies: Record<string, CaseStudy> = {
  eventra: {
    summary:
      "Eventra is an enterprise-grade event management platform that automates the full lifecycle of complex events, turning passive event hosting into a data-driven, community-centric experience. It is built on Next.js 15 with PostgreSQL and pgvector, Drizzle ORM, Clerk authentication and Google Gemini.",
    problem:
      "Running a large event means stitching together a registration tool, a payment processor, a mailing list, a check-in app and a spreadsheet of attendees — none of which talk to each other. Eventra collapses that toolchain into one platform where the data collected at registration actually informs what happens during and after the event.",
    sections: [
      {
        heading: "Architecture",
        body: "Eventra follows a feature-first modular architecture. Four integrated engines sit behind a central Engine Router, with Server Components and Server Actions carrying all business logic rather than a separate API tier.",
        table: {
          headers: ["Engine", "Responsibility"],
          rows: [
            ["Intelligence", "Gemini-backed content generation, predictions and moderation"],
            ["Recommendation", "pgvector semantic matching between users and events"],
            ["Communication", "Email, SMS and in-app chat dispatch"],
            ["Lifecycle", "Events, ticketing, orders and payments"],
          ],
        },
      },
      {
        heading: "Authentication and authorization",
        body: "Clerk handles authentication behind a layered authorization system. Middleware intercepts every non-public route and enforces sign-in, with admin routes receiving an additional role check before the request proceeds. Server Actions independently re-validate through helpers such as requireAuth, requireEventPermission and validateEventOwnership, so authorization is never left to the routing layer alone.",
        bullets: [
          "Eight roles from attendee through organizer to admin, each with a distinct permission set",
          "Per-event authorization context resolving role, permissions and organizer status",
          "Granular staff permission validation for check-in and support workflows",
          "Signature-verified webhooks for Clerk and payment events",
        ],
      },
      {
        heading: "Event lifecycle",
        body: "Events move through an explicit state machine — draft, published, active, completed, archived — with registration and check-in modelled as nested states. A published event whose capacity fills moves into an active waitlist and back again as spots free up.",
        bullets: [
          "Multi-step creation wizard with AI-assisted scheduling",
          "RRule-based recurring events and sub-event hierarchies",
          "Campus location selector with predefined venues",
          "Co-organizer support and per-event custom branding",
          "Public and private visibility controls",
        ],
      },
      {
        heading: "AI intelligence engine",
        body: "Google Gemini 1.5 Flash, orchestrated through Genkit flows, drives automation across planning, content and analytics rather than being bolted on as a chat widget.",
        table: {
          headers: ["Capability", "What it does"],
          rows: [
            ["Smart event planning", "Generates descriptions, agendas and marketing copy"],
            ["Predictive analytics", "Estimates turnout from registration trends"],
            ["Task generation", "Produces structured Kanban tasks with subtasks and priorities"],
            ["Event chatbot", "Event-scoped Q&A with persisted conversation history"],
            ["Report generation", "Structured six-section post-event reports"],
            ["Content moderation", "Real-time sentiment analysis and filtering"],
          ],
        },
      },
      {
        heading: "Vector recommendation engine",
        body: "User and event embeddings are generated through the Gemini embedding API and stored as 768-dimensional vectors in pgvector. Cosine similarity search then matches attendees to events, and attendees to each other, on meaning rather than keyword overlap.",
        bullets: [
          "User interest embeddings derived from bio, skills and preferences",
          "Event embeddings derived from title, description and category",
          "Connection matchmaking based on stated professional goals",
          "Recommendation caching with a TTL to keep search off the request path",
        ],
      },
      {
        heading: "Ticketing, payments and communication",
        body: "The lifecycle engine handles multi-tier pricing, QR-based check-in and waitlists, routing paid registrations through Dodo Payments while free events skip straight to order creation. The communication hub then fans out across channels with delivery tracking at every step.",
        bullets: [
          "Seven transactional HTML email templates delivered through Resend",
          "Twilio SMS for time-critical notifications",
          "Bulk email with sent, delivered, opened, clicked, bounced and failed tracking",
          "Event-scoped chat rooms supporting direct and group messaging",
          "QR ticket rendering and bulk PDF certificate export",
        ],
      },
      {
        heading: "Data model",
        body: "Thirty-four PostgreSQL tables managed by Drizzle ORM, with pgvector columns for embeddings. Users anchor events, tickets, orders, posts, chat messages, badges and feedback; events in turn own ticket tiers, waitlists, staff, sponsors, media, issues, Kanban tasks, reports and an optional campus map with its own nodes.",
      },
    ],
    stack: [
      {
        label: "Framework & language",
        items: ["Next.js 15.5", "TypeScript 5", "React Server Components", "Turbopack"],
      },
      {
        label: "Data",
        items: ["PostgreSQL 15 (Supabase)", "pgvector", "Drizzle ORM 0.45"],
      },
      {
        label: "AI",
        items: ["Google Gemini 1.5 Flash", "Genkit", "768-dim embeddings"],
      },
      {
        label: "Services",
        items: ["Clerk 7.3", "Dodo Payments", "Resend", "Twilio"],
      },
      {
        label: "Interface",
        items: [
          "Shadcn/ui + Radix",
          "Tailwind CSS",
          "TanStack React Query",
          "React Hook Form + Zod",
          "Recharts",
          "Leaflet",
          "next-intl",
        ],
      },
    ],
  },

  "tycoon-2fa-detection": {
    summary:
      "A research prototype that detects Tycoon 2FA and other adversary-in-the-middle phishing email. It reads raw RFC-822 messages from a Gmail mailbox in read-only mode, runs them through four independent detection layers, and combines the result into a single composite risk score with a deliver, warn or block verdict.",
    problem:
      "Adversary-in-the-middle phishing kits defeat multi-factor authentication by proxying the real login page in real time, so the victim's second factor is captured along with their password. The messages that deliver these kits are engineered to survive conventional filters: the payload URL hides behind redirect chains, CAPTCHA gates and QR codes, and the body is obfuscated well enough to pass keyword matching. A verdict from such a filter is also a bare number, which is useless to an analyst who has to justify why a message was blocked.",
    note: "This is a research prototype at repository-bootstrap stage. The architecture, data contracts and scoring design are specified in full and core/models.py is implemented, but the detection layers themselves are not yet built — there are no measured results to report and no detection capability to claim. It is read-only and takes no remediation action.",
    sections: [
      {
        heading: "Detection layers",
        body: "Four layers examine the message independently, each emitting signals with human-readable evidence rather than an opaque score. Because no layer is authoritative on its own, a message that looks clean to one can still be caught by another.",
        table: {
          headers: ["Layer", "Focus"],
          rows: [
            [
              "L1 — Header & domain intelligence",
              "Authentication results, Reply-To mismatch, domain age, display-name impersonation",
            ],
            [
              "L2 — URL & redirect chain",
              "Redirect depth, base64-encoded email parameters, CAPTCHA gating, QR-embedded URLs",
            ],
            [
              "L3 — NLP / ML body analysis",
              "Unicode obfuscation, urgency classification, perplexity and burstiness",
            ],
            [
              "L4 — Threat intelligence",
              "URL and domain IOC lookups, hosting reputation correlation",
            ],
          ],
        },
      },
      {
        heading: "Explainability as a hard requirement",
        body: "Every signal is a frozen DetectionSignal record carrying its layer, a layer-local name, a normalized 0–1 score, a severity, and an evidence string that is validated non-empty. The evidence is the point: a bare score demonstrates nothing to the analyst reading the verdict, so the UI renders those strings directly. A signal records what was observed and is never edited afterwards.",
        bullets: [
          "One generic signal model shared by all four layers, with no per-layer subclasses",
          "Qualified names such as L2/redirect_depth identify a signal's origin",
          "An error field records signals that could not be computed, rather than silently dropping them",
          "Generic grouping and filtering by layer is what makes the planned ablation study possible",
        ],
      },
      {
        heading: "Scoring design",
        body: "Weights live in configuration, never on the signals themselves and never hardcoded. A signal is an observation; how much that observation counts toward the composite is a policy decision owned by the scoring module. Keeping the two separate means refitting the model changes one YAML file rather than every layer, and the same recorded signals can be rescored under different weightings.",
        bullets: [
          "Phase A uses hand-assigned weights — L1 0.30, L2 0.30, L3 0.20, L4 0.20",
          "Phase B fits a logistic regression over the full signal vector on a labelled corpus",
          "Thresholds are re-derived from the ROC curve rather than guessed",
          "The operating point weights false positives more heavily than false negatives — a blocked legitimate invoice is a business incident, a missed phish is one more item for the next control",
        ],
      },
      {
        heading: "Risk and action are separate stages",
        body: "The system keeps two vocabularies deliberately distinct. Composite scoring produces a risk level — low, medium or high — answering how risky a message is. A separate policy stage maps that classification onto an operational action of deliver, warn or block, answering what should be done about it. The mapping is a deployment policy, not a property of the message, so the two are never conflated.",
      },
      {
        heading: "Ingest",
        body: "Messages are pulled from Gmail strictly read-only. Nothing is moved, labelled, quarantined or deleted, and the prototype is not publicly deployed. Design goals throughout are defensibility and reproducibility — every claim the README makes is intended to be backed by a measurement the evaluation harness produces.",
      },
    ],
    stack: [
      { label: "Language", items: ["Python 3.11+", "dataclasses", "enum"] },
      {
        label: "Detection",
        items: ["NLP body analysis", "Perplexity & burstiness", "IOC lookups"],
      },
      {
        label: "Scoring",
        items: ["Logistic regression", "ROC threshold derivation", "YAML weights"],
      },
      { label: "Ingest", items: ["Gmail API (read-only)", "RFC-822 parsing"] },
    ],
  },

  "skin-ai-bot": {
    summary:
      "A medical AI platform for skin disease diagnosis and analysis, built on a deliberately separated two-team architecture that splits the full-stack application from the AI/ML platform so the two can evolve independently.",
    problem:
      "Medical imaging products fail in a particular way: the model and the application get entangled, so retraining a classifier means redeploying the whole product, and the application team ends up blocked on ML work they cannot do. Splitting the two along a stable contract lets the application ship against a mock while the real model is still being trained.",
    sections: [
      {
        heading: "Two-team architecture",
        body: "The system is split into an Application team owning the full-stack product and an AI/ML team owning the inference service. The AI service runs behind its own interface, and the application talks to it over HTTP — during local development that endpoint is a mock, so the frontend and backend are never blocked on model availability.",
      },
      {
        heading: "Layered backend",
        body: "The FastAPI backend enforces strict layering with explicit dependency rules, so business logic never reaches directly for the database or the model.",
        table: {
          headers: ["Layer", "Responsibility"],
          rows: [
            ["api/", "HTTP handling, routing and request validation"],
            ["schemas/", "Pydantic request and response contracts"],
            ["services/", "Business logic, use cases and orchestration"],
            ["repositories/", "Database access"],
            ["models/", "SQLAlchemy domain models"],
            ["ai/", "Model adapters, providers and prompt templates"],
            ["storage/", "File storage abstractions over Azure Blob"],
          ],
        },
      },
      {
        heading: "Inference pipeline",
        body: "An uploaded image is preprocessed — resized and normalized — then classified, producing top-K predictions with confidence scores alongside an explainability heatmap. The explainability output matters clinically: a prediction a physician cannot interrogate is a prediction they cannot act on.",
        table: {
          headers: ["Component", "Technology"],
          rows: [
            ["Image classifier", "Azure Custom Vision / PyTorch"],
            ["Explainability", "Grad-CAM and LIME heatmaps via Captum"],
            ["Patient chatbot", "Azure OpenAI / Llama"],
            ["Prompt templates", "Jinja2 / LangChain"],
          ],
        },
      },
      {
        heading: "Provider abstraction",
        body: "Models sit behind an adapter interface rather than being called directly, so the platform can move between Azure Custom Vision, ONNX Runtime and PyTorch without the services layer changing. The same abstraction covers storage, which targets Azure Blob through a generic interface.",
      },
      {
        heading: "Operational setup",
        body: "The whole stack runs under Docker Compose, and the boot sequence is designed to fail fast rather than start in a broken state.",
        bullets: [
          "The backend refuses to start without a JWT signing secret, and Compose fails fast if it is absent from the environment",
          "A one-shot migrate service runs alembic upgrade head once Postgres is healthy",
          "The backend only starts after migrations complete, so a fresh volume is always at head on first boot",
          "PostgreSQL is kept inside the Docker network and never published to the host",
        ],
      },
    ],
    stack: [
      { label: "Backend", items: ["FastAPI", "Python 3.11+", "SQLAlchemy 2.0 (async)", "Alembic"] },
      { label: "AI/ML", items: ["Azure Custom Vision", "PyTorch", "ONNX Runtime", "Captum"] },
      { label: "Frontend", items: ["Next.js", "TypeScript"] },
      {
        label: "Infrastructure",
        items: ["Docker Compose", "PostgreSQL", "Azure Blob Storage", "Azure Container Apps"],
      },
    ],
  },

  "ieee-student-branch-erp": {
    summary:
      "A full-scale enterprise resource planning platform built for IEEE Student Branch operations, consolidating society management, finance, event coordination, announcements, authentication, cloud storage and AI-assisted workflows into a single system.",
    problem:
      "Student branch operations typically run on a scattering of spreadsheets, chat groups and personal drives. Continuity breaks every time a committee hands over, financial records live in whichever format the last treasurer preferred, and no one can answer basic questions about past events without asking the person who ran them.",
    sections: [
      {
        heading: "Scope",
        body: "The platform covers the operational surface of a student branch end to end, so that records survive committee handover rather than leaving with the outgoing team.",
        bullets: [
          "Society and membership management",
          "Financial tracking and reporting",
          "Event coordination across the full event lifecycle",
          "Announcements and member communication",
          "Role-based authentication and access control",
          "Cloud document storage on Azure",
          "AI-assisted operational workflows",
          "Responsive administrative dashboard",
        ],
      },
      {
        heading: "Architecture",
        body: "A Next.js and React frontend in TypeScript talks to an Express API backed by PostgreSQL through Prisma, with Azure providing storage and hosting. REST APIs separate the administrative dashboard from the underlying services.",
      },
    ],
    stack: [
      { label: "Frontend", items: ["Next.js", "React", "TypeScript"] },
      { label: "Backend", items: ["Node.js", "Express", "Prisma", "REST APIs"] },
      { label: "Infrastructure", items: ["PostgreSQL", "Azure"] },
    ],
  },

  zeroproof: {
    summary:
      "A web-based zero-knowledge proof system. A user proves knowledge of a secret to a server without the secret — or anything derived from it that could reveal it — ever crossing the network.",
    problem:
      "Conventional password authentication requires the client to transmit the secret, or a deterministic hash of it, to the server. The server therefore learns a value sufficient to impersonate the user, and any breach of its store compromises every account in it. ZeroProof removes the secret from the wire entirely: the server holds only a public commitment that is computationally infeasible to invert.",
    sections: [
      {
        heading: "Required properties",
        body: "Three properties are required of the proof system, and the choice of scheme is justified against them.",
        table: {
          headers: ["Property", "Meaning"],
          rows: [
            ["Completeness", "An honest prover who knows the secret always convinces the verifier"],
            [
              "Soundness",
              "A prover who does not know the secret convinces the verifier only with negligible probability",
            ],
            [
              "Zero-knowledge",
              "The verifier's view can be simulated without the secret, so it leaks nothing",
            ],
          ],
        },
      },
      {
        heading: "Choice of scheme",
        body: "ZeroProof uses a Schnorr proof of knowledge of a discrete logarithm, made non-interactive by the Fiat–Shamir transform. This was chosen over a zk-SNARK toolchain deliberately: a SNARK requires circuit compilation, a trusted setup ceremony and multi-megabyte proving keys, all of which add operational weight without changing what the system demonstrates. Schnorr is a genuine zero-knowledge proof with a short, auditable security argument, implementable in roughly 150 lines with no external dependencies, and it runs identically in a browser and on a server.",
        bullets: [
          "p is the 2048-bit safe prime of RFC 3526 MODP Group 14",
          "g is 2, a generator of a large prime-order subgroup",
          "q is (p − 1) / 2, the subgroup order",
          "No trusted setup ceremony is required — the parameters are fixed and public",
        ],
      },
      {
        heading: "Registration",
        body: "The secret never leaves the browser. The client generates a random 16-byte salt, derives a private exponent x from SHA-256 of the salt and secret modulo q, and computes the public commitment y as g^x mod p. Only the username, y and salt are posted to the server; x is discarded after use. Recovering x from y is the discrete logarithm problem in a 2048-bit group.",
      },
      {
        heading: "Proof of knowledge",
        body: "At login the client requests a challenge, receiving a 128-bit server nonce with a 60-second expiry alongside the stored salt. It re-derives x from the typed secret, draws a single-use blinding factor, and produces a proof the server can verify against the stored commitment — learning nothing it could not have produced itself.",
      },
      {
        heading: "Implementation",
        body: "Arithmetic uses native BigInt and hashing uses Web Crypto SHA-256, both of which exist in browsers and in the Node runtime, so one implementation serves prover and verifier with no duplicated cryptography.",
      },
    ],
    stack: [
      { label: "Framework", items: ["Next.js 16", "React 19", "TypeScript"] },
      {
        label: "Cryptography",
        items: ["Schnorr proofs", "Fiat–Shamir transform", "BigInt", "Web Crypto SHA-256"],
      },
      { label: "Persistence", items: ["better-sqlite3"] },
      { label: "Testing", items: ["Node native test runner", "Node 22+ TypeScript support"] },
    ],
  },

  "spotify-music-recommendation-system": {
    summary:
      "A full-stack application that authenticates users through Spotify OAuth, surfaces their top tracks and artists, and generates personalized song recommendations with Google Gemini.",
    problem:
      "Spotify's own recommendations are a black box driven by collaborative filtering across millions of listeners. Passing a user's actual listening history to a language model produces suggestions that can be reasoned about and regenerated on demand, rather than waiting for a weekly refresh.",
    sections: [
      {
        heading: "Features",
        bullets: [
          "Spotify OAuth 2.0 authentication",
          "Top tracks and top artists drawn from the user's listening history",
          "AI-generated track recommendations tailored to listening habits",
          "Session-based caching for responsiveness",
          "Persistent dark and light theming",
          "Responsive layout across devices",
          "Fresh recommendations generated on demand",
        ],
      },
      {
        heading: "Architecture",
        body: "A Next.js 14 App Router frontend in TypeScript handles the interface and session state through React Context, while a FastAPI backend brokers Spotify OAuth and Gemini calls so that no client secret ever reaches the browser. PostgreSQL with SQLAlchemy holds persistent data, with Alembic managing migrations.",
      },
      {
        heading: "Caching strategy",
        body: "Cache lifetimes are tuned to how quickly the underlying data actually changes, keeping the interface fast without serving stale results.",
        table: {
          headers: ["Data", "Lifetime"],
          rows: [
            ["Top tracks and artists", "5 minutes"],
            ["Generated recommendations", "24 hours"],
          ],
        },
      },
    ],
    stack: [
      { label: "Frontend", items: ["Next.js 14", "TypeScript", "Tailwind CSS", "React Context"] },
      { label: "Backend", items: ["FastAPI", "Python", "SQLAlchemy", "Alembic"] },
      { label: "Data & AI", items: ["PostgreSQL", "Google Gemini 2.5 Flash", "Spotify Web API"] },
    ],
  },

  "health-assist": {
    summary:
      "A conversational assistant that helps users prepare for a consultation with a healthcare professional by organizing symptoms, flagging high-risk situations for early escalation, and formulating questions worth asking.",
    problem:
      "People arrive at appointments having forgotten half of what they meant to say, and describe symptoms in an order that buries the important detail. HealthAssist structures that information beforehand so the limited time with a clinician is spent well.",
    note: "HealthAssist provides general educational information and is explicitly not a diagnostic tool. It cannot diagnose, prescribe or give medical advice, and it directs users to consult a healthcare professional.",
    sections: [
      {
        heading: "Features",
        bullets: [
          "Three-column interface pairing chat with live symptom tracking and progress visualization",
          "Gemini-driven intake that extracts severity, duration and onset from natural conversation",
          "Conversational memory carrying full chat history through the session",
          "Markdown-rendered responses for readable, structured answers",
          "Questions to raise with a doctor, generated from the collected symptoms",
        ],
      },
      {
        heading: "Safety model",
        body: "Escalation does not rely on the model alone. A deterministic high-risk word check runs alongside AI-driven risk assessment, so a critical phrase triggers immediate escalation regardless of how the model interprets the surrounding conversation. Defence in depth matters here — a missed emergency is not an acceptable failure mode.",
      },
      {
        heading: "Interface",
        body: "Styling is vanilla CSS with no framework, keeping the application dependency-free aesthetically while React Markdown with Remark GFM renders the AI responses.",
      },
    ],
    stack: [
      { label: "Framework", items: ["Next.js App Router", "React", "TypeScript"] },
      { label: "AI", items: ["Google Generative AI SDK", "Gemini"] },
      {
        label: "Interface",
        items: ["Vanilla CSS", "Lucide React", "React Markdown", "Remark GFM"],
      },
    ],
  },

  "support-desk": {
    summary:
      "A comprehensive full-stack support ticket management system built on the MERN stack, covering ticket workflows, real-time collaboration, analytics and machine-learning-assisted reporting.",
    problem:
      "Support tooling tends to handle the happy path and nothing else. The difficulty is in the edges: two agents editing the same ticket, duplicate reports of one incident, tickets that quietly breach their response window, and managers with no view of where time actually goes.",
    sections: [
      {
        heading: "Core ticket management",
        bullets: [
          "Full CRUD with agent assignment and customizable statuses",
          "Four priority levels and department-based organization",
          "Complete ticket history tracking every change",
          "Private internal notes visible only to agents",
          "Duplicate ticket merging and dependency links between related tickets",
        ],
      },
      {
        heading: "Advanced workflow",
        body: "Beyond the basics, the system addresses the operational failure modes that make support tooling frustrating in practice.",
        bullets: [
          "Collision detection preventing two agents from editing the same ticket",
          "WebSocket-based real-time notifications and live updates",
          "Escalation rules firing automatically against defined conditions",
          "Auto-close for resolved tickets",
          "Saved replies with variable substitution, and reusable ticket templates",
          "File attachments covering images, PDFs and documents",
          "CSAT surveys with NPS scoring",
        ],
      },
      {
        heading: "Analytics and reporting",
        bullets: [
          "Dashboard metrics with detailed charts and graphs",
          "Custom dashboards assembled from drag-and-drop widgets",
          "Generated PDF reports with scheduled email delivery",
          "Machine-learning predictions and anomaly detection over ticket patterns",
          "Natural language queries against ticket data",
        ],
      },
      {
        heading: "Access control",
        body: "Role-based access separates admin, agent and user capabilities, with both Google OAuth and traditional email and password authentication. Audit logs record user actions across the system.",
      },
    ],
    stack: [
      {
        label: "Frontend",
        items: ["React 18", "Vite", "React Router", "Tailwind CSS", "Recharts", "Socket.io Client"],
      },
      {
        label: "Backend",
        items: ["Node.js", "Express.js", "Socket.io", "JWT", "Bcrypt", "Multer", "Node-cron"],
      },
      { label: "Data & services", items: ["MongoDB", "Mongoose", "Nodemailer", "PDFKit"] },
    ],
  },

  "email-ai-classifier": {
    summary:
      "An email classification system that uses Google Apps Script and Gemini batch inference to apply hierarchical labels to Gmail automatically, surfaced through a companion Safari extension.",
    problem:
      "Gmail's own filters are rule-based, so they need a rule written in advance for every category that matters. A language model can classify a message on meaning instead, which handles the mail no one thought to write a rule for.",
    sections: [
      {
        heading: "Pipeline",
        body: "Google Apps Script acts as the backend orchestrator, retrieving mail from Gmail and batching it to the Gemini API for classification. Results come back as hierarchical categories, which are applied to the mailbox as labels and rendered in a Safari extension.",
        bullets: [
          "Gmail integration through Apps Script for retrieval and label application",
          "Batch classification to keep API calls efficient across large mailboxes",
          "Hierarchical label taxonomy rather than flat categories",
          "Safari extension with its own content scripts, background logic and manifest",
        ],
      },
      {
        heading: "Structure",
        body: "The repository separates the two halves cleanly: apps-script holds the Google Apps Script project and source, and safari-extension holds the browser extension implementation.",
      },
    ],
    stack: [
      { label: "Backend", items: ["Google Apps Script", "Gmail API"] },
      { label: "AI", items: ["Gemini batch classification API"] },
      { label: "Client", items: ["Safari extension", "JavaScript"] },
    ],
  },

  "email-form-collector": {
    summary:
      "A form builder that sends forms to recipients through a connected Gmail account and collects responses on an authenticated dashboard, with encrypted stored credentials, CSRF protection and rate limiting throughout.",
    problem:
      "Sending a form from a generic no-reply address gets it ignored or filtered. Delivering it through the sender's own Gmail account, over OAuth rather than stored passwords, keeps the message in a thread the recipient recognizes — which makes the security of the stored credentials the central design concern.",
    sections: [
      {
        heading: "Security model",
        body: "Because the application holds delegated access to a user's mailbox, security is treated as a first-class concern rather than a later hardening pass.",
        bullets: [
          "Password hashing and JWT session management",
          "Encrypted storage of connected account credentials",
          "CSRF protection enforced through a shared dependency",
          "Sliding-window rate limiter on sensitive endpoints",
          "Server-side validation and sanitization of every submitted answer",
          "Gmail access through OAuth, so no account password is ever stored",
        ],
      },
      {
        heading: "Backend structure",
        body: "A FastAPI and SQLAlchemy backend models users, forms, fields, campaigns and responses, with Alembic handling migrations. Routers separate authenticated owner endpoints from the public respondent surface, which takes no authentication at all.",
        table: {
          headers: ["Router", "Surface"],
          rows: [
            ["auth", "Registration, login and session management"],
            ["forms", "Form CRUD, overview metrics and sending"],
            ["public", "Unauthenticated respondent endpoints"],
            ["email_accounts", "Gmail OAuth connection flow"],
          ],
        },
      },
      {
        heading: "Delivery and testing",
        body: "Outgoing mail is rendered through a responsive HTML email template before being sent via the Gmail integration. The backend is covered by a 35-test pytest suite, and the frontend is React with TypeScript and Tailwind, built with Vite.",
      },
    ],
    stack: [
      { label: "Backend", items: ["FastAPI", "SQLAlchemy", "Alembic", "Python"] },
      { label: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Vite"] },
      { label: "Security", items: ["JWT", "OAuth 2.0", "CSRF tokens", "Credential encryption"] },
      { label: "Testing", items: ["Pytest (35 tests)"] },
    ],
  },

  learnsmart: {
    summary:
      "A production-oriented AI learning platform built as a NestJS modular monolith, spanning authentication, document ingestion, courses, lessons, quizzes, AI generation and progress tracking.",
    problem:
      "AI learning tools usually generate content in one shot and forget it. Treating documents, courses, quizzes and progress as distinct persisted domains means generated material can be revised, reused and measured against a learner's actual progress instead of being disposable.",
    note: "The backend scaffold and module boundaries are in place; business endpoints are not yet implemented.",
    sections: [
      {
        heading: "Domain modules",
        body: "The monolith is divided into explicit domains, each owning its own module boundary.",
        bullets: [
          "Auth and Users",
          "Documents — source material ingestion",
          "Courses and Lessons",
          "Quizzes",
          "AI — generation flows",
          "Progress — learner tracking",
        ],
      },
      {
        heading: "Why a modular monolith",
        body: "A modular monolith keeps deployment simple while preserving the internal boundaries that would let domains be extracted into services later if the load ever justifies it. Redis and BullMQ carry background work — document processing and AI generation are too slow to sit on the request path — and Swagger documents the API surface as it is built.",
      },
    ],
    stack: [
      { label: "Framework", items: ["NestJS", "TypeScript"] },
      { label: "Data", items: ["PostgreSQL", "Prisma"] },
      { label: "Jobs", items: ["Redis", "BullMQ"] },
      { label: "Tooling", items: ["Swagger", "Docker"] },
    ],
  },

  "nasa-seismic-noise-filtering-system": {
    summary:
      "A web-based application for accessing, processing and filtering seismic data from NASA's IRIS dataset, with specialized support for Martian seismic recordings from the InSight mission.",
    problem:
      "Planetary seismic recordings arrive buried in environmental noise — wind, thermal cracking and lander self-noise on Mars — and the filtering parameters that recover a usable signal differ from event to event. Iterating on those parameters through raw ObsPy scripting is slow, so the useful tool is one where a researcher can adjust and immediately see the result.",
    sections: [
      {
        heading: "Features",
        bullets: [
          "Martian data specialization, pre-configured for InSight mission recordings",
          "Multiple ObsPy-based noise reduction algorithms",
          "Real-time parameter configuration through a Streamlit interface",
          "Interactive preview of raw against filtered waveforms",
          "CSV export of filtered data in a standardized format",
          "Multi-planetary support covering Earth, Mars and other bodies",
        ],
      },
      {
        heading: "Processing options",
        table: {
          headers: ["Operation", "Purpose"],
          rows: [
            ["Bandpass filter", "Restrict the signal to a chosen frequency range"],
            ["Noise reduction", "Multiple ObsPy-based algorithms"],
            ["Detrending", "Remove linear or quadratic trends"],
            ["Decimation", "Adjust sampling rates"],
          ],
        },
      },
      {
        heading: "Data access",
        body: "The application integrates directly with the NASA IRIS API as its primary seismic data source, so recordings are retrieved and cleaned in one workflow rather than downloaded and processed separately.",
      },
    ],
    stack: [
      { label: "Processing", items: ["Python", "ObsPy", "Signal processing"] },
      { label: "Interface", items: ["Streamlit", "Interactive plots"] },
      { label: "Data", items: ["NASA IRIS API", "InSight mission data", "CSV export"] },
    ],
  },

  "hrm-research-repository": {
    summary:
      "Independent research and engineering work on the Hierarchical Reasoning Model, porting the reference implementation to Apple Silicon and hardening its evaluation pipeline.",
    problem:
      "Reference implementations of research models assume a CUDA machine and a specific dataset layout. Reproducing results on different hardware means working through hard CUDA dependencies, brittle checkpoint loading and undocumented dataset assumptions before any experiment can run at all.",
    note: "This is a derivative work of the open-source Sapient HRM project (arXiv:2506.21734). The original authors and publication are fully credited, and the repository preserves the original Apache-2.0 licence terms.",
    sections: [
      {
        heading: "What HRM is",
        body: "The Hierarchical Reasoning Model is a recurrent reasoning architecture with interacting high-level and low-level modules, designed for structured reasoning tasks such as ARC, Sudoku and Maze. It emphasizes computational depth over parameter count, staying relatively compact while reasoning through multiple recurrent passes.",
      },
      {
        heading: "Engineering contributions",
        body: "The work in this repository is engineering rather than modelling — making the reference implementation runnable, debuggable and reproducible on non-CUDA hardware.",
        bullets: [
          "Apple Silicon support path running MPS/CPU-first, with no CUDA requirement for the core evaluation flow",
          "FlashAttention compatibility troubleshooting and fallbacks",
          "ARC dataset pipeline debugging around split metadata and dataset.json issues",
          "Checkpoint loading robustness fixes across PyTorch directory and storage formats",
          "Evaluation experiments and small-sample benchmarking via max_samples runs",
          "Utility scripts for reproducible debugging workflows",
        ],
      },
    ],
    stack: [
      { label: "Modelling", items: ["PyTorch", "Python", "FlashAttention"] },
      { label: "Hardware", items: ["Apple Silicon (MPS)", "CPU fallback"] },
      { label: "Datasets", items: ["ARC", "Sudoku", "Maze"] },
    ],
  },

  "stock-price-prediction": {
    summary:
      "A regression model that predicts stock closing prices from historical Yahoo Finance data using Random Forest, evaluated with MAE, MSE and R² against actual prices.",
    problem:
      "Stock price prediction is a regression problem: estimate a continuous closing price from the day's other observable market data. The exercise is as much about honest evaluation as about the model — a plot of predictions against actuals reveals overfitting that a single accuracy figure hides.",
    sections: [
      {
        heading: "Approach",
        body: "A Random Forest Regressor learns the relationship between intraday market features and the closing price.",
        table: {
          headers: ["Role", "Fields"],
          rows: [
            ["Features", "Open, High, Low, Volume"],
            ["Target", "Closing price"],
          ],
        },
      },
      {
        heading: "Workflow",
        bullets: [
          "Data acquisition from the Yahoo Finance historical dataset",
          "Preprocessing and feature preparation",
          "Random Forest Regression training",
          "Prediction of closing prices on held-out data",
          "Evaluation with MAE, MSE and R²",
          "Visualization of actual against predicted price series",
        ],
      },
    ],
    stack: [
      { label: "Modelling", items: ["Python", "Scikit-learn", "Random Forest Regression"] },
      { label: "Analysis", items: ["Jupyter Notebook", "Matplotlib"] },
      { label: "Data", items: ["Yahoo Finance historical data"] },
    ],
  },

  "ai-chatbot": {
    summary:
      "A conversational AI assistant built with modern language models and prompt engineering techniques to provide intelligent responses and workflow assistance.",
    problem:
      "A general-purpose chat interface is a starting point for exploring how prompt design, conversation state and streaming responses shape the quality of an assistant.",
    note: "This repository is an early-stage Next.js project and its README is still the default scaffold, so this page describes intent rather than documented implementation. It will be expanded as the project develops.",
    sections: [
      {
        heading: "Direction",
        bullets: [
          "Conversational assistant over a modern LLM API",
          "Prompt engineering for response quality and consistency",
          "Next.js App Router frontend",
        ],
      },
    ],
    stack: [
      { label: "Framework", items: ["Next.js", "TypeScript", "React"] },
      { label: "AI", items: ["LLM API", "Prompt engineering"] },
    ],
  },
};
