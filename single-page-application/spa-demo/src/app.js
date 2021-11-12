import { showCatalog } from "./catalog.js"
import { showSection } from "./dom.js"
import { showAboutPage, showHomePage} from "./home.js"
import { showLoginPage } from "./login.js"
import { showRegisterPage } from "./register.js"
const main = document.querySelector('main')

document.getElementById('logoutBtn').addEventListener('click',onLogout)
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
const sections = {
    'homeBtn': showHomePage,
    'catalogBtn': showCatalog,
    'aboutBtn': showAboutPage,
    'loginBtn': showLoginPage,
    'registerBtn': showRegisterPage
}
function onNavigate(event) {
    if (event.target.tagName == 'A') {
        const view = sections[event.target.id]
        if (typeof view == 'function') {
            event.preventDefault()
            view()
        }
    }
}
// circular exports are bad practice
export function updateUserNav(){
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    if(userData!=null){
        document.getElementById('userNav').style.display = 'inline-block'
        document.getElementById('guestNav').style.display = 'none'
    }else{
        document.getElementById('userNav').style.display = 'none'
        document.getElementById('guestNav').style.display = 'inline-block'
    }
}
async function onLogout(event){
    event.stopImmediatePropagation()
    const {token} = JSON.parse(sessionStorage.getItem('userData'))
    await fetch('http://localhost:3030/users/logout',{
        headers:{
            'X-Authorization': token
        }
    })
    sessionStorage.removeItem('userData')
    updateUserNav()
    showHomePage()
}