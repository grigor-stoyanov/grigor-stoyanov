let userData = JSON.parse(localStorage.getItem('userData'))
window.addEventListener('DOMContentLoaded', main)
async function main() {
    if (userData != null) {
        document.getElementById('guest').style.display = 'none'
    } else {
        document.getElementById('user').style.display = 'none'
    }
    const form = document.querySelector('main section form')

    form.addEventListener('submit', login)
    async function login(ev) {
        ev.preventDefault()
        if (form.lastElementChild.tagName == 'LABEL') {
            form.lastElementChild.remove()
        }
        const formData = new FormData(form)
        const url = 'http://localhost:3030/users/login'
        const email = formData.get('email')
        const password = formData.get('password')
        try {
            const res = await fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            })
            if (res.ok == false) {
                const error = await res.json()
                throw Error(error.message)
            }
           
            const data = await res.json()
            const userData = {
                email: data.email,
                id: data._id,
                token: data.accessToken
            }
            localStorage.setItem('userData', JSON.stringify(userData))
            window.location = './index.html'
        } catch (err) {
            form.appendChild(
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
}
