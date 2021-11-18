
const { chromium } = require("playwright-core");

const { chai, expect } = require("chai");


let browser, page;
describe('E2E tests', async function () {

    before(async () => { browser = await chromium.launch() });

    after(async () => { await browser.close(); });

    beforeEach(async () => { page = await browser.newPage(); });

    afterEach(async () => { await page.close(); });

    it('loads all messages', async () => {
        await page.goto('http://127.0.0.1:5501/01.Messenger/index.html');
        await page.waitForSelector('#controls')
        await page.click('#refresh')
        await page.waitForResponse(/jsonstore\/messenger/)
        const content = await page.inputValue('#messages')
        expect(content).to.contains(
            'Spami: Hello, are you there?\nGarry: Yep, whats up :?\nSpami: How are you? Long time no see? :)\nGeorge: Hello, guys! :))\nSpami: Hello, George nice to see you! :)))')
    })

    it('sends message to server', async () => {
        await page.goto('http://127.0.0.1:5501/01.Messenger/index.html')
        await page.waitForSelector('#controls')
        await page.fill('#author', 'someone'),
        await page.fill('#content', 'something')
        await page.click('#submit')
        const response = await page.waitForResponse(/jsonstore\/messenger/)
        const postData = JSON.parse(response.request().postData())
        expect(postData.author).to.equal('someone')
        expect(postData.content).to.equal('something')
    })
})