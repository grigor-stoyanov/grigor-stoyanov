import { approve, createTeam, getMemberships, join } from '../api/data.js'
import { html } from '../lib.js'


const createTemplate = (onSubmit, validationError, message) => html`
<section id="create">
    <article class="narrow">
        <header class="pad-med">
            <h1>New Team</h1>
        </header>
        <form @submit=${onSubmit} id="create-form" class="main-form pad-large">
            ${(validationError) ? html`<div class="error">${message}</div>` : null}
            <label>Team name: <input type="text" name="name"></label>
            <label>Logo URL: <input type="text" name="logoUrl"></label>
            <label>Description: <textarea name="description"></textarea></label>
            <input class="action cta" type="submit" value="Create Team">
        </form>
    </article>
</section>`

export function createView(ctx) {
    function update(onSubmit, validationError, message) {
        ctx.render(createTemplate(onSubmit, validationError, message))
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
            const team = await createTeam({ name, logoUrl, description })
            await join(team._id)
            const membership = await getMemberships(team._id)
            membership.forEach(element => {
                    approve(element._id)
            });
            ctx.updateNav()
            ctx.page.redirect(`/team-details/${team._id}`)
        } catch (err) {
            update(onSubmit, true, err.error)
        }
    }
}