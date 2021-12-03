import { getAllUserBooks } from "../api/data.js";
import { getUserData } from "../helpers.js";
import { html } from "../lib.js";

const profileTemplate = (books) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    <!-- Display ul: with list-items for every user's books (if any) -->
    ${(books.length)
        ? books.map(bookTemplate)
        : html`
    <!-- Display paragraph: If the user doesn't have his own books  -->
    <p class="no-books">No books in database!</p>`}
</section>`
const bookTemplate = (book) => html`
    <ul class="my-books-list">
        <li class="otherBooks">
            <h3>${book.title}</h3>
            <p>Type: ${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            <a class="button" href="/details/${book._id}">Details</a>
        </li>
    </ul>`
export async function profileView(ctx) {
    const books = await getAllUserBooks(getUserData().id)
    ctx.render(profileTemplate(books))
}



