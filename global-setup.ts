// global-setup.ts
import { chromium, FullConfig } from "@playwright/test";
import { PrivacyBanner } from "./tests/page-object/cookies/privacy-banner";

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const privacyBanner = new PrivacyBanner(page);

  await page.goto(baseURL!);
  await privacyBanner.acceptCookies();
  await page.context().storageState({ path: storageState });
  await browser.close();
}

export default globalSetup;
