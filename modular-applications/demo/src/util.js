import { logout } from "./api/data.js"
import { render, page } from "./lib.js"

const main = document.querySelector('main')
const guestElements = document.querySelectorAll('.guest')
const userElements = document.querySelectorAll('.user')
const logoutBtn = document.getElementById('logoutBtn')


logoutBtn.addEventListener('click', async () => {
    await logout()
    updateNav()
    page.redirect('/')
})

function updateNav() {
    if (getUserData() != null) {
        guestElements.forEach(e => e.style.display = 'none')
        userElements.forEach(e => e.style.display = 'inline-block')
    } else {
        guestElements.forEach(e => e.style.display = 'inline-block')
        userElements.forEach(e => e.style.display = 'none')
    }
}

function decorateContext(ctx, next) {
    ctx.render = (template) => render(template, main)
    ctx.updateNav = updateNav
    next()

}


function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'))
}

function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data))
}

function clearUserData() {
    sessionStorage.removeItem('userData')
}

function parseQueryString(string) {
    const params = string
        .split('&')
        .map(p => p.split('='))
        .reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {})
    return params
}

function createSubmitHandler(callback, ...fieldNames) {
    return function (event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const result = {}
        for (let field of fieldNames) {
            result[field] = formData.get(field).trim()
        }
        callback(result,event)
    }
}
export {
    getUserData,
    setUserData,
    clearUserData,
    decorateContext,
    parseQueryString,
    createSubmitHandler,
    updateNav
}