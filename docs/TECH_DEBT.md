# Technical Debt

## Code Duplication

1. `Hero.tsx` defines a local `withDelay` helper even though the same helper exists in [frontend/src/lib/motion.ts](../frontend/src/lib/motion.ts).
2. The planned section composition is described in multiple docs, but the actual section implementation is still centralized only in the hero placeholder.
3. The project has both a custom CTA system and a base-ui button wrapper, which increases the chance of drift if both remain active long term.

## Incomplete Implementation

1. `siteConfig` is entirely empty.
2. `profile`, `projects`, `skills`, `experience`, `education`, `certifications`, `achievements`, and `socials` are empty.
3. The home page only renders Hero plus empty anchor targets.
4. The `/projects` and `/writing` route families are not implemented.
5. Infrastructure files are only `.gitkeep` placeholders.
6. React Query is stubbed.

## Dead Code / Unused Surfaces

1. The `GlassCard` export is defined but not used anywhere in the current composition.
2. The base-ui button wrapper in [frontend/src/components/ui/button.tsx](../frontend/src/components/ui/button.tsx) is not referenced by the custom CTA components.
3. The base-ui tooltip wrapper exists primarily as plumbing for the provider and is not yet surfaced in visible UI.
4. Several planned section docs reference components that do not yet exist in source.

## Placeholder Content

1. `app/page.tsx` uses empty `div` anchors for future sections.
2. `siteConfig` defaults to blanks and generic fallbacks.
3. Social links are empty and therefore hidden by `SocialButton`.
4. Metadata values fall back to generic portfolio defaults.

## Missing Tests

1. There are no component tests.
2. There are no integration tests for anchor navigation or active section highlighting.
3. There are no accessibility regression tests.
4. There are no route-level tests for future pages.

## Potential Bugs

1. The root metadata references icon and manifest assets that are not visibly present in the currently listed public tree, so build-time asset verification should be checked before launch.
2. `next.config.ts` permits any HTTPS remote image host, which is too broad for a public production deployment.
3. `siteConfig.social.twitter` is treated as if it may contain a Twitter URL, but the Twitter card creator logic assumes a URL shape and may not produce the intended handle unless populated carefully.
4. `TimelineCard` sorts by string date fields, which is acceptable for normalized ISO-like dates but depends on consistent input formatting.

## Refactoring Opportunities

1. Remove the local `withDelay` helper in Hero and consume the shared helper from `lib/motion.ts`.
2. Decide whether the base-ui button wrapper should be the canonical button primitive or remain unused.
3. Collapse any future section-specific layout patterns into a shared section pattern once more sections exist.

## Architecture Improvements

1. Add route scaffolding only when the content exists to support it.
2. Add a real content pipeline for writing before introducing the blog routes.
3. Tighten the image configuration to known domains or local assets.
4. Add a skip link and structured data before launch.
5. Add a CDK infrastructure definition before treating deployment as ready.

## Priority

The highest-value debt items are empty data, missing routes, and missing infrastructure. The codebase itself is not fragile; the debt is primarily around completeness.