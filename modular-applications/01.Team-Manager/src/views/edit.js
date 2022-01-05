import { editTeam, getTeamById } from '../api/data.js'
import { html } from '../lib.js'


const editTemplate = (onSubmit, validationError, message, toEdit) => html`
<section id="edit">
    <article class="narrow">
        <header class="pad-med">
            <h1>Edit Team</h1>
        </header>
        <form @submit=${onSubmit} id="edit-form" class="main-form pad-large">
            ${(validationError) ? html`<div class="error">${message}</div>` : null}
            <label>Team name: <input type="text" name="name" .value=${toEdit.name}></label>
            <label>Logo URL: <input type="text" name="logoUrl" .value=${toEdit.logoUrl}></label>
            <label>Description: <textarea name="description" .value=${toEdit.description}></textarea></label>
            <input class="action cta" type="submit" value="Save Changes">
        </form>
    </article>
</section>`

export async function editView(ctx) {

    async function update(onSubmit, validationError, message) {

        const toEdit = await getTeamById(ctx.params.id)
        ctx.render(editTemplate(onSubmit, validationError, message, toEdit))
    }
    update(onSubmit)
    async function onSubmit(ev) {
        ev.preventDefault()
        const formData = new FormData(ev.target)
        const [name, logoUrl, description] = [...formData.values()].map(e => e.trim())
        try {
            if (!name || !logoUrl || !description) {
                throw { error: 'All fields are required' }
            }
            if (name.length < 4) {
                throw { error: 'Name must be at least 4 characters long' }
            }
            if (description.length < 10) {
                throw { error: 'Description must be at least 10 characters long!' }
            }
            const team = await editTeam(ctx.params.id, { name, logoUrl, description })
            ctx.updateNav()
            ctx.page.redirect(`/team-details/${team._id}`)
        } catch (err) {
            update(onSubmit, true, err.error)
        }
    }
}