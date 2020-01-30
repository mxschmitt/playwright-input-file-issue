const { chromium } = require('playwright')
const path = require("path")

const delay = t => new Promise(resolve => setTimeout(resolve, t));

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage("file://" + path.join(__dirname, "example.html"));

  await Promise.all([
    new Promise(resolve =>
      page.once('filechooser', async ({ element }) => {
        await element.setInputFiles('./example.html')
        resolve()
      }),
    ),
    page.click('input[type=file]'),
  ])

  // stay open
  await delay(99999)
  await browser.close();
})();