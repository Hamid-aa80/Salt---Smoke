# Salt & Smoke

Salt & Smoke is an interactive restaurant web application built as a portfolio project. It helps users browse dishes, book a table, subscribe to updates, and submit feedback in a fast, mobile-friendly experience.

## Purpose and value

This application is built to deliver practical value to users:

- **Fast reservations:** clear form validation and confirmation flow.
- **Quick menu discovery:** searchable and filterable menu items.
- **Simple communication:** newsletter sign-up with immediate feedback.
- **Ongoing engagement:** feedback submission with optional image upload.

## Live links

- **Live site:** https://hamid-aa80.github.io/Salt---Smoke/
- **Repository:** https://github.com/Hamid-aa80/Salt---Smoke

## Features

- Responsive frontend (`index.html`, `style.css`, `main.js`)
- Sticky navbar with active section behavior
- Menu search + category filters + reset state
- Reservation form validation and success handling
- Newsletter validation and duplicate-subscription handling
- Feedback form with image constraints and preview
- Local API with Express + SQLite (`server.js`)
  - `POST /api/reservations`, `GET /api/reservations`, `GET /api/reservations/:id`
  - `POST /api/newsletter/signup`, `GET /api/newsletter/signups`
  - `POST /api/menu`, `GET /api/menu`, `GET /api/menu/:id`, `PUT /api/menu/:id`, `DELETE /api/menu/:id`
  - `GET /api/health`, `GET /api/docs`

## Development cycle (documented with commit evidence)

The project was developed iteratively:

1. **Foundation and UI structure**  
   Built responsive layout and navigation behavior.
2. **Interactive user journeys**  
   Added menu filtering/search, reservation flow, newsletter, and feedback features.
3. **Validation and UX hardening**  
   Strengthened input validation, messaging, and accessibility details.
4. **Automated regression checks**  
   Expanded Playwright tests for critical user flows.
5. **Documentation and repository hygiene**  
   Improved README/API docs and removed generated artifacts from source control.

### Commit-message evidence

| Commit | Message | What it evidences |
|---|---|---|
| `2021e05` | `feat: add API docs route and clean generated artifacts` | API maintenance and repository cleanup |
| `1d11a16` | `feat: enhance README for clarity, structure, and comprehensive assessment mapping` | Documentation improvement |
| `936b4b4` | `feat(tests): enhance test coverage with improved validation and responsiveness checks` | Test coverage growth |
| `0faa2b5` | `feat: enhance newsletter email validation with length checks and error messaging` | Validation refinement |
| `901a40b` | `feat: implement menu category filters with reset functionality and update filter status display` | Interactive menu delivery |
| `cc5b2cc` | `feat: implement guest feedback wall with image support and time formatting` | Feedback feature implementation |

## Code separation and external-source attribution

### Custom project code

The following files are written for this interactive application:

- `index.html`
- `submit.html`
- `style.css`
- `main.js`
- `server.js`
- `api-client.js`
- `api-integration-examples.js`
- `tests/site.spec.ts`

### External libraries and sources

The project uses these external dependencies:

- Bootstrap 5.3
- Font Awesome
- Google Fonts (Pacifico)
- WOW.js
- Express
- SQLite3
- Playwright

Attribution is applied in two places:

1. **In code comments:** `index.html` now includes comments above external CDN includes and WOW.js initialization.
2. **In this README:** this section explicitly lists all external dependencies.

## Technologies

### Frontend

- HTML5
- CSS3
- JavaScript (ES modules)
- Bootstrap 5.3
- Font Awesome

### Backend/API

- Node.js
- Express 5
- SQLite3
- body-parser
- cors
- dotenv

### Testing

- Playwright (`@playwright/test`)

## Installation and usage

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run API

```bash
npm start
```

API base URL:

- `http://localhost:5000/api`

Health and docs:

- `http://localhost:5000/api/health`
- `http://localhost:5000/api/docs`

### Run tests

```bash
npm test
```

## Project structure

```text
index.html
submit.html
style.css
main.js
server.js
api-client.js
api-integration-examples.js
tests/
assets/
README-img/
```

## Deployment

Frontend deployment is on GitHub Pages:

- https://hamid-aa80.github.io/Salt---Smoke/

## Disclaimer

This is a portfolio/educational project.

## Author

Built by Hamid.
