import { register } from "../api/data.js"
import { html } from "../lib.js"
import { createSubmitHandler } from "../util.js"
import { input } from '../common/input.js'
const registerTemplate = (onSubmit, errorMsg, errors, values) => html`
<section>
    <div class="narrow drop center">
        <header>
            <h1>Register</h1>
        </header>
        <form @submit=${onSubmit}>
            ${errorMsg ? html`<p class="errorMsg">${errorMsg}</p>` : null}
            ${input('Email', 'text', 'email', values.email, errors.email)}
            ${input('Username', 'text', 'username', values.username, errors.username)}
            ${input('Password', 'text', 'password', values.password, errors.password)}
            ${input('Repeat', 'text', 'repeat', values.repeat, errors.repeat)}
            <input type="submit" class='action' value="Sign Up">
        </form>
    </div>
</section>`

export function registerView(ctx) {
    function update(errorMsg, errors = {}, values = {}) {
        ctx.render(registerTemplate(createSubmitHandler(onSubmit, 'email', 'username', 'password', 'repeat'), errorMsg, errors, values))
    }
    update()
    async function onSubmit(data, event) {
        try {
            update()
            const missing = Object.entries(data).filter(([k, v]) => v == '')
            if (missing.length > 0) {
                const errors = missing.reduce((a, [k, v]) => Object.assign(a, { [k]: true }), {})
                throw {
                    error: new Error('All fields are required'),
                    errors
                }
            }
            if (data.password != data.repeat) {
                const errors = { 'password': true, 'repeat': true }
                throw {
                    error: new Error('Passwords don\'t match!'),
                    errors
                }
            }
            await register(data.email, data.password, data.username)
            event.target.reset
            ctx.updateNav()
            ctx.page.redirect('/topics')
        } catch (err) {
            const message = err.message || err.error
            update(message, err.errors, data)
        }
    }
}