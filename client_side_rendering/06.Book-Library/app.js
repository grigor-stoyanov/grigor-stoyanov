import { html, render } from './lib.js'
const url = 'http://localhost:3030/jsonstore/collections/books'
let formType = 'Add'
const formTemplate = () => html`
<form id="${formType.toLocaleLowerCase()}-form">
    <h3>${formType} book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit">
</form>`
render(formTemplate(), document.body)
const tableRow = (data) => html`
<tr>
    <td>${data.author}</td>
    <td>${data.title}</td>
    <td>
        <button @click=${edit}>Edit</button>
        <button id=${data._id} @click=${del}>Delete</button>
    </td>
</tr>`
let books = null;
async function getData() {
    const res = await fetch(url)
    if (res.ok == true) {
        books = await res.json()
        update(books)
    }
}
function update(books) {
    books = Object.values(books).map((b, i) => {
        b._id = Object.keys(books)[i]
        return b
    })
    render(Object.values(books).map(tableRow), document.querySelector('tbody'))
}
document.getElementById('loadBooks').addEventListener('click', getData())
async function del(ev) {
    await fetch(url+'/' + ev.target.id, {
        method: 'delete'
    })
    getData()
}

function edit() {

}