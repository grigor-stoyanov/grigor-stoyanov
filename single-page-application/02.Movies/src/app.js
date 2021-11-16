import { showHome } from "./home.js"
import { showLogin } from "./login.js"
import { showRegister } from "./register.js"
// create placeholder modules for every view
// configurate navigation
// implement modules
// - create async functions
// - implement DOM logic
const nav = document.querySelector('nav')

const views = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister
}

document.getElementById('logoutBtn').addEventListener('click', onLogout)
nav.addEventListener('click', (event) => {
        if (event.target.tagName == 'A') {
            const view = views[event.target.id]
            if (typeof view == 'function') {
                event.preventDefault()
                view()
            }
        }
    })
    // Start application in home view (catalog)
updateNav()
showHome()

export function updateNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    
    if (userData != null) {
        nav.querySelector('#welcomeMsg').textContent = `Welcome, ${userData.email}` 
        Array.from(nav.querySelectorAll('.user')).forEach(e => e.style.display = 'block');
        Array.from(nav.querySelectorAll('.guest')).forEach(e => e.style.display = 'none');
    } else {
        Array.from(nav.querySelectorAll('.user')).forEach(e => e.style.display = 'none');
        Array.from(nav.querySelectorAll('.guest')).forEach(e => e.style.display = 'block');
    }
}
async function onLogout(event) {
    event.preventDefault()
    event.stopImmediatePropagation()
    const { token } = JSON.parse(sessionStorage.getItem('userData'))
    await fetch('http://localhost:3030/users/logout', {
        headers: {
            'X-Authorization': token
        }
    })
    sessionStorage.removeItem('userData')
    updateNav()
    showLogin()
}
// Order of views:
// x Catalog home(view)
// x login 
// x logout
// x register
// x create
// x details
// x likes
// x edit
// - delete