# Requirements

## Functional Requirements

### FR-01 — Portfolio Sections
The site must include the following sections accessible from a persistent top navigation:
- Hero (name, title, brief tagline, CTA)
- About (bio, background, interests)
- Skills (technologies, categorized)
- Projects (cards with title, description, tags, links)
- Experience (timeline of roles)
- Writing / Blog (list of posts with excerpts)
- Contact (social links, email form or link)

### FR-02 — Project Detail Pages
Each project must have a dedicated page (`/projects/[slug]`) containing:
- Title, description, full write-up
- Tech stack used
- Links to live site, GitHub, or case study
- Cover image

### FR-03 — Writing / Blog
- Posts authored in MDX, stored in the repository
- Each post has a dedicated page (`/writing/[slug]`)
- Posts support code highlighting, images, and callout blocks
- Posts display estimated read time and publish date

### FR-04 — AI Chat Assistant
- A floating chat widget allows visitors to ask questions about the portfolio owner
- The assistant answers using portfolio content as context (RAG)
- The assistant is clearly labeled as AI-generated
- Conversation history is maintained within the session (not persisted)

### FR-05 — Semantic Project Search
- A search bar on the Projects page returns relevant projects for natural-language queries
- Search uses vector embeddings (not full-text keyword matching)
- Results update without a full page reload

### FR-06 — Dark Mode
- The site supports light and dark mode
- User preference is persisted across sessions (localStorage)
- System preference is respected as the default

### FR-07 — Contact
- Clicking the email link opens the user's mail client with a pre-filled address
- Social links (GitHub, LinkedIn, Twitter/X) are present in the footer and/or nav
- All external links open in a new tab with `rel="noopener noreferrer"`

---

## Non-Functional Requirements

### NFR-01 — Performance
- Lighthouse Performance score ≥ 95 on desktop and ≥ 90 on mobile
- Largest Contentful Paint (LCP) < 2.5 seconds
- Cumulative Layout Shift (CLS) < 0.1
- First Input Delay (FID) / Interaction to Next Paint (INP) < 200ms
- Total page weight (initial load) < 500 KB (compressed)

### NFR-02 — Accessibility
- WCAG 2.1 Level AA compliance
- All interactive elements are keyboard-navigable
- All images have descriptive `alt` text
- Color contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- Site is fully usable with a screen reader (VoiceOver tested)

### NFR-03 — SEO
- Each page has a unique `<title>` and `<meta name="description">`
- Open Graph tags on all pages
- Twitter Card tags on all pages
- `robots.txt` and `sitemap.xml` generated at build time
- Semantic HTML throughout (correct heading hierarchy, landmark regions)

### NFR-04 — Security
- No secrets or API keys in source code
- HTTPS enforced for all traffic
- HTTP Strict Transport Security (HSTS) header set
- Content Security Policy (CSP) header set
- No third-party scripts that are not explicitly reviewed
- Dependencies audited via `npm audit` in CI

### NFR-05 — Reliability
- Site is statically rendered — no single point of failure for the core portfolio
- AI features degrade gracefully if the backend is unavailable (error states, not crashes)
- Site is deployable from a clean checkout with documented steps

### NFR-06 — Maintainability
- All components are documented with JSDoc comments
- TypeScript strict mode enabled
- ESLint and Prettier enforced in CI
- Adding a new project requires editing one data file only (no code changes)
- Adding a new blog post requires only dropping an MDX file into the correct directory

### NFR-07 — Cost
- AWS infrastructure cost at low traffic (< 1,000 visits/month) < $5/month
- AI features (Lambda + Bedrock) are pay-per-use with no minimum commitment
- A CloudWatch budget alarm triggers at $20/month

---

## Constraints

- Repository is public on GitHub — no secrets may be committed
- The entire stack runs on AWS — no external hosting services (Vercel, Netlify, etc.)
- Node.js 20 is the minimum runtime version
- The project uses npm as the package manager (no Yarn or pnpm)

---

## Out of Scope (v1.0)

- User authentication / login
- CMS integration (Contentful, Sanity, etc.)
- E-commerce / paid content
- Comments on blog posts
- Server-side rendered analytics dashboards
