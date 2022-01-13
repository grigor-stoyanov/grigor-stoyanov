import * as api from './api.js'
import { setUserData, clearUserData } from '../util.js'

const endpoints = {
    login: '/users/login',
    logout: '/users/logout',
    register: '/users/register',
    getall: `/data/topics/?load=${encodeURIComponent('author=_ownerId:users')}`,
    create: '/data/topics',
    topics: '/data/topics?count',
    getbyid:(id) => `/data/topics/${id}?load=${encodeURIComponent('author=_ownerId:users')}`,
    commentsByTopicId:(topicId) => '/data/topicComents?where=' + encodeURIComponent(`topicId="${topicId}"`)+ `&sortBy=_createdOn%20desc&load=${encodeURIComponent('author=_ownerId:users')}`,
    createComment:'/data/topicComents'
}


export async function login(email, password) {
    const result = await api.post(endpoints.login, { email, password })
    const userData = {
        email: result.email,
        username: result.username,
        id: result._id,
        token: result.accessToken
    }
    setUserData(userData)
}

export async function logout() {
    api.get(endpoints.logout)
    clearUserData()
}

export async function register(email, password, username) {
    const data = {
        email,
        password,
        username
    }
    const result = await api.post(endpoints.register, data)
    const userData = {
        username: result.username,
        email: result.email,
        id: result._id,
        token: result.accessToken
    }
    setUserData(userData)
}


export async function getAllTopics() {
    return api.get(endpoints.getall)
}

export async function createTopic(topic) {
    return api.post(endpoints.create, topic)
}

export async function getTopicCount() {
    return api.get(endpoints.topics)
}

export async function getTopicById(id) {
    return api.get(endpoints.getbyid(id))
}

export async function getComments(id){
    return api.get(endpoints.commentsByTopicId(id))
}
export async function createComment(comment){
    return api.post(endpoints.createComment,comment)
}