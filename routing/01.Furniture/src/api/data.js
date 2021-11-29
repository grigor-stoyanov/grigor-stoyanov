import * as api from "./api.js"
const login = api.login
const register = api.register
const logout = api.logout
const endpoints = {
    all: '/data/catalog',
    byId: '/data/catalog/',
    myItems: (userId) => `/data/catalog/?where=_ownerId%3d%22${userId}%22`,
    create: '/data/catalog,',
    edit: '/data/catalog/',
    delete: '/data/catalog/'
}
async function getAll() {
    return api.get(endpoints.all)
}
async function getById(id) {
    return api.get(endpoints.byId + id)
}
async function getMyItems(userId) {
    return api.get(endpoints.myItems(userId))
}
async function createItem(data) {
    return api.post(endpoints.create, data)
}
async function editItem(data,id) {
    return api.put(endpoints.edit + id, data)
}
async function deleteItem(id) {
    return api.del(endpoints.delete + id)
}
export {
    login,
    register,
    logout,
    getAll,
    getById,
    getMyItems,
    createItem,
    editItem,
    deleteItem
}