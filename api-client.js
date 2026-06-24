/**
 * Salt & Smoke API Client
 * Helper functions for frontend to communicate with the API
 */

const API_URL = process.env.API_URL || 'http://localhost:5000/api';

/**
 * Reservations API
 */
export const reservationsAPI = {
  /**
   * Create a new reservation
   * @param {Object} data - Reservation data
   * @returns {Promise<Object>}
   */
  create: async (data) => {
    const response = await fetch(`${API_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  /**
   * Get all reservations
   * @returns {Promise<Object>}
   */
  getAll: async () => {
    const response = await fetch(`${API_URL}/reservations`);
    return response.json();
  },

  /**
   * Get a specific reservation
   * @param {number} id - Reservation ID
   * @returns {Promise<Object>}
   */
  getById: async (id) => {
    const response = await fetch(`${API_URL}/reservations/${id}`);
    return response.json();
  },
};

/**
 * Newsletter API
 */
export const newsletterAPI = {
  /**
   * Subscribe to newsletter
   * @param {string} email - Email address
   * @returns {Promise<Object>}
   */
  signup: async (email) => {
    const response = await fetch(`${API_URL}/newsletter/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return response.json();
  },

  /**
   * Get all newsletter signups (admin)
   * @returns {Promise<Object>}
   */
  getSignups: async () => {
    const response = await fetch(`${API_URL}/newsletter/signups`);
    return response.json();
  },
};

/**
 * Menu API
 */
export const menuAPI = {
  /**
   * Get all menu items or filter by category
   * @param {string} category - Optional category filter
   * @returns {Promise<Object>}
   */
  getAll: async (category = null) => {
    const url = category 
      ? `${API_URL}/menu?category=${encodeURIComponent(category)}`
      : `${API_URL}/menu`;
    const response = await fetch(url);
    return response.json();
  },

  /**
   * Get a specific menu item
   * @param {number} id - Menu item ID
   * @returns {Promise<Object>}
   */
  getById: async (id) => {
    const response = await fetch(`${API_URL}/menu/${id}`);
    return response.json();
  },

  /**
   * Create a new menu item (admin)
   * @param {Object} data - Menu item data
   * @returns {Promise<Object>}
   */
  create: async (data) => {
    const response = await fetch(`${API_URL}/menu`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  /**
   * Update a menu item (admin)
   * @param {number} id - Menu item ID
   * @param {Object} data - Updated menu item data
   * @returns {Promise<Object>}
   */
  update: async (id, data) => {
    const response = await fetch(`${API_URL}/menu/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  /**
   * Delete a menu item (admin)
   * @param {number} id - Menu item ID
   * @returns {Promise<Object>}
   */
  delete: async (id) => {
    const response = await fetch(`${API_URL}/menu/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

/**
 * Health check
 */
export const health = async () => {
  const response = await fetch(`${API_URL}/health`);
  return response.json();
};
