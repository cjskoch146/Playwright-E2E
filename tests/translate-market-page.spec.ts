// go to specific page (beforeAll hook?)
// accept cookies via POM mehtod
// check that it is the right page
// (check that everyhing is loaded)
// use helper method to find translation
// check that an actual product has been translated
// done

// import { PrivacyBanner } from "./page-object/cookies/privacy-banner";
import { TranslateWidget } from "./page-object/market-page/translate";
import { test, expect } from "@playwright/test";

test.describe("User", () => {
  test("can translate venue menu", async ({ page }) => {
    await page.goto("", {
      waitUntil: "networkidle",
    });

    // user can see that translation is possible
    const translateWidget = new TranslateWidget(page);
    await expect(translateWidget.translationNotice).toBeVisible();
    await expect(translateWidget.translationNotice).toContainText(
      "This product offering is in German"
    );

    // user can translate to English
    await expect(translateWidget.translateBtn).toBeVisible();
    await translateWidget.translateBtn.focus();
    await translateWidget.translateBtn.click();
    await expect(translateWidget.languageCombobox).toBeVisible();
    await translateWidget.languageCombobox.click();
    await translateWidget.languageCombobox.selectOption({ index: 1 });

    // user can see that translation notice has been updated
    await expect(translateWidget.showOriginalLanguageBtn).toBeVisible();
    await expect(translateWidget.showOriginalLanguageBtn).toHaveText(
      "Show original"
    );
    await expect(translateWidget.translateBtn).not.toBeVisible();
    await expect(translateWidget.translationNotice).toContainText(
      "This product offering was translated from German to English by a machine."
    );

    // can see that "Categories" has been updated to English
  });
});
