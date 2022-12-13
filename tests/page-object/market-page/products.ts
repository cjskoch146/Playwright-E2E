// method to go to a certain page, so far it seems that the URL is the only way to go to that specific one?
// method to translate
// method to look up and click a certain product
import { expect, Locator, Page } from "@playwright/test";

export class Products {
  readonly page: Page;
  readonly menuGrid: Locator;
  readonly productSearch: Locator;
  readonly menuItem: Locator;
  readonly productName: Locator;
  readonly productModal: Locator;
  readonly itemImage: Locator;
  readonly itemUnitInfo: Locator;
  readonly unitPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuGrid = page.getByRole("region", { name: "grid" });
    this.productSearch = page.getByLabel("Search");

    // product item
    this.menuItem = page.locator('[data-test-id="MenuItemContentArea"]');
    this.productName = this.menuItem.locator('[data-test-id="menu-item.name"]');

    // product modal overlay
    this.productModal = page.locator('[data-test-id="product-modal"]');
    this.itemImage = this.productModal.locator("img");

    this.itemUnitInfo = this.productModal.locator(
      '[data-test-id="product-modal.unit-info"]'
    );
    this.unitPrice = this.productModal.locator(
      '[data-test-id="product-modal.unit-price"]'
    );
  }

  async searchForProduct(productName, amountOfResults) {
    await expect(this.productSearch).toBeVisible();
    await this.productSearch.fill(productName);
    // await this.page.keyboard.down("PageDown"); // kind of works but hackish
    // consider:
    //     await page.$eval(ele, (element) => {
    //     element.scrollIntoView();
    // });
    await expect(this.menuItem).toHaveCount(amountOfResults);
    await expect(this.productName).toBeVisible();
    await expect(this.productName).toHaveText(productName);
  }
}
