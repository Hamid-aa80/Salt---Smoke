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
      - text: 
      - generic [ref=e8]:
        - link "Home" [ref=e9] [cursor=pointer]:
          - /url: index.html
        - link "About" [ref=e10] [cursor=pointer]:
          - /url: "#about"
        - link "Service" [ref=e11] [cursor=pointer]:
          - /url: "#service"
        - link "Menu" [ref=e12] [cursor=pointer]:
          - /url: "#menu"
        - link "Reservation" [ref=e13] [cursor=pointer]:
          - /url: "#reservation"
        - link "Contact" [ref=e14] [cursor=pointer]:
          - /url: "#contact"
    - generic [ref=e18]:
      - heading "Enjoy our Delicious Meal" [level=1] [ref=e19]:
        - text: Enjoy our
        - text: Delicious Meal
      - paragraph [ref=e20]: Experience the perfect blend of flavors and ambiance at Salt & Smoke, where culinary excellence meets warm hospitality. Indulge in our mouthwatering dishes crafted with passion and savor an unforgettable dining experience.
      - paragraph [ref=e21]: Experience the perfect blend of flavors and ambiance at Salt & Smoke, where culinary excellence meets warm hospitality. Indulge in our mouthwatering dishes crafted with passion and savor an unforgettable dining experience.
      - button "Book A Table" [ref=e22] [cursor=pointer]
    - generic [ref=e25]:
      - generic [ref=e26]: 
      - heading "World's best Chef" [level=5] [ref=e27]
      - paragraph [ref=e28]: Experience culinary excellence with our world-class chefs, crafting unforgettable flavors.
      - generic [ref=e29]: 
      - heading "Quality Food" [level=5] [ref=e30]
      - paragraph [ref=e31]: Indulge in the finest quality food, prepared with care and passion for an exceptional dining experience.
      - generic [ref=e32]: 
      - heading "Online Ordering" [level=5] [ref=e33]
      - paragraph [ref=e34]: Order your favorite dishes online and have them delivered to your doorstep with just a few clicks.
      - generic [ref=e35]: 
      - heading "24/7 Customer Support" [level=5] [ref=e36]
      - paragraph [ref=e37]: Our dedicated support team is available around the clock to assist you with any questions or concerns.
    - generic [ref=e39]:
      - generic [ref=e40]:
        - generic [ref=e47]:
          - heading "About Us" [level=5] [ref=e48]
          - heading "Welcome to  Salt & Smoke" [level=1] [ref=e49]:
            - text: Welcome to
            - generic [ref=e50]: 
            - text: Salt & Smoke
          - paragraph [ref=e51]: At Salt & Smoke, we are passionate about delivering an exceptional dining experience that tantalizes your taste buds and leaves you craving for more. Our culinary team combines creativity, skill, and the finest ingredients to craft dishes that are both visually stunning and bursting with flavor.
          - paragraph [ref=e52]: From the moment you step into our restaurant, you'll be greeted with warm hospitality and a cozy ambiance that sets the stage for an unforgettable meal. Whether you're joining us for a casual lunch, a romantic dinner, or a special celebration, we strive to create memories that linger long after the last bite.
          - generic [ref=e53]:
            - generic [ref=e55]:
              - heading "15" [level=1] [ref=e56]
              - generic [ref=e57]:
                - paragraph [ref=e58]: Years of
                - heading "Experience" [level=6] [ref=e59]
            - generic [ref=e61]:
              - heading "50" [level=1] [ref=e62]
              - generic [ref=e63]:
                - paragraph [ref=e64]: Popular
                - heading "Master Chefs" [level=6] [ref=e65]
          - link "Read More" [ref=e66] [cursor=pointer]:
            - /url: "#team"
        - generic [ref=e68]:
          - generic [ref=e69]:
            - heading "Menu" [level=5] [ref=e70]
            - heading "Most Popular Items" [level=1] [ref=e71]
            - paragraph [ref=e72]:
              - text: "Chef's pick today:"
              - strong [ref=e73]: Juicy Burger
              - text: £25
          - generic [ref=e74]:
            - generic [ref=e75]:
              - generic [ref=e76]:
                - generic [ref=e77]: Search the menu
                - searchbox "Search the menu" [ref=e78]
              - group "Filter menu items" [ref=e79]:
                - button "All" [pressed] [ref=e80] [cursor=pointer]
                - button "Breakfast" [ref=e81] [cursor=pointer]
                - button "Lunch" [ref=e82] [cursor=pointer]
                - button "Dinner" [ref=e83] [cursor=pointer]
                - button "Drinks" [ref=e84] [cursor=pointer]
                - button "Favourites" [disabled]
              - paragraph [ref=e85]: Save favourites to build your shortlist.
            - paragraph [ref=e87]: Showing 6 of 6 dishes
            - generic [ref=e90]:
              - generic [ref=e92]:
                - img "Juicy Burger" [ref=e93]
                - generic [ref=e94]:
                  - heading "Juicy Burger £25" [level=5] [ref=e95]:
                    - generic [ref=e96]: Juicy Burger
                    - generic [ref=e97]: £25
                  - generic [ref=e98]: A juicy burger with fresh ingredients and a perfectly grilled patty.
                - button "Save Juicy Burger to favourites" [ref=e99] [cursor=pointer]:
                  - generic [ref=e100]: 
                  - text: Save
              - generic [ref=e102]:
                - img "Grilled Salmon" [ref=e103]
                - generic [ref=e104]:
                  - heading "Grilled Salmon £30" [level=5] [ref=e105]:
                    - generic [ref=e106]: Grilled Salmon
                    - generic [ref=e107]: £30
                  - generic [ref=e108]: A thick salmon fillet rests on a cedar plank, its surface lacquered with a glossy ember‑glaze.
                - button "Save Grilled Salmon to favourites" [ref=e109] [cursor=pointer]:
                  - generic [ref=e110]: 
                  - text: Save
              - generic [ref=e112]:
                - img "Smoked Steak" [ref=e113]
                - generic [ref=e114]:
                  - heading "Smoked Steak £35" [level=5] [ref=e115]:
                    - generic [ref=e116]: Smoked Steak
                    - generic [ref=e117]: £35
                  - generic [ref=e118]: A succulent smoked steak, perfectly seared and infused with rich, smoky flavors.
                - button "Save Smoked Steak to favourites" [ref=e119] [cursor=pointer]:
                  - generic [ref=e120]: 
                  - text: Save
              - generic [ref=e122]:
                - img "English Breakfast" [ref=e123]
                - generic [ref=e124]:
                  - heading "English Breakfast £25" [level=5] [ref=e125]:
                    - generic [ref=e126]: English Breakfast
                    - generic [ref=e127]: £25
                  - generic [ref=e128]: A hearty English breakfast with eggs, bacon, sausages, and beans.
                - button "Save English Breakfast to favourites" [ref=e129] [cursor=pointer]:
                  - generic [ref=e130]: 
                  - text: Save
              - generic [ref=e132]:
                - img "Beer" [ref=e133]
                - generic [ref=e134]:
                  - heading "Beer £15" [level=5] [ref=e135]:
                    - generic [ref=e136]: Beer
                    - generic [ref=e137]: £15
                  - generic [ref=e138]: A refreshing pint of beer, perfect for pairing with your meal.
                - button "Save Beer to favourites" [ref=e139] [cursor=pointer]:
                  - generic [ref=e140]: 
                  - text: Save
              - generic [ref=e142]:
                - img "Coffee" [ref=e143]
                - generic [ref=e144]:
                  - heading "Coffee £5" [level=5] [ref=e145]:
                    - generic [ref=e146]: Coffee
                    - generic [ref=e147]: £5
                  - generic [ref=e148]: A rich and aromatic cup of coffee, perfect for a morning boost or an afternoon pick-me-up.
                - button "Save Coffee to favourites" [ref=e149] [cursor=pointer]:
                  - generic [ref=e150]: 
                  - text: Save
        - option "Select guests" [disabled] [selected]
        - option "Person 1"
        - option "Person 2"
        - option "Person 3"
        - option "Person 4"
      - generic [ref=e153]:
        - img "Team Member Image" [ref=e154]
        - img "Team Member Image" [ref=e155]
        - img "Team Member Image" [ref=e156]
        - img "Team Member Image" [ref=e157]
  - button "Back to top" [ref=e158] [cursor=pointer]:
    - generic [ref=e159]: 
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