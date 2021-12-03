import { page, render } from './lib.js'
import { showHomeView } from './views/home.js'
import { getUserData } from './helpers.js'
import { showLoginView } from './views/login.js'
import { showRegisterView } from './views/register.js'
import { logout } from './api/data.js'
import { showCreateView } from './views/create.js'
import { showAllMemesView } from './views/allMemes.js'
import { showDetailsView } from './views/details.js'
import { showEditView } from './views/edit.js'
import { showMyProfileView } from './views/profile.js'

const main = document.querySelector('main')
const userData = getUserData()
function updateUserNav() {
    const userData = getUserData()
    if (userData != null) {
        document.querySelector('nav .profile span').textContent = `Welcome, ${userData.email}`
        document.querySelector('nav .user').style.display = 'inline-block'
        document.querySelector('nav .guest').style.display = 'none'
    } else {
        document.querySelector('nav .user').style.display = 'none'
        document.querySelector('nav .guest').style.display = 'inline-block'
    }
}
document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout()
    page.redirect('/home')
})

function decorateContext(ctx, next) {
    ctx.render = (template) => render(template, main)
    ctx.updateUserNav = updateUserNav
    next()

}
page(decorateContext)
if (userData != null) {
    page.redirect('/', '/allMemes')
} else {
    page.redirect('/', '/home')
}
page('/home', showHomeView)
page('/login', showLoginView)
page('/register', showRegisterView)
page('/create', showCreateView)
page('/allMemes', showAllMemesView)
page('/details/:id', showDetailsView)
page('/edit/:id',showEditView)
page('/profile',showMyProfileView)
page.start()