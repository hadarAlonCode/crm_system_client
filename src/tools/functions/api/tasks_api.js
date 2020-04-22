import { API } from "../../keys"
import axios from 'axios'
import { 
    TASK_CREATE,
    TASK_PAGINATION,
    TASK_GET_ALL_OPEN_TASKS,
    TASK_UPDATE,
    TASK_DELETE } 
from "../../routs"

import { getCookie } from "../../cookie/cookie"

export const getTasksPagination = (limit, page , user_key) => new Promise(resolve => {
    let token = getCookie("login_cookie")

    let headers
    if(token){
        headers = {'access-token' : token}
    }
    axios.get(`${API}${TASK_PAGINATION.replace("LIMIT", limit).replace("PAGE", page).replace("USER_KEY", user_key)}`, {headers}).then(res => {
        const {
            ok,
            result
        } = res.data
        const output = {
            ok,
            result
        }
        resolve(output)
    }).catch(err => {
        resolve({ ok: false })
    })
})

export const getAllTasks = (user_key) => new Promise(resolve => {
    let token = getCookie("login_cookie")

    let headers
    if(token){
        headers = {'access-token' : token}
    }
    axios.get(`${API}${TASK_GET_ALL_OPEN_TASKS.replace("USER_KEY", user_key)}`, {headers}).then(res => {
        const {
            ok,
            result
        } = res.data
        const output = {
            ok,
            result
        }
        resolve(output)
    }).catch(err => {
        resolve({ ok: false })
    })
})


export const addNewTaskApi = (body) => new Promise(resolve => {
    let token = getCookie("login_cookie")

    let headers
    if(token){
        headers = {'access-token' : token}
    }
    axios.post(`${API}${TASK_CREATE}`, body,  {headers}).then(res => {
        const {
            ok,
            result
        } = res.data
        const output = {
            ok,
            result
        }
        resolve(output)
    }).catch(err => {
        resolve({ ok: false })
    })
})


export const updateTaskApi = (body , _id) => new Promise(resolve => {
    let token = getCookie("login_cookie")

    let headers
    if(token){
        headers = {'access-token' : token}
    }
    axios.post(`${API}${TASK_UPDATE.replace("_ID", _id)}`, body, {headers}).then(res => {
        const {
            ok,
            result
        } = res.data
        const output = {
            ok,
            result
        }
        resolve(output)
    }).catch(err => {
        resolve({ ok: false })
    })
})

export const deleteTaskApi = (_id) => new Promise(resolve => {
    let token = getCookie("login_cookie")

    let headers
    if(token){
        headers = {'access-token' : token}
    }

    let body = {}


    axios.post(`${API}${TASK_DELETE.replace("_ID", _id)}`, body, {headers}).then(res => {
        const {
            ok,
            result
        } = res.data
        const output = {
            ok,
            result
        }
        resolve(output)
    }).catch(err => {
        resolve({ ok: false })
    })
})


