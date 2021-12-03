import { setUserData, clearUserData } from "../helpers.js"
import * as api from "./api.js"

const paths = {
    login: '/users/login',
    logout: '/users/logout',
    register: '/users/register',
    create: '/data/memes',
    getAll: '/data/memes?sortBy=_createdOn%20desc',
    getById: '/data/memes/',
    getByUser: (userId) => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
}

async function login(email, password) {
    const result = await api.post(paths.login, { email, password })
    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken,
        username: result.username,
        gender: result.gender
    }
    setUserData(userData)
}

async function logout() {
    await api.get(paths.logout)
    clearUserData()
}

async function register(email, password, username, gender) {
    const data = {
        username,
        email,
        password,
        gender
    }
    const result = await api.post(paths.register, data)
    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken,
        username: result.username,
        gender: result.gender
    }
    setUserData(userData)
}

async function createMeme(memeData) {
    return await api.post(paths.create, memeData)
}

async function getAllMemes() {
    return await api.get(paths.getAll)
}
async function getMemeById(id) {
    return await api.get(paths.getById + id)
}

async function editMeme(id, memeData) {
    return await api.put(paths.getById + id, memeData)
}

async function deleteMeme(id) {
    return await api.del(paths.getById + id)
}
async function getAllUserMemes(userId) {
    return await api.get(paths.getByUser(userId))
}

export {
    login,
    logout,
    register,
    createMeme,
    getAllMemes,
    getMemeById,
    editMeme,
    deleteMeme,
    getAllUserMemes
}