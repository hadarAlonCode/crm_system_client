import { API } from "../../keys"
import axios from 'axios'
import { CONTACT_CREATE , CONTACT_UPDATE, CONTACT_GET_ALL } from "../../routs"
import { getCookie } from "../../cookie/cookie"


export const getContactsPagination = (limit, page, user_key) => new Promise(resolve => {
    let token = getCookie("login_cookie")

    let headers
    if(token){
        headers = {'access-token' : token}
    }
   
    axios.get(`${API}/secure/contact/pagination/get?limit=${limit}&page=${page}&user_key=${user_key}`,  {headers}).then(res => {
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


export const getAllContacts = (user_key) => new Promise(resolve => {
    let token = getCookie("login_cookie")

    let headers
    if(token){
        headers = {'access-token' : token}
    }
    
    axios.get(`${API}/secure/contact/get?user_key=${user_key}`,  {headers}).then(res => {
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
    let token = getCookie("login_cookie")

    let headers
    if(token){
        headers = {'access-token' : token}
    }
    axios.post(`${API}${CONTACT_CREATE}`, body,  {headers}).then(res => {
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
    let token = getCookie("login_cookie")

    let headers
    if(token){
        headers = {'access-token' : token}
    }
    
    axios.post(`${API}/secure/contact/update?_id=${_id}`, body,  {headers}).then(res => {
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


export const deleteContact = ( _id) => new Promise(resolve => {
    let token = getCookie("login_cookie")

    let headers
    if(token){
        headers = {'access-token' : token}
    }

    let body = {}


    axios.post(`${API}/secure/contact/delete?_id=${_id}`, body,  {headers}).then(res => {
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




export const searchByName = (keyword, user_key) => new Promise(resolve => {
    let token = getCookie("login_cookie")

    let headers
    if(token){
        headers = {'access-token' : token}
    }
    
    axios.get(`${API}/secure/contact/search/name/get?keyword=${keyword}&user_key=${user_key}`,  {headers}).then(res => {
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


export const getCountGroupContacts = (user_key , group, match_status) => new Promise(resolve => {
    let token = getCookie("login_cookie")
    
    let headers
    if(token){
        headers = {'access-token' : token}
    }

    let rout = `/secure/contact/group/count/get?user_key=${user_key}&group=${group}`
    if(match_status){
        rout = `/secure/contact/group/count/get?user_key=${user_key}&group=${group}&match_status=${match_status}` 
    }
    
    axios.get(`${API}${rout}`,  {headers}).then(res => {
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


export const getFilterContacts = (user_key , key, value) => new Promise(resolve => {
    let token = getCookie("login_cookie")

    let headers
    if(token){
        headers = {'access-token' : token}
    }
    
    axios.get(`${API}/secure/contact/filter/get?user_key=${user_key}&key=${key}&value=${value}`,  {headers}).then(res => {
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




