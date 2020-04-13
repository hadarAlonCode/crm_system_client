import { API } from "../../keys"
import axios from 'axios'
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

