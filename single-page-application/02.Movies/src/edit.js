import { showDetails } from "./details.js"
import { showView } from "./helpers.js"
import { showHome } from "./home.js"
// initialisation
// - find section
// - detach section
const section = document.getElementById('edit-movie')
section.remove()
// display logic
export async function deleteEntry(id) {
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    if (userData == null) {
        showHome()
        return;
    }
    try {
        const res = await fetch('http://localhost:3030/data/movies/' + id, {
            method: 'delete',
            headers: { 'X-Authorization': userData.token }
        })
        if(res.ok == false){
            const error = await res.json()
            throw Error(error.message)
        }
        showHome()
    }catch(err){
        alert(err.message)
    }
}
export function showEdit(id) {
    showView(section)
    const form = section.querySelector('form')
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    form.addEventListener('submit', editMovie.bind(null, id))
    async function editMovie(id) {
        const formData = new FormData(form)
        if (userData == null) {
            showHome()
            return;
        }
        const [title, description, img] = [...formData.values()]
        try {
            const res = await fetch('http://localhost:3030/data/movies/' + id, {
                method: 'put',
                headers: { 'content-type': 'application/json', 'X-Authorization': userData.token },
                body: JSON.stringify({
                    title,
                    description,
                    img
                })
            })
            if (res.ok == false) {
                const error = await res.json()
                throw Error(error.message)
            }
            showDetails(id)
        }
        catch (err) {
            alert(err.message)
        }
    }
}

