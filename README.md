# AI Engineer Portfolio

A modern, production-grade portfolio website built to showcase AI engineering work, projects, and technical writing.

## Tech StacKs

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Framer Motion |
| Hosting | AWS Amplify |
| Infrastructure | AWS CDK (TypeScript)
| CI/CD | GitHub Actions |

## Repository Structure

```
portfolio/
├── .github/              # CI/CD workflows, PR and issue templates
├── docs/                 # Project documentation
│   ├── PROJECT_PLAN.md
│   ├── ARCHITECTURE.md
│   ├── REQUIREMENTS.md
│   └── CHANGELOG.md
├── frontend/             # Next.js 15 application
│   ├── src/
│   │   ├── app/          # App Router pages and layouts
│   │   ├── components/   # UI primitives and page sections
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities, constants, config
│   │   └── types/        # TypeScript interfaces
│   └── public/           # Static assets
└── infrastructure/       # AWS CDK stacks
    ├── bin/              # CDK app entry point
    └── lib/
        ├── stacks/       # Stack definitions
        └── constructs/   # Reusable L3 constructs
```

## Getting Started

> Application code has not been scaffolded yet. See [docs/PROJECT_PLAN.md](docs/PROJECT_PLAN.md) for the current phase.

### Prerequisites

- Node.js 20+
- AWS CLI configured with appropriate credentials
- AWS CDK CLI: `npm install -g aws-cdk`

### Frontend (development)

```bash
cd frontend
npm install
npm run dev
```

### Infrastructure (deploy)

```bash
cd infrastructure
npm install
cdk bootstrap
cdk deploy
```

## Documentation

- [Project Plan](docs/PROJECT_PLAN.md) — phases, milestones, and timeline
- [Architecture](docs/ARCHITECTURE.md) — system design and AWS service map
- [Requirements](docs/REQUIREMENTS.md) — functional and non-functional requirements
- [Changelog](docs/CHANGELOG.md) — version history

## License

MIT
