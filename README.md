# NEXORA UI Preview

NEXORA UI Preview is a separate, clickable concept environment for reviewing product ideas and workflows. It is intended initially for the NEXORA founder and a trusted goodwill technical advisor, and may later be shown to selected prospective customers.

The current fictional advisor scenario uses a church-led multi-location network so church, outreach, and community-development workflows can be reviewed meaningfully. NEXORA is not positioned as an exclusively church-management product.

This repository is **not** the production NEXORA application. Most screens remain local clickable mockups. The internal Ask NEXORA POC is the only backend-connected exception: it uses existing authenticated NEXORA endpoints for synthetic test documents and local dummy answers. The repository contains no external AI integrations, analytics, tracking, or production data paths.

## What is included

- React, TypeScript, and Vite
- React Router with Vercel-compatible SPA routing
- A responsive desktop and mobile application shell
- A fully designed dashboard using local fictional data
- Placeholder experiences for planned product areas
- An informational “About this preview” screen
- A local-only feedback modal that does not submit or store data
- An authenticated, dummy-data-only Ask NEXORA RAG POC interface for local backend review

## Local setup

Requirements:

- Node.js 20 or later
- npm 10 or later

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Vite will print the local URL, normally `http://localhost:5173`.

The Ask NEXORA POC additionally expects the existing NEXORA backend at `http://127.0.0.1:8000`. Vite proxies local `/api` requests to that backend. The backend feature flag and authenticated synthetic test user remain authoritative; see `docs/ai/ask-nexora/ui-usage.html` for the safe local workflow.

## Development commands

```bash
# Start the development server with hot reload
npm run dev

# Run ESLint
npm run lint

# Run TypeScript checks and create a production build
npm run build

# Preview the production build locally
npm run preview
```

The TypeScript check is included in `npm run build` through `tsc -b`.

## Vercel deployment

Do not deploy production or customer data with this repository.

To deploy the preview manually:

1. Import this Git repository into Vercel.
2. Select **Vite** as the framework preset if it is not detected automatically.
3. Use `npm run build` as the build command.
4. Use `dist` as the output directory.
5. Do not add analytics, tracking, customer-data, provider-key, or external AI environment variables.
6. Deploy only after the stable preview has been reviewed.

The included `vercel.json` rewrites all application routes to `index.html`, allowing direct refreshes on routes such as `/programs` or `/about-preview`.

No deployment is performed automatically by this repository. The static Vercel preview does not provide or proxy the Ask NEXORA backend; the RAG UI is intended for a controlled local environment until an approved same-origin deployment path exists.

## Branch strategy

- `main`: stable advisor preview
- `design/*`: individual screen or workflow experiments

Create focused branches such as `design/people-directory` or `design/program-review`. Review and validate each experiment before merging it into `main`.

## Fictional data rules

All preview data must be invented, local, and safe to share with the intended review audience.

- Never add real customer, church, NGO, organisation, personal, donor, beneficiary, or operational data.
- Never add real contact details, addresses, account identifiers, sensitive notes, or precise coordinates.
- Use only fictional names and deliberately illustrative metrics.
- Keep mock data in local source files; do not fetch it from external services.
- Treat any screenshots, exports, or test fixtures as data and apply the same rules.
- Review every change for accidental sensitive information before committing.

`Horizon Church & Community Network` and all of its records are fictional. The supplied hierarchy labels are illustrative and are not connected to a real church, organisation, customer, person, or precise operational location.

## Preview limitations

- Screens may represent planned capabilities that do not exist in the production product.
- Workflow status labels are design-review aids, not delivery commitments.
- Pricing, availability, and delivery timelines are not represented.
- General preview routes do not represent production authentication or access control. The Ask NEXORA route requires an existing authenticated local backend session.
- Ask NEXORA dummy uploads and answers may be stored by the existing tenant-scoped POC backend. Other preview interactions are not submitted or persisted.
- Ask NEXORA accepts only dummy TXT, Markdown, CSV, or JSON files and rejects access when the backend feature flag or permissions deny it.
- No Ask NEXORA content is sent to an external LLM, embedding provider, vector database, analytics, telemetry, or third-party document service.
- Feedback entered in the modal is not stored and disappears when the modal is closed or the page is refreshed.
- Dashboard figures, activities, events, and outcomes are fictional.

## Routes

- `/` redirects to `/dashboard`
- `/dashboard`
- `/people`
- `/services-events`
- `/groups`
- `/volunteers`
- `/care-follow-up`
- `/outreach`
- `/calendar`
- `/locations`
- `/reports`
- `/ask-nexora` (authenticated local POC)
- `/ask-nexora/login`
- `/settings`
- `/about-preview`

Legacy `/organisations`, `/programs`, and `/maps` links redirect to the nearest current preview area.

Unknown routes show a local not-found screen with a working return link.
