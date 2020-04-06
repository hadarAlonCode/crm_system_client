import {
    SET_USER_DATA
} from '../actions/types'

const initialState = {
    username: "hadar",
    password: ""
}


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                user: action.payload
            }

        // case SET_USER_DATA: 
        // return{
        //     ...state,
        //     user:action.payload
        // }


        default:
            return state
    }
}