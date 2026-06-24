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
    let searchTerm = menuSearch ? normalizeText(menuSearch.value.trim()) : "";

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

    const updateMenuVisibility = () => {
      let visibleCount = 0;
      menuCards.forEach(card => {
        const menuName = normalizeText(getMenuCardName(card));
        const isVisible = !searchTerm || menuName.includes(searchTerm);
        card.classList.toggle("d-none", !isVisible);
        if (isVisible) visibleCount += 1;
      });

      if (menuVisibleCount) {
        menuVisibleCount.textContent = String(visibleCount);
      }

      if (menuEmptyState) {
        menuEmptyState.textContent = "No menu items matched your search.";
        menuEmptyState.classList.toggle("d-none", visibleCount !== 0);
      }
    };

    if (menuSearch) {
      menuSearch.addEventListener("input", () => {
        searchTerm = normalizeText(menuSearch.value.trim());
        updateMenuVisibility();
      });
    }

    updateMenuVisibility();
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

      const normalizeNewsletterEmail = email => email.trim().toLowerCase();
      const isValidNewsletterEmail = email => emailPattern.test(email);

      const updateNewsletterButtonState = () => {
        const email = normalizeNewsletterEmail(newsletterInput.value);
        newsletterButton.disabled = !isValidNewsletterEmail(email);
      };

      const clearNewsletterValidity = () => {
        newsletterInput.setCustomValidity("");
        newsletterInput.removeAttribute("aria-invalid");
      };

      const validateNewsletterEmail = () => {
        const email = normalizeNewsletterEmail(newsletterInput.value);
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

        if (!isValidNewsletterEmail(email)) {
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

        const email = normalizeNewsletterEmail(newsletterInput.value);
        const previousEmail = normalizeNewsletterEmail(localStorage.getItem(newsletterStorageKey) || "");
        newsletterInput.value = email;

        if (previousEmail && previousEmail === email) {
          showAlertMessage(
            newsletterFeedback,
            "info",
            `You're already subscribed with ${email}. We'll keep sending offers, news, and menu updates.`
          );
          updateNewsletterButtonState();
          return;
        }

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

  const feedbackTitle = Array.from(document.querySelectorAll("#contact h4.section-title")).find(
    title => title.textContent.trim() === "Feedback"
  );
  if (feedbackTitle) {
    const feedbackSection = feedbackTitle.closest(".col-lg-3");
    const feedbackForm = feedbackSection ? feedbackSection.querySelector("#feedbackForm") : null;
    const feedbackNameInput = feedbackForm ? feedbackForm.querySelector("#feedbackName") : null;
    const feedbackMessageInput = feedbackForm ? feedbackForm.querySelector("#feedbackMessage") : null;
    const feedbackImageInput = feedbackForm ? feedbackForm.querySelector("#feedbackImage") : null;
    const feedbackSubmitButton = feedbackForm ? feedbackForm.querySelector("#feedbackSubmitButton") : null;
    const feedbackPreview = feedbackForm ? feedbackForm.querySelector("#feedbackPreview") : null;
    const feedbackAlert = document.getElementById("feedbackFeedback");

    if (
      feedbackForm &&
      feedbackNameInput &&
      feedbackMessageInput &&
      feedbackImageInput &&
      feedbackSubmitButton &&
      feedbackPreview
    ) {
      const feedbackStorageKey = "salt-smoke-feedback-submissions";
      const maxImageSizeBytes = 2 * 1024 * 1024;
      const allowedImageTypes = new Set(["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]);
      feedbackForm.noValidate = true;
      feedbackMessageInput.required = true;
      feedbackImageInput.required = true;

      const setFeedbackFieldInvalid = (field, message) => {
        field.setAttribute("aria-invalid", "true");
        field.setCustomValidity(message);
      };
      const clearFeedbackFieldValidity = field => {
        field.removeAttribute("aria-invalid");
        field.setCustomValidity("");
      };

      const getSelectedImage = () =>
        feedbackImageInput.files && feedbackImageInput.files.length > 0 ? feedbackImageInput.files[0] : null;
      const isMessageValid = () => feedbackMessageInput.value.trim().length >= 10;
      const isImageFileValid = () => {
        const imageFile = getSelectedImage();
        if (!imageFile) return false;
        if (!allowedImageTypes.has(imageFile.type)) return false;
        if (imageFile.size > maxImageSizeBytes) return false;
        return true;
      };
      const isFeedbackFormReady = () => isMessageValid() && isImageFileValid();

      const updateFeedbackSubmitButtonState = () => {
        feedbackSubmitButton.disabled = !isFeedbackFormReady();
      };

      const readAsDataUrl = file =>
        new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
          reader.onerror = () => resolve("");
          reader.readAsDataURL(file);
        });

      const updateFeedbackImagePreview = async () => {
        const imageFile = getSelectedImage();
        if (!imageFile || !isImageFileValid()) {
          feedbackPreview.classList.add("d-none");
          feedbackPreview.removeAttribute("src");
          return;
        }

        const imageDataUrl = await readAsDataUrl(imageFile);
        if (!imageDataUrl) {
          feedbackPreview.classList.add("d-none");
          feedbackPreview.removeAttribute("src");
          return;
        }
        feedbackPreview.src = imageDataUrl;
        feedbackPreview.classList.remove("d-none");
      };

      const validateFeedbackForm = async () => {
        const feedbackMessage = feedbackMessageInput.value.trim();
        if (!feedbackMessage) {
          setFeedbackFieldInvalid(
            feedbackMessageInput,
            "Please share your feedback before sending your message."
          );
          feedbackMessageInput.reportValidity();
          showAlertMessage(feedbackAlert, "danger", "Please enter your feedback before sending.");
          feedbackMessageInput.focus();
          return false;
        }

        if (!isMessageValid()) {
          setFeedbackFieldInvalid(
            feedbackMessageInput,
            "Please provide at least 10 characters so we can understand your feedback."
          );
          feedbackMessageInput.reportValidity();
          showAlertMessage(
            feedbackAlert,
            "danger",
            "Please provide at least 10 characters in your feedback message."
          );
          feedbackMessageInput.focus();
          return false;
        }

        clearFeedbackFieldValidity(feedbackMessageInput);

        const imageFile = getSelectedImage();
        if (!imageFile) {
          setFeedbackFieldInvalid(feedbackImageInput, "Please attach an image with your feedback.");
          feedbackImageInput.reportValidity();
          showAlertMessage(feedbackAlert, "danger", "Please add an image to submit feedback.");
          feedbackImageInput.focus();
          return false;
        }

        if (!allowedImageTypes.has(imageFile.type)) {
          setFeedbackFieldInvalid(
            feedbackImageInput,
            "Please upload a JPG, PNG, GIF, or WebP image file."
          );
          feedbackImageInput.reportValidity();
          showAlertMessage(
            feedbackAlert,
            "danger",
            "Unsupported image format. Please upload a JPG, PNG, GIF, or WebP file."
          );
          feedbackImageInput.focus();
          return false;
        }

        if (imageFile.size > maxImageSizeBytes) {
          setFeedbackFieldInvalid(feedbackImageInput, "Image size must be 2MB or less.");
          feedbackImageInput.reportValidity();
          showAlertMessage(feedbackAlert, "danger", "Image is too large. Please upload an image up to 2MB.");
          feedbackImageInput.focus();
          return false;
        }

        clearFeedbackFieldValidity(feedbackImageInput);
        await updateFeedbackImagePreview();
        return true;
      };

      const saveFeedbackSubmission = async () => {
        const imageFile = getSelectedImage();
        if (!imageFile) return;

        const savedSubmissionsRaw = localStorage.getItem(feedbackStorageKey);
        let savedSubmissions = [];
        if (savedSubmissionsRaw) {
          try {
            savedSubmissions = JSON.parse(savedSubmissionsRaw);
          } catch (error) {
            localStorage.removeItem(feedbackStorageKey);
            savedSubmissions = [];
          }
        }
        const imageDataUrl = await readAsDataUrl(imageFile);
        savedSubmissions.push({
          name: feedbackNameInput.value.trim(),
          message: feedbackMessageInput.value.trim(),
          imageDataUrl,
          imageName: imageFile.name,
          submittedAt: new Date().toISOString()
        });

        const recentSubmissions = savedSubmissions.slice(-10);
        localStorage.setItem(feedbackStorageKey, JSON.stringify(recentSubmissions));
      };

      feedbackForm.addEventListener("submit", async event => {
        event.preventDefault();
        if (!(await validateFeedbackForm())) {
          updateFeedbackSubmitButtonState();
          return;
        }

        await saveFeedbackSubmission();
        showAlertMessage(feedbackAlert, "success", "Thanks for your feedback. Your message and image were sent.");
        feedbackForm.reset();
        feedbackPreview.classList.add("d-none");
        feedbackPreview.removeAttribute("src");
        clearFeedbackFieldValidity(feedbackMessageInput);
        clearFeedbackFieldValidity(feedbackImageInput);
        updateFeedbackSubmitButtonState();
      });

      feedbackMessageInput.addEventListener("input", () => {
        clearFeedbackFieldValidity(feedbackMessageInput);
        hideAlertMessage(feedbackAlert);
        updateFeedbackSubmitButtonState();
      });
      feedbackMessageInput.addEventListener("change", updateFeedbackSubmitButtonState);

      feedbackImageInput.addEventListener("change", async () => {
        clearFeedbackFieldValidity(feedbackImageInput);
        hideAlertMessage(feedbackAlert);
        await updateFeedbackImagePreview();
        updateFeedbackSubmitButtonState();
      });
      feedbackImageInput.addEventListener("input", updateFeedbackSubmitButtonState);
      feedbackNameInput.addEventListener("input", () => hideAlertMessage(feedbackAlert));
      updateFeedbackSubmitButtonState();
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
    updateDraftStatus(formatTime(new Date()));
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

  const draftStatus = document.createElement("p");
  draftStatus.className = "text-white-50 small mt-2 mb-0";
  draftStatus.setAttribute("aria-live", "polite");
  draftStatus.setAttribute("aria-atomic", "true");
  if (bookingButtonRow) {
    bookingButtonRow.appendChild(draftStatus);
  }

  const messageHint = document.createElement("p");
  messageHint.className = "text-white-50 small mt-2 mb-0";
  messageHint.id = "reservationMessageHint";
  messageHint.setAttribute("aria-live", "polite");
  messageHint.setAttribute("aria-atomic", "true");
  if (messageInput) {
    messageInput.insertAdjacentElement("afterend", messageHint);
    messageInput.setAttribute("aria-describedby", messageHint.id);
  }

  const suggestedSlotsHeading = document.createElement("p");
  suggestedSlotsHeading.className = "text-white-50 small mt-3 mb-2";
  suggestedSlotsHeading.textContent = "Suggested seating times";

  const suggestedSlotsRow = document.createElement("div");
  suggestedSlotsRow.className = "d-flex flex-wrap gap-2";
  suggestedSlotsRow.setAttribute("aria-live", "polite");
  suggestedSlotsRow.setAttribute("aria-atomic", "true");

  if (bookingButtonRow) {
    bookingButtonRow.appendChild(suggestedSlotsHeading);
    bookingButtonRow.appendChild(suggestedSlotsRow);
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

  const updateRequestHint = () => {
    if (!messageInput) return;
    const requestLength = messageInput.value.trim().length;
    const remainingCharacters = Math.max(0, 5 - requestLength);
    messageHint.textContent = remainingCharacters
      ? `${requestLength} characters entered (${remainingCharacters} more needed).`
      : `${requestLength} characters entered. Great detail for your request.`;
  };

  const formatTime = date => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const getSuggestedSlots = (dateValue, guestsValue) => {
    if (!dateValue || !guestsValue) return [];

    const reservationDate = new Date(`${dateValue}T00:00:00`);
    if (Number.isNaN(reservationDate.getTime())) return [];

    const day = reservationDate.getDay();
    const isWeekend = day === 0 || day === 6;
    const baseSlots = isWeekend
      ? ["10:30", "12:00", "14:00", "18:00", "20:30", "22:00"]
      : ["12:00", "13:30", "15:00", "18:00", "19:30", "21:00"];
    const slotStepMinutes = guestsValue === "4" ? 120 : guestsValue === "3" ? 90 : 60;

    const slots = baseSlots.map(slot => {
      const [hours, minutes] = slot.split(":").map(Number);
      const slotDate = new Date(`${dateValue}T00:00:00`);
      slotDate.setHours(hours, minutes, 0, 0);
      return slotDate;
    });

    const todayDate = new Date();
    const isSameDay = todayDate.toISOString().split("T")[0] === dateValue;
    const leadTimeThreshold = new Date(todayDate.getTime() + 60 * 60 * 1000);

    return slots
      .filter(slotDate => !isSameDay || slotDate >= leadTimeThreshold)
      .filter(slotDate => slotDate.getHours() >= 10 && slotDate.getHours() <= 22)
      .filter((_, index) => index % 2 === 0 || slotStepMinutes <= 90)
      .slice(0, 3)
      .map(formatTime);
  };

  const updateSuggestedSlots = () => {
    if (!bookingButtonRow) return;
    suggestedSlotsRow.textContent = "";

    const date = dateInput ? dateInput.value : "";
    const guests = peopleSelect ? peopleSelect.value : "";
    const suggestedSlots = getSuggestedSlots(date, guests);

    if (!suggestedSlots.length) {
      suggestedSlotsHeading.textContent = "Suggested seating times";
      const helpText = document.createElement("span");
      helpText.className = "badge bg-secondary";
      helpText.textContent = "Pick date and guests to see time suggestions";
      suggestedSlotsRow.appendChild(helpText);
      return;
    }

    suggestedSlotsHeading.textContent = "Suggested seating times for your booking";
    suggestedSlots.forEach(slot => {
      const badge = document.createElement("span");
      badge.className = "badge bg-primary";
      badge.textContent = slot;
      suggestedSlotsRow.appendChild(badge);
    });
  };

  const updateDraftStatus = timestamp => {
    if (!bookingButtonRow) return;
    draftStatus.textContent = timestamp
      ? `Draft saved at ${timestamp}`
      : "Your reservation details are saved as you type.";
  };

  const namePattern = /^[A-Za-z][A-Za-z\s'-]{1,}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const allowedGuestCounts = new Set(["1", "2", "3", "4"]);

  const isValidName = name => namePattern.test(name);
  const isValidEmail = email => emailPattern.test(email);
  const isValidDate = date => Boolean(date) && date >= today;
  const isValidGuestNumber = guests => allowedGuestCounts.has(guests);
  const isValidRequest = request => request.length >= 5;

  const setFieldInvalid = (field, message) => {
    if (!field) return;
    field.setAttribute("aria-invalid", "true");
    field.setCustomValidity(message);
  };

  const clearFieldValidity = field => {
    if (!field) return;
    field.removeAttribute("aria-invalid");
    field.setCustomValidity("");
  };

  const validateReservationField = (field, shouldReport = false) => {
    if (!field) return true;

    if (field === nameInput) {
      const name = nameInput.value.trim();
      if (!isValidName(name)) {
        setFieldInvalid(nameInput, "Please enter a valid full name.");
        if (shouldReport) nameInput.reportValidity();
        return false;
      }
      clearFieldValidity(nameInput);
      return true;
    }

    if (field === emailInput) {
      const email = emailInput.value.trim();
      if (!isValidEmail(email)) {
        setFieldInvalid(emailInput, "Please enter a valid email address.");
        if (shouldReport) emailInput.reportValidity();
        return false;
      }
      clearFieldValidity(emailInput);
      return true;
    }

    if (field === dateInput) {
      const date = dateInput.value;
      if (!date) {
        setFieldInvalid(dateInput, "Please choose a reservation date.");
        if (shouldReport) dateInput.reportValidity();
        return false;
      }
      if (!isValidDate(date)) {
        setFieldInvalid(dateInput, "Reservation date cannot be in the past.");
        if (shouldReport) dateInput.reportValidity();
        return false;
      }
      clearFieldValidity(dateInput);
      return true;
    }

    if (field === peopleSelect) {
      const guests = peopleSelect.value;
      if (!isValidGuestNumber(guests)) {
        setFieldInvalid(peopleSelect, "Please select the number of guests.");
        if (shouldReport) peopleSelect.reportValidity();
        return false;
      }
      clearFieldValidity(peopleSelect);
      return true;
    }

    if (field === messageInput) {
      const request = messageInput.value.trim();
      if (!isValidRequest(request)) {
        setFieldInvalid(messageInput, "Please enter at least 5 characters for your request.");
        if (shouldReport) messageInput.reportValidity();
        return false;
      }
      clearFieldValidity(messageInput);
      return true;
    }

    return true;
  };

  const validateReservationForm = () => {
    if (!nameInput || !emailInput || !dateInput || !peopleSelect || !messageInput) {
      return false;
    }

    if (!validateReservationField(nameInput, true)) {
      showAlertMessage(
        reservationFeedback,
        "danger",
        "Please enter your full name so we can confirm the booking."
      );
      nameInput.focus();
      return false;
    }

    if (!validateReservationField(emailInput, true)) {
      showAlertMessage(
        reservationFeedback,
        "danger",
        "Please enter a valid email address so we can send your confirmation."
      );
      emailInput.focus();
      return false;
    }

    if (!validateReservationField(dateInput, true)) {
      const hasDate = Boolean(dateInput.value);
      showAlertMessage(
        reservationFeedback,
        "danger",
        hasDate
          ? "Your reservation date must be today or later."
          : "Please choose a reservation date to continue."
      );
      dateInput.focus();
      return false;
    }

    if (!validateReservationField(peopleSelect, true)) {
      showAlertMessage(reservationFeedback, "danger", "Please select how many guests are coming.");
      peopleSelect.focus();
      return false;
    }

    if (!validateReservationField(messageInput, true)) {
      showAlertMessage(
        reservationFeedback,
        "danger",
        "Please add at least 5 characters to your special request."
      );
      messageInput.focus();
      return false;
    }

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
  updateRequestHint();
  updateSuggestedSlots();
  updateDraftStatus(null);
  updateSubmitButtonState();
  [nameInput, dateInput, peopleSelect].forEach(field => {
    if (!field) return;
    field.addEventListener("input", updateReservationSummary);
    field.addEventListener("change", updateReservationSummary);
  });
  [dateInput, peopleSelect].forEach(field => {
    if (!field) return;
    field.addEventListener("input", updateSuggestedSlots);
    field.addEventListener("change", updateSuggestedSlots);
  });
  if (messageInput) {
    messageInput.addEventListener("input", updateRequestHint);
    messageInput.addEventListener("change", updateRequestHint);
  }
  [nameInput, emailInput, dateInput, peopleSelect, messageInput].forEach(field => {
    if (!field) return;
    field.addEventListener("blur", () => validateReservationField(field, true));
    field.addEventListener("input", () => clearFieldValidity(field));
    field.addEventListener("change", () => validateReservationField(field));
    field.addEventListener("input", () => hideAlertMessage(reservationFeedback));
    field.addEventListener("change", () => hideAlertMessage(reservationFeedback));
    field.addEventListener("input", updateSubmitButtonState);
    field.addEventListener("change", updateSubmitButtonState);
  });
});
