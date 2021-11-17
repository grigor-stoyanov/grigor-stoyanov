import { e, showSection } from "./helpers.js";
import * as api from "./api/api.js";
import { getAllMovies } from "./api/data.js";

const catalogSection = document.getElementById('catalogSection')
const ul = catalogSection.querySelector('ul')
// detached from Dom Tree
catalogSection.remove()

export function showCatalog(ctx) {
    ctx.showSection(catalogSection)
    loadMovies()
}

async function loadMovies() {
    ul.replaceChildren(e('p', {}, 'Loading...'))
    const movies = await getAllMovies()
    ul.replaceChildren(
        ...movies.map(createMovie)
    )
}
function createMovie(movie) {
    return e('li', {}, movie.title)
}
