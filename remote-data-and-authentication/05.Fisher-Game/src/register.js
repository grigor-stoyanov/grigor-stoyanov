let userData = JSON.parse(localStorage.getItem('userData'))
window.addEventListener('DOMContentLoaded', () => {
    if (userData != null) {
        document.getElementById('guest').style.display = 'none'
    } else {
        document.getElementById('user').style.display = 'none'
    }
    document.querySelector('#register-view form').addEventListener('submit', registerUser)
})

async function registerUser(ev) {
    ev.preventDefault()
    formData = new FormData(ev.target)
    const [email, password, repeat] = [...formData.values()]
    if (ev.target.lastElementChild.tagName == 'LABEL') {
        ev.target.lastElementChild.remove()
    }
    const url = 'http://localhost:3030/users/register'
    try {
        if(!email||!password||!repeat){
            throw Error('All fields must be filled')
        }
        if(password != repeat){
            throw Error('Password doesent match!')
        }
        res = await fetch(url, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ "email": email, "password": password })
        })
        if(res.ok==false){
            const error = res.json()
            throw Error(error.message)
        }
        window.location = './index.html'
        localStorage.clear()
        const data = await res.json()
            const userData = {
                email: data.email,
                id: data._id,
                token: data.accessToken
            }
            localStorage.setItem('userData', JSON.stringify(userData))
    } catch (err) {
        ev.target.appendChild(
            e('label', { style: "color: red" }, [err.message])
        )
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