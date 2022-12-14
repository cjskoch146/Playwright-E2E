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
  readonly addToOrderBtn: Locator;
  readonly productInfoBtn: Locator;

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

    this.addToOrderBtn = this.productModal.locator(
      '[data-test-id="product-modal.submit"]'
    );

    this.productInfoBtn = page.getByRole("button", { name: "Product info" });
  }

  async searchForProduct(productName, amountOfResults) {
    await expect(this.productSearch).toBeVisible();
    await this.productSearch.fill(productName);

    await expect(this.menuItem).toHaveCount(amountOfResults);
    await expect(this.productName).toBeVisible();
    await expect(this.productName).toHaveText(productName);
    await this.page.waitForLoadState("networkidle", { timeout: 10000 });
    await this.menuItem.focus();
    let ele = '[data-test-id="MenuItemContentArea"]';
    await this.page.$eval(ele, (element) => {
      element.scrollIntoView();
    });
  }

  async checkProductInfoFrame(productTitle, partOfDescription) {
    const frame = this.page.frameLocator(
      '[data-test-id="product-modal"] iframe'
    );
    const productInfoTitle = frame.locator("h1");
    await expect(productInfoTitle).toHaveText(productTitle);
    const productInfoDescription = frame.getByText(partOfDescription);
    await expect(productInfoDescription).toBeVisible();
  }

  async checkCountryOfOrigin(
    countryOfOriginInLocale,
    manufacturerCountryInLocale
  ) {
    const frame = this.page.frameLocator(
      '[data-test-id="product-modal"] iframe'
    );
    const countryOfOrigin = frame.getByRole("heading", {
      name: `${countryOfOriginInLocale}`,
    });
    await expect(countryOfOrigin).toBeVisible();
    await expect(countryOfOrigin).toHaveText(countryOfOriginInLocale);

    const manufacturerCountry = frame.getByText(manufacturerCountryInLocale);
    await expect(manufacturerCountry).toBeVisible();
  }

  // async checkIngredients() {}

  async checkNutritionFactsTable(
    energyKJ,
    energyKCAL,
    fat,
    saturates,
    carbohydrate,
    sugars,
    protein,
    salt
  ) {
    const frame = this.page.frameLocator(
      '[data-test-id="product-modal"] iframe'
    );
    const nutrtionTable = frame.locator("ul > li");
    for (let i = 0; i < (await nutrtionTable.count()); i++) {
      // await expect(nutrtionTable.nth(i)).toBeVisible();
      await expect(nutrtionTable.nth(0)).toContainText(energyKJ + energyKCAL);
      await expect(nutrtionTable.nth(1)).toContainText(fat);
      await expect(nutrtionTable.nth(2)).toContainText(saturates);
      await expect(nutrtionTable.nth(3)).toContainText(carbohydrate);
      await expect(nutrtionTable.nth(4)).toContainText(sugars);
      await expect(nutrtionTable.nth(5)).toContainText(protein);
      await expect(nutrtionTable.nth(6)).toContainText(salt);
    }
  }
}
