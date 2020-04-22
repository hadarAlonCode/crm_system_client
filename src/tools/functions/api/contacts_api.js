import { API } from "../../keys"
import axios from 'axios'
import { 
    CONTACT_CREATE,
    CONTACT_GET_FILTER , 
    CONTACT_UPDATE, 
    CONTACT_DELETE, 
    CONTACT_SEARCH_BY_NAME,  
    CONTACT_PAGINATION, 
    CONTACT_GET_ALL, 
    CONTACT_GET_GROUP_COUNT_AND_MATCH_STATUS ,
    CONTACT_GET_GROUP_COUNT  } 
from "../../routs"

import { getCookie } from "../../cookie/cookie"


export const getContactsPagination = (limit, page, user_key) => new Promise(resolve => {
    let token = getCookie("login_cookie")

    let headers
    if(token){
        headers = {'access-token' : token}
    }
   
    axios.get(`${API}${CONTACT_PAGINATION.replace("LIMIT", limit).replace("PAGE", page).replace("USER_KEY", user_key)}`,  {headers}).then(res => {
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
    
    axios.get(`${API}${CONTACT_GET_ALL.replace("USER_KEY", user_key)}`,  {headers}).then(res => {
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
    
    axios.post(`${API}${CONTACT_UPDATE.replace("_ID", _id)}`, body,  {headers}).then(res => {
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


    axios.post(`${API}${CONTACT_DELETE.replace("_ID", _id)}`, body,  {headers}).then(res => {
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
    
    axios.get(`${API}${CONTACT_SEARCH_BY_NAME.replace("KEYWORD", keyword).replace("USER_KEY", user_key)}`,  {headers}).then(res => {
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
    
    let rout = `${CONTACT_GET_GROUP_COUNT.replace("USER_KEY", user_key).replace("GROUP", group)}`
    if(match_status){   
        rout = `${CONTACT_GET_GROUP_COUNT_AND_MATCH_STATUS.replace("USER_KEY", user_key).replace("GROUP", group).replace("MATCH_STATUS", match_status)}` 
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
    
    axios.get(`${API}${CONTACT_GET_FILTER.replace("USER_KEY", user_key).replace("KEY", key).replace("VALUE", value)}`,  {headers}).then(res => {
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




