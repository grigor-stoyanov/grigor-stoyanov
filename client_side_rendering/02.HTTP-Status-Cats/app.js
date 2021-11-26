import { html, render, styleMap } from "./lib.js"
import { cats } from "./catSeeder.js"
const section = document.getElementById('allCats')
const catTemplate = (data) => html`
<ul>${data.map(e => html`
    <li>
        <img src="./images/${e.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button @click=${onClick} class="showBtn">Show status code</button>
            <div class="status" style="display: none" id="${e.id}">
                <h4>Status Code: ${e.statusCode}</h4>
                <p>${e.statusMessage}</p>
            </div>
        </div>
    </li>`)}
</ul>`
function onClick(ev) {
    ev.target.textContent = 'Hide status code'
    const details = ev.target.nextElementSibling
    details.style.display = (details.style.display == 'none') ? 'block': 'none'
}
render(catTemplate(cats), section)