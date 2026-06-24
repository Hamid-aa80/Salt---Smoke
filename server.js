import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'database.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  db.serialize(() => {
    // Reservations table
    db.run(`
      CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        guests INTEGER NOT NULL,
        requests TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'confirmed'
      )
    `);

    // Newsletter signups table
    db.run(`
      CREATE TABLE IF NOT EXISTS newsletter_signups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'subscribed'
      )
    `);

    // Menu items table
    db.run(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT,
        price REAL,
        image TEXT,
        is_chefs_pick INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database tables initialized');
  });
}

// Helper functions for validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateReservation(data) {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  if (!validateEmail(data.email)) {
    errors.push('Invalid email format');
  }
  if (!data.date) {
    errors.push('Date is required');
  }
  if (!data.time) {
    errors.push('Time is required');
  }
  if (!data.guests || data.guests < 1 || data.guests > 20) {
    errors.push('Guests must be between 1 and 20');
  }
  
  return errors;
}

// Routes

// Reservations
app.post('/api/reservations', (req, res) => {
  const { name, email, date, time, guests, requests } = req.body;
  
  const validationErrors = validateReservation({ name, email, date, time, guests });
  if (validationErrors.length > 0) {
    return res.status(400).json({ 
      success: false, 
      errors: validationErrors 
    });
  }

  db.run(
    `INSERT INTO reservations (name, email, date, time, guests, requests) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, date, time, guests, requests || ''],
    function(err) {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to create reservation' 
        });
      }
      res.status(201).json({ 
        success: true, 
        message: 'Reservation created successfully',
        reservationId: this.lastID
      });
    }
  );
});

app.get('/api/reservations', (req, res) => {
  db.all(
    `SELECT * FROM reservations ORDER BY date DESC, time DESC`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to fetch reservations' 
        });
      }
      res.json({ success: true, data: rows });
    }
  );
});

app.get('/api/reservations/:id', (req, res) => {
  db.get(
    `SELECT * FROM reservations WHERE id = ?`,
    [req.params.id],
    (err, row) => {
      if (err) {
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to fetch reservation' 
        });
      }
      if (!row) {
        return res.status(404).json({ 
          success: false, 
          message: 'Reservation not found' 
        });
      }
      res.json({ success: true, data: row });
    }
  );
});

// Newsletter
app.post('/api/newsletter/signup', (req, res) => {
  const { email } = req.body;
  
  if (!validateEmail(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid email format' 
    });
  }

  db.run(
    `INSERT INTO newsletter_signups (email) VALUES (?)`,
    [email],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ 
            success: false, 
            message: 'Email already subscribed' 
          });
        }
        console.error('Database error:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to subscribe' 
        });
      }
      res.status(201).json({ 
        success: true, 
        message: 'Successfully subscribed to newsletter',
        signupId: this.lastID
      });
    }
  );
});

app.get('/api/newsletter/signups', (req, res) => {
  db.all(
    `SELECT * FROM newsletter_signups ORDER BY created_at DESC`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to fetch signups' 
        });
      }
      res.json({ success: true, data: rows });
    }
  );
});

// Menu
app.post('/api/menu', (req, res) => {
  const { name, category, description, price, image, is_chefs_pick } = req.body;
  
  if (!name || !category) {
    return res.status(400).json({ 
      success: false, 
      message: 'Name and category are required' 
    });
  }

  db.run(
    `INSERT INTO menu_items (name, category, description, price, image, is_chefs_pick) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, category, description || '', price || 0, image || '', is_chefs_pick ? 1 : 0],
    function(err) {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to create menu item' 
        });
      }
      res.status(201).json({ 
        success: true, 
        message: 'Menu item created successfully',
        menuId: this.lastID
      });
    }
  );
});

app.get('/api/menu', (req, res) => {
  const { category } = req.query;
  
  let query = 'SELECT * FROM menu_items';
  const params = [];
  
  if (category) {
    query += ' WHERE category = ?';
    params.push(category);
  }
  
  query += ' ORDER BY is_chefs_pick DESC, name ASC';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch menu' 
      });
    }
    res.json({ success: true, data: rows });
  });
});

app.get('/api/menu/:id', (req, res) => {
  db.get(
    `SELECT * FROM menu_items WHERE id = ?`,
    [req.params.id],
    (err, row) => {
      if (err) {
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to fetch menu item' 
        });
      }
      if (!row) {
        return res.status(404).json({ 
          success: false, 
          message: 'Menu item not found' 
        });
      }
      res.json({ success: true, data: row });
    }
  );
});

app.put('/api/menu/:id', (req, res) => {
  const { name, category, description, price, image, is_chefs_pick } = req.body;
  
  db.run(
    `UPDATE menu_items SET name = ?, category = ?, description = ?, price = ?, image = ?, is_chefs_pick = ? 
     WHERE id = ?`,
    [name, category, description || '', price || 0, image || '', is_chefs_pick ? 1 : 0, req.params.id],
    function(err) {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to update menu item' 
        });
      }
      if (this.changes === 0) {
        return res.status(404).json({ 
          success: false, 
          message: 'Menu item not found' 
        });
      }
      res.json({ 
        success: true, 
        message: 'Menu item updated successfully' 
      });
    }
  );
});

app.delete('/api/menu/:id', (req, res) => {
  db.run(
    `DELETE FROM menu_items WHERE id = ?`,
    [req.params.id],
    function(err) {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to delete menu item' 
        });
      }
      if (this.changes === 0) {
        return res.status(404).json({ 
          success: false, 
          message: 'Menu item not found' 
        });
      }
      res.json({ 
        success: true, 
        message: 'Menu item deleted successfully' 
      });
    }
  );
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🍽️  Salt & Smoke API running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}/api/docs`);
});

export default app;
