const element = document.createElement('div');
element.id = 'overlay'
element.innerHTML = `
<div id = "modal">
    <p> Are you sure ?</p>
        <div>
            <button class="modal-yes">Yes</button>
            <button class="modal-no">No</button>
        </div>
</div>`
element.querySelector('.modal-yes').addEventListener('click', () => onChoice(true))
element.querySelector('.modal-no').addEventListener('click', () => onChoice(false))
const msg = element.querySelector('p')
let onChoice = null

export function showModal(message) {
    msg.textContent = message
    document.body.appendChild(element)
    return new Promise(callback => {
        onChoice = (choice) => {
            clear()
            callback(choice)
        }
    })
}

export function clear() {
    element.remove()
}