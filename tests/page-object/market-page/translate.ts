import { Locator, Page } from "@playwright/test";

export class TranslateWidget {
  readonly page: Page;
  readonly translationNotice: Locator;
  readonly translateBtn: Locator;
  readonly showOriginalLanguageBtn: Locator;
  readonly languageCombobox: Locator;
  readonly languageDropdown: Locator;

  constructor(page: Page) {
    this.translationNotice = page.locator(
      ".Venue__VenueInfoWidgetWrapper-sc-3kit60-4"
    );
    this.translateBtn = page.getByRole("button", { name: "Translate" });
    this.showOriginalLanguageBtn = page.getByRole("button", {
      name: "Show original",
    });
    this.languageCombobox = page.getByRole("combobox", { name: "Language" });
    this.languageDropdown = page.locator("label", {
      hasText: "Automatic translations",
    });
  }
}
