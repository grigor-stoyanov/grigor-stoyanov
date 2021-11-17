// 3 types of testing
// unit testig different functionalities - result of a function or independant unit of code
// integration test - cover communication between modules weather data is correctly interepreted
// end-to-end - cover all steps from user acction ui db and back
// playwrith - tool for end to end testing of headless browser
// user input is simulated and result is monitoreds

const { chromium } = require("playwright-core");

// we usually combine it with a test framework like mocha and chai
const { chai } = require("chai");
let browser, page;
describe('E2E tests', function() {
    // open browser before test
    before(async () => { browser = await chromium.launch(); });
    // close browser after test
    after(async () => { await browser.close(); });
    // before every test open new tab
    beforeEach(async () => { page = await browser.newPage(); });
    // close tab after every test
    afterEach(async () => { await page.close(); });
    
    });

// separating concerns - SOLID principles
// parts of application performs actions on various domains
// leads to high coupling
// limit a unit of code to single domain i.e only visualisation
// implementations is abstract from details - does not concern itsself with source of data
// 