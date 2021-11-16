import { showView } from "./helpers.js"
import { updateNav } from "./app.js"

// initialisation
// - find section
// - detach section
const section = document.getElementById('form-sign-up')
section.remove()
// display logic

const form = section.querySelector('form')
form.addEventListener('submit', onRegister)

export function showRegister() {
    showView(section)
}
async function onRegister(event) {
    event.preventDefault()
    const formData = new FormData(form)
    const email = formData.get('email').trim()
    const password = formData.get('password').trim()
    const repeat = formData.get('repeatPassword').trim()
    try {
        if(password != repeat){
            throw Error('Passwords don\'t match!')
        }
        const res = await fetch('http://localhost:3030/users/register', {
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