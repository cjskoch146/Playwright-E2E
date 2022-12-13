import { TranslateWidget } from "./page-object/market-page/translate";
import { Categories } from "./page-object/market-page/categories";
import { Products } from "./page-object/market-page/products";

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
    await translateWidget.translateBtn.scrollIntoViewIfNeeded();
    await translateWidget.translateBtn.click();
    // above step can seem to be a bit flaky but will always successfully pass
    // under different circumstances I would probably see if adding a unique data-test-id would help
    // performing these steps via keyboard navigation e.g. via element.focus() and page.keyboard.press("Space") seems to run a bit more fluent

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

    // user can see that the menu grid has been updated
    const products = new Products(page);
    await expect(products.menuGrid).toContainText(
      "Archipel is the networking project launched by the Albatross Bakery"
    );

    // can see that "Categories" has been updated to English
    const categories = new Categories(page);

    await categories.checkCategoryListLocale(
      "NEW PRODUCTS",
      "SAUSAGES & COLD CUTS",
      "HEALTH & SPORT"
    );
  });
});
