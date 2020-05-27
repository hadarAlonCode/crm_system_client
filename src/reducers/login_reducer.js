import {
    SET_USER_DATA
} from '../actions/types'

const initialState = {
    email: "",
    user_key: "",
}


export default function (state = initialState, action) {

    switch (action.type) { 
        case SET_USER_DATA:
            const { user_key, email } = action.payload

            return {
                ...state,
                email:email,
                user_key: user_key,

            }
        default:
            return state
    }
}