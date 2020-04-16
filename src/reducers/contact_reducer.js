import {
    ADD_NEW_CONTACT
} from '../actions/types'

const initialState = {
    new_contact: "",
    
}


export default function (state = initialState, action) {
    console.log(action.payload);

    switch (action.type) {
        
        case ADD_NEW_CONTACT:
            return {
                ...state,
                new_contact:action.payload._id

            }
        default:
            return state
    }
}