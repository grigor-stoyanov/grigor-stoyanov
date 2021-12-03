import { deleteMeme, getMemeById } from '../api/data.js'
import { getUserData } from '../helpers.js'
import { html, until } from '../lib.js'

const detailsTemplate = (dataPromise) => html`<section id="meme-details">
    ${until(dataPromise, html`Loading &hellip;`)}
</section>`
const memeDetailsTemplate = (meme, isOwner,onClick) => html`<h1>Meme Title: ${meme.title}
</h1>
<div class="meme-details">
    <div class="meme-img">
        <img alt="meme-alt" src=${meme.imageUrl}>
    </div>
    <div class="meme-description">
        <h2>Meme Description</h2>
        <p>
            ${meme.description}
        </p>

        <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
        <a class="button warning" href="/edit/${meme._id}" style="display: ${(!isOwner) ? 'none':'inline-block'}">Edit</a>
        <button @click=${onClick} class="button danger" style="display: ${(!isOwner) ? 'none':'inline-block'}"> Delete</button>

    </div>
</div>`

export function showDetailsView(ctx) {
    ctx.updateUserNav()
    async function loadMeme() {
        const meme = await getMemeById(ctx.params.id)
        const isOwner = getUserData() && meme._ownerId == getUserData().id
        return memeDetailsTemplate(meme, isOwner,onClick)
    }
    ctx.render(detailsTemplate(loadMeme()))
    function onClick(){
        const choice = window.confirm('Are you sure?')
        if(choice){
            deleteMeme(ctx.params.id)
            ctx.page.redirect('/allMemes')
        }
    }
}
