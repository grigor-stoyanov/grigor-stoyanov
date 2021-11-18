const { expect } = require("chai");
const { chromium } = require("playwright-core");

let browser, page;
describe('E2E tests', async () => {
    before(async () => { browser = await chromium.launch() })
    after(async () => { await browser.close() })
    beforeEach(async () => { page = await browser.newPage() })
    afterEach(async () => { await page.close })

    it('loads all books', async () => {
        await page.goto('http://127.0.0.1:5501/02.Book-Library/index.html')
        await page.waitForSelector('#loadBooks')
        await page.click('#loadBooks')
        await page.waitForResponse('http://localhost:3030/jsonstore/collections/books')
        const books = await page.innerText('tbody')
        expect(books).to.contains('Harry Potter and the Philosopher\'s Stone')
        expect(books).to.contains('C# Fundamentals')
    })

    it('adds new book sucessful', async () => {
        await page.goto('http://127.0.0.1:5501/02.Book-Library/index.html')
        await page.waitForSelector('#createForm')
        await page.fill('input[name="author"]', 'George R. R. Martin')
        await page.fill('input[name="title"]', "Game of Thrones")
        await page.click('text=Submit')
        const response = await page.waitForResponse('http://localhost:3030/jsonstore/collections/books')
        const postData = JSON.parse(response.request().postData())
        expect(postData.title).to.equal('Game of Thrones')
        expect(postData.author).to.equal('George R. R. Martin')
        await page.click('#loadBooks')
        await page.waitForResponse('http://localhost:3030/jsonstore/collections/books')
        const books = await page.innerText('tbody')
        expect(books).to.contains('Game of Thrones')
        expect(books).to.contains('George R. R. Martin')
    })

    it('add new book alert for empty fields', async () => {
        await page.goto('http://127.0.0.1:5501/02.Book-Library/index.html')
        await page.waitForSelector('#createForm')
        let alertMsg = ''
        page.on('dialog', async (dialog) => {
            alertMsg = dialog.message();
            await dialog.dismiss();
        })
        await page.click('#createForm button')
        expect(alertMsg).to.equal('All fields are required!')
    })

    it('edit button makes edit form visible', async () => {
        await page.goto('http://127.0.0.1:5501/02.Book-Library/index.html')
        await page.waitForSelector('#loadBooks')
        await page.click('#loadBooks')
        await page.waitForSelector('.editBtn')
        await page.click('.editBtn')
        const isVisible = await page.isVisible('#editForm')
        const title = await page.inputValue('#editForm input[name="title"]')
        const author = await page.inputValue('#editForm input[name="author"]')
        const isNotVisible = await page.isVisible('#createForm')
        expect(isVisible).to.be.true
        expect(isNotVisible).to.be.false
        expect(title).to.equal('Harry Potter and the Philosopher\'s Stone')
        expect(author).to.equal('J.K.Rowling')
    })
    it('editing book successful', async () => {
        await page.goto('http://127.0.0.1:5501/02.Book-Library/index.html')
        await page.waitForSelector('#loadBooks')
        await page.click('#loadBooks')title
        const response = await page.waitForResponse(/jsonstore\/collections\/books/i)
        const postData = JSON.parse(response.request().postData())
        const method = response.request().method()
        expect(method).to.equal('PUT')
        expect(postData.title).to.equal('foo')
        expect(postData.author).to.equal('bar')
        await page.click('#loadBooks')
        await page.waitForResponse('http://localhost:3030/jsonstore/collections/books')
        const books = await page.innerText('tbody')
        expect(books).to.contains('foo')
    })
    it('deleting book successful', async () => {
        await page.goto('http://127.0.0.1:5501/02.Book-Library/index.html')
        await page.waitForSelector('#loadBooks')
        await page.click('#loadBooks')
        await page.waitForSelector('.deleteBtn')
        const title = await page.textContent('tbody tr td')
        page.on('dialog',async (dialog)=>{
            await dialog.accept()
        })
        await page.click('.deleteBtn')
        const response = await page.waitForResponse(/jsonstore\/collections\/books/i)
        const method = response.request().method()
        expect(method).to.equal('DELETE')
        await page.click('#loadBooks')
        const books = await page.innerText('tbody')
        expect(books).to.not.contains(title)

    })
})