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

  const navbarCollapse = document.getElementById("navbarCollapse");
  const hideNavbarCollapse = () => {
    if (!navbarCollapse || !navbarCollapse.classList.contains("show")) return;

    const collapse = window.bootstrap?.Collapse?.getOrCreateInstance(navbarCollapse, {
      toggle: false
    });
    collapse?.hide();
  };

  const showAlertMessage = (element, variant, message) => {
    if (!element) return;

    element.classList.remove("d-none", "alert-success", "alert-danger", "alert-warning", "alert-info");
    element.classList.add("alert", `alert-${variant}`);
    element.setAttribute("role", "alert");
    element.setAttribute("aria-atomic", "true");
    element.setAttribute("aria-live", variant === "danger" ? "assertive" : "polite");
    element.textContent = "";

    const alertMeta = {
      success: { title: "Success", icon: "fa-circle-check" },
      danger: { title: "Error", icon: "fa-triangle-exclamation" },
      warning: { title: "Warning", icon: "fa-circle-exclamation" },
      info: { title: "Info", icon: "fa-circle-info" }
    }[variant];

    if (alertMeta) {
      const heading = document.createElement("strong");
      const icon = document.createElement("i");
      icon.className = `fa-solid ${alertMeta.icon} me-2`;
      heading.appendChild(icon);
      heading.appendChild(document.createTextNode(`${alertMeta.title}: `));
      element.appendChild(heading);
    }

    element.appendChild(document.createTextNode(message));
  };

  const hideAlertMessage = element => {
    if (!element) return;

    element.classList.add("d-none");
    element.textContent = "";
  };

  const reservationSuccessKey = "salt-smoke-reservation-confirmation";
  const readReservationConfirmation = () => {
    const storedConfirmation = sessionStorage.getItem(reservationSuccessKey);
    if (!storedConfirmation) return null;

    try {
      return JSON.parse(storedConfirmation);
    } catch (error) {
      sessionStorage.removeItem(reservationSuccessKey);
      return null;
    }
  };

  const createBackToTopButton = () => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "back-to-top btn btn-primary btn-lg-square rounded-circle shadow";
    button.setAttribute("aria-label", "Back to top");
    button.title = "Back to top";
    button.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    button.style.display = "none";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";

    const updateVisibility = () => {
      button.style.display = window.scrollY > 500 ? "inline-flex" : "none";
    };

    button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion.matches ? "auto" : "smooth"
      });
    });

    document.body.appendChild(button);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
  };

  createBackToTopButton();

  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      hideNavbarCollapse();
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
    const menuCards = Array.from(menuSection.querySelectorAll("[data-menu-item]"));
    const filterButtons = Array.from(menuSection.querySelectorAll("[data-menu-filter]"));
    const menuSearch = menuSection.querySelector("#menuSearch");
    const menuVisibleCount = menuSection.querySelector("#menuVisibleCount");
    const menuTotalCount = menuSection.querySelector("#menuTotalCount");
    const menuEmptyState = menuSection.querySelector("#menuEmptyState");

    const getMenuCardName = card =>
      card.getAttribute("data-menu-name") ||
      card.querySelector("h5 span:first-child")?.textContent.trim() ||
      "";
    const getMenuCardPrice = card =>
      card.querySelector(".text-primary")?.textContent.trim() || "";
    const normalizeText = value =>
      value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    if (menuTotalCount) {
      menuTotalCount.textContent = String(menuCards.length);
    }

    if (menuTitle && menuCards.length) {
      const daySeed = Math.floor(Date.now() / 86400000);
      const dailyIndex = daySeed % menuCards.length;
      const dailyDish = getMenuCardName(menuCards[dailyIndex]);
      const dailyPrice = getMenuCardPrice(menuCards[dailyIndex]);

      const spotlight = document.createElement("p");
      spotlight.className = "text-center text-white mt-3 mb-4";
      spotlight.innerHTML = `Chef's pick today: <strong>${dailyDish}</strong> <span class="text-primary">${dailyPrice}</span>`;
      menuTitle.insertAdjacentElement("afterend", spotlight);
    }

    if (menuCards.length && filterButtons.length) {
      let activeFilter = "all";
      let searchTerm = menuSearch ? normalizeText(menuSearch.value.trim()) : "";

      const updateMenuVisibility = () => {
        let visibleCount = 0;

        menuCards.forEach(card => {
          const categories = (card.getAttribute("data-menu-category") || "")
            .split(/\s+/)
            .filter(Boolean);
          const menuName = normalizeText(getMenuCardName(card));
          const matchesFilter = activeFilter === "all" || categories.includes(activeFilter);
          const matchesSearch = !searchTerm || menuName.includes(searchTerm);
          const isVisible = matchesFilter && matchesSearch;

          card.classList.toggle("d-none", !isVisible);
          if (isVisible) visibleCount += 1;
        });

        if (menuVisibleCount) {
          menuVisibleCount.textContent = String(visibleCount);
        }
        if (menuEmptyState) {
          menuEmptyState.classList.toggle("d-none", visibleCount !== 0);
        }
      };

      const setActiveFilter = filter => {
        activeFilter = filter;
        filterButtons.forEach(button => {
          const isActive = button.dataset.menuFilter === activeFilter;
          button.classList.toggle("active", isActive);
          button.setAttribute("aria-pressed", String(isActive));
        });
        updateMenuVisibility();
      };

      filterButtons.forEach(button => {
        button.addEventListener("click", () => {
          setActiveFilter(button.dataset.menuFilter || "all");
        });
      });

      if (menuSearch) {
        menuSearch.addEventListener("input", () => {
          searchTerm = normalizeText(menuSearch.value.trim());
          updateMenuVisibility();
        });
      }

      setActiveFilter("all");
    }
  }

  const openingTitle = Array.from(document.querySelectorAll("#contact h4.section-title")).find(
    title => title.textContent.trim() === "Opening"
  );
  if (openingTitle) {
    const openingSection = openingTitle.closest(".col-lg-3");
    const statusLabel = document.createElement("p");
    statusLabel.className = "text-primary fw-semibold mb-3";
    openingTitle.insertAdjacentElement("afterend", statusLabel);

    const schedule = {
      monday: [9, 21],
      tuesday: [9, 21],
      wednesday: [9, 21],
      thursday: [9, 21],
      friday: [9, 21],
      saturday: [10, 25],
      sunday: [10, 24]
    };

    const getDayName = dayIndex =>
      ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][dayIndex];

    const formatHour = hour => `${String(hour % 24).padStart(2, "0")}:00`;

    const updateOpeningStatus = () => {
      const now = new Date();
      const dayName = getDayName(now.getDay());
      const daySchedule = schedule[dayName];
      if (!daySchedule) return;

      const [openHour, closeHour] = daySchedule;
      const currentHourValue = now.getHours() + now.getMinutes() / 60;
      const isOpen = currentHourValue >= openHour && currentHourValue < closeHour;

      statusLabel.textContent = isOpen
        ? `Open now • Closes at ${formatHour(closeHour)}`
        : `Currently closed • Opens at ${formatHour(openHour)}`;
    };

    updateOpeningStatus();
    window.setInterval(updateOpeningStatus, 60000);

    if (openingSection) {
      openingSection.setAttribute("aria-live", "polite");
    }
  }

  const newsletterTitle = Array.from(document.querySelectorAll("#contact h4.section-title")).find(
    title => title.textContent.trim() === "Newsletter"
  );
  if (newsletterTitle) {
    const newsletterSection = newsletterTitle.closest(".col-lg-3");
    const newsletterForm = newsletterSection ? newsletterSection.querySelector("#newsletterForm") : null;
    const newsletterInput = newsletterForm ? newsletterForm.querySelector("#newsletterEmail") : null;
    const newsletterButton = newsletterForm ? newsletterForm.querySelector('button[type="submit"]') : null;
    if (newsletterForm && newsletterInput && newsletterButton) {
      const newsletterStorageKey = "salt-smoke-newsletter-email";
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const newsletterFeedback = document.getElementById("newsletterFeedback");
      newsletterForm.noValidate = true;
      newsletterInput.required = true;

      const existingNewsletterEmail = localStorage.getItem(newsletterStorageKey);
      if (existingNewsletterEmail) {
        newsletterInput.value = existingNewsletterEmail;
      }

      const updateNewsletterButtonState = () => {
        newsletterButton.disabled = newsletterInput.value.trim().length === 0;
      };

      const clearNewsletterValidity = () => {
        newsletterInput.setCustomValidity("");
        newsletterInput.removeAttribute("aria-invalid");
      };

      const validateNewsletterEmail = () => {
        const email = newsletterInput.value.trim();
        if (!email) {
          newsletterInput.setAttribute("aria-invalid", "true");
          newsletterInput.setCustomValidity("Please enter your email address to subscribe.");
          newsletterInput.reportValidity();
          showAlertMessage(
            newsletterFeedback,
            "danger",
            "Please enter your email address to subscribe to the newsletter."
          );
          newsletterInput.focus();
          return false;
        }

        if (!emailPattern.test(email)) {
          newsletterInput.setAttribute("aria-invalid", "true");
          newsletterInput.setCustomValidity("Please enter a valid email to subscribe.");
          newsletterInput.reportValidity();
          showAlertMessage(
            newsletterFeedback,
            "danger",
            "Please enter a valid email address so we can send your newsletter updates."
          );
          newsletterInput.focus();
          return false;
        }

        clearNewsletterValidity();
        return true;
      };

      const subscribe = () => {
        if (!validateNewsletterEmail()) {
          return;
        }

        const email = newsletterInput.value.trim();
        localStorage.setItem(newsletterStorageKey, email);
        showAlertMessage(
          newsletterFeedback,
          "success",
          `You're subscribed with ${email}. We'll send offers, news, and menu updates to this inbox.`
        );
        updateNewsletterButtonState();
      };

      newsletterForm.addEventListener("submit", event => {
        event.preventDefault();
        subscribe();
      });

      newsletterInput.addEventListener("input", () => {
        clearNewsletterValidity();
        hideAlertMessage(newsletterFeedback);
        updateNewsletterButtonState();
      });
      newsletterInput.addEventListener("change", updateNewsletterButtonState);
      updateNewsletterButtonState();
    }
  }

  const reservationSection = document.getElementById("reservation");
  const reservationConfirmation = document.getElementById("reservationConfirmation");
  if (reservationConfirmation) {
    const details = readReservationConfirmation();
    if (details) {
      sessionStorage.removeItem(reservationSuccessKey);
      const summaryParts = [];

      if (details.name) summaryParts.push(details.name);
      if (details.date) summaryParts.push(new Date(details.date).toLocaleDateString("en-GB"));
      if (details.guests) {
        summaryParts.push(`${details.guests} guest${details.guests === "1" ? "" : "s"}`);
      }

      showAlertMessage(
        reservationConfirmation,
        "success",
        summaryParts.length
          ? `Your reservation request for ${summaryParts.join(
              " • "
            )} has been received. We'll contact you shortly to confirm the details.`
          : "Your reservation request has been received. We'll contact you shortly to confirm the details."
      );
    } else {
      showAlertMessage(
        reservationConfirmation,
        "danger",
        "We couldn't find your reservation details. Please return to the form and submit it again."
      );
    }
  }
  const reservationForm = reservationSection
    ? reservationSection.querySelector("form")
    : null;

  if (!reservationForm) return;

  const nameInput = reservationForm.querySelector("#name");
  const emailInput = reservationForm.querySelector("#email");
  const dateInput = reservationForm.querySelector("#datetime");
  const peopleSelect = reservationForm.querySelector("#select1");
  const messageInput = reservationForm.querySelector("#message");
  const submitButton = reservationForm.querySelector('button[type="submit"], input[type="submit"]');
  const reservationFeedback = document.getElementById("reservationFeedback");

  reservationForm.noValidate = true;

  [nameInput, emailInput, dateInput, peopleSelect, messageInput].forEach(field => {
    if (!field) return;
    field.required = true;
  });
  if (nameInput) nameInput.minLength = 2;
  if (messageInput) messageInput.minLength = 5;

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

  const bookingButtonRow = submitButton ? submitButton.closest(".col-12") : null;
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

  const namePattern = /^[A-Za-z][A-Za-z\s'-]{1,}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const allowedGuestCounts = new Set(["1", "2", "3", "4"]);

  const isValidName = name => namePattern.test(name);
  const isValidEmail = email => emailPattern.test(email);
  const isValidDate = date => Boolean(date) && date >= today;
  const isValidGuestNumber = guests => allowedGuestCounts.has(guests);
  const isValidRequest = request => request.length >= 5;

  const validateReservationForm = () => {
    if (!nameInput || !emailInput || !dateInput || !peopleSelect || !messageInput) {
      return false;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const date = dateInput.value;
    const guests = peopleSelect.value;
    const request = messageInput.value.trim();

    if (!isValidName(name)) {
      nameInput.setCustomValidity("Please enter a valid full name.");
      nameInput.reportValidity();
      showAlertMessage(
        reservationFeedback,
        "danger",
        "Please enter your full name so we can confirm the booking."
      );
      nameInput.focus();
      return false;
    }
    nameInput.setCustomValidity("");

    if (!isValidEmail(email)) {
      emailInput.setCustomValidity("Please enter a valid email address.");
      emailInput.reportValidity();
      showAlertMessage(
        reservationFeedback,
        "danger",
        "Please enter a valid email address so we can send your confirmation."
      );
      emailInput.focus();
      return false;
    }
    emailInput.setCustomValidity("");

    if (!date) {
      dateInput.setCustomValidity("Please choose a reservation date.");
      dateInput.reportValidity();
      showAlertMessage(reservationFeedback, "danger", "Please choose a reservation date to continue.");
      dateInput.focus();
      return false;
    }

    if (!isValidDate(date)) {
      dateInput.setCustomValidity("Reservation date cannot be in the past.");
      dateInput.reportValidity();
      showAlertMessage(
        reservationFeedback,
        "danger",
        "Your reservation date must be today or later."
      );
      dateInput.focus();
      return false;
    }
    dateInput.setCustomValidity("");

    if (!isValidGuestNumber(guests)) {
      peopleSelect.setCustomValidity("Please select the number of guests.");
      peopleSelect.reportValidity();
      showAlertMessage(reservationFeedback, "danger", "Please select how many guests are coming.");
      peopleSelect.focus();
      return false;
    }
    peopleSelect.setCustomValidity("");

    if (!isValidRequest(request)) {
      messageInput.setCustomValidity("Please enter at least 5 characters for your request.");
      messageInput.reportValidity();
      showAlertMessage(
        reservationFeedback,
        "danger",
        "Please add at least 5 characters to your special request."
      );
      messageInput.focus();
      return false;
    }
    messageInput.setCustomValidity("");

    return true;
  };

  const isReservationFormReady = () => {
    if (!nameInput || !emailInput || !dateInput || !peopleSelect || !messageInput) {
      return false;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const date = dateInput.value;
    const guests = peopleSelect.value;
    const request = messageInput.value.trim();

    return (
      isValidName(name) &&
      isValidEmail(email) &&
      isValidDate(date) &&
      isValidGuestNumber(guests) &&
      isValidRequest(request)
    );
  };

  const updateSubmitButtonState = () => {
    if (!submitButton) return;
    submitButton.disabled = !isReservationFormReady();
  };

  const clearFieldValidity = field => {
    if (!field) return;
    field.setCustomValidity("");
  };

  reservationForm.addEventListener("submit", event => {
    if (!submitButton) {
      event.preventDefault();
      return;
    }

    if (!validateReservationForm()) {
      event.preventDefault();
      return;
    }

    sessionStorage.setItem(
      reservationSuccessKey,
      JSON.stringify({
        name: nameInput.value.trim(),
        date: dateInput.value,
        guests: peopleSelect.value
      })
    );
    [nameInput, emailInput, dateInput, peopleSelect, messageInput].forEach(clearFieldValidity);
    localStorage.removeItem(storageKey);
  });

  updateReservationSummary();
  updateSubmitButtonState();
  [nameInput, dateInput, peopleSelect].forEach(field => {
    if (!field) return;
    field.addEventListener("input", updateReservationSummary);
    field.addEventListener("change", updateReservationSummary);
  });
  [nameInput, emailInput, dateInput, peopleSelect, messageInput].forEach(field => {
    if (!field) return;
    field.addEventListener("input", () => clearFieldValidity(field));
    field.addEventListener("change", () => clearFieldValidity(field));
    field.addEventListener("input", () => hideAlertMessage(reservationFeedback));
    field.addEventListener("change", () => hideAlertMessage(reservationFeedback));
    field.addEventListener("input", updateSubmitButtonState);
    field.addEventListener("change", updateSubmitButtonState);
  });
});
