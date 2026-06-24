# Salt & Smoke

Salt & Smoke is an interactive restaurant web application built as a portfolio project. It helps users browse dishes, book a table, subscribe to updates, and submit feedback in a fast, mobile-friendly experience.

## Live links

- **Live site:** https://hamid-aa80.github.io/Salt---Smoke/
- **Repository:** https://github.com/Hamid-aa80/Salt---Smoke

## PROJECT purpose

## target audience

## User goals


## Business and site owner goals


## User stories

## features


## Future Features

## Wireframes

### Wireframe screenshots

### Mobile Device

![Homepage mobile](README-img/Homepage-mobile.png)
![About mobile](README-img/About-mobile.png)
![Services mobile](README-img/Services-mobile.png)
![Gallery mobile](README-img/Gallery-mobile.png)

### Tablet Device

![Home tablet](README-img/Home-tablet.png)
![About tablet](README-img/About-tablet.png)
![Services tablet](README-img/Services-tablet.png)
![Gallery tablet](README-img/Gallery-tablet.png)

### Desktop Device

![Home desktop](README-img/Home-desktop.png)
![About desktop](README-img/About-desktop.png)
![Services desktop](README-img/Services-desktop.png)
![Gallery desktop](README-img/Gallery-desktop.png)


## Color Scheme

- #fea116 ![primary ](README-img/primary.png)

- #f1f8ff ![light](README-img/light.png)

- #0f1728 ![dark](README-img/dark.png)

## Contrast Checker

![primary](README-img/Contrast-primary.png)


## Technologies Used

- HTML
- CSS
- Visual Code
- Bootstrap V5
- Google Fonts
- Github
- Figma for wireframes
- Adobe Firefly to generate photos
- Adobe Express to resize images
- FontAwesome
- Favicon
- Contrast Checker
- TinyPNG to convert images to webp

## TESTING

### Manual Testing

#### Functionality

| Test                         | Test Action                                                                                           | Excepted results                                                       | Test results |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------ |
| Enquiry form                 | Test navigation to enquiry form                                                                       | Navigation to enquiry form was easily accessible and easy to find      | PASS         |
| Test the enquiry form        | Does the enquiry form have the right fields for the correct data to be collected for new clients      | The enquiry form has the correct fields such as Name, Email, Phone etc | PASS         |
| Fill out enquiry form        | Fill out enquiry form, does it display a succes message or page                                       | Directed to a success page                                             | PASS         |
| Return button (success page) | Does the return button work on the success page properly                                              | The return button directs you back to the home page                    | PASS         |
| Navigation                   | Test the navigation back and forth from page to page. For example - home to gallery, home to projects | Navigation works correctly                                             | PASS         |

### W3C HTML Test

![Manual testing screenshot HTML](README-img/HTML-Test-Validate-by-URI.png)

### W3C CSS Test

![Manual testing screenshot CSS](README-img/CSS-Test-Validate-by-URI.png)

My project was deployed using Github:

1. My project was pushed to Github

2. Repository settings was selected

3. Pages section was selected

4. The main branch was chosen as the deployment source

5. Github generated the live site URL

### Lighthouse

#### (index.html) - Desktop

![Lighthouse test index.html](README-img/Lighthouse-test-desktop.jpg)

#### (index.html) - Mobile

![PageSpeed Insights](README-img/PageSpeed-Insights.jpg)

## SCREENSHOTS

### Navbar

![Navbar](README-img/Navbar.png)

### Homepage

![Home page](README-img/Home-page.png)

### About page

![About page](README-img/About-page.png)
![About page2](README-img/About2-page.png)

### Menu Page

![Menu page](README-img/Menu-page.png.png)

### ReadMore Page

![ReadMore page](README-img/Read-More-Page.png)

### Reservation Page

![Reservation page](README-img/Reservation-Page.png)

### Contact page

![Contact page](README-img/Contact-page.png)

## Deployment

This project was developed using [VScode](https://code.visualstudio.com/), commited to git and pushed to GitHub using the built in function within VScode.

This site is hosted using GitHub pages, deployed directly from the master branch. The deployed site will update automatically upon new commits to the master branch. In order for the site to deploy correctly on GitHub pages, the landing page must be named index.html.

These are the steps that can be taken to deploy the page on GitHub pages from it's [GitHub repository](https://hamid-aa80.github.io/Salt---Smoke/):

1. Log into GitHub. 
2. From the list of repositories on the screen, select [https://hamid-aa80.github.io/Salt---Smoke/] 
3. From the menu items near the top of the page, select Settings. 
4. Scroll down to the GitHub Pages section. 
5. Under Source the drop-down menu should display Deploy from a branch 
6. On selecting Main Branch the page is automatically refreshed, the website is now deployed. 
7. Scroll back up to the GitHub Pages section to retrieve the link to the deployed website.


The deployed site can also be found on the repository page on the right handside under Deployments.

To run locally, you can clone this repository directly into the editor of your choice by pasting git clone into your terminal. This can be found on the main repository page, clicking the code button and copy to cut ties with this GitHub repository, type git remote rm origin into the terminal.

![GitHUb clone](README-img/GitHub-clone.png)

## Credits

### Content 
- The welcome paragraph on the homepage.
- The testimonials on the Reviewing. 
- products on the products page with discount.

### Code
 - Custom CSS code was written by me.
 - Some HTML was imported directly from Bootstrap V5.3 
 - Grid systems 
 - rows, columns and cards. Navigation bar.

 ### Media and Photos 
 - All media and photos used by Google.

## Purpose and value

This application is built to deliver practical value to users:

- **Fast reservations:** clear form validation and confirmation flow.
- **Quick menu discovery:** searchable and filterable menu items.
- **Simple communication:** newsletter sign-up with immediate feedback.
- **Ongoing engagement:** feedback submission with optional image upload.



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
