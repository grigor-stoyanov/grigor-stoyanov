import { updateUserNav } from "./app.js";
import { showSection } from "./dom.js";
import { showHomePage } from "./home.js";
const section = document.getElementById('registerSection')
section.remove()
const form = section.querySelector('#registerForm')
form.addEventListener('submit', onSubmit)
export function showRegisterPage() {
    showSection(section)
}
async function onSubmit(event) {
    event.preventDefault()
    const formData = new FormData(form)
    const email = formData.get('email').trim()
    const pass = formData.get('password').trim()
    const repass = formData.get('repass').trim()
    if(pass != repass){
        alert('Passwords don\'t match')
        return;
    }
    if(!pass||!email||!repass){
        alert('Please fill all fields!')
        return;
    }
    try {
        const res = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ 'email': email, 'pass    word': pass })
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