import { clearUserData, setUserData, getUserData } from "../helpers.js"

const host = "http://localhost:3030"

async function request(url, options) {
    try {
        const response = await fetch(host + url, options)
        if (response.ok == false) {
            // no authorisation
            if (response.status == 403) {
                clearUserData()
            }
            const error = await response.json()
            throw Error(error.message)
        }
        // handling no data in response
        const data = await response.text()
        return data.length ? JSON.parse(data) : response
    } catch (err) {
        throw {error:err.message}
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

export {
    get,
    post,
    put,
    del
}