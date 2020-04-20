import { API } from "../../keys"
import axios from 'axios'
import { TASK_CREATE } from "../../routs"
import { getCookie } from "../../cookie/cookie"
// import { CONTACT_CREATE , CONTACT_UPDATE } from "../../routs"

export const getTasksPagination = (limit, page , user_key) => new Promise(resolve => {
    let token = getCookie("login_cookie")

    let headers
    if(token){
        headers = {'access-token' : token}
    }
    axios.get(`${API}/secure/task/pagination/get?limit=${limit}&page=${page}&user_key=${user_key}`, {headers}).then(res => {
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
    axios.get(`${API}/secure/task/get?user_key=${user_key}`, {headers}).then(res => {
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
    axios.post(`${API}/secure/task/update?_id=${_id}`, body, {headers}).then(res => {
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
    axios.post(`${API}/secure/task/delete?_id=${_id}`, {headers}).then(res => {
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


