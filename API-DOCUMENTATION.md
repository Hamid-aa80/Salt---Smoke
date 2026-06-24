# Salt & Smoke API Documentation

## Overview

The Salt & Smoke API is a backend service for managing reservations, newsletter signups, and menu items for the Salt & Smoke restaurant.

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Health Check

**GET** `/api/health`

Check if the API is running.

**Response:**
```json
{
  "status": "API is running"
}
```

---

## Reservations

### Create Reservation

**POST** `/api/reservations`

Create a new reservation.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "date": "2024-12-25",
  "time": "19:30",
  "guests": 4,
  "requests": "Window seat, celebration for anniversary"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Reservation created successfully",
  "reservationId": 1
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "errors": ["Invalid email format", "Guests must be between 1 and 20"]
}
```

**Validation Rules:**
- `name`: Required, minimum 2 characters
- `email`: Required, valid email format
- `date`: Required, ISO date format (YYYY-MM-DD)
- `time`: Required, HH:MM format
- `guests`: Required, integer between 1 and 20
- `requests`: Optional, special dining requests

---

### Get All Reservations

**GET** `/api/reservations`

Retrieve all reservations (newest first).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "date": "2024-12-25",
      "time": "19:30",
      "guests": 4,
      "requests": "Window seat, celebration for anniversary",
      "created_at": "2024-12-01T10:30:00Z",
      "status": "confirmed"
    }
  ]
}
```

---

### Get Reservation by ID

**GET** `/api/reservations/:id`

Retrieve a specific reservation.

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "date": "2024-12-25",
    "time": "19:30",
    "guests": 4,
    "requests": "Window seat",
    "created_at": "2024-12-01T10:30:00Z",
    "status": "confirmed"
  }
}
```

**Response (Error - 404):**
```json
{
  "success": false,
  "message": "Reservation not found"
}
```

---

## Newsletter

### Subscribe to Newsletter

**POST** `/api/newsletter/signup`

Subscribe an email address to the newsletter.

**Request Body:**
```json
{
  "email": "subscriber@example.com"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "signupId": 1
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Email already subscribed"
}
```

**Validation Rules:**
- `email`: Required, valid email format, must be unique

---

### Get Newsletter Signups

**GET** `/api/newsletter/signups`

Retrieve all newsletter subscribers (admin endpoint).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "email": "subscriber@example.com",
      "created_at": "2024-12-01T10:30:00Z",
      "status": "subscribed"
    }
  ]
}
```

---

## Menu

### Get All Menu Items

**GET** `/api/menu`

Retrieve all menu items, optionally filtered by category.

**Query Parameters:**
- `category` (optional): Filter by category (e.g., "breakfast", "lunch", "dinner", "drinks")

**Examples:**
- `/api/menu` - Get all items
- `/api/menu?category=lunch` - Get lunch items only

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Smoked Brisket",
      "category": "lunch",
      "description": "Slow-smoked Texas-style brisket",
      "price": 24.99,
      "image": "https://example.com/brisket.jpg",
      "is_chefs_pick": 1,
      "created_at": "2024-12-01T10:30:00Z"
    },
    {
      "id": 2,
      "name": "Pulled Pork Sandwich",
      "category": "lunch",
      "description": "Tender pulled pork with house BBQ sauce",
      "price": 15.99,
      "image": "https://example.com/pork.jpg",
      "is_chefs_pick": 0,
      "created_at": "2024-12-01T10:30:00Z"
    }
  ]
}
```

---

### Get Menu Item by ID

**GET** `/api/menu/:id`

Retrieve a specific menu item.

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Smoked Brisket",
    "category": "lunch",
    "description": "Slow-smoked Texas-style brisket",
    "price": 24.99,
    "image": "https://example.com/brisket.jpg",
    "is_chefs_pick": 1,
    "created_at": "2024-12-01T10:30:00Z"
  }
}
```

