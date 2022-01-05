import { html } from '../lib.js'


const modalTemplate = (message, onClick) => html`
<div class="overlay">
    <div class="modal">
        <p>${message}</p>
        <a @click=${onClick} href="javascript:void(0)" class="action">Ok!</a>
    </div>
</div>`

export function showModal(message) {
    function onClick(ev){
       ev.target.parentElement.parentElement.style.display='none'
    }

    return modalTemplate(message, onClick)
}