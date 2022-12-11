// go to specific page (beforeAll hook?)
// accept cookies via POM mehtod
// check that it is the right page
// (check that everyhing is loaded)
// use helper method to find translation
// check that an actual product has been translated
// done

import { PrivacyBanner } from "./page-object/cookies/privacy-banner";

import { test, expect } from "@playwright/test";

test.describe("User", () => {
  test.beforeEach(async ({ page }) => {
    const privacyBanner = new PrivacyBanner(page);

    await page.goto("/en/deu/berlin/venue/wolt-market-danziger-strasse");
    await privacyBanner.acceptCookies();
  });

  test("can translate venue menu", async ({ page }) => {
    await page
      .getByText(
        "This product offering is in German. Would you like to view a machine translation"
      )
      .click();
    await page.getByRole("button", { name: "Translate" }).click();
    await page.locator(".VenueInfoWidget__Root-sc-1yv52l9-0").click();
    await page.getByRole("button", { name: "Show original" }).click();
    await page.getByRole("button", { name: "Translate" }).click();
    await page
      .locator("#mainContent div")
      .filter({
        hasText:
          "NEW: archipel. 🤩NEW PRODUCTS 📢BBQ & Grills 🍗DEALS FRESH BERLIN BAKED GOODS 🥖",
      })
      .nth(2)
      .click({
        button: "right",
      });
  });
});
