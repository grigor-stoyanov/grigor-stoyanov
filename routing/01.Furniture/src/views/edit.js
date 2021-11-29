import { editItem } from "../api/data.js";
import { html } from "../lib.js";

const editTemplate = (onSubmit, errorMsg, errors) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        ${errorMsg ? html`<div class="error">${errorMsg}</div>` : null}
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control" id="new-make" type="text" name="make" value="Table">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control is-valid" id="new-model" type="text" name="model" value="Swedish">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control is-invalid" id="new-year" type="number" name="year" value="2015">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description" value="Medium table">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price" value="235">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img" value="/images/table.png">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" value="Wood">
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>`

export function editPage(ctx) {
    update()
    function update(errorMsg, errors) {
        ctx.render(editTemplate(onSubmit, errorMsg, errors))

    }
    async function onSubmit(ev) {
        ev.preventDefault()
        const formData = [...(new FormData(ev.target)).entries()]
        const data = formData.reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {})
        const missing = formData.filter(([k, v]) => k != 'material' && v == '')
        try {
            if (missing.length > 0) {
                const errors = missing.reduce((a, [k]) => Object.assign(a, { [k]: true }), {})
                throw {
                    error: new Error('Please fill all mandatory fields!'),
                    errors
                }
            }
            data.year = Number(data.year)
            data.price = Number(data.price)
            const result = await editItem(data,ctx.params.id)
            ctx.page.redirect('/details/' + result._id)
        } catch (err) {
            const message = err.message || err.error.message
            update(message, err.errors || {})
        }
    }
} 