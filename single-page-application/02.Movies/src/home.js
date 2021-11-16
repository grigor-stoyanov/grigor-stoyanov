import { showCreate } from "./create.js"
import { showDetails } from "./details.js"
import { showView, e } from "./helpers.js"
// initialisation
// - find section
// - detach section
// - add event listeners
let moviesCache = null
let lastLoaded = 0
const maxAge = 5000
const section = document.querySelector('#home-page')
const catalog = section.querySelector('.card-deck.d-flex.justify-content-center')
section.remove()

const createMovieBtn = section.querySelector('#createLink')
createMovieBtn.addEventListener('click', showCreate)
catalog.addEventListener('click', (event) => {
    event.preventDefault()
    let target = event.target
    if (target.tagName == 'BUTTON') {
        target = target.parentElement
    }
    if (target.tagName == 'A') {
        const id = target.dataset.id
        showDetails(id)
    }
})
// section.addEventListener('click', (event) => {
//     event.preventDefault()
//     showCreate()
// })



// display logic
export function showHome() {
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    showView(section)
    if (userData != null) {
        createMovieBtn.style.display = 'block'
    } else {
        createMovieBtn.style.display = 'none'
    }
    getMovies()
}

async function getMovies() {
    catalog.replaceChildren(e('p', {}, 'Loading...'))
    const now = Date()
    try {


        if (moviesCache == null || (now - lastLoaded) > maxAge) {
            const res = await fetch('http://localhost:3030/data/movies')
            if (res.ok == false) {
                const error = await res.json()
                throw Error(error.message)
            }
            const data = await res.json()
            moviesCache = data
            lastLoaded = now
        }
        catalog.replaceChildren(...moviesCache.map(createMovieCard))

    } catch (err) {
        catalog.replaceChildren(e('p', { style: 'color:red' }, err.message))
    }
}

function createMovieCard(movie) {
    const element = e('div', { className: 'card mb-4' })
    element.innerHTML =
        `<img class="card-img-top" src="${movie.img}" alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a data-id=${movie._id} href="#">
            <button type="button" class="btn btn-info">Details</button>
        </a>
    </div>`
    return element
}