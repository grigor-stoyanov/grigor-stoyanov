import { getAllMemes } from '../api/data.js'
import { html, until } from '../lib.js'

const allMemesTemplate = (dataPromise) => html`<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${until(dataPromise, html`<p>Loading &hellip;</p>`)}
    </div>
</section>`
const memeTemplate = (meme) => html`<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${meme._id}">Details</a>
        </div>
    </div>
</div>`

export function showAllMemesView(ctx) {
    ctx.updateUserNav()
    ctx.render(allMemesTemplate(loadMemes()))
}
async function loadMemes() {
    const memes = await getAllMemes()
    if(memes.length) {
        return memes.map(memeTemplate) 
    } else {
        return html`<p class="no-memes">No memes in database.</p>`
    }

}