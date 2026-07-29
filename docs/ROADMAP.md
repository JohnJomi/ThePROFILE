# Roadmap

## Milestone 1: Populate Content

Goal: Replace every placeholder identity and portfolio collection with real content.

Complexity: Medium

Dependencies: None beyond the existing data model.

Priority: Highest

Includes:

1. `siteConfig`
2. `profile`
3. `projects`
4. `skills`
5. `experience`
6. `education`
7. `certifications`
8. `achievements`
9. `socials`

## Milestone 2: Complete Home Sections

Goal: Replace the placeholder home-page anchors with real section components.

Complexity: Medium

Dependencies: Milestone 1.

Priority: Highest

Includes:

1. About
2. Skills
3. Experience
4. Projects
5. Certifications
6. Writing
7. Contact

## Milestone 3: Route Surface

Goal: Add the route structure that the navigation and requirements already describe.

Complexity: Medium

Dependencies: Milestone 1 and Milestone 2.

Priority: High

Includes:

1. `/projects`
2. `/projects/[slug]`
3. `/writing`
4. `/writing/[slug]`

## Milestone 4: SEO and Launch Hardening

Goal: Bring the frontend to a production-ready public launch state.

Complexity: Medium

Dependencies: Milestones 1-3.

Priority: High

Includes:

1. `robots.txt`
2. `sitemap.xml`
3. structured data
4. image host restriction
5. skip link
6. launch QA

## Milestone 5: Infrastructure

Goal: Define the AWS deployment layer and connect it to the frontend.

Complexity: High

Dependencies: The content and route surface should be stable first.

Priority: High

Includes:

1. CDK app and stacks
2. hosting configuration
3. custom domain and TLS
4. environment variable strategy
5. deploy pipeline

## Milestone 6: AI Features

Goal: Add differentiating AI capabilities once the portfolio content exists.

Complexity: High

Dependencies: Content completeness and infrastructure.

Priority: Medium

Includes:

1. semantic search
2. chat assistant
3. query provider activation
4. optional RAG support

## Milestone 7: Post-Launch Iteration

Goal: Improve the site based on real use and final content polish.

Complexity: Low to Medium

Dependencies: Launch.

Priority: Medium

Includes:

1. analytics
2. performance tuning
3. content refinement
4. accessibility review
5. maintenance hardening

## Order of Operations

The correct next sequence is content first, sections second, routes third, launch hardening fourth, infrastructure fifth, and AI features last. That order minimizes rework and keeps the public surface accurate at every step.