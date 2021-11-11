document.getElementById('loadBooks').addEventListener('click', loadBooks)
const tbody = document.querySelector('table tbody')
const form = document.querySelector('form')
form.addEventListener('submit', addBookEntry)
const url = 'http://localhost:3030/jsonstore/collections/books/'
// should create a hidden editform instead of reattaching elements
async function editEntry(ev) {
    ev.preventDefault()
    const formData = new FormData(form)
    try {
        res = fetch(url + this, {
            method: 'put',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(
                {
                    "author": formData.get('author'),
                    "title": formData.get('title')
                })

        })
        if (res.ok == false) {
            const error = res.json()
            throw Error(error.message)
        }
    } catch (err) {
        alert(err.message)
    }
    form.removeEventListener('submit', editEntry.bind(id))
    form.addEventListener('submit', addBookEntry)
    form.querySelector('h3').textContent = 'FORM'
}
async function addBookEntry(ev) {
    ev.preventDefault()
    const formData = new FormData(form)
    try {
        const res = fetch(url, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                "author": formData.get('author'),
                "title": formData.get('title')
            })
        })
        if (res.ok == false) {
            const error = res.json()
            throw Error(error.message)
        }
        loadBooks()
    } catch (err) {
        alert(err.message)
    }
}
async function loadBooks() {
    try {
        const res = await fetch(url)
        if (res.ok == false) {
            const error = res.json()
            throw Error(error.message)
        }
        const data = await res.json()
        tbody.replaceChildren()
        for (let entry in data) {
            editBtn = e('button', {}, ['Edit'])
            deleteBtn = e('button', {}, ['Delete'])
            editBtn.addEventListener('click', editForm)
            deleteBtn.addEventListener('click', deleteEntry)
            tbody.appendChild(
                e('tr', {}, [
                    e('td', { 'style': 'display:none' }, entry),
                    e('td', {}, [data[entry].title]),
                    e('td', {}, [data[entry].author]),
                    e('td', {}, [editBtn, deleteBtn])
                ])
            )
        }
    }
    catch (err) {
        alert(err.message)
    }
    function editForm(ev) {
        form.querySelector('h3').textContent = 'Edit FORM'
        const id = ev.target.parentElement.parentElement.firstElementChild.textContent
        form.removeEventListener('submit', addBookEntry)
        form.addEventListener('submit', editEntry.bind(id))
    }
    
    async function deleteEntry(ev) {
        const id = ev.target.parentElement.parentElement.firstElementChild.textContent
        ev.preventDefault()
        try {
            res = await fetch(url + id, { method: 'delete' })
            if (res.ok == false) {
                const error = res.json()
                throw Error(error.message)
            }
        } catch (err) {
            alert(err.message)
        }
        loadBooks()
    }

}




function e(type, attr, content) {
    const element = document.createElement(type)
    for (let prop in attr) {
        element[prop] = attr[prop]
    }
    for (let item of content) {
        if (typeof item == 'string' || typeof item == 'number') {
            item = document.createTextNode(item)
        }
        element.appendChild(item)
    }
    return element
}