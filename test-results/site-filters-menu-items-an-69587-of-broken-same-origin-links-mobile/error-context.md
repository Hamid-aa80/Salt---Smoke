# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site.spec.ts >> filters menu items and keeps the page free of broken same-origin links
- Location: tests/site.spec.ts:79:1

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Breakfast' }) resolved to 2 elements:
    1) <button type="button" aria-pressed="false" data-menu-filter="breakfast" class="btn btn-outline-primary">Breakfast</button> aka getByRole('button', { name: 'Breakfast', exact: true })
    2) <button type="button" aria-pressed="false" class="btn btn-sm btn-outline-primary" title="Save English Breakfast to favourites" aria-label="Save English Breakfast to favourites">…</button> aka getByRole('button', { name: 'Save English Breakfast to' })

Call log:
  - waiting for getByRole('button', { name: 'Breakfast' })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - navigation [ref=e3]:
      - link " Salt & Smoke" [ref=e4] [cursor=pointer]:
        - /url: index.html
        - heading " Salt & Smoke" [level=1] [ref=e5]:
          - generic [ref=e6]: 
          - text: Salt & Smoke
      - button "Toggle navigation" [ref=e7] [cursor=pointer]:
        - generic [ref=e8]: 
    - generic [ref=e12]:
      - heading "Enjoy our Delicious Meal" [level=1] [ref=e13]:
        - text: Enjoy our
        - text: Delicious Meal
      - paragraph [ref=e14]: Experience the perfect blend of flavors and ambiance at Salt & Smoke, where culinary excellence meets warm hospitality. Indulge in our mouthwatering dishes crafted with passion and savor an unforgettable dining experience.
      - paragraph [ref=e15]: Experience the perfect blend of flavors and ambiance at Salt & Smoke, where culinary excellence meets warm hospitality. Indulge in our mouthwatering dishes crafted with passion and savor an unforgettable dining experience.
      - button "Book A Table" [ref=e16] [cursor=pointer]
    - generic [ref=e19]:
      - generic [ref=e20]: 
      - heading "World's best Chef" [level=5] [ref=e21]
      - paragraph [ref=e22]: Experience culinary excellence with our world-class chefs, crafting unforgettable flavors.
      - generic [ref=e23]: 
      - heading "Quality Food" [level=5] [ref=e24]
      - paragraph [ref=e25]: Indulge in the finest quality food, prepared with care and passion for an exceptional dining experience.
      - generic [ref=e26]: 
      - heading "Online Ordering" [level=5] [ref=e27]
      - paragraph [ref=e28]: Order your favorite dishes online and have them delivered to your doorstep with just a few clicks.
      - generic [ref=e29]: 
      - heading "24/7 Customer Support" [level=5] [ref=e30]
      - paragraph [ref=e31]: Our dedicated support team is available around the clock to assist you with any questions or concerns.
    - generic [ref=e33]:
      - generic [ref=e34]:
        - generic [ref=e41]:
          - heading "About Us" [level=5] [ref=e42]
          - heading "Welcome to  Salt & Smoke" [level=1] [ref=e43]:
            - text: Welcome to
            - generic [ref=e44]: 
            - text: Salt & Smoke
          - paragraph [ref=e45]: At Salt & Smoke, we are passionate about delivering an exceptional dining experience that tantalizes your taste buds and leaves you craving for more. Our culinary team combines creativity, skill, and the finest ingredients to craft dishes that are both visually stunning and bursting with flavor.
          - paragraph [ref=e46]: From the moment you step into our restaurant, you'll be greeted with warm hospitality and a cozy ambiance that sets the stage for an unforgettable meal. Whether you're joining us for a casual lunch, a romantic dinner, or a special celebration, we strive to create memories that linger long after the last bite.
          - generic [ref=e47]:
            - generic [ref=e49]:
              - heading "15" [level=1] [ref=e50]
              - generic [ref=e51]:
                - paragraph [ref=e52]: Years of
                - heading "Experience" [level=6] [ref=e53]
            - generic [ref=e55]:
              - heading "50" [level=1] [ref=e56]
              - generic [ref=e57]:
                - paragraph [ref=e58]: Popular
                - heading "Master Chefs" [level=6] [ref=e59]
          - link "Read More" [ref=e60] [cursor=pointer]:
            - /url: "#team"
        - generic [ref=e62]:
          - generic [ref=e63]:
            - heading "Menu" [level=5] [ref=e64]
            - heading "Most Popular Items" [level=1] [ref=e65]
            - paragraph [ref=e66]:
              - text: "Chef's pick today:"
              - strong [ref=e67]: Juicy Burger
              - text: £25
          - generic [ref=e68]:
            - generic [ref=e69]:
              - generic [ref=e70]:
                - generic [ref=e71]: Search the menu
                - searchbox "Search the menu" [ref=e72]
              - group "Filter menu items" [ref=e73]:
                - button "All" [pressed] [ref=e74] [cursor=pointer]
                - button "Breakfast" [ref=e75] [cursor=pointer]
                - button "Lunch" [ref=e76] [cursor=pointer]
                - button "Dinner" [ref=e77] [cursor=pointer]
                - button "Drinks" [ref=e78] [cursor=pointer]
                - button "Favourites" [disabled]
              - paragraph [ref=e79]: Save favourites to build your shortlist.
            - paragraph [ref=e81]: Showing 6 of 6 dishes
            - generic [ref=e84]:
              - generic [ref=e86]:
                - img "Juicy Burger" [ref=e87]
                - generic [ref=e88]:
                  - heading "Juicy Burger £25" [level=5] [ref=e89]:
                    - generic [ref=e90]: Juicy Burger
                    - generic [ref=e91]: £25
                  - generic [ref=e92]: A juicy burger with fresh ingredients and a perfectly grilled patty.
                - button "Save Juicy Burger to favourites" [ref=e93] [cursor=pointer]:
                  - generic [ref=e94]: 
                  - text: Save
              - generic [ref=e96]:
                - img "Grilled Salmon" [ref=e97]
                - generic [ref=e98]:
                  - heading "Grilled Salmon £30" [level=5] [ref=e99]:
                    - generic [ref=e100]: Grilled Salmon
                    - generic [ref=e101]: £30
                  - generic [ref=e102]: A thick salmon fillet rests on a cedar plank, its surface lacquered with a glossy ember‑glaze.
                - button "Save Grilled Salmon to favourites" [ref=e103] [cursor=pointer]:
                  - generic [ref=e104]: 
                  - text: Save
              - generic [ref=e106]:
                - img "Smoked Steak" [ref=e107]
                - generic [ref=e108]:
                  - heading "Smoked Steak £35" [level=5] [ref=e109]:
                    - generic [ref=e110]: Smoked Steak
                    - generic [ref=e111]: £35
                  - generic [ref=e112]: A succulent smoked steak, perfectly seared and infused with rich, smoky flavors.
                - button "Save Smoked Steak to favourites" [ref=e113] [cursor=pointer]:
                  - generic [ref=e114]: 
                  - text: Save
              - generic [ref=e116]:
                - img "English Breakfast" [ref=e117]
                - generic [ref=e118]:
                  - heading "English Breakfast £25" [level=5] [ref=e119]:
                    - generic [ref=e120]: English Breakfast
                    - generic [ref=e121]: £25
                  - generic [ref=e122]: A hearty English breakfast with eggs, bacon, sausages, and beans.
                - button "Save English Breakfast to favourites" [ref=e123] [cursor=pointer]:
                  - generic [ref=e124]: 
                  - text: Save
              - generic [ref=e126]:
                - img "Beer" [ref=e127]
                - generic [ref=e128]:
                  - heading "Beer £15" [level=5] [ref=e129]:
                    - generic [ref=e130]: Beer
                    - generic [ref=e131]: £15
                  - generic [ref=e132]: A refreshing pint of beer, perfect for pairing with your meal.
                - button "Save Beer to favourites" [ref=e133] [cursor=pointer]:
                  - generic [ref=e134]: 
                  - text: Save
              - generic [ref=e136]:
                - img "Coffee" [ref=e137]
                - generic [ref=e138]:
                  - heading "Coffee £5" [level=5] [ref=e139]:
                    - generic [ref=e140]: Coffee
                    - generic [ref=e141]: £5
                  - generic [ref=e142]: A rich and aromatic cup of coffee, perfect for a morning boost or an afternoon pick-me-up.
                - button "Save Coffee to favourites" [ref=e143] [cursor=pointer]:
                  - generic [ref=e144]: 
                  - text: Save
        - option "Select guests" [disabled] [selected]
        - option "Person 1"
        - option "Person 2"
        - option "Person 3"
        - option "Person 4"
      - generic [ref=e147]:
        - img "Team Member Image" [ref=e148]
        - img "Team Member Image" [ref=e149]
        - img "Team Member Image" [ref=e150]
        - img "Team Member Image" [ref=e151]
  - button "Back to top" [ref=e152] [cursor=pointer]:
    - generic [ref=e153]: 
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | 
  3   | const reservedConsoleMessages = [
  4   |   /Download the React DevTools/i,
  5   |   /favicon/i
  6   | ];
  7   | 
  8   | test.beforeEach(async ({ page }) => {
  9   |   const pageErrors: string[] = [];
  10  |   const consoleErrors: string[] = [];
  11  | 
  12  |   page.on("pageerror", error => {
  13  |     pageErrors.push(error.message);
  14  |   });
  15  | 
  16  |   page.on("console", message => {
  17  |     if (message.type() === "error") {
  18  |       const text = message.text();
  19  |       if (!reservedConsoleMessages.some(pattern => pattern.test(text))) {
  20  |         consoleErrors.push(text);
  21  |       }
  22  |     }
  23  |   });
  24  | 
  25  |   await page.goto("/");
  26  |   await page.waitForLoadState("networkidle");
  27  | 
  28  |   expect(pageErrors, pageErrors.join("\n")).toEqual([]);
  29  |   expect(consoleErrors, consoleErrors.join("\n")).toEqual([]);
  30  | });
  31  | 
  32  | test("handles valid reservation and newsletter input", async ({ page }) => {
  33  |   await page.locator("#reservationForm").scrollIntoViewIfNeeded();
  34  |   await page.getByLabel("Your Name").fill("Jordan Smith");
  35  |   await page.getByLabel("Your Email").fill("jordan@example.com");
  36  |   await page.locator("#datetime").fill("2030-06-24");
  37  |   await page.locator("#select1").selectOption("2");
  38  |   await page.getByLabel("Special Request").fill("Window table please");
  39  | 
  40  |   const reservationSubmit = page.locator("#reservationForm button[type=\"submit\"]");
  41  |   await expect(reservationSubmit).toBeEnabled();
  42  | 
  43  |   await reservationSubmit.click();
  44  |   await expect(page).toHaveURL(/submit\.html(\?.*)?$/);
  45  |   await expect(page.getByRole("alert")).toContainText("Your reservation request for Jordan Smith");
  46  | 
  47  |   await page.goto("/");
  48  |   await page.locator("#newsletterForm").scrollIntoViewIfNeeded();
  49  |   await page.locator("#newsletterEmail").fill("newsletter@example.com");
  50  |   await page.getByRole("button", { name: /sign up/i }).click();
  51  |   await expect(page.getByRole("alert")).toContainText("You're subscribed with newsletter@example.com");
  52  | });
  53  | 
  54  | test("rejects invalid reservation input with clear feedback", async ({ page }) => {
  55  |   await page.locator("#reservationForm").scrollIntoViewIfNeeded();
  56  |   const reservationForm = page.locator("#reservationForm");
  57  |   await reservationForm.dispatchEvent("submit", { bubbles: true, cancelable: true });
  58  |   await expect(page.getByRole("alert")).toContainText("Please enter your full name");
  59  | 
  60  |   await page.getByLabel("Your Name").fill("Jo");
  61  |   await page.getByLabel("Your Email").fill("invalid-email");
  62  |   await page.locator("#datetime").fill("2020-01-01");
  63  |   await page.getByLabel("Special Request").fill("Hi");
  64  | 
  65  |   await reservationForm.dispatchEvent("submit", { bubbles: true, cancelable: true });
  66  |   await expect(page.getByRole("alert")).toContainText("Please enter a valid email address");
  67  | });
  68  | 
  69  | test("stays responsive on mobile and keeps navigation usable", async ({ page }) => {
  70  |   await page.setViewportSize({ width: 390, height: 844 });
  71  |   await expect(page.locator(".navbar-toggler")).toBeVisible();
  72  |   await page.locator(".navbar-toggler").click();
  73  |   await expect(page.locator("#navbarCollapse")).toHaveClass(/show/);
  74  | 
  75  |   await page.getByRole("link", { name: "Menu" }).click();
  76  |   await expect(page.locator("#menu")).toBeInViewport();
  77  | });
  78  | 
  79  | test("filters menu items and keeps the page free of broken same-origin links", async ({ page }) => {
  80  |   await page.locator("#menu").scrollIntoViewIfNeeded();
> 81  |   await page.getByRole("button", { name: "Breakfast" }).click();
      |                                                         ^ Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Breakfast' }) resolved to 2 elements:
  82  |   await expect(page.locator('[data-menu-name="English Breakfast"]')).toBeVisible();
  83  |   await expect(page.locator('[data-menu-name="Juicy Burger"]')).toBeHidden();
  84  | 
  85  |   const links = await page.locator("a[href]").evaluateAll(elements =>
  86  |     elements
  87  |       .map(element => element.getAttribute("href"))
  88  |       .filter((href): href is string => Boolean(href))
  89  |   );
  90  | 
  91  |   const invalidLocalTargets = [];
  92  |   for (const link of links) {
  93  |     if (
  94  |       link.startsWith("#") ||
  95  |       link.startsWith("mailto:") ||
  96  |       link.startsWith("tel:") ||
  97  |       link.startsWith("https://")
  98  |     ) {
  99  |       continue;
  100 |     }
  101 | 
  102 |     const response = await page.request.get(new URL(link, page.url()).toString());
  103 |     if (!response.ok()) {
  104 |       invalidLocalTargets.push(`${link} -> ${response.status()}`);
  105 |     }
  106 |   }
  107 | 
  108 |   expect(invalidLocalTargets, invalidLocalTargets.join("\n")).toEqual([]);
  109 | });
  110 | 
  111 | test("saves favourite menu items and filters to them", async ({ page }) => {
  112 |   await page.locator("#menu").scrollIntoViewIfNeeded();
  113 | 
  114 |   const burgerFavouriteButton = page.getByRole("button", { name: /save juicy burger to favourites/i });
  115 |   await burgerFavouriteButton.click();
  116 | 
  117 |   await expect(page.getByText("1 favourite dish saved")).toBeVisible();
  118 |   await expect(page.getByRole("button", { name: /favourites \(1\)/i })).toBeEnabled();
  119 | 
  120 |   await page.getByRole("button", { name: /favourites \(1\)/i }).click();
  121 |   await expect(page.locator('[data-menu-name="Juicy Burger"]')).toBeVisible();
  122 |   await expect(page.locator('[data-menu-name="Grilled Salmon"]')).toBeHidden();
  123 | });
  124 | 
```