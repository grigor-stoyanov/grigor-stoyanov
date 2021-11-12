import { showSection } from "./dom.js";
import { showHomePage } from "./home.js";
const section = document.getElementById('loginSection')
section.remove()
const form = section.querySelector('#loginForm')
form.addEventListener('submit', onSubmit)
export function showLoginPage() {
    showSection(section)
}
async function onSubmit(event) {
    event.preventDefault()
    const formData = new FormData(form)
    const email = formData.get('email').trim()
    const pass = formData.get('password').trim()
    try {
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ 'email': email, 'password': pass })
        })
        if (res.ok == false) {
            const error = await res.json()
            throw Error(error.message)
        }
        const data = await res.json()
        const userData = {
            username: data.username,
            id: data._id,
            token: data.accessToken
        }
        sessionStorage.setItem('userData',JSON.stringify(userData))
        updateUserNav()
        showHomePage()
    } catch (err) {
        alert(err.message)
    }
}