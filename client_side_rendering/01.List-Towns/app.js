import { html, render } from "./lib.js"

const townTemplate = (data) => html`
<div id="root">
    <ul>
        ${data.map(city => html`<li>${city.trim()}</li>`)}
    </ul>
</div>`

const form = document.querySelector('form')

form.addEventListener('submit',createList)
function createList(ev){
    ev.preventDefault()
    const formData = new FormData(form)
    const data = formData.get('towns').split(',')
    render(townTemplate(data),document.body)
}   