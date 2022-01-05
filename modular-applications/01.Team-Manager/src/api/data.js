import { setUserData, clearUserData } from "../helpers.js"
import * as api from "./api.js"

const paths = {
    login: '/users/login',
    logout: '/users/logout',
    register: '/users/register',
    create: '/data/teams',
    getAll: (offset) => `/data/teams/?offset=${offset}&pageSize=3`,
    getAllMemebers: '/data/members?where=status%3D%22member%22',
    getTeamMembers: (id) => `/data/members?where=${encodeURIComponent(`teamId IN ("${id}") AND status="member"`)}`,
    getById: '/data/teams/',
    getMememberships: (teamId) => `/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`,
    joinTeam: '/data/members',
    leaveTeam: '/data/members/',
    approveMember: '/data/members/',
    getUserTeams: (userId) => `/data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`
}

async function login(email, password) {
    const result = await api.post(paths.login, { email, password })
    const userData = {
        email: result.email,
        username: result.username,
        id: result._id,
        token: result.accessToken
    }
    setUserData(userData)
}

async function logout() {
    api.get(paths.logout)
    clearUserData()
}

async function register(email, password, username) {
    const data = {
        email,
        password,
        username
    }
    const result = await api.post(paths.register, data)
    const userData = {
        username: result.username,
        email: result.email,
        id: result._id,
        token: result.accessToken
    }
    setUserData(userData)
}
async function getAllTeams(pageNum) {
    return api.get(paths.getAll(pageNum))
}
async function getAllMembers() {
    return api.get(paths.getAllMemebers)
}
async function getTeamMembers(id) {
    return api.get(paths.getTeamMembers(id))
}
async function createTeam(data) {
    return api.post(paths.create, { name: data.name, logoUrl: data.logoUrl, description: data.description })
}
async function getTeamById(id) {
    return api.get(paths.getById + id)
}
async function getMemberships(teamId) {
    return api.get(paths.getMememberships(teamId))
}
async function join(teamId) {
    return api.post(paths.joinTeam, { teamId })
}
async function leave(membershipId) {
    return api.del(paths.leaveTeam + membershipId)
}
async function approve(membershipId) {
    return api.put(paths.approveMember + membershipId,
        {
            "status": "member",
        })
}
async function editTeam(id, data) {
    return api.put(paths.getById + id, data)
}
async function getUserTeams(userId) {
    return api.get(paths.getUserTeams(userId))
}

export {
    login,
    logout,
    register,
    getAllTeams,
    getAllMembers,
    getTeamMembers,
    createTeam,
    getTeamById,
    join,
    leave,
    approve,
    getMemberships,
    editTeam,
    getUserTeams
}