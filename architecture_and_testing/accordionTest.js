
const { chromium } = require("playwright-core");

const { chai, expect } = require("chai");


let browser, page;
describe('E2E tests', async function () {

    before(async () => { browser = await chromium.launch({ headless: false, slowMo: 2000 }); });

    after(async () => { await browser.close(); });

    beforeEach(async () => { page = await browser.newPage(); });

    afterEach(async () => { await page.close(); });

    it('initialLoad', async () => {
        await page.goto('http://127.0.0.1:5501/lab-01-accordion/index.html');
        // when there is throtling we can wait for certain elements/requests until we do our test
        await page.waitForSelector('.accordion')
        const content = await page.textContent('#main')
        expect(content).to.contains('Scalable Vector Graphics')
        expect(content).to.contains('Open standard')
        expect(content).to.contains('ALGOL')
        expect(content).to.contains('Unix')

    })
    it('more button works', async () => {
        await page.goto('http://127.0.0.1:5501/lab-01-accordion/index.html')
        await page.waitForSelector('.accordion')
        await page.click('text=More')
        await page.waitForResponse(/articles\/details/i)
        const visible = await page.isVisible('.accordion p')
        expect(visible).to.be.true
    })
    it('less button works', async () => {
        await page.goto('http://127.0.0.1:5501/lab-01-accordion/index.html')
        await page.waitForSelector('.accordion')
        await page.click('text=More')
        await page.waitForResponse(/articles\/details/i)
        await page.waitForSelector('.accordion p', { state: 'visible' })
        await page.click('text=Less')
        const visible = await page.isVisible('.accordion p')
        expect(visible).to.be.false
    })
    it.only('form test', async () => {
        await page.goto('http://127.0.0.1:5501/lab-01-accordion/index.html')
        await page.fill('[name="email"]', 'Peter')
        await page.waitForTimeout(60000)
    })
});