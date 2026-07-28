# Data Model

This document describes every data file in `src/data/`, its TypeScript interface, exported values, and how it's consumed by components.

---

## Overview

All content is **data-driven** — components receive typed props from these files. No hardcoded strings in JSX.

| File | Domain | Exports | Derived Exports |
|------|--------|---------|-----------------|
| `profile.ts` | Personal identity | `profile: Profile` | — |
| `projects.ts` | Portfolio projects | `projects: Project[]` | `featuredProjects: Project[]` |
| `skills.ts` | Technical skills | `skills: Skill[]` | `skillGroups: SkillGroup[]` |
| `experience.ts` | Work history | `experience: Experience[]` | — |
| `education.ts` | Education history | `education: Education[]` | — |
| `certifications.ts` | Certifications | `certifications: Certification[]` | `activeCertifications: Certification[]` |
| `achievements.ts` | Awards, talks, publications | `achievements: Achievement[]` | — |
| `socials.ts` | Social/professional links | `socials: Social[]` | `featuredSocials: Social[]` |
| `timeline.ts` | Unified chronological view | `timeline: TimelineItem[]` | — |

---

## profile.ts

**File**: `src/data/profile.ts`

**Type**: `src/types/profile.ts`

```ts
interface Profile {
  name: string;                    // Full display name
  title: string;                   // Professional title (hero, <title>)
  tagline: string;                 // Short tagline (hero subtitle, meta description)
  bio: string;                     // Full bio (About section)
  shortBio: string;                // OpenGraph/Twitter Card description
  location: string;                // City, Country (Footer, About)
  email: string;                   // Contact email (Contact, Footer, schema.org)
  avatarUrl: string;               // Profile photo (Hero, About, schema.org)
  openToWork: boolean;             // "Open to opportunities" badge
  birthYear?: number;              // schema.org Person.birthDate (year only)
  pronouns?: string;               // Optional pronouns display
}
```

**Current State**: All fields empty strings / false — **must populate before deploy**.

**Consumers**:
- `app/layout.tsx` → `siteConfig` (indirectly via `siteConfig` which mirrors this)
- Hero section (planned) → `name`, `title`, `tagline`, `avatarUrl`
- About section (planned) → `bio`, `location`, `email`
- Contact section (planned) → `email`, `location`
- `lib/metadata.ts` → `shortBio` for OpenGraph description
- schema.org Person structured data (planned)

---

## projects.ts

**File**: `src/data/projects.ts`

**Type**: `src/types/project.ts`

```ts
type ProjectStatus = "completed" | "in-progress" | "archived";

interface Project {
  slug: string;                    // URL-safe: /projects/[slug]
  title: string;
  description: string;             // Short (card) description
  longDescription?: string;        // Full MDX for detail page
  tags: string[];                  // Technologies (rendered as Badges)
  coverImage?: string;             // Path to /public or CDN URL
  githubUrl?: string;              // Source code link
  liveUrl?: string;                // Live demo link
  caseStudyUrl?: string;           // Case study / write-up link
  featured: boolean;               // Shows on home page Projects section
  status: ProjectStatus;
  publishedAt: string;             // ISO-8601 (YYYY-MM-DD)
  updatedAt?: string;              // ISO-8601
}
```

**Derived Export**:
```ts
export const featuredProjects: Project[] = projects.filter((p) => p.featured);
```

**Current State**: Empty array — **add real projects before deploy**.

**Consumers**:
- Projects section (planned) → `featuredProjects` mapped to `ProjectCard`
- `/projects` listing page (planned) → `projects`
- `/projects/[slug]` detail page (planned) → single `Project`
- Semantic search index builder (Phase 4) → `projects` for embeddings

---

## skills.ts

**File**: `src/data/skills.ts`

**Type**: `src/types/skill.ts`

