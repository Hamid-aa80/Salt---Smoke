/**
 * Salt & Smoke API Client
 * Helper functions for frontend to communicate with the API
 */

const API_URL = process.env.API_URL || "http://localhost:5000/api";

const extractResponseMessage = payload => {
  if (!payload) return null;
  if (Array.isArray(payload.errors) && payload.errors.length) {
    return payload.errors.join(", ");
  }
  if (typeof payload.message === "string" && payload.message.trim()) {
    return payload.message;
  }
  return null;
};

const requestJson = async (url, options = {}, fallbackErrorMessage = "Request failed.") => {
  const response = await fetch(url, options);
  const payload = await response.json();

  if (!response.ok) {
    const apiMessage = extractResponseMessage(payload);
    throw new Error(apiMessage || fallbackErrorMessage);
  }

  return payload;
};

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
    return requestJson(
      `${API_URL}/reservations`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      },
      "Failed to create reservation."
    );
  },

  /**
   * Get all reservations
   * @returns {Promise<Object>}
   */
  getAll: async () => {
    return requestJson(`${API_URL}/reservations`, {}, "Failed to load reservations.");
  },

  /**
   * Get a specific reservation
   * @param {number} id - Reservation ID
   * @returns {Promise<Object>}
   */
  getById: async (id) => {
    return requestJson(`${API_URL}/reservations/${id}`, {}, "Failed to load reservation.");
  }
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
    return requestJson(
      `${API_URL}/newsletter/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      },
      "Failed to subscribe to newsletter."
    );
  },

  /**
   * Get all newsletter signups (admin)
   * @returns {Promise<Object>}
   */
  getSignups: async () => {
    return requestJson(`${API_URL}/newsletter/signups`, {}, "Failed to load newsletter signups.");
  }
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
    return requestJson(url, {}, "Failed to load menu items.");
  },

  /**
   * Get a specific menu item
   * @param {number} id - Menu item ID
   * @returns {Promise<Object>}
   */
  getById: async (id) => {
    return requestJson(`${API_URL}/menu/${id}`, {}, "Failed to load menu item.");
  },

  /**
   * Create a new menu item (admin)
   * @param {Object} data - Menu item data
   * @returns {Promise<Object>}
   */
  create: async (data) => {
    return requestJson(
      `${API_URL}/menu`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      },
      "Failed to create menu item."
    );
  },

  /**
   * Update a menu item (admin)
   * @param {number} id - Menu item ID
   * @param {Object} data - Updated menu item data
   * @returns {Promise<Object>}
   */
  update: async (id, data) => {
    return requestJson(
      `${API_URL}/menu/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      },
      "Failed to update menu item."
    );
  },

  /**
   * Delete a menu item (admin)
   * @param {number} id - Menu item ID
   * @returns {Promise<Object>}
   */
  delete: async (id) => {
    return requestJson(
      `${API_URL}/menu/${id}`,
      {
        method: "DELETE"
      },
      "Failed to delete menu item."
    );
  }
};

/**
 * Health check
 */
export const health = async () => {
  return requestJson(`${API_URL}/health`, {}, "Failed to check API health.");
};
