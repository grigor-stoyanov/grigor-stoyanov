import { getAllUserMemes } from '../api/data.js'
import { getUserData, setUserData } from '../helpers.js'
import { html, until } from '../lib.js'

const myProileTemplate = (dataPromise, userData) =>
    html`<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile"
            src="/images/${(userData.gender == 'male') ? 'male' : 'female'}.png">
        <div class="user-content">
            <p>Username: ${userData.username}</p>
            <p>Email: ${userData.email}</p>
            <p>My memes count: ${userData.memes}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">${until(dataPromise, html`<p> Loading &hellip;</p> `)}</div>
</section>`
const userMemesTemplate = (meme) => html`<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href="/details/${meme.id}">Details</a>
</div>`

export function showMyProfileView(ctx) {
    ctx.updateUserNav()
    if (getUserData() != null) {
        ctx.render(myProileTemplate(loadMemes(), getUserData()))
    } else {
        ctx.page.redirect('/home')
    }
}
async function loadMemes() {
    const memes = await getAllUserMemes(getUserData().id)
    if (memes.length) {
        const count = getUserData()
        count.memes = memes.length
        setUserData(count)
        return memes.map(userMemesTemplate)
    } else {
        const count = getUserData()
        count.memes = 0
        setUserData(count)
        return html`<p class="no-memes">No memes in database.</p>`
    }

}