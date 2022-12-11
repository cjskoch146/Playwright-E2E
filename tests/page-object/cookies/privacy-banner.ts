import { expect, Locator, Page } from "@playwright/test";

export class PrivacyBanner {
  readonly page: Page;
  readonly acceptCookiesBtn: Locator;

  constructor(page: Page) {
    this.acceptCookiesBtn = page.getByRole("button", { name: "Accept" });
  }

  async acceptCookies() {
    await this.acceptCookiesBtn.waitFor({
      state: "visible",
      timeout: 5000, // generous timeout to potentially avoid some race conditions
    });
    await this.acceptCookiesBtn.click();
    await this.acceptCookiesBtn.waitFor({ state: "hidden" });
  }
}
