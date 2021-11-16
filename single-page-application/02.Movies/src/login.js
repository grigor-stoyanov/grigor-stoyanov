import { updateNav } from "./app.js"
import { showView } from "./helpers.js"
import { showHome } from "./home.js"

// initialisation
// - find section
// - detach section
const section = document.getElementById('form-login')
section.remove()
const form = section.querySelector('form')
form.addEventListener('submit', onLogin)
// display logic
export function showLogin() {
    showView(section)
}
async function onLogin(event) {
    event.preventDefault()
    const formData = new FormData(form)
    const email = formData.get('email').trim()
    const password = formData.get('password').trim()
    try {
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                email,
                password
            })
        })
        if (res.ok == false) {
            const error = await res.json()
            throw Error(error.message)
        }
        form.reset()
        const data = await res.json()
        sessionStorage.setItem('userData', JSON.stringify({
            email: data.email,
            id: data._id,
            token: data.accessToken
        }))
        updateNav()
        showHome()
    } catch (err) {
        alert(err.message)
    }

}