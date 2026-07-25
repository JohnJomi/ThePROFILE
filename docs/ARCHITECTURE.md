# Architecture

## System Overview

The portfolio is a statically-rendered Next.js 15 site hosted on AWS Amplify, with optional server-side AI features backed by AWS Lambda and Amazon Bedrock. All infrastructure is defined as code using AWS CDK (TypeScript).

```
┌─────────────────────────────────────────────────────────────────┐
│                          User Browser                           │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AWS Amplify Hosting                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Next.js 15 (App Router)                     │   │
│  │  Static pages + Server Components + Route Handlers       │   │
│  └──────────────────────────────────────────────────────────┘   │
│  CloudFront CDN  •  Custom Domain (Route 53 + ACM)              │
└────────────────────────────┬────────────────────────────────────┘
                             │ API calls (optional AI features)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API Gateway (HTTP API)                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AWS Lambda (Node.js 20)                      │
│  ┌─────────────────────┐   ┌───────────────────────────────┐    │
│  │  Chat / Q&A Handler │   │  Semantic Search Handler      │    │
│  └──────────┬──────────┘   └──────────────┬────────────────┘    │
└─────────────┼────────────────────────────┼────────────────────┘
              │                            │
              ▼                            ▼
┌─────────────────────────┐   ┌────────────────────────────────┐
│   Amazon Bedrock        │   │   Amazon OpenSearch Serverless  │
│   (Claude / Titan)      │   │   (vector search index)        │
└─────────────────────────┘   └────────────────────────────────┘
```

---

## AWS Services

| Service | Purpose |
|---|---|
| AWS Amplify | Static site hosting, CI/CD, environment config |
| Amazon CloudFront | CDN, edge caching (managed by Amplify) |
| AWS Certificate Manager | TLS certificate for custom domain |
| Amazon Route 53 | DNS for custom domain |
| Amazon API Gateway (HTTP) | REST interface for AI Lambda functions |
| AWS Lambda | Serverless compute for AI feature handlers |
| Amazon Bedrock | Foundation models (Claude for chat, Titan for embeddings) |
| Amazon OpenSearch Serverless | Vector index for semantic project search |
| AWS Systems Manager (SSM) | Non-secret environment variables |
| AWS Secrets Manager | API keys and sensitive config |
| Amazon CloudWatch | Logs, metrics, alarms |
| AWS CDK | Infrastructure-as-code for all of the above |

---

## Frontend Architecture

```
frontend/src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (fonts, theme, metadata)
│   ├── page.tsx            # Home page (/ route)
│   ├── projects/           # /projects route
│   ├── writing/            # /writing route (MDX blog)
│   └── api/                # Route Handlers (proxies to Lambda)
├── components/
│   ├── ui/                 # shadcn/ui primitives (Button, Card, etc.)
│   └── sections/           # Page-level sections (Hero, Projects, etc.)
├── hooks/                  # Custom React hooks (useScrollPosition, etc.)
├── lib/
│   ├── utils.ts            # Shared utilities (cn, formatDate, etc.)
│   ├── constants.ts        # Site config, nav links, social links
│   └── content/            # Static content (projects, experience data)
└── types/                  # TypeScript interfaces (Project, Post, etc.)
```

---

## Infrastructure Architecture

```
infrastructure/
├── bin/
│   └── app.ts              # CDK app entry — instantiates stacks
└── lib/
    ├── stacks/
    │   ├── hosting-stack.ts    # Amplify Hosting + domain
    │   ├── ai-stack.ts         # Lambda + API Gateway + Bedrock IAM
    │   └── monitoring-stack.ts # CloudWatch dashboards + alarms
    └── constructs/
        ├── amplify-site.ts     # L3 construct: Amplify + Route53 + ACM
        └── bedrock-function.ts # L3 construct: Lambda with Bedrock permissions
```

---

## Data Flow — AI Chat Feature

1. User submits a message in the chat UI.
2. Next.js Route Handler (`/api/chat`) forwards the request to API Gateway.
3. API Gateway invokes the chat Lambda.
4. Lambda builds a prompt from conversation history + system context.
5. Lambda calls Amazon Bedrock (Claude) via the `@aws-sdk/client-bedrock-runtime` SDK.
6. Bedrock streams the response back to Lambda.
7. Lambda streams the response back to the client via API Gateway.

---

## Data Flow — Semantic Project Search

1. At build time, project descriptions are embedded using Amazon Titan Embeddings.
2. Embeddings are indexed in Amazon OpenSearch Serverless.
3. User enters a search query in the UI.
4. Next.js Route Handler calls the search Lambda.
5. Lambda embeds the query and performs a k-NN search against OpenSearch.
6. Top-k results are returned and rendered as project cards.

---

## Security Considerations

- No secrets in source code. All secrets resolved via `{{resolve:secretsmanager:...}}` at deploy time.
- Amplify environment variables stored as SSM parameters.
- Lambda IAM roles follow least-privilege — scoped to specific Bedrock models and OpenSearch indices.
- API Gateway uses IAM auth for Lambda invocations. Public-facing endpoints are rate-limited.
- HTTPS enforced everywhere. HTTP redirects to HTTPS at CloudFront level.
- Content Security Policy headers set via Next.js middleware.

---

## Key Design Decisions

**Why AWS Amplify over Vercel?**
The primary goal of this portfolio is to demonstrate AWS expertise. Amplify provides the same developer experience as Vercel while keeping the entire stack within AWS for a cohesive infrastructure story.

**Why CDK over raw CloudFormation?**
CDK gives us TypeScript type-safety, composable L3 constructs, and a dramatically better authoring experience. The generated CloudFormation is the artifact; CDK is the tool.

**Why App Router over Pages Router?**
Next.js 15 App Router is the current standard. It provides React Server Components, streaming, and better layout composition — all relevant to a modern, performant portfolio.

**Why OpenSearch Serverless over Pinecone?**
Staying within AWS avoids a third-party dependency and demonstrates the breadth of the AWS AI ecosystem. OpenSearch Serverless has no minimum capacity commitment.
