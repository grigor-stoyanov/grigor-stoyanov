import { page, render } from "./lib.js"
import { getUserData, loadMovieCtx } from "./util.js"
import { catalogPage } from "./views/catalog.js"
import { createPage } from "./views/create.js"
import { detailsPage } from "./views/details.js"
import { editPage } from "./views/edit.js"
import { loginPage } from "./views/login.js"
import { registerPage } from "./views/register.js"

const root = document.querySelector('main')
// cxt will be added to every page
page(decorateContext)
page('/home', catalogPage)
page('/create', createPage)
page('/edit/:id',loadMovieCtx, editPage)
page('/login', loginPage)
page('/register', registerPage)
page('/details/:id',loadMovieCtx, detailsPage)
page.redirect('/index.html', '/home')
page.redirect('/', '/home')
updateUserNav()
page.start()
function decorateContext(ctx, next) {
    // the page context recieves render attribute which calls render function by catalog page
    // context is kept within the page func and injected onto catalogPage func with main as root
    ctx.render = (template) => render(template, root)
    // next calls for the next callback in page
    // we can add any function useful to the different modules
    ctx.updateUserNav = updateUserNav
    next()
}
function updateUserNav() {
    const userData = getUserData()
    if (userData) {
        document.getElementById('welcomeMsg').textContent = `Welcome, ${userData.email}`
        Array.from(document.querySelectorAll('nav .user')).forEach(e => e.style.display = 'block')

        Array.from(document.querySelectorAll('nav .guest')).forEach(e => e.style.display = 'none')
    } else {

        Array.from(document.querySelectorAll('nav .user')).forEach(e => e.style.display = 'none')

        Array.from(document.querySelectorAll('nav .guest')).forEach(e => e.style.display = 'block')
    }
}