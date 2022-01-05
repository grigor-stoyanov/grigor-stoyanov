import { clearUserData, getUserData, setUserData } from "../util.js"
import { notify } from "../common/notify.js"
const host = 'http://localhost:3030'
async function request(url, options) {
    try {
        const response = await fetch(host + url, options)
        if (response.ok == false) {
            // error with accessToken
            if (response.status == 403) {
                clearUserData()
            }
            // networking error
            const error = await response.json()
            throw Error(error.message)
        }
        // if no data in response
        if (response.status == 204) {
            return response
        } else {
            // data promise of response
            return response.json()
        }

    } catch (err) {
        // alert(err)
        notify(err.message)
        throw err
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {}
    }
    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(data)
    }
    const userData = getUserData()
    if (userData != null) {
        options.headers['X-Authorization'] = userData.token
    }
    return options
}


async function get(url) {
    return request(url, createOptions())
}

async function post(url, data) {
    return request(url, createOptions('post', data))
}
async function put(url, data) {
    return request(url, createOptions('put', data))
}

async function del(url) {
    return request(url, createOptions('delete'))
}

async function login(email, password) {
    const result = await post('/users/login', { email, password })
    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    }
    setUserData(userData)
}
async function logout() {
    await get('/users/logout')
    clearUserData()

}
async function register(email, password, repass) {

    if (password == '' || email == '' || repass == '') {
        throw Error('All fields are required!')
    }
    if (password != repass) {
        throw Error('Passwords don\'t match')
    }
    const result = await post('/users/register', { email, password })
    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    }
    setUserData(userData)
}
export {
    get,
    post,
    put,
    del,
    login,
    logout,
    register
}