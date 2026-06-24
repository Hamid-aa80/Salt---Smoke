# 🍖 Salt & Smoke

> A premium restaurant website for an upscale smokehouse dining concept in Watford, combining elegant design with a fully-functional backend API.

![Salt & Smoke homepage](README-img/Home-page.png)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Environment Configuration](#environment-configuration)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Salt & Smoke** is a modern, full-stack restaurant management website that showcases:
- A responsive, beautifully designed frontend for customers
- A robust Express.js + SQLite backend API for business operations
- Complete reservation system with email notifications
- Dynamic menu management
- Newsletter subscription system
- Comprehensive automated testing

The website provides an exceptional user experience across all devices (mobile, tablet, desktop) with smooth animations, accessibility features, and intuitive navigation.

---

## 🌐 Live Demo

- **Live Website:** https://hamid-aa80.github.io/Salt---Smoke/
- **GitHub Repository:** https://github.com/Hamid-aa80/Salt---Smoke

---

## ✨ Features

### 🎨 Frontend Features
- **Responsive Design** - Fully responsive across all device sizes
- **Single-Page Application** - Smooth navigation with no page reloads
- **Menu System** - Browse and filter dishes with advanced search functionality
- **Chef's Pick** - Dynamic daily specials rotation
- **Reservation Booking** - Complete reservation system with form validation
- **Newsletter Signup** - Customer email subscription with validation
- **Smooth Animations** - WOW.js animations with reduced-motion support
- **Sticky Header** - Navigation remains accessible while scrolling
- **Back-to-Top Button** - Quick scroll to top functionality
- **Form Draft Persistence** - Automatically save reservation form progress
- **Accessibility** - WCAG compliant with improved accessibility messaging

### 🔧 Backend Features
- **RESTful API** - Well-structured, documented endpoints
- **Reservation Management** - Create, retrieve, and manage reservations
- **Newsletter System** - Manage subscriber database
- **Menu CRUD Operations** - Create, read, update, and delete menu items
- **Input Validation** - Comprehensive server-side validation
- **Error Handling** - Consistent JSON error responses
- **CORS Support** - Secure cross-origin requests
- **SQLite Database** - Lightweight, reliable data persistence
- **Environment Configuration** - Easy deployment configuration

### 🧪 Testing & Quality
- **Automated Testing** - Playwright end-to-end tests
- **Happy Path Tests** - Reservation and newsletter workflows
- **Validation Tests** - Form validation and error handling
- **UI Tests** - Navigation and menu behavior
- **Accessibility Tests** - Contrast and HTML validation
- **Link Health Checks** - Verify all internal links

---

## 💻 Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript ES Modules** - Modern ES6+ JavaScript
- **Bootstrap 5.3** - Responsive UI framework
- **Font Awesome 6** - Icon library
- **Google Fonts (Pacifico)** - Custom typography
- **WOW.js** - Scroll animation library
- **jQuery** - DOM manipulation

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.2** - Web application framework
- **SQLite3** - Lightweight database
- **CORS** - Cross-origin resource sharing
- **body-parser** - Request body parsing
- **dotenv** - Environment variable management

### Development & Testing
- **Playwright** - End-to-end testing framework
- **npm** - Package management

---

## 📁 Project Structure

```
Salt---Smoke/
├── index.html                    # Main website page
├── submit.html                   # Reservation confirmation page
├── style.css                     # Primary stylesheet
├── main.js                       # Frontend interaction logic
├── server.js                     # Express API server & DB setup
├── api-client.js                 # Browser-side API helpers
├── api-integration-examples.js   # API usage examples
├── playwright.config.ts          # Testing configuration
├── test-api.sh                   # API testing script
├── package.json                  # Dependencies & scripts
├── .env                          # Environment variables (local)
├── .gitignore                    # Git ignore rules
├── database.db                   # SQLite database
├── assets/
│   └── img/                      # Favicon and images
├── README-img/                   # Screenshot images for documentation
├── tests/
│   └── site.spec.ts             # Playwright test suite
├── API-DOCUMENTATION.md          # Complete API reference
├── API-QUICKSTART.md            # Quick API setup guide
├── API-SETUP-COMPLETE.md        # Setup completion checklist
└── DEPLOYMENT.md                # Deployment instructions
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **Git**
- **Python 3** (for local static server - optional)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/Hamid-aa80/Salt---Smoke.git
cd Salt---Smoke
```

#### 2. Install Dependencies
```bash
npm install
```

This will install:
- `express` - Web server framework
- `sqlite3` - Database driver
- `cors` - Cross-origin resource sharing
- `body-parser` - Request parsing
- `dotenv` - Environment variable loader
- `@playwright/test` - Testing framework

---

## ▶️ Running the Application

### Option 1: Full Stack (Recommended for Development)

#### Terminal 1 - Start the Backend API:
```bash
npm start
```
This starts the Express server on `http://localhost:5000`

The API server will:
- Initialize the SQLite database
- Create necessary tables
- Set up all endpoints
- Log "Connected to SQLite database"

#### Terminal 2 - Start the Frontend (Static Server):
```bash
python3 -m http.server 4173
```
Then open `http://127.0.0.1:4173` in your browser

### Option 2: Frontend Only
Open `index.html` directly in your browser:
```bash
open index.html
```
*Note: API features will not work without the backend running*

---

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Health Check
```http
GET /api/health
```
**Response:**
```json
{ "status": "OK" }
```

### Reservations

#### Create Reservation
```http
POST /api/reservations
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "date": "2024-07-15",
  "time": "19:30",
  "guests": 4,
  "requests": "Window seat if available"
}
```

#### Get All Reservations
```http
GET /api/reservations
```

#### Get Specific Reservation
```http
GET /api/reservations/:id
```

### Newsletter

#### Subscribe to Newsletter
```http
POST /api/newsletter/signup
Content-Type: application/json

{
  "email": "subscriber@example.com",
  "name": "Jane Doe"
}
```

#### Get All Newsletter Signups
```http
GET /api/newsletter/signups
```

### Menu Management

#### Create Menu Item
```http
POST /api/menu
Content-Type: application/json

{
  "name": "Smoked Brisket",
  "category": "Mains",
  "price": 24.99,
  "description": "Slow-smoked beef brisket"
}
```

#### Get All Menu Items
```http
GET /api/menu
```

#### Get Specific Menu Item
```http
GET /api/menu/:id
```

#### Update Menu Item
```http
PUT /api/menu/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 25.99
}
```

#### Delete Menu Item
```http
DELETE /api/menu/:id
```

For detailed examples and request/response payloads, see:
- `API-DOCUMENTATION.md` - Complete API reference
- `API-QUICKSTART.md` - Quick setup examples

---

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Test Coverage
The Playwright test suite (`tests/site.spec.ts`) covers:

✅ **Happy Path Tests**
- Reservation form submission and success
- Newsletter signup validation and confirmation
- Menu filtering and search functionality

✅ **Validation Tests**
- Invalid reservation data handling
- Error message display
- Form validation feedback

✅ **UI/UX Tests**
- Mobile navigation behavior
- Menu category filtering
- Smooth scrolling functionality
- Back-to-top button

✅ **Quality Assurance Tests**
- All internal links are reachable
- No console errors on page load
- Accessibility contrast compliance
- HTML validation (W3C)
- CSS validation (W3C)

### Custom Test Script
```bash
bash test-api.sh
```
This tests all API endpoints directly.

---

## 📸 Screenshots

### Homepage
![Salt & Smoke Homepage](README-img/Home-page.png)
*Stunning hero section with call-to-action*

### About Section
![About Page](README-img/About-page.png)
*Restaurant story and values*

### About Section (Continued)
![About Page 2](README-img/About2-page.png)
*Detailed restaurant information*

### Contact Section
![Contact Page](README-img/Contact-page.png)
*Contact form and information*

### Responsive Design - Desktop
![Desktop View](README-img/Home-desktop.png)
*Full desktop layout*

### Responsive Design - Tablet
![Tablet View](README-img/Home-tablet.png)
*Optimized tablet experience*

### Responsive Design - Mobile
![Mobile View](README-img/Homepage-mobile.png)
*Mobile-first responsive design*

### Gallery Section - Desktop
![Gallery Desktop](README-img/Gallery-desktop.png)

### Gallery Section - Tablet
![Gallery Tablet](README-img/Gallery-tablet.png)

### Gallery Section - Mobile
![Gallery Mobile](README-img/Gallery-mobile.png)

### About - Desktop View
![About Desktop](README-img/About-desktop.png)

### About - Tablet View
![About Tablet](README-img/About-tablet.png)

### About - Mobile View
![About Mobile](README-img/About-mobile.png)

### Validation & Quality Assurance
![HTML Validation](README-img/HTML-Test-Validate-by-URI.png)
*W3C HTML Validation - Valid markup*

![CSS Validation](README-img/CSS-Test-Validate-by-URI.png)
*W3C CSS Validation - Valid styles*

![Contrast Testing](README-img/Contrast-primary.png)
*WCAG Contrast Compliance*

---

## 🌍 Deployment

### Frontend Deployment (GitHub Pages)

The frontend is automatically deployed to GitHub Pages from the `main` branch:
```
https://hamid-aa80.github.io/Salt---Smoke/
```

To deploy:
1. Push changes to the `main` branch
2. GitHub Pages automatically rebuilds and deploys

### Backend Deployment

Deploy the Node.js server to:
- **Railway** (recommended)
- **Render**
- **Heroku**
- **DigitalOcean**
- **AWS EC2**
- **Any VPS**

#### General Deployment Steps:
1. Push your code to GitHub
2. Connect your hosting provider to the repository
3. Set environment variables (PORT, NODE_ENV)
4. Deploy with: `npm install && npm start`

#### Example: Railway Deployment
1. Create account at [Railway.app](https://railway.app)
2. Connect GitHub repository
3. Set `PORT=5000` environment variable
4. Deploy

For detailed deployment instructions, see `DEPLOYMENT.md`.

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Optional: Database configuration
DATABASE_PATH=./database.db
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 5000 | API server port |
| `NODE_ENV` | development | Environment (development/production) |
| `DATABASE_PATH` | ./database.db | SQLite database location |

---

## 📝 Available npm Scripts

```bash
# Start the API server
npm start

# Start development server (same as start)
npm run dev

# Run automated tests
npm test
```

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Guidelines
- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📄 License

This project is open source and available under the MIT License.

---

## 📞 Support

For issues, questions, or suggestions:
- **GitHub Issues:** [Open an issue](https://github.com/Hamid-aa80/Salt---Smoke/issues)
- **Repository:** https://github.com/Hamid-aa80/Salt---Smoke

---

## 🎉 Acknowledgments

- **Bootstrap 5.3** - Responsive framework
- **Font Awesome** - Icon library
- **WOW.js** - Scroll animations
- **Playwright** - Testing framework
- **Express.js** - Web framework
- **SQLite** - Database

---

**Made with ❤️ by Hamid**

Last Updated: June 24, 2024
