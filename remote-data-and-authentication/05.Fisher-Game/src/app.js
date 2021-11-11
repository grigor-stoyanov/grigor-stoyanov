let userData = JSON.parse(localStorage.getItem('userData'))
const url = 'http://localhost:3030/data/catches'
window.addEventListener('DOMContentLoaded', () => {
    if (userData != null) {
        document.getElementById('guest').style.display = 'none'
        document.querySelector('#addForm .add').disabled = false
        document.querySelector('.email span').textContent = userData.email
    } else {
        document.getElementById('user').style.display = 'none'
        document.querySelectorAll('.email span').textContent = 'guest'
    }
    document.querySelector('.load').addEventListener('click', loadData)
    document.getElementById('addForm').addEventListener('submit', onCreateSubmit)
    document.getElementById('logout').addEventListener('click', logout)
})
async function logout(ev) {
    try {
        const url = 'http://localhost:3030/users/logout'
        const res = await fetch(url, {
            method: 'get',
            headers: {
                'X-Authorization': userData.token
            }
        })
        if (res.ok == false) {
            const error = res.json()
            throw Error(error.message)
        }
        localStorage.clear()
        window.location = './index.html'
    } catch (err) {
        alert(err.message)
    }
}
async function onCreateSubmit(ev) {
    ev.preventDefault()
    if (!userData) {
        window.location = './login.html'
        return
    }
    const formData = new FormData(ev.target)
    const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {})
    try {
        if (Object.values(data).some(x => x == '')) {
            throw new Error('All fields are Required')
        }
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(data)
        })
        if (res.ok == false) {
            const error = await res.json()
            throw new Error(error.message)
        }
        ev.target.reset()
        loadData()
    } catch (err) {
        alert(err.message)
    }
}
async function loadData() {

    const res = await fetch(url)
    const data = await res.json()
    // get array of elements for the data
    document.getElementById('catches')
        .replaceChildren(...data.map(createPreview))
}
function createPreview(item) {
    const isOwner = userData && item._ownerId == userData.id
    const element = document.createElement('div')
    element.className = 'catch'
    element.innerHTML =
        `<label>Angler</label>
        <input type="text" class="angler" value=${item.angler} ${!isOwner ? 'disabled' : ''}>
        <label>Weight</label>
        <input type="text" class="weight" value=${item.weight} ${!isOwner ? 'disabled' : ''}>
        <label>Species</label>
        <input type="text" class="species" value=${item.species} ${!isOwner ? 'disabled' : ''}>
        <label>Location</label>
        <input type="text" class="location" value=${item.location} ${!isOwner ? 'disabled' : ''}>
        <label>Bait</label>
        <input type="text" class="bait" value=${item.bait} ${!isOwner ? 'disabled' : ''}>
        <label>Capture Time</label>
        <input type="number" class="captureTime" value=${item.captureTime} ${!isOwner ? 'disabled' : ''}>
        <button class="update" data-id=${item._id} ${!isOwner ? 'disabled' : ''}>Update</button>
        <button class="delete" data-id=${item._id} ${!isOwner ? 'disabled' : ''}>Delete</button>`
    element.lastElementChild.addEventListener('click', deleteCatch)
    element.lastElementChild.previousElementSibling.addEventListener('click', editCatch)
    return element
}
async function deleteCatch(ev) {
    ev.target.dataset.id
    const url = 'http://localhost:3030/data/catches/' + ev.target.dataset.id
    try {
        res = await fetch(url, {
            method: 'delete',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': userData.token
            }
        })
        if (res.ok == false) {
            const error = await res.json()
            throw Error(error.message)
        }
        loadData()
    } catch (err) {
        alert(err.message)
    }
}
async function editCatch(ev) {
    ev.target.dataset.id
    const url = 'http://localhost:3030/data/catches/' + ev.target.dataset.id
    const [angler, weight, species, location, bait, captureTime] = Array.from(ev.target.parentElement.children).filter(e => e.tagName == 'INPUT')
    try {
        res = await fetch(url, {
            method: 'put',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify({
                "angler": angler.value,
                "weight": weight.value,
                "species": species.value,
                "location": location.value,
                "bait": bait.value,
                "captureTime": captureTime.value
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