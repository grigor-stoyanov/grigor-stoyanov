const { chromium } = require("playwright-core");

// IIFE

(async () => {
    // we get an instance of the browser
    const browser = await chromium.launch({headless:false,slowMo:2000})
    // we get a new page instance (new tab)
    const page = await browser.newPage()
    // set an adresss to the page
    await page.goto('http://127.0.0.1:5500/')
    // take a screenshot of the page
    await page.screenshot({ path: 'accordion.png' })
    // close browser
    await page.close()
})()