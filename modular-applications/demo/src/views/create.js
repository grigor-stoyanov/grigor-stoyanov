import { html } from "../lib.js"
import { createSubmitHandler } from "../util.js"
import { input } from "../common/input.js"
import { createTopic } from "../api/data.js"

const createTemplate = (onSubmit, errorMsg, errors, values) => html`
<section @submit=${onSubmit}>
    <div class="drop">
        <header>
            <h1>Create New Topic</h1>
        </header>
        <form>

            ${errorMsg ? html`<p class="errorMsg">${errorMsg}</p>` : null}
            ${input('Topic Title', 'title', 'title', values.title, errors.title)}
            ${input('Content', 'textarea', 'content', values.content, errors.content)}
            <div class="center">
                <input type="submit" class='action' value="Publish Topic">
            </div>
    </div>
    </form>
</section>`

export function createView(ctx) {
    function update(errorMsg, errors = {}, values = {}) {
        ctx.render(createTemplate(createSubmitHandler(onSubmit, 'title', 'content'), errorMsg, errors, values))
    }
    update()
    async function onSubmit(data) {
        try {
            const missing = Object.entries(data).filter(([k, v]) => v == '')
            if (missing.length > 0) {
                const errors = missing.reduce((a, [k, v]) => Object.assign(a, { [k]: true }), {})
                throw {
                    error: new Error('All fields are required'),
                    errors
                }
            }
            const result = await createTopic(data)
            ctx.page.redirect('/topic/' + result._id)
        } catch (err) {
            const message = err.message || err.error
            update(message, err.errors, data)
        }
    }
}