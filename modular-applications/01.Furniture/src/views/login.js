import { login } from "../api/api.js";
import { html } from "../lib.js";
const loginTemplate = (onSubmit, errorMessage) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            ${errorMessage ? html`<div class="error">${errorMessage}</div>` : null}
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class=${"form-control" + (errorMessage ? ' is-invalid'  : '')} id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class=${"form-control" + (errorMessage ? ' is-invalid'  : '')} id="password" type="password"
                    name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`
export function loginPage(ctx) {
    update()
    function update(errMsg){
    ctx.render(loginTemplate(onSubmit,errMsg))
    }
    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const email = formData.get('email').trim()
        const pass = formData.get('password').trim()
        try{
        await login(email, pass)
        ctx.updateUserNav()
        ctx.page.redirect('/')
        }catch(err){
            update(err.message)
        }
    }
}