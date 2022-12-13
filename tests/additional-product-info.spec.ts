// go to specific page (beforeAll hook?)
// accept cookies via POM mehtod
// check that it is the right page
// (check that everyhing is loaded)
// search for an available product
// pick a certain product
// open up product & and check that everything is there
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
    await expect(products.productModal).toBeVisible();
    await expect(products.productModal).toContainText(
      "Salemipina Kirschtomatensauce Bio 330g"
    );
    await expect(products.itemImage).toBeVisible();

    await expect(products.itemUnitInfo).toContainText("330 g");
    await expect(products.unitPrice).toContainText("4.09 €/kg");
  });
});
