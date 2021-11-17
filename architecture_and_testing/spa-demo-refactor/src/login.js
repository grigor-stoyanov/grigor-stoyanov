import * as api from './api/data.js'
import { showSection } from "./helpers.js";
import { showHomePage } from "./home.js";
const section = document.getElementById('loginSection')
section.remove()
const form = section.querySelector('#loginForm')
form.addEventListener('submit', onSubmit)
export function showLoginPage(ctx) {
    ctx.showSection(section)
}
async function onSubmit(event) {
    event.preventDefault()
    const formData = new FormData(form)
    const email = formData.get('email').trim()
    const pass = formData.get('password').trim()
    await api.login(email, password)
    updateUserNav()
    showHomePage()

}