import { deleteBook, getBookById } from "../api/data.js";
import { getUserData } from "../helpers.js";
import { html } from "../lib.js";

const detailsTemplate = (book, isOwner, onClick) => html`
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            <div class="actions">
                <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                ${(isOwner) ? html`
                <a class="button" href="/edit/${book._id}">Edit</a>
                <a @click=${onClick} class="button" href="javacript:void(0)">Delete</a>` : ''
    }
                <!-- Bonus -->
                <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                <a class="button" href="#" style="display: ${(getUserData()!=null)?'block':'none'}">Like</a>
    
                <!-- ( for Guests and Users )  -->
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: 0</span>
                </div>
                <!-- Bonus -->
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${book.description}</p>
        </div>
    </section>`

export async function detailsView(ctx) {
    const book = await getBookById(ctx.params.id)
    const isOwner = getUserData() && book._ownerId == getUserData().id
    ctx.render(detailsTemplate(book, isOwner, onClick))
    async function onClick() {
        const choice = window.confirm('Are you sure?')
        if (choice) {
            deleteBook(ctx.params.id)
            ctx.page.redirect('/dashboard')
        }
    }
}
