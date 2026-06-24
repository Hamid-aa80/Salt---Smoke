import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const reservedConsoleMessages = [
  /Download the React DevTools/i,
  /favicon/i
];

const runtimeErrorsByPage = new WeakMap<Page, { pageErrors: string[]; consoleErrors: string[] }>();

test.beforeEach(async ({ page }) => {
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];
  runtimeErrorsByPage.set(page, { pageErrors, consoleErrors });

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
});

test.afterEach(async ({ page }) => {
  const runtimeErrors = runtimeErrorsByPage.get(page);
  expect(runtimeErrors?.pageErrors ?? [], (runtimeErrors?.pageErrors ?? []).join("\n")).toEqual([]);
  expect(runtimeErrors?.consoleErrors ?? [], (runtimeErrors?.consoleErrors ?? []).join("\n")).toEqual([]);
});

test("handles valid reservation and newsletter input", async ({ page }) => {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  await page.locator("#reservationForm").scrollIntoViewIfNeeded();

  const reservationSubmit = page.locator("#reservationForm button[type=\"submit\"]");
  await expect(reservationSubmit).toBeDisabled();

  await page.getByLabel("Your Name").fill("Jordan Smith");
  await page.getByLabel("Your Email").fill("jordan@example.com");
  await page.locator("#datetime").fill(tomorrow);
  await page.locator("#select1").selectOption("2");
  await page.getByLabel("Special Request").fill("Window table please");

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
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  await page.locator("#reservationForm").scrollIntoViewIfNeeded();
  const reservationForm = page.locator("#reservationForm");

  await reservationForm.dispatchEvent("submit", { bubbles: true, cancelable: true });
  await expect(page.getByRole("alert")).toContainText("Please enter your full name");

  await page.getByLabel("Your Name").fill("Jordan Smith");
  await page.getByLabel("Your Email").fill("invalid-email");
  await page.locator("#datetime").fill(yesterday);
  await page.locator("#select1").selectOption("2");
  await page.getByLabel("Special Request").fill("Hi");

  await reservationForm.dispatchEvent("submit", { bubbles: true, cancelable: true });
  await expect(page.getByRole("alert")).toContainText("Please enter a valid email address");

  await page.getByLabel("Your Email").fill("jordan@example.com");
  await reservationForm.dispatchEvent("submit", { bubbles: true, cancelable: true });
  await expect(page.getByRole("alert")).toContainText("must be today or later");

  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  await page.locator("#datetime").fill(tomorrow);
  await reservationForm.dispatchEvent("submit", { bubbles: true, cancelable: true });
  await expect(page.getByRole("alert")).toContainText("at least 5 characters");
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

test("remains responsive across common breakpoints", async ({ page }) => {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1366, height: 900 }
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page.locator(".navbar")).toBeVisible();
    await page.locator("#reservationForm").scrollIntoViewIfNeeded();
    await expect(page.locator("#reservationForm")).toBeVisible();
    await page.locator("#menu").scrollIntoViewIfNeeded();
    await expect(page.locator("#menu")).toBeVisible();
  }
});

test("stays responsive on mobile and keeps navigation usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
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

  const brokenAnchors = [];
  const invalidLocalTargets = [];
  for (const link of links) {
    if (link.startsWith("#")) {
      const id = link.slice(1);
      if (id && (await page.locator(`#${id}`).count()) === 0) {
        brokenAnchors.push(link);
      }
      continue;
    }

    if (link.startsWith("mailto:") || link.startsWith("tel:") || link.startsWith("https://")) {
      continue;
    }

    const response = await page.request.get(new URL(link, page.url()).toString());
    if (!response.ok()) {
      invalidLocalTargets.push(`${link} -> ${response.status()}`);
    }
  }

  expect(brokenAnchors, brokenAnchors.join("\n")).toEqual([]);
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

test("restores reservation draft after reload (bug-fix regression)", async ({ page }) => {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  await page.locator("#reservationForm").scrollIntoViewIfNeeded();
  await page.getByLabel("Your Name").fill("Draft Name");
  await page.getByLabel("Your Email").fill("draft@example.com");
  await page.locator("#datetime").fill(tomorrow);
  await page.locator("#select1").selectOption("3");
  await page.getByLabel("Special Request").fill("Draft request details");
  await page.reload();
  await page.waitForLoadState("networkidle");
  await page.locator("#reservationForm").scrollIntoViewIfNeeded();

  await expect(page.getByLabel("Your Name")).toHaveValue("Draft Name");
  await expect(page.getByLabel("Your Email")).toHaveValue("draft@example.com");
  await expect(page.locator("#datetime")).toHaveValue(tomorrow);
  await expect(page.locator("#select1")).toHaveValue("3");
  await expect(page.getByLabel("Special Request")).toHaveValue("Draft request details");
});

test("handles duplicate newsletter subscription without errors (bug-fix regression)", async ({ page }) => {
  await page.locator("#newsletterForm").scrollIntoViewIfNeeded();
  const newsletterEmail = page.locator("#newsletterEmail");
  const newsletterButton = page.getByRole("button", { name: /sign up/i });
  const newsletterFeedback = page.locator("#newsletterFeedback");

  await newsletterEmail.fill("newsletter@example.com");
  await newsletterButton.click();
  await expect(newsletterFeedback).toContainText("You're subscribed with newsletter@example.com");

  await newsletterButton.click();
  await expect(newsletterFeedback).toContainText("already subscribed with newsletter@example.com");
});

test("shows fallback feedback when reservation confirmation is missing (bug-fix regression)", async ({
  page
}) => {
  await page.goto("/submit.html");
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("alert")).toContainText("couldn't find your reservation details");
});
