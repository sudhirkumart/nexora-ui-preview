# NEXORA UI Preview

NEXORA UI Preview is a separate, clickable concept environment for reviewing product ideas and workflows. It is intended initially for the NEXORA founder and a trusted goodwill technical advisor, and may later be shown to selected prospective customers.

This repository is **not** the production NEXORA application. It contains no backend, authentication, live integrations, analytics, tracking, or persistent data submission.

## What is included

- React, TypeScript, and Vite
- React Router with Vercel-compatible SPA routing
- A responsive desktop and mobile application shell
- A fully designed dashboard using local fictional data
- Placeholder experiences for planned product areas
- An informational “About this preview” screen
- A local-only feedback modal that does not submit or store data

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
5. Do not add backend, analytics, tracking, or customer-data environment variables.
6. Deploy only after the stable preview has been reviewed.

The included `vercel.json` rewrites all application routes to `index.html`, allowing direct refreshes on routes such as `/programs` or `/about-preview`.

No deployment is performed automatically by this repository.

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

`Horizon Community Network` and its records are fictional. The hierarchy labels supplied for this concept are illustrative and are not connected to a real organisation or real operational locations.

## Preview limitations

- Screens may represent planned capabilities that do not exist in the production product.
- Workflow status labels are design-review aids, not delivery commitments.
- Pricing, availability, and delivery timelines are not represented.
- No authentication or access control is implemented.
- No data is submitted, persisted, synchronised, or shared externally.
- Feedback entered in the modal is not stored and disappears when the modal is closed or the page is refreshed.
- Dashboard figures, activities, events, and outcomes are fictional.

## Routes

- `/` redirects to `/dashboard`
- `/dashboard`
- `/organisations`
- `/people`
- `/programs`
- `/outreach`
- `/maps`
- `/reports`
- `/settings`
- `/about-preview`

Unknown routes show a local not-found screen with a working return link.
