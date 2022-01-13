import { login } from "../api/data.js"
import { html } from "../lib.js"
import { createSubmitHandler, updateNav } from "../util.js"

const loginTemplate = (onSubmit, errorMsg, email) => html`
<section @submit=${onSubmit}>
    <div class="narrow drop center">
        <header>
            <h1>Login</h1>
        </header>
        <form>

            ${errorMsg ? html`<p class="errorMsg">${errorMsg}</p>` : null}
            <label><span>Email: </span><input type="text" name="email" .values=${email}></label>
            <label><span>Password: </span><input type="password" name="password"></label>
            <input type="submit" class='action' value="Sign In">
    </div>
    </form>
</section>`

export function loginView(ctx) {
    function update(errorMsg, email = '') {
        ctx.render(loginTemplate(createSubmitHandler(onSubmit, 'email', 'password'), errorMsg, email))
    }
    update()
    async function onSubmit(data) {
        try {
            if (!data.email || !data.password) {
                throw Error('Please fill all fields!')
            }

            await login(data.email, data.password)
            ctx.updateNav()
            ctx.page.redirect('/topics')
        } catch (err) {
            const message = err.message || err.error
            update(message, data.email)
        }
    }
}