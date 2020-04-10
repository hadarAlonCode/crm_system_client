import { API } from "../../keys"
import axios from 'axios'

export const getContactsPagination = (limit, page) => new Promise(resolve => {
    axios.get(`${API}/contact/pagination/get?limit=${limit}&page=${page}`).then(res => {
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


export const addContact = (body) => new Promise(resolve => {
    axios.post(`${API}/contact/create`, body).then(res => {
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