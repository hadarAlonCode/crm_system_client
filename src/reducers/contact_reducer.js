import {
    ADD_NEW_CONTACT, GET_ALL_CONTACTS
} from '../actions/types'

//manage the new contact flow
const initialState = {
    new_contact: "",
}


export default function (state = initialState, action) {

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