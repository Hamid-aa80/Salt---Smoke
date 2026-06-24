/**
 * Salt & Smoke - Frontend API Integration Examples
 * 
 * This file shows how to integrate the API with your existing frontend forms.
 * These are example functions you can adapt into your main.js
 */

import { reservationsAPI, menuAPI, newsletterAPI } from './api-client.js';

const API_URL = 'http://localhost:5000/api';

/**
 * Example: Handle Reservation Form Submission
 * 
 * Update your reservation form submission to use this:
 */
export async function handleReservationSubmit(event) {
  event.preventDefault();

  // Get form data
  const formData = new FormData(event.target);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    date: formData.get('date'),
    time: formData.get('time'),
    guests: parseInt(formData.get('guests')),
    requests: formData.get('requests') || ''
  };

  try {
    // Submit to API
    const result = await reservationsAPI.create(data);

    if (result.success) {
      // Show success message
      console.log('Reservation created:', result);
      
      // Show confirmation page
      window.location.href = 'submit.html';
      
      // Or show success toast/modal
      // showSuccessMessage('Your reservation has been confirmed!');
      
      // Clear form
      event.target.reset();
    } else {
      // Show validation errors
      console.error('Validation errors:', result.errors);
      showErrorMessage(result.errors.join(', '));
    }
  } catch (error) {
    console.error('API Error:', error);
    showErrorMessage('Failed to create reservation. Please try again.');
  }
}

/**
 * Example: Handle Newsletter Signup
 * 
 * Update your newsletter form submission to use this:
 */
export async function handleNewsletterSignup(event) {
  event.preventDefault();

  const email = document.getElementById('newsletter-email').value;

  try {
    const result = await newsletterAPI.signup(email);

    if (result.success) {
      console.log('Newsletter signup successful:', result);
      showSuccessMessage('Successfully subscribed to our newsletter!');
      event.target.reset();
      
      // Save to sessionStorage (as in original code)
      sessionStorage.setItem('newsletterEmail', email);
    } else {
      if (result.message.includes('already subscribed')) {
        showInfoMessage('You are already subscribed to our newsletter.');
      } else {
        showErrorMessage(result.message);
      }
    }
  } catch (error) {
    console.error('API Error:', error);
    showErrorMessage('Failed to subscribe. Please try again.');
  }
}

/**
 * Example: Load Menu Items from API
 * 
 * Call this on page load to fetch menu items:
 */
export async function loadMenuItems() {
  try {
    const result = await menuAPI.getAll();

    if (result.success) {
      const menuItems = result.data;
      
      // Group by category
      const byCategory = {};
      menuItems.forEach(item => {
        if (!byCategory[item.category]) {
          byCategory[item.category] = [];
        }
        byCategory[item.category].push(item);
      });

      // Display menu items
      displayMenuItems(byCategory);
    }
  } catch (error) {
    console.error('Failed to load menu:', error);
  }
}

/**
 * Example: Display Menu Items
 */
function displayMenuItems(menuByCategory) {
  const menuContainer = document.getElementById('menu-container');
  
  Object.entries(menuByCategory).forEach(([category, items]) => {
    const categoryEl = document.createElement('div');
    categoryEl.className = 'menu-category';
    categoryEl.innerHTML = `<h3>${category}</h3>`;

    items.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'menu-item';
      if (item.is_chefs_pick) {
        itemEl.classList.add('chefs-pick');
      }

      itemEl.innerHTML = `
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <p class="price">$${item.price.toFixed(2)}</p>
        ${item.is_chefs_pick ? '<span class="badge">Chef\'s Pick</span>' : ''}
      `;

      categoryEl.appendChild(itemEl);
    });

    menuContainer.appendChild(categoryEl);
  });
}

/**
 * Example: Add Menu Item (Admin)
 */
export async function handleAddMenuItem(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = {
    name: formData.get('name'),
    category: formData.get('category'),
    description: formData.get('description'),
    price: parseFloat(formData.get('price')),
    image: formData.get('image'),
    is_chefs_pick: formData.get('is_chefs_pick') === 'on'
  };

  try {
    const result = await menuAPI.create(data);

    if (result.success) {
      showSuccessMessage('Menu item added successfully!');
      event.target.reset();
      // Reload menu
      loadMenuItems();
    } else {
      showErrorMessage(result.message);
    }
  } catch (error) {
    console.error('API Error:', error);
    showErrorMessage('Failed to add menu item.');
  }
}

/**
 * Example: Filter Menu by Category
 */
export async function filterMenuByCategory(category) {
  try {
    const result = category 
      ? await menuAPI.getAll(category)
      : await menuAPI.getAll();

    if (result.success) {
      const menuContainer = document.getElementById('menu-container');
      menuContainer.innerHTML = '';
      displayMenuItems(groupByCategory(result.data));
    }
  } catch (error) {
    console.error('Filter error:', error);
  }
}

/**
 * Helper: Group items by category
 */
function groupByCategory(items) {
  const grouped = {};
  items.forEach(item => {
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category].push(item);
  });
  return grouped;
}

/**
 * Helper: Show success message (toast/modal)
 */
function showSuccessMessage(message) {
  // Option 1: Simple alert (replace with your toast/modal)
  alert(message);
  
  // Option 2: Toast notification (example with bootstrap)
  // const toast = document.createElement('div');
  // toast.className = 'toast alert alert-success';
  // toast.textContent = message;
  // document.body.appendChild(toast);
  // setTimeout(() => toast.remove(), 3000);
}

/**
 * Helper: Show error message
 */
function showErrorMessage(message) {
  alert('Error: ' + message);
  
  // Or use your existing error handling:
  // console.error(message);
}

/**
 * Helper: Show info message
 */
function showInfoMessage(message) {
  alert(message);
}

/**
 * Initialize on Page Load
 * 
 * Add this to your page load handler:
 */
export function initializeAPI() {
  // Check API health
  fetch(`${API_URL}/health`)
    .then(res => res.json())
    .then(data => console.log('✅ API Status:', data.status))
    .catch(err => console.warn('⚠️ API not available:', err));

  // Attach event listeners
  const reservationForm = document.getElementById('reservation-form');
  if (reservationForm) {
    reservationForm.addEventListener('submit', handleReservationSubmit);
  }

  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSignup);
  }

  // Load menu items
  loadMenuItems();
}

// Call this when DOM is ready:
// document.addEventListener('DOMContentLoaded', initializeAPI);
