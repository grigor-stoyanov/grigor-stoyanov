const userInfo = JSON.parse(sessionStorage.getItem('userData'))
const url = 'http://localhost:3030/data/furniture'
const tbody = document.querySelector('tbody')

function attachEvents() {
    document.querySelector('form').addEventListener('submit', addEntry)
    document.getElementById('logoutBtn').addEventListener('click', logout)
    document.querySelector('table').nextElementSibling.addEventListener('click', buy)
    document.querySelector('.orders button').addEventListener('click', allOrders)
}

loadEntries()
async function allOrders(ev) {
    try {
        const url = 'http://localhost:3030/data/orders'
        const res = await fetch(url,
            {
                method: 'get',
                headers: { 'X-Authorization': userInfo.token }
            })
        if (res.ok == false) {
            const error = await res.json()
            throw Error(error.message)
        }
        let data = await res.json()
        data = data.filter(e => e._ownerID == userInfo.id)
        let boughtFruniture = data.map(e=>e.name).join(', ')
        let totalPrice = data.map(e=>e.price).reduce((a,t)=> a+=t.price)
        ev.previousElementSibling.previousElementSibling.firstElementChild.textContent = boughtFruniture
        ev.previousElementSibling.firstElementChild.textContent = totalPrice
    }
    catch (err) {
        alert(err.message)
    }
}
async function buy(ev) {
    const url = 'http://localhost:3030/data/orders'
    const tableRows = ev.target.previousElementSibling.lastElementChild.children
    const checkedRows = Array.from(tableRows).filter(e => e.lastElementChild.firstElementChild.checked == true)
    for (const ele of checkedRows) {
        const item = ele.children[1].firstElementChild.textContent
        const price = ele.children[2].firstElementChild.textContent
        const factor = ele.children[3].firstElementChild.textContent
        const img = ele.children[0].firstElementChild.src
        try {
            if (!userInfo) {
                window.location = '/login.html'
                return
            }
            const res = await fetch(url, {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    'X-Authorization': userInfo.token
                },
                body: JSON.stringify({
                    'name': item,
                    'price': price,
                    'factor': factor,
                    'img': img
                })
            })
            if (res.ok == false) {
                const error = await res.json()
                throw Error(error.message)
            }
        } catch (err) {
            alert(err.message)
        }
    }
}
async function logout() {
    const url = 'http://localhost:3030/users/logout'
    try {
        if (!userInfo) {
            window.location = '/login.html'
            return
        }
        const res = await fetch(url,
            {
                method: 'get',
                headers: { 'X-Authorization': userInfo.token }
            })
        if (res.ok == false) {
            const error = await res.json()
            throw Error(error.message)
        }
        sessionStorage.clear()
        window.location = 'home.html'
    }
    catch (err) {
        alert(err.message)
    }
}
async function addEntry(ev) {
    ev.preventDefault()
    const formData = new FormData(ev.target)
    const [item, price, factor, img] = [...formData.values()]
    try {
        if (!userInfo) {
            window.location = '/login.html'
            return
        }
        if (!item || !price || !factor || !img) {
            throw Error('Please fill all fields')
        }
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': userInfo.token
            },
            body: JSON.stringify({
                'name': item,
                'price': price,
                'factor': factor,
                'img': img
            })
        })
        if (res.ok == false) {
            const error = await res.json()
            throw Error(error.message)
        }
        loadEntries()
    } catch (err) {
        alert(err.message)
    }
}
async function loadEntries() {
    try {
        const res = await fetch(url)
        if (res.ok == false) {
            const error = await res.json()
            throw Error(error.message)
        }
        const data = await res.json()
        tbody.replaceChildren(...data.map(createEntry))
    }
    catch (err) {
        alert(err.message)
    }
}
function createEntry(data) {
    const newRow = document.createElement('tr')
    newRow.innerHTML =
        `<tr>
    <td>
        <img
            src=${data.img}>
    </td>
    <td>
        <p>${data.name}</p>
    </td>
    <td>
        <p>${data.price}</p>
    </td>
    <td>
        <p>${data.factor}</p>
    </td>
    <td>
        <input type="checkbox" ${!userInfo ? 'disabled' : ''}/>
    </td>
</tr>`
    return newRow
}