```ts
type SkillCategory =
  | "Languages"
  | "Frameworks & Libraries"
  | "AI / ML"
  | "Cloud & Infrastructure"
  | "Databases"
  | "Tools & Platforms";

type ProficiencyLevel = "expert" | "proficient" | "familiar";

interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: ProficiencyLevel;
  url?: string;                    // Official docs/website
  icon?: string;                   // Lucide icon name or /public path
}

interface SkillGroup {
  category: SkillCategory;
  skills: Skill[];
}
```

**Derived Export**:
```ts
export const skillGroups: SkillGroup[] = Object.values(
  skills.reduce<Record<string, SkillGroup>>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = { category: skill.category, skills: [] };
    }
    acc[skill.category].skills.push(skill);
    return acc;
  }, {})
);
```

**Current State**: Empty array — **add skills before deploy**.

**Consumers**:
- Skills section (planned) → `skillGroups` → each group renders `SkillBadge[]`
- About section (planned) → top skills as `SkillBadge` row
- Resume export (planned) → `skills` grouped by category

**Proficiency → Visual Mapping** (in `SkillBadge`):
| Level | Badge Variant | Dot Color |
|-------|---------------|-----------|
| `expert` | `brand` | `bg-brand` |
| `proficient` | `secondary` | `bg-primary/60` |
| `familiar` | `muted` | `bg-muted-foreground/50` |

---

## experience.ts

**File**: `src/data/experience.ts`

**Type**: `src/types/experience.ts`

```ts
type EmploymentType =
  | "full-time" | "part-time" | "contract"
  | "freelance" | "internship" | "volunteer";

interface Experience {
  id: string;                      // Unique key (e.g., "company-role")
  company: string;
  companyUrl?: string;
  companyLogoUrl?: string;         // Logo for TimelineCard
  role: string;
  employmentType: EmploymentType;
  startDate: string;               // ISO YYYY-MM
  endDate?: string;                // Omit for current role
  location: string;
  remote: boolean;
  description: string;             // Short (TimelineCard)
  highlights: string[];            // Bullet achievements
  technologies: string[];          // Tags for TimelineCard
}
```

**Current State**: Empty array — **add experience before deploy**.

**Consumers**:
- Experience/Timeline section (planned) → mapped to `TimelineItem` in `timeline.ts`
- Resume export (planned) → full `Experience[]`
- TimelineCard → `role`, `company`, `startDate`/`endDate`, `description`, `technologies`

---

## education.ts

**File**: `src/data/education.ts`

**Type**: `src/types/education.ts`

```ts
type DegreeType =
  | "Bachelor's" | "Master's" | "PhD" | "Associate"
  | "Diploma" | "Certificate" | "Bootcamp" | "Online Course";

interface Education {
  id: string;
  institution: string;
  institutionUrl?: string;
  logoUrl?: string;
  degreeType: DegreeType;
  field: string;
  startDate: string;               // ISO YYYY-MM
  endDate?: string;                // Omit if currently enrolled
  location?: string;
  gpa?: string;
  description?: string;
  highlights?: string[];
}
```

**Current State**: Empty array — **add education before deploy**.

**Consumers**:
- Education section (planned) or merged in Timeline
- Timeline section (planned) → mapped to `TimelineItem` in `timeline.ts`

---

## certifications.ts

**File**: `src/data/certifications.ts`

**Type**: `src/types/certification.ts`

```ts
interface Certification {
  id: string;
  name: string;                    // e.g., "AWS Certified Solutions Architect"
  issuer: string;                  // e.g., "Amazon Web Services"
  issuerLogoUrl?: string;
  issuedDate: string;              // ISO YYYY-MM
  expiryDate?: string;             // Omit for non-expiring
  credentialId?: string;           // Verification ID
  credentialUrl?: string;          // Verify link
  active: boolean;                 // Currently valid
}
```

**Derived Export**:
```ts
export const activeCertifications: Certification[] = certifications.filter((c) => c.active);
```

