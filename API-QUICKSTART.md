# API Setup & Quick Start

## 📦 What's Included

The Salt & Smoke API now includes:

- **`server.js`** - Express API server with SQLite database
- **`api-client.js`** - Frontend client library for API calls
- **`API-DOCUMENTATION.md`** - Complete API reference
- **`.env`** - Environment configuration
- **`database.db`** - Auto-created SQLite database (on first run)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

This installs:
- `express` - REST API framework
- `sqlite3` - Database driver
- `cors` - Cross-Origin Resource Sharing
- `body-parser` - Request body parsing

### 2. Start the API Server

```bash
npm start
```

Or for development (watches for changes):

```bash
npm run dev
```

The server will start on `http://localhost:5000`:

```
🍽️  Salt & Smoke API running on http://localhost:5000
Connected to SQLite database
Database tables initialized
```

### 3. Test the API

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{"status": "API is running"}
```

## 📡 API Endpoints

### Reservations
- `POST /api/reservations` - Create a reservation
- `GET /api/reservations` - Get all reservations
- `GET /api/reservations/:id` - Get a specific reservation

### Newsletter
- `POST /api/newsletter/signup` - Subscribe to newsletter
- `GET /api/newsletter/signups` - Get all signups

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu?category=lunch` - Filter by category
- `GET /api/menu/:id` - Get a specific item
- `POST /api/menu` - Create menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item

**Full documentation:** See `API-DOCUMENTATION.md`

## 🔗 Using the API from Frontend

### Option 1: Use the provided client library

```javascript
import { reservationsAPI, menuAPI, newsletterAPI } from './api-client.js';

// Create a reservation
const result = await reservationsAPI.create({
  name: 'John Doe',
  email: 'john@example.com',
  date: '2024-12-25',
  time: '19:30',
  guests: 4,
  requests: 'Window seat'
});

// Get menu items
const menu = await menuAPI.getAll();

// Subscribe to newsletter
await newsletterAPI.signup('user@example.com');
```

### Option 2: Direct fetch calls

```javascript
// Create a reservation
fetch('http://localhost:5000/api/reservations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    date: '2024-12-25',
    time: '19:30',
    guests: 4
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

## 📊 Database

The API automatically creates `database.db` with three tables:

### Reservations
Stores booking information with validation for guest count (1-20), date format, and email.

### Newsletter Signups
Stores subscriber emails with unique constraint (no duplicates).

### Menu Items
Stores menu items with categories, prices, and chef's pick designation.

**To reset the database:**
1. Delete `database.db`
2. Restart the server

A fresh database will be created automatically.

## ⚙️ Configuration

Edit `.env` to configure:

```env
PORT=5000
NODE_ENV=development
```

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)

## 🛡️ Validation & Error Handling

The API validates all inputs:

- **Reservations**: Name length, email format, date format, guest count (1-20)
- **Newsletter**: Email format and uniqueness
- **Menu**: Name and category required

Invalid requests return clear error messages:

```json
{
  "success": false,
  "errors": ["Email must be valid", "Guests must be between 1 and 20"]
}
```

## 🔄 API Response Format

All responses follow a standard format:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* result data */ }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Specific error 1", "Specific error 2"]
}
```

## 📝 Example Requests

### Create a Reservation

```bash
curl -X POST http://localhost:5000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "date": "2024-12-25",
    "time": "19:30",
    "guests": 4,
    "requests": "Window seat"
  }'
```

### Get Menu Items

```bash
curl http://localhost:5000/api/menu

# Filter by category
curl http://localhost:5000/api/menu?category=lunch
```

### Subscribe to Newsletter

```bash
curl -X POST http://localhost:5000/api/newsletter/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "subscriber@example.com"}'
```

### Create Menu Item

```bash
curl -X POST http://localhost:5000/api/menu \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Smoked Brisket",
    "category": "lunch",
    "description": "Slow-smoked Texas-style brisket",
    "price": 24.99,
    "is_chefs_pick": true
  }'
```

## 🧪 Testing

Run the automated tests:

```bash
npm test
```

This runs Playwright tests for the frontend.

## 🚢 Deployment

To deploy the API:

1. Set environment variables on your hosting platform
2. Install dependencies: `npm install --production`
3. Start the server: `npm start`
4. Ensure CORS is configured for your frontend domain

### Popular Hosting Options
- **Heroku**: Add `Procfile` with `web: node server.js`
- **Railway**: Auto-detects Node.js, runs `npm start`
- **AWS EC2/Lightsail**: Use PM2 to manage the process
- **DigitalOcean App Platform**: Auto-deploys from GitHub

## 🐛 Troubleshooting

### Server won't start
- Check if port 5000 is already in use: `lsof -i :5000`
- Kill the process: `kill <PID>`
- Try a different port in `.env`: `PORT=3001`

### Database errors
- Delete `database.db` and restart
- Check file permissions in the project directory

### CORS errors
- Ensure `cors` package is installed: `npm install cors`
- Update CORS configuration in `server.js` if needed

### API not responding
- Check server logs: `cat server.log`
- Verify the server is running: `ps aux | grep node`
- Test health endpoint: `curl http://localhost:5000/api/health`

## 📚 Next Steps

1. **Connect Frontend:** Update `main.js` to use the API for form submissions
2. **Add Admin Panel:** Create an admin dashboard for managing menu items
3. **Authentication:** Add admin login for protected endpoints
4. **Email Notifications:** Send confirmation emails for reservations
5. **Payment Processing:** Integrate a payment gateway for deposits

## 📖 Full Documentation

See `API-DOCUMENTATION.md` for the complete API reference with all endpoints, request/response examples, and validation rules.
