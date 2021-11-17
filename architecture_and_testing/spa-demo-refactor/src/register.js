import { register } from "./api/api.js";
import { updateUserNav } from "./app.js";
import { showSection } from "./helpers.js";
import { showHomePage } from "./home.js";
const section = document.getElementById('registerSection')
section.remove()
const form = section.querySelector('#registerForm')
form.addEventListener('submit', onSubmit)
export function showRegisterPage(ctx) {
    ctx.showSection(section)
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
    await register(email,pass)
} 