**Current State**: Empty array — **add certifications before deploy**.

**Consumers**:
- Certifications section (planned) → `activeCertifications` as cards
- Timeline section (planned) → mapped to `TimelineItem` in `timeline.ts`

---

## achievements.ts

**File**: `src/data/achievements.ts`

**Type**: `src/types/achievement.ts`

```ts
type AchievementType =
  | "award" | "publication" | "talk"
  | "open-source" | "competition" | "recognition" | "other";

interface Achievement {
  id: string;
  title: string;
  type: AchievementType;
  issuer?: string;                 // Organization/conference
  date: string;                    // ISO YYYY-MM-DD or YYYY-MM
  description?: string;
  url?: string;                    // Link to proof/announcement
}
```

**Current State**: Empty array — **add achievements before deploy**.

**Consumers**:
- Achievements section (planned) or merged in Timeline
- Timeline section (planned) → mapped to `TimelineItem` in `timeline.ts`

---

## socials.ts

**File**: `src/data/socials.ts`

**Type**: `src/types/social.ts`

```ts
type SocialPlatform =
  | "github" | "linkedin" | "twitter" | "youtube"
  | "devto" | "medium" | "hashnode" | "bluesky"
  | "mastodon" | "email" | "website" | "other";

interface Social {
  platform: SocialPlatform;
  label: string;                   // Display: "@username" or "GitHub"
  href: string;                    // Full URL
  icon: string;                    // Lucide icon name (maps to SocialIcons)
  featured: boolean;               // true = Navbar + Hero, false = Footer only
}
```

**Derived Export**:
```ts
export const featuredSocials: Social[] = socials.filter((s) => s.featured);
```

**Current State**: Empty array — **add socials before deploy**.

**Consumers**:
- Navbar → `featuredSocials` (via `config/navigation.ts` currently, will unify)
- Footer → `socials` (all)
- Hero section (planned) → `featuredSocials` as `SocialButton` row
- Contact section (planned) → all `socials`
- schema.org Person.sameAs (planned) → `socials.map(s => s.href)`

**Note**: `config/navigation.ts` also defines `socialLinks` for Navbar/Footer. These should be unified — the data layer (`socials.ts`) is the source of truth; `navigation.ts` should derive from it.

---

## timeline.ts

**File**: `src/data/timeline.ts`

**Type**: `src/types/timeline.ts`

```ts
type TimelineItemType = "experience" | "education" | "achievement" | "certification";

interface TimelineItem {
  id: string;
  type: TimelineItemType;
  title: string;
  subtitle: string;
  date: string;                    // ISO YYYY-MM (sort key)
  endDate?: string;                // ISO YYYY-MM
  description?: string;
  tags?: string[];                 // Technologies, skills
  url?: string;                    // External link
  logoUrl?: string;                // Company/institution logo
  current: boolean;                // Ongoing (no endDate)
}
```

**Assembly Logic**:
```ts
// 1. Map each source to TimelineItem
const experienceItems = experience.map(e => ({
  id: e.id,
  type: "experience",
  title: e.role,
  subtitle: e.company,
  date: e.startDate,
  endDate: e.endDate,
  description: e.description,
  tags: e.technologies,
  url: e.companyUrl,
  logoUrl: e.companyLogoUrl,
  current: !e.endDate,
}));

// ... similarly for education, achievements, certifications

// 2. Merge and sort (most recent first)
export const timeline: TimelineItem[] = [
  ...experienceItems,
  ...educationItems,
  ...achievementItems,
  ...certificationItems,
].sort((a, b) => b.date.localeCompare(a.date));
```

**Current State**: Empty (all source arrays empty) — **populates automatically when sources are filled**.

