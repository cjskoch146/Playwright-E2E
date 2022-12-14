// go one level deeper into the product itself
import { Products } from "./page-object/market-page/products";

import { test, expect } from "@playwright/test";

test.describe("User", () => {
  test("can learn more about a product", async ({ page }) => {
    await page.goto("", {
      waitUntil: "networkidle",
    });
    const products = new Products(page);
    await expect(products.menuGrid).toBeVisible();

    // can search for a specific product
    await products.searchForProduct(
      "Salemipina Kirschtomatensauce Bio 330g",
      1
    );

    // can click on product to see more information
    await products.menuItem.click();
    await expect(products.productModal).toBeVisible({
      timeout: 5000,
    });
    await expect(products.productModal).toContainText(
      "Salemipina Kirschtomatensauce Bio 330g"
    );
    await expect(products.itemImage).toBeVisible();
    await expect(products.itemUnitInfo).toContainText("330 g");
    await expect(products.unitPrice).toContainText("4.09 €/kg");
    await expect(products.productModal).toContainText(
      "Auch Basilikum und Olivenöl werden von diesem Unternehmen selbst hergestellt"
    );
    await expect(products.addToOrderBtn).toBeVisible();
    await expect(products.addToOrderBtn).toContainText("Add to order");
    await expect(products.addToOrderBtn).toBeEnabled();

    // can open "Product Info" and read more about the chosen product
    await products.productInfoBtn.click();
    await products.checkProductInfoFrame(
      "Salemipina Kirschtomatensauce Bio 330g",
      "Das sagt viel über den Ansatz aus, den dieser brillante kleine Sizilianer"
    );

    await products.checkIngredients(
      "Ingredients",
      `Extra Virgin 
    Olive Oil, sea salt, basil (0.3%), may 
    contain traces of celery and nuts`
    );
    await products.checkNutritions("Nutrition facts", "Amount per 100 g");
    await products.checkCountryOfOrigin("Country of origin", "Italien");
    await products.checkNutritionFactsTable(
      "307kJ",
      "73kcal",
      "3.5g",
      "0.5g",
      "9g",
      "9g",
      "1g",
      "1.1g"
    );
  });
});
