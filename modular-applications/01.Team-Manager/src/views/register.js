import { register } from '../api/data.js'
import { validateEmail } from '../helpers.js'
import { html } from '../lib.js'


const registerTemplate = (onSubmit, validationError,message) => html`
<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form @submit=${onSubmit} id="register-form" class="main-form pad-large">
            ${(validationError) ? html`<div class="error">${message}</div>` : null}
            <label>E-mail: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
        </footer>
    </article>
</section>`


export function registerView(ctx) {
    function update(onSubmit,validationError,message) {
        ctx.render(registerTemplate(onSubmit, validationError,message))
    }
    update(onSubmit)
    async function onSubmit(ev) {
        ev.preventDefault()
        const formData = new FormData(ev.target)
        const [email, username, password, repass] = [...formData.values()].map(e => e.trim())
        try {
            if (!email || !username || !password || !repass) {
                throw {error:'All fields are required'}
            }
            if (password != repass) {
                throw {error:'Password don\'t match!'}
            }
            if (!validateEmail(email)) {
                throw {error:'Email not Valid!'}
            }
            if (username.length < 3 || password.length < 3 || repass.length<3) {
                throw {error:'At least 3 Characters/digit are required!'}
            }
            await register(email, password, username)
            ctx.updateNav()
            ctx.page.redirect('/')
        } catch(err) {
            update(onSubmit,true,err.error)
        }
        
    }
}