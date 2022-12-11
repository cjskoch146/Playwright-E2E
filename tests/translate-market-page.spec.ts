// go to specific page (beforeAll hook?)
// accept cookies via POM mehtod
// check that it is the right page
// (check that everyhing is loaded)
// use helper method to find translation
// check that an actual product has been translated
// done

import { PrivacyBanner } from "./page-object/cookies/privacy-banner";
import { TranslateWidget } from "./page-object/market-page/translate";
import { test, expect } from "@playwright/test";

test.describe("User", () => {
  test.beforeEach(async ({ page }) => {
    const privacyBanner = new PrivacyBanner(page);

    await page.goto("/en/deu/berlin/venue/wolt-market-danziger-strasse", {
      waitUntil: "networkidle",
    });
    await privacyBanner.acceptCookies();
  });

  test("can translate venue menu", async ({ page }) => {
    const translateWidget = new TranslateWidget(page);
    await expect(translateWidget.translationNotice).toBeVisible();
    await expect(translateWidget.translationNotice).toContainText(
      "This product offering is in German"
    );
    await expect(translateWidget.translateBtn).toBeVisible();
    await translateWidget.translateBtn.focus();
    await translateWidget.translateBtn.click();
    await expect(translateWidget.languageCombobox).toBeVisible();
    await translateWidget.languageCombobox.click();
    await translateWidget.languageCombobox.selectOption({ index: 1 });

    await expect(translateWidget.showOriginalLanguageBtn).toBeVisible();
    await expect(translateWidget.showOriginalLanguageBtn).toHaveText(
      "Show original"
    );
    await expect(translateWidget.translateBtn).not.toBeVisible();
    await expect(translateWidget.translationNotice).toContainText(
      "This product offering was translated from German to English by a machine."
    );
  });
});
