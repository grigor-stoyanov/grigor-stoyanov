import { editMeme, getMemeById } from '../api/data.js'
import { getUserData } from '../helpers.js'
import { html } from '../lib.js'

const editTemplate = (meme,onSubmit) => html`<section id="edit-meme">
    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" value=${meme.title} name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description">${meme.description}</textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" value=${meme.imageUrl} name="imageUrl">
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`

export async function showEditView(ctx) {
    if (getUserData() != null) {
        ctx.updateUserNav()
        ctx.render(editTemplate(await getMemeById(ctx.params.id),onSubmit))
        
        async function onSubmit(event) {
            event.preventDefault()
            try {

                const formData = new FormData(event.target)
                const title = formData.get('title').trim()
                const description = formData.get('description').trim()
                const imageUrl = formData.get('imageUrl').trim()
                if (!title || !description || !imageUrl) {
                    throw Error('All fields must be filled!')
                }
                editMeme(ctx.params.id, { title, description, imageUrl })
                ctx.page.redirect('/allMemes')
            } catch (err) {
                alert(err.message)
            }
        }
    } else {
        ctx.page.redirect('/home')
    }
}