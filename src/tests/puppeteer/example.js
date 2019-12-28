const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ['--disable-extensions'],
    headless: false
  });
  const page = await browser.newPage();
  await page.goto('https://www.google.com/');
  // await page.screenshot({path:'example.png'});

  await browser.close();
})();
