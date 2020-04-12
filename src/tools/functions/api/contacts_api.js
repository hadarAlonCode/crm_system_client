import { API } from "../../keys"
import axios from 'axios'
import { CONTACT_CREATE , CONTACT_UPDATE } from "../../routs"
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
    axios.post(`${API}${CONTACT_CREATE}`, body).then(res => {
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


export const updateContact = (body , _id) => new Promise(resolve => {
    
    axios.post(`${API}/contact/update?_id=${_id}`, body).then(res => {
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




export const searchByName = (body) => new Promise(resolve => {
    console.log(body);
    
    axios.get(`${API}/contact/pagination/get`, body).then(res => {
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



// let search =()=>{
//     let val = 'bar'

//     let char = val.toLowerCase()

//     const p = Array.from(char).reduce((a, v, i) => `${a}[^${char.substr(i)}]*?${v}`, '');
//     const re = RegExp(char);
//     console.log(re);

//     let body = {
//         name: re
//     }

//     searchByName(body)
    
// }

// search()


