import { logout } from "./api/data.js"
import { getUserData } from "./helpers.js"
import { page, render } from "./lib.js"
import { createView } from "./views/create.js"
import { dashboardView } from "./views/dashboard.js"
import { detailsView } from "./views/details.js"
import { editView } from "./views/edit.js"
import { loginView } from "./views/login.js"
import { registerView } from "./views/register.js"
import { profileView } from "./views/profile.js"
const main = document.querySelector('main')
document.getElementById('logoutBtn').addEventListener('click', () => {
    logout()
    updateUserNav()
    page.redirect('/dashboard')
})
function updateUserNav() {
    if (getUserData() != null) {
        document.querySelector('#user span').textContent = `Welcome, ${getUserData().email}`
        document.getElementById('guest').style.display = 'none'
        document.getElementById('user').style.display = 'inline-block'
    } else {
        document.getElementById('guest').style.display = 'inline-block'
        document.getElementById('user').style.display = 'none'
    }
}
function decorateContext(ctx, next) {
    ctx.render = (template) => render(template, main)
    ctx.updateUserNav = updateUserNav
    next()
}
updateUserNav()
page(decorateContext)
page('/dashboard', dashboardView)
page('/login', loginView)
page('/register', registerView)
page('/details/:id', detailsView)
page('/create', createView)
page('/edit/:id', editView)
page('/profile', profileView)
page.redirect('/', '/dashboard')
page.start()
