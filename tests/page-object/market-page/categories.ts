import { expect, Locator, Page } from "@playwright/test";

export class Categories {
  readonly page: Page;
  readonly categoryList: Locator;

  constructor(page: Page) {
    this.categoryList = page.locator('[data-test-id="Categories"]');
  }

  async checkCategoryListLocale(category1, category2, category3) {
    await expect(this.categoryList).toContainText(category1);
    await expect(this.categoryList).toContainText(category2);
    await expect(this.categoryList).toContainText(category3);
  }
}
