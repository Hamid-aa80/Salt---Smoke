# Salt & Smoke

Salt & Smoke is a responsive restaurant website and portfolio project focused on a premium smokehouse dining experience.

![Homepage](README-img/Home-page.png)

## Table of Contents

- [About the Website](#about-the-website)
- [UX](#ux)
- [User Stories](#user-stories)
- [Acceptance Criteria](#acceptance-criteria)
- [Development Tasks](#development-tasks)
- [Research Before Starting Wireframe Mock-ups](#research-before-starting-wireframe-mock-ups)
- [Wireframe Mock-ups](#wireframe-mock-ups)
- [Features](#features)
- [Typography and Colour Palette](#typography-and-colour-palette)
- [Technologies Used](#technologies-used)
- [Testing](#testing)
- [Manual Testing](#manual-testing)
- [Technologies Used for Testing](#technologies-used-for-testing)
- [Lighthouse for Mobile and Desktop](#lighthouse-for-mobile-and-desktop)
- [W3C HTML Validation](#w3c-html-validation)
- [W3C CSS Validation](#w3c-css-validation)
- [Deployment](#deployment)
- [Credits](#credits)
- [Content](#content)
- [Media](#media)
- [Code](#code)
- [Disclaimer](#disclaimer)
- [Author](#author)

---

## About the Website

Salt & Smoke presents a modern restaurant brand online, with clear navigation, strong visual identity, reservation flow, menu exploration, newsletter signup, and guest feedback interactions.

![Service section](README-img/Service-page.png)

---

## UX

The UX approach is built around quick decision-making: discover dishes, trust the brand, and book a table with minimal friction across mobile, tablet, and desktop.

![Mobile UX view](README-img/Homepage-mobile.png)

---

## User Stories

| ID | Priority | User story |
|---|---|---|
| US-01 | Must | As a first-time visitor, I want to understand the restaurant concept quickly so I can decide whether to book. |
| US-02 | Must | As a hungry visitor, I want to search and filter the menu so I can find dishes quickly. |
| US-03 | Must | As a customer, I want to book a table with clear validation and feedback so I know my request is submitted correctly. |
| US-04 | Should | As a returning visitor, I want reservation draft data to persist so I do not lose progress. |
| US-05 | Must | As a subscriber, I want newsletter validation feedback so I can correct mistakes immediately. |
| US-06 | Should | As a guest, I want to submit feedback with an image so I can share my experience. |
| US-07 | Must | As a mobile user, I want the navbar to be fully usable so I can navigate all sections easily. |

![About section](README-img/About-page.png)

---

## Acceptance Criteria

| ID | Related stories | Acceptance criteria |
|---|---|---|
| AC-01 | US-01 | The homepage clearly communicates the Salt & Smoke brand and service proposition above the fold. |
| AC-02 | US-07 | On mobile, the navbar opens, navigates to anchors, and collapses correctly after navigation. |
| AC-03 | US-02 | Menu search filters visible items in real time and updates visible count correctly. |
| AC-04 | US-02 | Menu category chips filter items correctly and clear reset restores all items. |
| AC-05 | US-03 | Reservation form blocks invalid submission and shows specific error feedback. |
| AC-06 | US-03 | Valid reservation submission reaches confirmation flow with success messaging. |
| AC-07 | US-04 | Reservation draft values persist through reload and restore correctly. |
| AC-08 | US-05 | Newsletter input validates required/format rules and displays corrective feedback. |
| AC-09 | US-05 | Duplicate newsletter submission returns clear informational feedback. |
| AC-10 | US-06 | Feedback form enforces message/image rules and shows success confirmation after valid submission. |

![Navbar](README-img/Navbar.png)

---

## Development Tasks

| Task ID | Task | Related AC | Status |
|---|---|---|---|
| DT-01 | Build responsive semantic page structure and section navigation | AC-01, AC-02 | Complete |
| DT-02 | Implement interactive menu search, category chips, and reset behavior | AC-03, AC-04 | Complete |
| DT-03 | Implement reservation validation, confirmation flow, and draft persistence | AC-05, AC-06, AC-07 | Complete |
| DT-04 | Implement newsletter validation and duplicate-subscription feedback | AC-08, AC-09 | Complete |
| DT-05 | Implement feedback form validation and success flow | AC-10 | Complete |
| DT-06 | Extend Playwright regression coverage for UX-critical flows | AC-02 to AC-10 | Complete |

![Reservation page](README-img/Reservation-Page.png)

---

## Research Before Starting Wireframe Mock-ups

Before wireframing, research focused on:

- Restaurant landing-page patterns and CTA placement.
- Mobile-first interaction priorities.
- Visual hierarchy for menu-heavy hospitality pages.
- Color/contrast standards for accessibility.

This informed layout flow: Hero -> Value/Service -> Menu -> Reservation -> Team -> Footer conversion blocks.

![Research reference](README-img/Read-More-Page.png)

---

## Wireframe Mock-ups

Wireframe thinking translated into structured responsive sections for desktop, tablet, and mobile breakpoints.

![Desktop wireframe direction](README-img/Home-desktop.png)
![Tablet wireframe direction](README-img/Home-tablet.png)
![Mobile wireframe direction](README-img/Homepage-mobile.png)

---

## Features

- Responsive Bootstrap-based layout
- Sticky navigation + smooth anchor scrolling
- Mobile navbar behavior with collapse support
- Dynamic menu spotlight
- Menu search and category filtering
- Reservation form validation + draft persistence
- Newsletter validation + user feedback alerts
- Guest feedback submission with image preview and gallery wall
- Back-to-top control and reduced-motion support

![Menu page](README-img/Menu-page.png)

---

## Typography and Colour Palette

- Primary display style: Pacifico + Bootstrap typography system
- Brand colors:
  - Primary: `#fea116`
  - Dark: `#0f1728`
  - Light: `#f1f8ff`

![Colour palette](README-img/color-scheme.svg)

---

## Technologies Used

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

![Tech section visual](README-img/GitHub-clone.png)

---

## Testing

Automated end-to-end tests are implemented with Playwright and executed via:

```bash
npm test
```

### Acceptance Criteria Traceability Matrix (Automated)

| AC ID | Playwright test evidence (`tests/site.spec.ts`) | Result |
|---|---|---|
| AC-02 | `stays responsive on mobile and keeps navigation usable` | Pass |
| AC-03 | `searches menu items by name` | Pass |
| AC-04 | `filters menu items by category and can clear filters` | Pass |
| AC-05 | `rejects invalid reservation input with clear feedback` | Pass |
| AC-06 | `handles valid reservation and newsletter input` (reservation portion) | Pass |
| AC-07 | `restores reservation draft after reload (bug-fix regression)` | Pass |
| AC-08 | `rejects invalid newsletter input with clear feedback` | Pass |
| AC-09 | `handles duplicate newsletter subscription without errors (bug-fix regression)` | Pass |
| AC-10 | `rejects invalid feedback input with clear feedback` + `handles valid reservation and newsletter input` (feedback portion) | Pass |

Runtime quality guardrails are also enforced by test hooks that fail on uncaught browser `pageerror` or unexpected console errors.

![Testing area](README-img/Contact-page.png)

---

## Manual Testing

Manual checks were executed across mobile/tablet/desktop to complement automated coverage.

| Check ID | Scenario | Related AC | Result |
|---|---|---|---|
| MT-01 | Verify all navbar/footer anchor links navigate to valid sections | AC-01, AC-02 | Pass |
| MT-02 | Verify menu search and category chips in combination | AC-03, AC-04 | Pass |
| MT-03 | Verify reservation errors for empty/invalid/too-short values | AC-05 | Pass |
| MT-04 | Verify reservation success path and submit page confirmation text | AC-06 | Pass |
| MT-05 | Verify reservation draft restore after refresh | AC-07 | Pass |
| MT-06 | Verify newsletter required/format/length messages and success message | AC-08 | Pass |
| MT-07 | Verify duplicate newsletter info feedback | AC-09 | Pass |
| MT-08 | Verify feedback form invalid and valid image/message paths | AC-10 | Pass |
| MT-09 | Verify footer CTAs (`Book now`, `Call us`) on mobile and desktop | AC-01, AC-02 | Pass |

![Manual responsive check](README-img/Services-mobile.png)

---

## Technologies Used for Testing

- Playwright (`@playwright/test`)
- Browser DevTools responsive mode
- W3C Validators (HTML + CSS)
- Lighthouse / PageSpeed Insights

![Testing tools visual](README-img/PageSpeed-Insights.jpg)

---

## Lighthouse for Mobile and Desktop

Performance and quality were reviewed with Lighthouse/PageSpeed for both mobile and desktop perspectives.

![Lighthouse desktop](README-img/Lighthouse-test-desktop.jpg)
![PageSpeed mobile/desktop overview](README-img/PageSpeed-Insights.jpg)

---

## W3C HTML Validation

HTML markup was validated with the W3C HTML Validator.

![W3C HTML validation](README-img/HTML-Test-Validate-by-URI.png)

---

## W3C CSS Validation

CSS was validated with the W3C CSS Validator.

![W3C CSS validation](README-img/CSS-Test-Validate-by-URI.png)

---

## Deployment

Frontend is deployed via GitHub Pages:

- https://hamid-aa80.github.io/Salt---Smoke/

Project repository:

- https://github.com/Hamid-aa80/Salt---Smoke

![Deployment reference](README-img/GitHub-clone.png)

---

## Credits

- Bootstrap
- Font Awesome
- Google Fonts
- WOW.js
- Express
- SQLite
- Playwright

![Credits visual](README-img/About2-page.png)

---

## Content

All textual content was written/adapted for the Salt & Smoke smokehouse concept to match brand tone and user goals.

![Content section image](README-img/About-desktop.png)

---

## Media

Images used in this project are stored in:

- `assets/img/`
- `README-img/`

Media supports responsive presentation and documentation evidence.

![Media example](README-img/Gallery-desktop.png)

---

## Code

Primary project files:

- `index.html`, `submit.html`
- `style.css`
- `main.js`
- `server.js`
- `tests/site.spec.ts`

![Code section visual](README-img/Services-desktop.png)

---

## Disclaimer

This project is created for educational and portfolio purposes. Brand, content, and imagery are used as part of a demonstration build and may require licensing/permission checks before commercial use.

![Disclaimer visual](README-img/dark.png)

---

## Author

Built by Hamid.
