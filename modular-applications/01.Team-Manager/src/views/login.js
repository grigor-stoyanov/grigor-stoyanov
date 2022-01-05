import { login } from '../api/data.js'
import { showModal } from '../common/modal.js'
import { validateEmail } from '../helpers.js'
import { html } from '../lib.js'


const loginTemplate = (onSubmit, validationError, message, modal) => html`
${modal}
<section id="login">
    <article class="narrow">
        <header class="pad-med">
            <h1>Login</h1>
        </header>
        <form @submit=${onSubmit} id="login-form" class="main-form pad-large">
            ${(validationError) ? html`<div class="error">${message}</div>` : null}
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <input class="action cta" type="submit" value="Sign In">
        </form>
        <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
        </footer>
    </article>
</section>
`

export function loginView(ctx) {
    function update(onSubmit, validationError, message, modal) {
        ctx.render(loginTemplate(onSubmit, validationError, message, modal))
    }
    update(onSubmit)
    async function onSubmit(ev) {
        ev.preventDefault()
        const formData = new FormData(ev.target)
        const [email, password] = [...formData.values()].map(e => e.trim())
        try {
            if (!email || !password) {
                throw { error: 'All fields are required' }
            }
            if (!validateEmail(email)) {
                throw { error: 'Email not Valid!' }
            }
            await login(email, password)
            ctx.updateNav()
            ctx.page.redirect('/my-teams')
        } catch (err) {
            update(onSubmit, true, err.error, showModal(err.error))
            document.querySelector('.overlay').style.display = ''
        }

    }

}