# ✅ Salt & Smoke API - Setup Complete!

## 🎉 What Was Added

Your Salt & Smoke restaurant website now has a fully functional backend API! Here's what was implemented:

### Core Files Created

1. **`server.js`** (9.4 KB)
   - Express.js REST API server
   - SQLite database integration
   - CORS enabled for frontend integration
   - Input validation for all endpoints

2. **`api-client.js`** (3.5 KB)
   - Frontend JavaScript library
   - Ready-to-use functions for API calls
   - Handles all HTTP requests

3. **`API-DOCUMENTATION.md`** (8.9 KB)
   - Complete API reference
   - All endpoints with examples
   - Request/response formats
   - Validation rules

4. **`API-QUICKSTART.md`** (6.7 KB)
   - Quick start guide
   - Installation instructions
   - Usage examples
   - Troubleshooting tips

5. **`api-integration-examples.js`** (7.2 KB)
   - Code examples for frontend integration
   - Form submission handlers
   - Menu loading examples
   - Error handling patterns

6. **`test-api.sh`** (Bash script)
   - Comprehensive API test suite
   - Tests all endpoints
   - Validates error handling

7. **`.env`** (Environment configuration)
   - Port configuration (default: 5000)
   - Node environment setting

### Updated Files

- **`package.json`** - Added npm scripts and dependencies
- **`.gitignore`** - Added Node.js, database, and environment ignores

---

## 📊 Three Database Tables

### 1. Reservations
- Stores restaurant bookings
- Validates: name (2+ chars), valid email, date format, guest count (1-20)
- Auto-timestamps for tracking

### 2. Newsletter Signups
- Email subscribers with unique constraint
- Prevents duplicate subscriptions
- Subscription tracking

### 3. Menu Items
- Restaurant menu with categories
- Support for chef's pick designation
- Price and description fields
- Image URL storage

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the API Server
```bash
npm start
```

Server runs on `http://localhost:5000`

### 3. Test the API
```bash
bash test-api.sh
```

Or manually:
```bash
curl http://localhost:5000/api/health
```

---

## 📡 API Endpoints Summary

### Reservations
- `POST /api/reservations` - Create booking
- `GET /api/reservations` - List all bookings
- `GET /api/reservations/:id` - Get specific booking

### Newsletter
- `POST /api/newsletter/signup` - Subscribe
- `GET /api/newsletter/signups` - Get all subscribers

### Menu
- `GET /api/menu` - Get all items
- `GET /api/menu?category=lunch` - Filter by category
- `GET /api/menu/:id` - Get item details
- `POST /api/menu` - Create item (admin)
- `PUT /api/menu/:id` - Update item (admin)
- `DELETE /api/menu/:id` - Delete item (admin)

### Health
- `GET /api/health` - Check API status

---

## 🔗 Frontend Integration

### Option 1: Use the Provided Client Library

```javascript
import { reservationsAPI, menuAPI, newsletterAPI } from './api-client.js';

// Create a reservation
await reservationsAPI.create({
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

### Option 2: Direct Fetch Calls

```javascript
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

---

## ✨ Key Features

- ✅ **Input Validation** - All inputs validated with helpful error messages
- ✅ **CORS Enabled** - Works with your frontend on any port
- ✅ **Error Handling** - Standardized JSON error responses
- ✅ **SQLite Database** - Auto-created and initialized
- ✅ **RESTful Design** - Standard HTTP methods and status codes
- ✅ **Documentation** - Comprehensive API docs included
- ✅ **Examples** - Code examples for all use cases

---

## 📚 Documentation Files

All documentation is included in the repository:

- **API-QUICKSTART.md** - Start here for quick setup
- **API-DOCUMENTATION.md** - Complete API reference
- **api-integration-examples.js** - Code examples

---

## 🛠️ Configuration

Edit `.env` to customize:

```env
PORT=5000              # Server port
NODE_ENV=development   # Environment mode
```

---

## 🐛 Troubleshooting

### Server won't start
1. Check if port 5000 is in use
2. Try a different port in `.env`
3. Check for error messages in console

### CORS errors
- Verify `cors` is installed: `npm install cors`
- Check your frontend is on a different port

### Database issues
1. Delete `database.db`
2. Restart the server
3. Database will be recreated automatically

### API not responding
- Verify server is running: `ps aux | grep node`
- Check health endpoint: `curl http://localhost:5000/api/health`
- Review logs in console output

---

## 🎯 Next Steps

1. **Connect Your Frontend**
   - Import `api-client.js` in your existing pages
   - Update form submission handlers
   - Test with browser dev tools

2. **Populate Menu Data**
   - Use the POST `/api/menu` endpoint
   - Add categories: breakfast, lunch, dinner, drinks
   - Mark special items as chef's pick

3. **Add Error Handling**
   - Use the error response format for validation feedback
   - Show user-friendly error messages

4. **Optional Enhancements**
   - Add admin authentication
   - Send confirmation emails
   - Add payment processing
   - Create admin dashboard
   - Add review/ratings system

---

## 📦 Dependencies Installed

```json
{
  "express": "REST API framework",
  "sqlite3": "Database driver",
  "cors": "Cross-Origin Resource Sharing",
  "body-parser": "Request body parsing"
}
```

All lightweight, no heavy frameworks required.

---

## 🔐 Database Location

Database file: `database.db`

This file is:
- ✅ Auto-created on first run
- ✅ Auto-initialized with tables
- ❌ Added to `.gitignore` (not committed)
- ✅ Persists between server restarts

---

## ✅ Verification Checklist

- [x] Server runs without errors
- [x] Database initializes automatically
- [x] API responds to health checks
- [x] CORS configured
- [x] Input validation working
- [x] Error handling in place
- [x] Documentation complete
- [x] Test scripts included
- [x] Frontend examples provided
- [x] .gitignore updated

---

## 📖 Full Documentation

For complete details, see:
- **API-QUICKSTART.md** - Setup and examples
- **API-DOCUMENTATION.md** - Full API reference

---

## 🎊 You're All Set!

Your Salt & Smoke API is ready to use. Start the server with:

```bash
npm start
```

Then integrate it into your frontend and enjoy your new backend! 🍽️
