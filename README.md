## Descripton of setup:

### Install:

- clone the repo
- `cd` into it
- run `npm install` (`fnm use` if required)
- open the project with a Code Editior of your choice (I have used `VS Code`)

### Run tests:

- to run a specific tests run:

```bash
npx playwright test name-of-test.spec.ts
```

- for example: `npx playwright test additional-product-info.spec.ts`

### Why Playwright

After inspecting the page a bit more, I realized that I am dealing with `iframes`. This is the reason why I went for `Playwright` over other frameworks like `Cypress` as `Playwright`, in my humble experience, seems to get along with `iframes` quite a lot and also out of the box.

I am quite new to `Playwright` and `TypeScript`, but happy to challenge myself and learn more. I believe it is a great framework with very detailed information and examples, which makes it quite accessible.

Furthermore, `Playwright` is very simple to setup and does not require an engineer to spend a lot of time with setting up every little detail in order to start writing their first test.

### global-setup.ts

I am aware that `global-setup` is usually used to have "one login to rule them all". But since I noticed that the cookie consent banner will always show up, I have opted to accept cookies via the `global-setup`. That means, it will always run before any `spec.ts` files are run, and allows any engineer, in this specific setup, not to worry about the cookie consent banner.

Of course this could have been also resolved via a `method` that could be put into one of the `page-object` files, but that would still require an engineer to make that specific call in each test - with that specific scope.

The `global-setup.ts` will create the `storageState.json` file, which saves the required information regarding the cookies ( - which will not be `commited`).

### BaseURL

Under normal cicumstances, my BaseURL would point to: `https://wolt.com/` or `https://wolt.com/en/`. I would then utilize a reusable `method` that would search and go to that specific market.

Since that specific market cannot be searched for I have opted to use the full URL as `BaseURL` to simplify things a bit.

### Test approach and POM

I always strive to make my tests as reusable as possible. In the example of `additional-product-info.spec.ts` and the according POM `products.ts` file, I have gotten to a point where an engineer can reuse the methods inside of `products.ts` for any other test-scenario around the main `product-modal` iframe and `Product Infromation`. That means should an engineer need to write a test where they only need to check the manufacturer address or distributer information of a product, they can simply import the required methods into their test.

This will also work with different locales (in case they need to write a specific test e.g. in German), where they just need to enter the `name` as a string in the required locale. This will potentially prevent of rewriting methods/dublicating them because the `name` in `frame.getByRole` can be controlled from the `spec.ts` file itself.

### Encountered issues

#### Error 520

Throughout several test runs I have encountered `Error 520 - nginx` message which required me to re-start the test several times. I am not quite sure if it was a conincident or a legit issue, as I did not encounter it when I performed certain steps manually.

#### iframes

I have not worked with products that make heavy usage of `iframes` before. This required me to think a bit outside the box. I do realize that there were classes given inside the `iframe` of the `Product Info` but wanted not to rely on them too heavily as that would potentially be easily changed by engineers, while the Playwright locators are a bit more resilient. I do realize that they were unique to a certain extend, but would like to avoid running into false negatives later down in the line, in case they should change.

Of course it could have been an option to set unique `data-test-id`s, but that requires me to have actual access to the code base in order to set them where required. Plus, it would not be that close to acutal user behaviour.

#### Scrolling issues

I have ecountered some scrolling issues in certain scenarios e.g. when looking for the `Translate` button in the `translate-market-page.spec.ts` test or when looking for a cerain product and opening it in the `additional-product-info.spec.ts` test. It does seem that `Playwright` loops over the page several times before, eventually, finding the expected locator and performs an action on it. I was not able to figure out if it is coming from the framework itself or has something to do with the structure of the page.

Steps I have taken to counter that issue:

- `page.waitForLoadState("networkidle", { timeout: 10000 });`
  I assumed that this might come from the fact that a search action has been performed and the page needs a bit more time until it is fully ready. Unfortunately that was not really the case and did not solve the issue at hand, even with a generous timeout, that I would probably question in a code review.

- `.scrollIntoViewIfNeeded()`
  This does not solve the issue at hand directly, as `Playwright` does not force the scroll and scrolls by itself upon the next required action. That means `Playwright` will automatically scroll to the element, when e.g. it is being clicked, and if it is not in the viewport.

- `await this.page.$eval(ele, (element) => {
element.scrollIntoView();`

I have also tried to enforce a scroll via `page.$eval` (see example in `product.ts` line `58` to `61`). And while it does scroll to the element that is outside the viewport initially, `Playwright` will still do some scrolling upwards and downwards, before performing the next assertion.

Under normal cicumstances I would talk with a FrontEnd-engineer to see if it has something to do of how content is loaded (e.g. lazy loading) or if it is indeed an issue caused by the test framework itself.
