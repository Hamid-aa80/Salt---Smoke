# Salt & Smoke

Salt & Smoke is a responsive restaurant website for a smokehouse concept, with polished frontend interactions and an Express + SQLite API included in the same repository.

![Salt & Smoke homepage](README-img/Home-page.png)

## Live links

- Frontend (GitHub Pages): https://hamid-aa80.github.io/Salt---Smoke/
- Repository: https://github.com/Hamid-aa80/Salt---Smoke

## What this project includes

### Frontend experience (`index.html`, `main.js`, `style.css`)

- Responsive layout for mobile, tablet, and desktop
- Bootstrap navbar with tested mobile collapse behavior
- Menu interactions:
  - live text search
  - category filter chips
  - clear-filters action
  - dynamic visible/total dish counts
  - empty-state messaging
  - daily "Chef's pick" spotlight
- Reservation form:
  - client-side validation
  - draft persistence in `localStorage`
  - confirmation handoff to `submit.html` via `sessionStorage`
  - clear inline feedback/error messaging
- Newsletter form:
  - email validation (format, length constraints)
  - duplicate-subscription handling
  - user feedback for success and validation/storage failures
- Guest feedback form:
  - message + image validation
  - image preview
  - local "photo wall" with previous/next navigation
- Accessibility-minded alert messaging and reduced-motion handling

### API server (`server.js`)

Express API with SQLite persistence for:

- reservations
- newsletter signups
- menu CRUD
- health checks

Base URL (local): `http://localhost:5000/api`

## Tech stack

- HTML5, CSS3, JavaScript (ES modules)
- Bootstrap 5.3, Font Awesome
- Node.js, Express 5, SQLite3
- Playwright for end-to-end tests

## Project structure

```text
Salt---Smoke/
├── index.html
├── submit.html
├── main.js
├── style.css
├── server.js
├── api-client.js
├── tests/site.spec.ts
├── playwright.config.ts
├── package.json
├── database.db
├── assets/
└── README-img/
```

## Getting started

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Install dependencies

```bash
npm install
```

### Run the API

```bash
npm start
```

Server runs on `http://localhost:5000` by default.

### Run the frontend locally

Use any static file server from the repository root. Example:

```bash
python3 -m http.server 4173
```

Then open: `http://127.0.0.1:4173`

## Available scripts

```bash
npm start   # Start API server
npm run dev # Alias of start
npm test    # Run Playwright tests
```

## API endpoints (summary)

### Health
- `GET /api/health`

### Reservations
- `POST /api/reservations`
- `GET /api/reservations`
- `GET /api/reservations/:id`

### Newsletter
- `POST /api/newsletter/signup`
- `GET /api/newsletter/signups`

### Menu
- `POST /api/menu`
- `GET /api/menu`
- `GET /api/menu/:id`
- `PUT /api/menu/:id`
- `DELETE /api/menu/:id`

For full API details, see:

- `API-DOCUMENTATION.md`
- `API-QUICKSTART.md`

## Testing

Run the full E2E suite:

```bash
npm test
```

The test suite validates key user journeys including mobile navigation, reservation/newsletter/feedback validation, menu filtering/search, responsiveness, and regression checks.

## Notes

- Frontend interactive forms currently persist data in browser storage for UX continuity.
- API persistence uses SQLite (`database.db`) and is available for integration/deployment workflows.

## Author

Built by Hamid.
