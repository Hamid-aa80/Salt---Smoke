import { expect, test } from "@playwright/test";

const reservedConsoleMessages = [
  /Download the React DevTools/i,
  /favicon/i
];

test.beforeEach(async ({ page }) => {
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];

  page.on("pageerror", error => {
    pageErrors.push(error.message);
  });

  page.on("console", message => {
    if (message.type() === "error") {
      const text = message.text();
      if (!reservedConsoleMessages.some(pattern => pattern.test(text))) {
        consoleErrors.push(text);
      }
    }
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  expect(pageErrors, pageErrors.join("\n")).toEqual([]);
  expect(consoleErrors, consoleErrors.join("\n")).toEqual([]);
});

test("handles valid reservation and newsletter input", async ({ page }) => {
  await page.locator("#reservationForm").scrollIntoViewIfNeeded();
  await page.getByLabel("Your Name").fill("Jordan Smith");
  await page.getByLabel("Your Email").fill("jordan@example.com");
  await page.locator("#datetime").fill("2030-06-24");
  await page.locator("#select1").selectOption("2");
  await page.getByLabel("Special Request").fill("Window table please");

  const reservationSubmit = page.locator("#reservationForm button[type=\"submit\"]");
  await expect(reservationSubmit).toBeEnabled();

  await reservationSubmit.click();
  await expect(page).toHaveURL(/submit\.html(\?.*)?$/);
  await expect(page.getByRole("alert")).toContainText("Your reservation request for Jordan Smith");

  await page.goto("/");
  await page.locator("#newsletterForm").scrollIntoViewIfNeeded();
  await page.locator("#newsletterEmail").fill("newsletter@example.com");
  await page.getByRole("button", { name: /sign up/i }).click();
  await expect(page.getByRole("alert")).toContainText("You're subscribed with newsletter@example.com");
});

test("rejects invalid reservation input with clear feedback", async ({ page }) => {
  await page.locator("#reservationForm").scrollIntoViewIfNeeded();
  const reservationForm = page.locator("#reservationForm");
  await reservationForm.dispatchEvent("submit", { bubbles: true, cancelable: true });
  await expect(page.getByRole("alert")).toContainText("Please enter your full name");

  await page.getByLabel("Your Name").fill("Jo");
  await page.getByLabel("Your Email").fill("invalid-email");
  await page.locator("#datetime").fill("2020-01-01");
  await page.getByLabel("Special Request").fill("Hi");

  await reservationForm.dispatchEvent("submit", { bubbles: true, cancelable: true });
  await expect(page.getByRole("alert")).toContainText("Please enter a valid email address");
});

test("rejects invalid newsletter input with clear feedback", async ({ page }) => {
  await page.locator("#newsletterForm").scrollIntoViewIfNeeded();
  const newsletterForm = page.locator("#newsletterForm");
  const newsletterFeedback = page.locator("#newsletterFeedback");

  await newsletterForm.dispatchEvent("submit", { bubbles: true, cancelable: true });
  await expect(newsletterFeedback).toContainText("Please enter your email address to subscribe");

  await page.locator("#newsletterEmail").fill("invalid-email");
  await newsletterForm.dispatchEvent("submit", { bubbles: true, cancelable: true });
  await expect(newsletterFeedback).toContainText("Please enter a valid email address");
});

test("stays responsive on mobile and keeps navigation usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator(".navbar-toggler")).toBeVisible();
  await page.locator(".navbar-toggler").click();
  await expect(page.locator("#navbarCollapse")).toHaveClass(/show/);

  await page.getByRole("link", { name: "Menu" }).click();
  await expect(page.locator("#menu")).toBeInViewport();
});

test("filters menu items and keeps the page free of broken same-origin links", async ({ page }) => {
  await page.locator("#menu").scrollIntoViewIfNeeded();
  await page.locator('[data-menu-filter="breakfast"]').click();
  await expect(page.locator('[data-menu-name="English Breakfast"]')).toBeVisible();
  await expect(page.locator('[data-menu-name="Juicy Burger"]')).toBeHidden();

  const links = await page.locator("a[href]").evaluateAll(elements =>
    elements
      .map(element => element.getAttribute("href"))
      .filter((href): href is string => Boolean(href))
  );

  const invalidLocalTargets = [];
  for (const link of links) {
    if (
      link.startsWith("#") ||
      link.startsWith("mailto:") ||
      link.startsWith("tel:") ||
      link.startsWith("https://")
    ) {
      continue;
    }

    const response = await page.request.get(new URL(link, page.url()).toString());
    if (!response.ok()) {
      invalidLocalTargets.push(`${link} -> ${response.status()}`);
    }
  }

  expect(invalidLocalTargets, invalidLocalTargets.join("\n")).toEqual([]);
});

test("saves favourite menu items and filters to them", async ({ page }) => {
  await page.locator("#menu").scrollIntoViewIfNeeded();

  const burgerFavouriteButton = page.getByRole("button", { name: /save juicy burger to favourites/i });
  await burgerFavouriteButton.click();

  await expect(page.getByText("1 favourite dish saved")).toBeVisible();
  await expect(page.getByRole("button", { name: /favourites \(1\)/i })).toBeEnabled();

  await page.getByRole("button", { name: /favourites \(1\)/i }).click();
  await expect(page.locator('[data-menu-name="Juicy Burger"]')).toBeVisible();
  await expect(page.locator('[data-menu-name="Grilled Salmon"]')).toBeHidden();
});
