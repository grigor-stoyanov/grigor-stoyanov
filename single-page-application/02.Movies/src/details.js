import { showEdit,deleteEntry } from "./edit.js"
import { showView, e } from "./helpers.js"

// initialisation
// - find section
// - detach section
const section = document.getElementById('movie-example')
section.remove()
// display logic
export function showDetails(id) {
    showView(section)
    getMovie(id)
}
async function getMovie(id) {
    section.replaceChildren(e('p', {}, 'Loading...'))
    const requests = [
        fetch('http://localhost:3030/data/movies/' + id),
        fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`)
    ]
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    if (userData != null) {
        requests.push(
            fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userData.id}%22`))
    }
    const [movieRes, likesRes, hasLikedRes] = await Promise.all(requests)
    const [movieData, likes, hasLiked] = await Promise.all([
        movieRes.json(),
        likesRes.json(),
        hasLikedRes && hasLikedRes.json()
    ])
    section.replaceChildren(createDetails(movieData, likes, hasLiked))
}

function createDetails(movie, likes, hasLiked) {
    const controlls =
        e('div', { className: 'col-md-4 text-center' },
            e('h3', { className: 'my-3' }, 'Movie Description'),
            e('p', {}, movie.description)

        )
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    const deleteBtn = e('a', { className: 'btn btn-danger', href: '#' }, 'Delete')
    deleteBtn.addEventListener('click',deleteEntry.bind(null,movie._id))
    const editBtn = e('a', { className: 'btn btn-warning', href: '#' }, 'Edit')
    editBtn.addEventListener('click',showEdit.bind(null,movie._id))
    const likeBtn = e('a', { id: 'likeBtn', className: 'btn btn-primary', href: '#', onClick: onLike }, 'Like')
    const unlikeBtn = e('a', { id: 'unlikeBtn', className: 'btn btn-primary', href: '#', onClick: onUnlike }, 'Unlike')
    const totalLikes = e('span', { className: 'enrolled-span' }, `Liked ${likes}`)
    if (userData != null) {
        if (userData.id == movie._ownerId) {
            controlls.appendChild(deleteBtn)
            controlls.appendChild(editBtn)
        } else {
            if (hasLiked.length > 0) {

                controlls.appendChild(unlikeBtn)
            } else {

                controlls.appendChild(likeBtn)
            }
        }
    }
    controlls.appendChild(totalLikes)
    const element =
        e('div', { className: 'container' },
            e('div', { className: 'row bg-light text-dark' },
                e('h1', {}, `Movie title: ${movie.title}`),
                e('div', { className: 'col-md-8' },
                    e('img', { className: 'img-thumbnail', src: `${movie.img}`, alt: 'Movie' })
                ),
                controlls
            )
        )
    async function onLike() {
        const res = await fetch('http://localhost:3030/data/likes', {
            method: 'post',
            headers: { 'content-type': 'application/json', 'X-Authorization': userData.token },
            body: JSON.stringify({
                movieId: movie._id
            })
        })
        showDetails(movie._id)
    }
    async function onUnlike() {
        const likedId = hasLiked[0]._id
        const res = await fetch('http://localhost:3030/data/likes' + likedId, {
            method: 'delete',
            headers: { 'X-Authorization': userData.token },
        })
        showDetails(movie._id)
    }


    return element
}
