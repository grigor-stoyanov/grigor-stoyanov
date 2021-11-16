import { showView } from "./helpers.js"
import { showHome } from "./home.js"
// initialisation
// - find section
// - detach section
const section = document.getElementById('add-movie')
section.remove()
// display logic
export function showCreate(ev) {
    ev.preventDefault()
    showView(section)
}

const form = section.querySelector('form')
form.addEventListener('submit',addMovie)
async function addMovie(ev) {
    ev.preventDefault()
    const formData = new FormData(form)
    const [title, description, img] = [...formData.values()]
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    try{
        if (userData == null){
            showHome
            return;
        }
        if(!title||!description||!img){
            throw Error('All fields must be filled')
        }
        const res = await fetch('http://localhost:3030/data/movies',{
            method:'post',
            headers:{
                'content-type':'application/json',
                'X-Authorization': userData.token 
            },
            body:JSON.stringify({
                title,
                description,
                img
            })
        })
        if (res.ok == false){
            const error = await res.json()
            throw Error(error.message)
        }
        showHome()
    }catch(err){
        alert(err.message)
    }
}