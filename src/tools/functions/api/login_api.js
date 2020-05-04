import { API } from "../../keys"
import axios from 'axios'
import { LOGIN_AUTH, REGISTER_AUTH } from "../../routs"
import { getCookie } from "../../cookie/cookie"



export const loginApi = (body) => new Promise(resolve => {
    let token = getCookie("login_cookie")
    let headers
    if(token){
        headers = {'access-token' : token}
    }

    axios.post(`${API}${LOGIN_AUTH}` ,body , {headers}).then(res => {
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



export const registerApi = (body) => new Promise(resolve => {
    let token = getCookie("login_cookie")

    axios.post(`${API}${REGISTER_AUTH}` , body ).then(res => {
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