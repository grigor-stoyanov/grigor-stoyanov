import { logout } from "./api/data.js"
import {page} from "./lib.js"
const guestElements = document.querySelectorAll('.guest')
const userElements = document.querySelectorAll('.user')
const logoutBtn = document.getElementById('logoutBtn')
logoutBtn.addEventListener('click',()=>{
    logout()
    updateNav()
    page.redirect('/')
})

function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'))
}

function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data))
}

function clearUserData() {
    sessionStorage.removeItem('userData')
}


function updateNav() {
    if (getUserData() != null) {
        guestElements.forEach(e => e.style.display = 'none')
        userElements.forEach(e => e.style.display = 'inline-block')
    } else {
        guestElements.forEach(e => e.style.display = 'inline-block')
        userElements.forEach(e => e.style.display = 'none')
    }
}
function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}

export {
    getUserData,
    setUserData,
    clearUserData,
    updateNav,
    validateEmail
}