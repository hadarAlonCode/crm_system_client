import { API } from "../../keys"
import axios from 'axios'
import { TASK_CREATE } from "../../routs"
// import { CONTACT_CREATE , CONTACT_UPDATE } from "../../routs"
export const getTasksPagination = (limit, page) => new Promise(resolve => {
    axios.get(`${API}/task/pagination/get?limit=${limit}&page=${page}`).then(res => {
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
    axios.post(`${API}${TASK_CREATE}`, body).then(res => {
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
    
    axios.post(`${API}/task/update?_id=${_id}`, body).then(res => {
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
    
    axios.post(`${API}/task/delete?_id=${_id}`).then(res => {
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


