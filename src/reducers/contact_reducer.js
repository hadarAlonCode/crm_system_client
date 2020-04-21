import {
    ADD_NEW_CONTACT, GET_ALL_CONTACTS
} from '../actions/types'

const initialState = {
    new_contact: "",
    all_contacts: []
    
}


export default function (state = initialState, action) {
    console.log(action.payload);

    switch (action.type) {
        
        case ADD_NEW_CONTACT:
            return {
                ...state,
                new_contact:action.payload._id

            }
        case GET_ALL_CONTACTS:
            return {
                ...state,
                all_contacts:action.payload

            }    
            
        default:
            return state
    }
}