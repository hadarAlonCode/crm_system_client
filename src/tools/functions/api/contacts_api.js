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


// export const getContacts = (limit, skip, facility_id) => new Promise(resolve => {
//     axios.get(`${API}/parking/notifications/get?limit=${limit}&skip=${skip}&facility_id=${facility_id}`).then(res => {
//         const {
//             ok,
//             result
//         } = res.data
//         const output = {
//             ok,
//             result
//         }
//         resolve(output)
//     }).catch(err => {
//         resolve({ ok: false })
//     })
// })