import { setUserData, clearUserData } from "../helpers.js"
import * as api from "./api.js"

const paths = {
    login: '/users/login',
    logout: '/users/logout',
    register: '/users/register',
    create: '/data/books',
    getAll: '/data/books?sortBy=_createdOn%20desc',
    getById: '/data/books/',
    getByUser: (userId) => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
}

async function login(email, password) {
    const result = await api.post(paths.login, { email, password })
    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    }
    setUserData(userData)
}

async function logout() {
    api.get(paths.logout)
    clearUserData()
}

async function register(email, password) {
    const data = {
        email,
        password
    }
    const result = await api.post(paths.register, data)
    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    }
    setUserData(userData)
}

async function createBook(bookData) {
    return await api.post(paths.create, bookData)
}

async function getAllBooks() {
    return await api.get(paths.getAll)
}
async function getBookById(id) {
    return await api.get(paths.getById + id)
}

async function editBook(id, bookData) {
    return await api.put(paths.getById + id, bookData)
}

async function deleteBook(id) {
    return await api.del(paths.getById + id)
}
async function getAllUserBooks(userId) {
    return await api.get(paths.getByUser(userId))
}

export {
    login,
    logout,
    register,
    createBook,
    getAllBooks,
    getBookById,
    editBook,
    deleteBook,
    getAllUserBooks
}