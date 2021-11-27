import * as api from './api.js'

const login = api.login

const register = api.login

const logout = api.login
const endpoints = {
    allMovies: '/data/movies',
    oneMovie: '/data/movies/'
}

async function getAllMovies() {
    return api.get(endpoints.allMovies)
}
async function getMovieById(id) {
    return api.get(endpoints.oneMovie + id)
}

export {
    login,
    register,
    logout,
    getAllMovies,
    getMovieById
}