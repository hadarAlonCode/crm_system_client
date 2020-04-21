import {
    SET_USER_DATA
} from '../actions/types'

const initialState = {
    email: "",
    user_key: "",
}


export default function (state = initialState, action) {
    console.log(action.payload);

    switch (action.type) {
        
        case SET_USER_DATA:
            const { user_key, email } = action.payload

            console.log(email);
            return {
                ...state,
                email:email,
                user_key: user_key,

            }
        default:
            return state
    }
}