**Consumers**:
- Experience/Timeline section (planned) → `timeline` mapped to `TimelineCard[]`
- `TimelineCard` uses `type` for badge variant/color:
  | Type | Badge Variant | Dot Color |
  |------|---------------|-----------|
  | `experience` | `brand` | `border-brand bg-brand` |
  | `education` | `secondary` | `border-border bg-border` |
  | `achievement` | `success` | — |
  | `certification` | `default` | — |

---

## Configuration Data (Not in src/data/)

### site.ts

**File**: `src/config/site.ts`

**Purpose**: Single source of truth for identity, SEO, contact.

```ts
export const siteConfig = {
  name: "",              // Mirrors profile.name
  title: "",             // Mirrors profile.title
  tagline: "",           // Mirrors profile.tagline
  description: "",       // Mirrors profile.shortBio
  url: "",               // Canonical URL (no trailing slash)
  avatarUrl: "",         // Mirrors profile.avatarUrl
  ogImageUrl: "/og-image.png",
  email: "",             // Mirrors profile.email
  location: "",          // Mirrors profile.location
  social: {
    github: "",
    linkedin: "",
    twitter: "",
    youtube: "",
    devto: "",
    medium: "",
  },
  locale: "en_US",
  timezone: "UTC",
};
```

**Current State**: All empty — **must populate before deploy**.

**Consumers**:
- `app/layout.tsx` → metadata, `html lang`
- `lib/metadata.ts` → `defaultMetadata`, `buildMetadata()`
- `app/manifest.ts` → PWA manifest
- `components/layout/Footer.tsx` → name, title, location, social links
- `components/layout/Navbar.tsx` → name (logo)

### navigation.ts

**File**: `src/config/navigation.ts`

**Purpose**: Navigation structure — single source for Navbar, Footer, mobile menu.

```ts
interface NavLink {
  label: string;
  href: string;              // "/#section" or "/route"
  external?: boolean;
}

interface SocialLink extends NavLink {
  icon: string;              // Key into socialIconMap
}

export const primaryNavLinks: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Writing", href: "/writing" },
  { label: "Contact", href: "/#contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "", icon: "Github", external: true },
  { label: "LinkedIn", href: "", icon: "Linkedin", external: true },
  { label: "Twitter / X", href: "", icon: "Twitter", external: true },
];
```

**Current State**: `href: ""` for socials — **populate from `siteConfig.social` before deploy**.

**Consumers**:
- `Navbar.tsx` → `primaryNavLinks`, `socialLinks`
- `Footer.tsx` → `primaryNavLinks`, `socialLinks`
- `useActiveSection` hook → derives section IDs from `primaryNavLinks`

**Anchor Convention**: Use `/#section-id` format so links work from any route. On home page, Next.js `Link` smooth-scrolls; from other pages, navigates to `/` then scrolls.

---

## Data Flow Summary

```
src/data/*.ts (typed arrays)
       │
       ▼
Derived exports (featuredProjects, skillGroups, timeline, etc.)
       │
       ▼
Components (Section, ProjectCard, TimelineCard, SkillBadge, etc.)
       │
       ▼
app/page.tsx (composes sections)
       │
       ▼
Static HTML at build time
```

---

## Population Checklist (Pre-Deploy)

- [ ] `siteConfig` in `config/site.ts` — all fields
- [ ] `profile` in `data/profile.ts` — all fields
- [ ] `projects` in `data/projects.ts` — at least 3 featured
- [ ] `skills` in `data/skills.ts` — 15+ skills across categories
- [ ] `experience` in `data/experience.ts` — reverse chronological
- [ ] `education` in `data/education.ts` — reverse chronological
- [ ] `certifications` in `data/certifications.ts` — active ones marked
- [ ] `achievements` in `data/achievements.ts` — notable items
- [ ] `socials` in `data/socials.ts` — all profiles, `featured` set
- [ ] `navigation.ts` social `href` values — sync with `siteConfig.social`
- [ ] `og-image.png` in `public/` — 1200×630 custom image
- [ ] `avatarUrl` — profile photo in `public/` or CDN