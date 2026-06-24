/**
 * Salt & Smoke - Frontend API Integration Examples
 * 
 * This file shows how to integrate the API with your existing frontend forms.
 * These are example functions you can adapt into your main.js
 */

import { reservationsAPI, menuAPI, newsletterAPI } from "./api-client.js";

const API_URL = "http://localhost:5000/api";

const renderFeedbackMessage = (container, variant, message) => {
  if (!container) return;

  container.className = `alert alert-${variant}`;
  container.setAttribute("role", "alert");
  container.setAttribute("aria-live", variant === "danger" ? "assertive" : "polite");
  container.setAttribute("aria-atomic", "true");

  const titleByVariant = {
    success: "Success",
    danger: "Error",
    info: "Info"
  };
  container.innerHTML = `<strong>${titleByVariant[variant] || "Notice"}:</strong> ${message}`;
};

const getOrCreateFeedbackContainer = target => {
  if (!target) return null;

  const existingContainer = target.querySelector("[data-api-feedback]");
  if (existingContainer) return existingContainer;

  const container = document.createElement("div");
  container.dataset.apiFeedback = "true";
  container.className = "alert d-none mt-3";
  target.prepend(container);
  return container;
};

const showMessageForForm = (form, variant, message) => {
  const feedbackContainer = getOrCreateFeedbackContainer(form);
  if (!feedbackContainer) return;
  renderFeedbackMessage(feedbackContainer, variant, message);
};

const showMenuMessage = (variant, message) => {
  const menuContainer = document.getElementById("menu-container");
  const feedbackContainer = getOrCreateFeedbackContainer(menuContainer?.parentElement || menuContainer);
  if (!feedbackContainer) return;
  renderFeedbackMessage(feedbackContainer, variant, message);
};

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
    name: formData.get("name"),
    email: formData.get("email"),
    date: formData.get("date"),
    time: formData.get("time"),
    guests: parseInt(formData.get("guests"), 10),
    requests: formData.get("requests") || ""
  };

  try {
    // Submit to API
    const result = await reservationsAPI.create(data);

    if (result.success) {
      showMessageForForm(
        event.target,
        "success",
        "Your reservation request was sent successfully. Redirecting to your confirmation page."
      );

      // Show confirmation page
      window.location.href = "submit.html";

      // Clear form
      event.target.reset();
    }
  } catch (error) {
    showMessageForForm(
      event.target,
      "danger",
      error?.message || "Unable to create your reservation right now. Please try again."
    );
  }
}

/**
 * Example: Handle Newsletter Signup
 * 
 * Update your newsletter form submission to use this:
 */
export async function handleNewsletterSignup(event) {
  event.preventDefault();

  const email = document.getElementById("newsletter-email").value;

  try {
    const result = await newsletterAPI.signup(email);

    if (result.success) {
      showMessageForForm(
        event.target,
        "success",
        "You're subscribed successfully. We'll send updates to your inbox."
      );
      event.target.reset();

      // Save to sessionStorage (as in original code)
      sessionStorage.setItem("newsletterEmail", email);
    }
  } catch (error) {
    const message = error?.message || "Unable to subscribe right now. Please try again.";
    showMessageForForm(
      event.target,
      message.includes("already subscribed") ? "info" : "danger",
      message.includes("already subscribed")
        ? "This email is already subscribed to the newsletter."
        : message
    );
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
      showMenuMessage("success", "Menu loaded successfully.");
    }
  } catch (error) {
    showMenuMessage("danger", error?.message || "Unable to load menu items right now.");
  }
}

/**
 * Example: Display Menu Items
 */
function displayMenuItems(menuByCategory) {
  const menuContainer = document.getElementById("menu-container");
  
  Object.entries(menuByCategory).forEach(([category, items]) => {
    const categoryEl = document.createElement('div');
    categoryEl.className = "menu-category";
    categoryEl.innerHTML = `<h3>${category}</h3>`;

    items.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = "menu-item";
      if (item.is_chefs_pick) {
        itemEl.classList.add("chefs-pick");
      }

      itemEl.innerHTML = `
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <p class="price">$${item.price.toFixed(2)}</p>
        ${item.is_chefs_pick ? "<span class=\"badge\">Chef's Pick</span>" : ""}
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
    name: formData.get("name"),
    category: formData.get("category"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price")),
    image: formData.get("image"),
    is_chefs_pick: formData.get("is_chefs_pick") === "on"
  };

  try {
    const result = await menuAPI.create(data);

    if (result.success) {
      showMessageForForm(event.target, "success", "Menu item added successfully.");
      event.target.reset();
      // Reload menu
      loadMenuItems();
    }
  } catch (error) {
    showMessageForForm(event.target, "danger", error?.message || "Failed to add menu item.");
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
      const menuContainer = document.getElementById("menu-container");
      menuContainer.innerHTML = "";
      displayMenuItems(groupByCategory(result.data));
      showMenuMessage(
        "success",
        category ? `Showing ${category} menu items.` : "Showing all menu items."
      );
    }
  } catch (error) {
    showMenuMessage("danger", error?.message || "Unable to filter menu right now.");
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
 * Initialize on Page Load
 * 
 * Add this to your page load handler:
 */
export function initializeAPI() {
  // Check API health
  fetch(`${API_URL}/health`)
    .then(res => res.json())
    .then(() => showMenuMessage("success", "Connected to API successfully."))
    .catch(() =>
      showMenuMessage(
        "danger",
        "API is currently unavailable. Please try again later or start the backend server."
      )
    );

  // Attach event listeners
  const reservationForm = document.getElementById("reservation-form");
  if (reservationForm) {
    reservationForm.addEventListener("submit", handleReservationSubmit);
  }

  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", handleNewsletterSignup);
  }

  // Load menu items
  loadMenuItems();
}

// Call this when DOM is ready:
// document.addEventListener('DOMContentLoaded', initializeAPI);
