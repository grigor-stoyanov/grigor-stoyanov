import { render, html } from './lib.js'
const form = document.querySelector('form')
const selectTemplate = (items) => html`
<select id="menu">
    ${items.map(e => html`<option value=${e._id}>${e.text}</option>`)}
</select>`
const url = 'http://localhost:3030/jsonstore/advanced/dropdown'
const root = document.querySelector('div')
async function getData() {
    const res = await fetch(url)
    const data = await res.json()
    update(Object.values(data))
}
function update(items) {
    const result = selectTemplate(items)
    render(result, root)
}
getData()
form.addEventListener('submit',addItem)
async function addItem(ev) {
    ev.preventDefault()
    const text = document.getElementById('itemText').value
    const res = await fetch(url,{
        method:'post',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({text})
    })
    if(res.ok){
        getData()
    }
}