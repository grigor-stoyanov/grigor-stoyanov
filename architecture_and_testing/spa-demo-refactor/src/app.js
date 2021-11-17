import { showCatalog } from "./catalog.js"
import { showSection } from "./helpers.js"
import { showAboutPage, showHomePage } from "./home.js"
import { showLoginPage } from "./login.js"
import { showRegisterPage } from "./register.js"
const main = document.querySelector('main')

document.getElementById('logoutBtn').addEventListener('click', onLogout)
document.querySelector('nav').addEventListener('click', onNavigate)
// function onNavigate(event){
//         if(event.target.tagName=='BUTTON'){
//             switch(event.target.id){
//                 case 'homeBtn':
//                 main.innerHTML = '<h1>Home Page</h1><p>Home page content</p>'
//                 break
//                 case 'catalogBtn':
//                 main.innerHTML = '<h1>Catalog Page</h1><ul><li>Product1</li><li>Product2</li><li>Product3</li></ul>'
//                 break
//                 case 'aboutBtn':
//                 main.innerHTML = '<h1>About Page</h1><p>Contact information</p><p>Phone: +1-555-7985</p>'
//                 break
//             }
//         }
// }
// start application in home view
showHomePage()
updateUserNav()
const views = {
    'home': showHomePage,
    'catalog': showCatalog,
    'about': showAboutPage,
    'login': showLoginPage,
    'register': showRegisterPage
}
const links = {
    'homeBtn': 'home',
    'catalogBtn': 'catalog',
    'aboutBtn': 'about',
    'loginBtn': 'login',
    'registerBtn': 'register'
}

ctx = {
    updateUserNav,
    goTo,
    showSection
}
function goTo(name, ...params) {
    const view = views[name]
    if (typeof view == 'function') {
        view(ctx,...params)
    }
}
function onNavigate(event) {
    if (event.target.tagName == 'A') {
        const name = links[event.target.id]
        if (name) {
            event.preventDefault()
            goTo(name)
        }
    }
}
// circular exports are bad practice
export function updateUserNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    if (userData != null) {
        document.getElementById('userNav').style.display = 'inline-block'
        document.getElementById('guestNav').style.display = 'none'
    } else {
        document.getElementById('userNav').style.display = 'none'
        document.getElementById('guestNav').style.display = 'inline-block'
    }
}
async function onLogout(event) {
    event.stopImmediatePropagation()
    await logout();
    updateUserNav()
    showHomePage()
}