// create helper function/method to always accept cookies
import { expect, Locator, Page } from "@playwright/test";

export class PrivacyBanner {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly privacyPolicyUrl: Locator;
  readonly gettingStartedHeader: Locator;
  readonly pomLink: Locator;
  readonly tocList: Locator;
  readonly acceptCookiesBtn: Locator;

  constructor(page: Page) {
    this.acceptCookiesBtn = page.getByRole("button", { name: "Accept" });
  }

  async acceptCookies() {
    await this.acceptCookiesBtn.waitFor({
      state: "visible",
      timeout: 5000,
    });
    await this.acceptCookiesBtn.click();
    await this.acceptCookiesBtn.waitFor({ state: "hidden" });
  }
}
