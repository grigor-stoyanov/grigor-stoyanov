function solve() {
   
    [registerForm, loginForm] = document.querySelectorAll('form')
    registerForm.addEventListener('submit', register)
    loginForm.addEventListener('submit', login)
    async function login(ev) {
        ev.preventDefault()
        const formData = new FormData(ev.target)
        const email = formData.get('email')
        const password = formData.get('password')
        const url = 'http://localhost:3030/users/login'
        try {
            if (ev.target.lastElementChild.tagName == 'LABEL') {
                ev.target.lastElementChild.remove()
            }
            const res = await fetch(url, {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    
                },
                body: JSON.stringify({ 'email': email, 'password': password })
            })
            if (res.ok == false) {
                const error = await res.json()
                throw Error(error.message)
            }
            const data = await res.json()
            userData = {
                'email': data.email,
                'id': data._id,
                'token': data.accessToken
            }
            sessionStorage.setItem('userData', JSON.stringify(userData))
            window.location = './homeLogged.html'
        } catch (err) {
            const label = document.createElement('label')
            label.textContent = err.message
            label.style.color = 'red'
            ev.target.appendChild(label)
        }
    }
    async function register(ev) {
        ev.preventDefault()
        const formData = new FormData(ev.target)
        const [email, password, repeat] = [...formData.values()]
        const url = 'http://localhost:3030/users/register'
        try {
            if (ev.target.lastElementChild.tagName == 'LABEL') {
                ev.target.lastElementChild.remove()
            }
            if (password != repeat) {
                throw Error('Passwords don\'t match')
            }
            const res = await fetch(url, {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ 'email': email, 'password': password })
            })
            if (res.ok == false) {
                const error = await res.json()
                throw Error(error.message)
            }
            const data = await res.json()
            userData = {
                'email': data.email,
                'id': data._id,
                'token': data.accessToken
            }
            sessionStorage.setItem('userData', userData)
            window.location = './homeLogged.html'
        } catch (err) {
            const label = document.createElement('label')
            label.textContent = err.message
            label.style.color = 'red'
            ev.target.appendChild(label)
        }
    }
}
solve()