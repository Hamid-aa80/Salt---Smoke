// main.js — Salt & Smoke custom interactions

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const applyReducedMotionClass = event => {
    document.documentElement.classList.toggle("reduce-motion", event.matches);
  };

  applyReducedMotionClass(prefersReducedMotion);
  if (typeof prefersReducedMotion.addEventListener === "function") {
    prefersReducedMotion.addEventListener("change", applyReducedMotionClass);
  } else if (typeof prefersReducedMotion.addListener === "function") {
    prefersReducedMotion.addListener(applyReducedMotionClass);
  }

  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const navbar = document.querySelector(".navbar");
  const updateNavbarStickyState = () => {
    if (!navbar) return;
    navbar.classList.toggle("sticky-top", window.scrollY > 20);
  };

  updateNavbarStickyState();
  window.addEventListener("scroll", updateNavbarStickyState);

  const sectionNavLinks = Array.from(
    document.querySelectorAll('.navbar .nav-link[href^="#"]')
  );
  const sectionTargets = sectionNavLinks
    .map(link => {
      const hash = link.getAttribute("href");
      if (!hash) return null;
      const target = document.querySelector(hash);
      return target ? { link, target, hash } : null;
    })
    .filter(Boolean);

  const setActiveNavLink = activeHash => {
    sectionNavLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === activeHash);
    });
  };

  if (sectionTargets.length && "IntersectionObserver" in window) {
    const visibleSections = new Map();
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id = `#${entry.target.id}`;
          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }
        });

        let activeHash = "";
        let highestRatio = 0;
        visibleSections.forEach((ratio, hash) => {
          if (ratio >= highestRatio) {
            highestRatio = ratio;
            activeHash = hash;
          }
        });

        setActiveNavLink(activeHash);
      },
      { threshold: [0.2, 0.4, 0.6, 0.8], rootMargin: "-20% 0px -45% 0px" }
    );

    sectionTargets.forEach(({ target }) => observer.observe(target));
  }

  const menuSection = document.getElementById("menu");
  if (menuSection) {
    const menuTitle = menuSection.querySelector("h1");
    const menuItems = Array.from(
      menuSection.querySelectorAll("#tab-1 h5.d-flex.justify-content-between span:first-child")
    );
    const menuPrices = Array.from(
      menuSection.querySelectorAll("#tab-1 h5.d-flex.justify-content-between span.text-primary")
    );

    if (menuTitle && menuItems.length && menuItems.length === menuPrices.length) {
      const daySeed = Math.floor(Date.now() / 86400000);
      const dailyIndex = daySeed % menuItems.length;
      const dailyDish = menuItems[dailyIndex].textContent.trim();
      const dailyPrice = menuPrices[dailyIndex].textContent.trim();

      const spotlight = document.createElement("p");
      spotlight.className = "text-center text-white mt-3 mb-4";
      spotlight.innerHTML = `Chef's pick today: <strong>${dailyDish}</strong> <span class="text-primary">${dailyPrice}</span>`;
      menuTitle.insertAdjacentElement("afterend", spotlight);
    }
  }

  const reservationSection = document.getElementById("reservation");
  const reservationForm = reservationSection
    ? reservationSection.querySelector("form")
    : null;

  if (!reservationForm) return;

  const nameInput = reservationForm.querySelector("#name");
  const emailInput = reservationForm.querySelector("#email");
  const dateInput = reservationForm.querySelector("#datetime");
  const peopleSelect = reservationForm.querySelector("#select1");
  const messageInput = reservationForm.querySelector("#message");
  const bookingLink = reservationForm.querySelector('a[href="submit.html"]');

  const storageKey = "salt-smoke-reservation-draft";
  const today = new Date().toISOString().split("T")[0];
  if (dateInput) {
    dateInput.min = today;
  }

  const readDraft = () => {
    const draft = localStorage.getItem(storageKey);
    if (!draft) return null;

    try {
      return JSON.parse(draft);
    } catch (error) {
      localStorage.removeItem(storageKey);
      return null;
    }
  };

  const saveDraft = () => {
    const draft = {
      name: nameInput ? nameInput.value.trim() : "",
      email: emailInput ? emailInput.value.trim() : "",
      date: dateInput ? dateInput.value : "",
      people: peopleSelect ? peopleSelect.value : "",
      message: messageInput ? messageInput.value.trim() : ""
    };
    localStorage.setItem(storageKey, JSON.stringify(draft));
  };

  const existingDraft = readDraft();
  if (existingDraft) {
    if (nameInput) nameInput.value = existingDraft.name || "";
    if (emailInput) emailInput.value = existingDraft.email || "";
    if (dateInput) dateInput.value = existingDraft.date || "";
    if (peopleSelect && existingDraft.people) peopleSelect.value = existingDraft.people;
    if (messageInput) messageInput.value = existingDraft.message || "";
  }

  [nameInput, emailInput, dateInput, peopleSelect, messageInput].forEach(field => {
    if (!field) return;
    field.addEventListener("input", saveDraft);
    field.addEventListener("change", saveDraft);
  });

  const bookingButtonRow = bookingLink ? bookingLink.closest(".col-12") : null;
  const reservationSummary = document.createElement("p");
  reservationSummary.className = "text-white-50 small mt-3 mb-0";
  if (bookingButtonRow) {
    bookingButtonRow.appendChild(reservationSummary);
  }

  const updateReservationSummary = () => {
    if (!bookingButtonRow) return;
    const name = nameInput ? nameInput.value.trim() : "";
    const date = dateInput ? dateInput.value : "";
    const people = peopleSelect ? peopleSelect.value : "";

    const details = [];
    if (name) details.push(name);
    if (people) details.push(`${people} guest${people === "1" ? "" : "s"}`);
    if (date) details.push(new Date(date).toLocaleDateString("en-GB"));

    reservationSummary.textContent = details.length
      ? `Reservation preview: ${details.join(" • ")}`
      : "Fill in your details to preview your reservation.";
  };

  const validateReservationForm = () => {
    if (!nameInput || !emailInput || !dateInput || !bookingLink) return false;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const date = dateInput.value;

    if (name.length < 2) {
      nameInput.setCustomValidity("Please enter your full name.");
      nameInput.reportValidity();
      nameInput.focus();
      return false;
    }
    nameInput.setCustomValidity("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailInput.setCustomValidity("Please enter a valid email address.");
      emailInput.reportValidity();
      emailInput.focus();
      return false;
    }
    emailInput.setCustomValidity("");

    if (!date) {
      dateInput.setCustomValidity("Please choose a reservation date.");
      dateInput.reportValidity();
      dateInput.focus();
      return false;
    }

    if (date < today) {
      dateInput.setCustomValidity("Reservation date cannot be in the past.");
      dateInput.reportValidity();
      dateInput.focus();
      return false;
    }
    dateInput.setCustomValidity("");

    return true;
  };

  if (bookingLink) {
    bookingLink.addEventListener("click", event => {
      event.preventDefault();
      if (!validateReservationForm()) return;

      saveDraft();
      window.location.href = bookingLink.getAttribute("href");
    });
  }

  updateReservationSummary();
  [nameInput, dateInput, peopleSelect].forEach(field => {
    if (!field) return;
    field.addEventListener("input", updateReservationSummary);
    field.addEventListener("change", updateReservationSummary);
  });
});
