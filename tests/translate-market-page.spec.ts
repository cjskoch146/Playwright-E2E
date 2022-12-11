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

  test("can translate venue menu", async ({ page }) => {});
});
