# Data Model

This repository uses typed static modules under [frontend/src/data](../frontend/src/data) as the content source of truth. The data model is well designed, but the current arrays are intentionally empty.

## Inventory

| File | Domain | Export(s) | Status |
|---|---|---|---|
| [profile.ts](../frontend/src/data/profile.ts) | Personal identity | `profile` | Empty |
| [projects.ts](../frontend/src/data/projects.ts) | Portfolio projects | `projects`, `featuredProjects` | Empty |
| [skills.ts](../frontend/src/data/skills.ts) | Technical skills | `skills`, `skillGroups` | Empty |
| [experience.ts](../frontend/src/data/experience.ts) | Work history | `experience` | Empty |
| [education.ts](../frontend/src/data/education.ts) | Education history | `education` | Empty |
| [certifications.ts](../frontend/src/data/certifications.ts) | Certifications | `certifications`, `activeCertifications` | Empty |
| [achievements.ts](../frontend/src/data/achievements.ts) | Awards and recognitions | `achievements` | Empty |
| [socials.ts](../frontend/src/data/socials.ts) | Social profiles | `socials`, `featuredSocials` | Empty |
| [timeline.ts](../frontend/src/data/timeline.ts) | Unified chronology | `timeline` | Derived from empty sources |

## profile.ts

File: [frontend/src/data/profile.ts](../frontend/src/data/profile.ts)

Type: [frontend/src/types/profile.ts](../frontend/src/types/profile.ts)

Fields:

`name`, `title`, `tagline`, `bio`, `shortBio`, `location`, `email`, `avatarUrl`, `openToWork`, `birthYear?`, `pronouns?`

Consumers:

`Hero`, `Footer`, metadata helpers, future About and Contact sections, and future structured data.

Current state:

All fields are blank or false. This is the highest-priority content gap in the repository.

Future extension:

Add optional structured-data helpers if the site needs Person schema generation.

## projects.ts

File: [frontend/src/data/projects.ts](../frontend/src/data/projects.ts)

Type: [frontend/src/types/project.ts](../frontend/src/types/project.ts)

Fields:

`slug`, `title`, `description`, `longDescription?`, `tags`, `coverImage?`, `githubUrl?`, `liveUrl?`, `caseStudyUrl?`, `featured`, `status`, `publishedAt`, `updatedAt?`

Derived export:

`featuredProjects = projects.filter((p) => p.featured)`

Consumers:

Project cards, future `/projects` routes, and future semantic search indexing.

Current state:

The array is empty, so every downstream consumer has nothing to render.

Future extension:

If project detail pages are added later, `longDescription` and `caseStudyUrl` are the obvious expansion points.

## skills.ts

File: [frontend/src/data/skills.ts](../frontend/src/data/skills.ts)

Type: [frontend/src/types/skill.ts](../frontend/src/types/skill.ts)

Fields:

`name`, `category`, `proficiency`, `url?`, `icon?`

Derived export:

`skillGroups` groups skills by category using `reduce`.

Consumers:

`SkillBadge`, planned Skills/About sections, and future resume export.

Current state:

The array is empty, so the grouped export also resolves to an empty collection.

Future extension:

The current category enum is broad enough for most portfolio use cases, but could be expanded if the owner wants separate AI or infra taxonomies.

## experience.ts

File: [frontend/src/data/experience.ts](../frontend/src/data/experience.ts)

Type: [frontend/src/types/experience.ts](../frontend/src/types/experience.ts)

Fields:

`id`, `company`, `companyUrl?`, `companyLogoUrl?`, `role`, `employmentType`, `startDate`, `endDate?`, `location`, `remote`, `description`, `highlights`, `technologies`

Consumers:

Future Experience/Timeline sections and `timeline.ts`.

Current state:

Empty array.

Future extension:

The model already captures enough detail for both a concise timeline and a richer resume export.

## education.ts

File: [frontend/src/data/education.ts](../frontend/src/data/education.ts)

Type: [frontend/src/types/education.ts](../frontend/src/types/education.ts)

Fields:

`id`, `institution`, `institutionUrl?`, `logoUrl?`, `degreeType`, `field`, `startDate`, `endDate?`, `location?`, `gpa?`, `description?`, `highlights?`

Consumers:

Future About/Education sections and `timeline.ts`.

Current state:

Empty array.

Future extension:

This model supports both formal education and short-form online learning.

## certifications.ts

File: [frontend/src/data/certifications.ts](../frontend/src/data/certifications.ts)

Type: [frontend/src/types/certification.ts](../frontend/src/types/certification.ts)

Fields:

`id`, `name`, `issuer`, `issuerLogoUrl?`, `issuedDate`, `expiryDate?`, `credentialId?`, `credentialUrl?`, `active`

Derived export:

`activeCertifications = certifications.filter((c) => c.active)`

Consumers:

Future Certifications section and `timeline.ts`.

Current state:

Empty array.

Future extension:

The model is sufficient for certificate verification flows if the site later needs them.

## achievements.ts

File: [frontend/src/data/achievements.ts](../frontend/src/data/achievements.ts)

Type: [frontend/src/types/achievement.ts](../frontend/src/types/achievement.ts)

Fields:

`id`, `title`, `type`, `issuer?`, `date`, `description?`, `url?`

Consumers:

Future About/Achievements sections and `timeline.ts`.

Current state:

Empty array.

Future extension:

This is flexible enough to capture talks, publications, open-source milestones, and awards.

## socials.ts

File: [frontend/src/data/socials.ts](../frontend/src/data/socials.ts)

Type: [frontend/src/types/social.ts](../frontend/src/types/social.ts)

Fields:

`platform`, `label`, `href`, `icon`, `featured`

Derived export:

`featuredSocials = socials.filter((s) => s.featured)`

Consumers:

Navbar, footer, hero, and future contact sections.

Current state:

Empty array. That means the visible social link components render nothing until the data is populated.

Future extension:

The platform enum includes future-friendly options such as Bluesky, Mastodon, and Hashnode.

## timeline.ts

File: [frontend/src/data/timeline.ts](../frontend/src/data/timeline.ts)

Type: [frontend/src/types/timeline.ts](../frontend/src/types/timeline.ts)

Purpose:

Builds a unified chronological view across experience, education, achievements, and certifications.

How it works:

Each source array is mapped into a common `TimelineItem` shape and then sorted by date descending.

Consumers:

Future timeline or experience sections.

Current state:

The output is empty because every source collection is empty.

Future extension:

This module is the right place to add a unified filter or grouping strategy later if the site wants to merge chronology types differently.

## Data Quality Assessment

Strengths:

1. The data model is fully typed and domain-specific.
2. Derived exports reduce duplication and preserve one source of truth.
3. The shapes already anticipate future sections and route pages.

Weaknesses:

1. No actual content exists yet.
2. `siteConfig` mirrors the data layer conceptually, but the site identity values are also blank.
3. The downstream site currently depends on placeholders and empty arrays.

The content model is architecturally sound, but the repository is still missing the real portfolio data that would make it usable.

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