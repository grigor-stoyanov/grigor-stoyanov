import { html } from "../lib.js";
import { register } from "../api/data.js";

const registerTemplate = (onSubmit, errorMessage) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            ${errorMessage ? html`<div class="error">${errorMessage}</div>` : null}
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class="form-control" id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`

export function registerPage(ctx) {


    update()
    function update(errMsg) {
        ctx.render(registerTemplate(onSubmit, errMsg))
    }
    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const email = formData.get('email').trim()
        const pass = formData.get('password').trim()
        const repass = formData.get('repass').trim()
        try {
            await register(email, pass,repass)
            ctx.updateUserNav()
            ctx.page.redirect('/')
        } catch (err) {
            update(err.message)
        }
    }

}