**Response (Error - 404):**
```json
{
  "success": false,
  "message": "Menu item not found"
}
```

---

### Create Menu Item

**POST** `/api/menu`

Create a new menu item (admin endpoint).

**Request Body:**
```json
{
  "name": "Smoked Brisket",
  "category": "lunch",
  "description": "Slow-smoked Texas-style brisket",
  "price": 24.99,
  "image": "https://example.com/brisket.jpg",
  "is_chefs_pick": true
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Menu item created successfully",
  "menuId": 1
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Name and category are required"
}
```

**Required Fields:**
- `name`: Menu item name
- `category`: Category (breakfast, lunch, dinner, drinks, etc.)

**Optional Fields:**
- `description`: Item description
- `price`: Item price (default: 0)
- `image`: Image URL
- `is_chefs_pick`: Boolean, marks as chef's special (default: false)

---

### Update Menu Item

**PUT** `/api/menu/:id`

Update an existing menu item (admin endpoint).

**Request Body:**
```json
{
  "name": "Smoked Brisket",
  "category": "lunch",
  "description": "Updated description",
  "price": 25.99,
  "image": "https://example.com/brisket-new.jpg",
  "is_chefs_pick": false
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Menu item updated successfully"
}
```

---

### Delete Menu Item

**DELETE** `/api/menu/:id`

Delete a menu item (admin endpoint).

**Response (Success):**
```json
{
  "success": true,
  "message": "Menu item deleted successfully"
}
```

**Response (Error - 404):**
```json
{
  "success": false,
  "message": "Menu item not found"
}
```

---

## Error Handling

All endpoints return standardized error responses:

**HTTP Status Codes:**
- `200` - OK
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

**Error Response Format:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Specific error 1", "Specific error 2"]
}
```

---

## CORS

The API is configured with CORS enabled to allow requests from your frontend. If running locally:
- Frontend: `http://localhost:3000` (or your frontend port)
- API: `http://localhost:5000`

---

## Database

The API uses SQLite with the following tables:

### Reservations Table
- `id` - Auto-increment ID
- `name` - Customer name
- `email` - Customer email
- `date` - Reservation date
- `time` - Reservation time
- `guests` - Number of guests
- `requests` - Special requests
- `created_at` - Timestamp
- `status` - Reservation status (confirmed)

### Newsletter Signups Table
- `id` - Auto-increment ID
- `email` - Subscriber email (unique)
- `created_at` - Timestamp
- `status` - Subscription status (subscribed)

### Menu Items Table
- `id` - Auto-increment ID
- `name` - Item name
- `category` - Item category
- `description` - Item description
- `price` - Item price
- `image` - Image URL
- `is_chefs_pick` - Boolean flag
- `created_at` - Timestamp

---

## Frontend Integration

Use the provided `api-client.js` to integrate the API with your frontend:

```javascript
import { reservationsAPI, newsletterAPI, menuAPI } from './api-client.js';

// Create a reservation
const result = await reservationsAPI.create({
  name: 'John Doe',
  email: 'john@example.com',
  date: '2024-12-25',
  time: '19:30',
  guests: 4,
  requests: 'Window seat'
});

// Get all menu items
const menu = await menuAPI.getAll();

// Get lunch items
const lunch = await menuAPI.getAll('lunch');

// Subscribe to newsletter
const signup = await newsletterAPI.signup('subscriber@example.com');
```

---

## Development

### Running the Server

```bash
npm start
```

The server will run on port 5000 by default. Change it in `.env`:

```
PORT=5000
NODE_ENV=development
```

### Database

The database is automatically created at startup in `database.db`. Tables are initialized on first run.

To reset the database, delete `database.db` and restart the server.

---

## Future Enhancements

- Authentication & authorization (admin login)
- Email notifications for reservations
- Payment processing
- Review & ratings system
- Inventory management
- Order history tracking
- Admin dashboard
