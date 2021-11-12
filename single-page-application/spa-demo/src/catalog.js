import { updateUserNav } from "./app.js";
import { e, showSection } from "./dom.js";
import { showLoginPage } from "./login.js";
const catalogSection = document.getElementById('catalogSection')
const ul = catalogSection.querySelector('ul')
// detached from Dom Tree
catalogSection.remove()
export function showCatalog() {
    showSection(catalogSection)
    loadMovies()
}

async function loadMovies() {
    ul.replaceChildren(e('p',{},'Loading...'))
    const res = await fetch('http://localhost:3030/data/movies')
    const movies = await res.json()
    ul.replaceChildren(
        ...movies.map(createMovie)
    )
    // we need to check if user is logged by checking for 403 errors
    if (res.status == 403){
        sessionStorage.removeItem('userData')
        updateUserNav()
        showLoginPage()
    }
}
function createMovie(movie) {
    return e('li', {}, movie.title)
}