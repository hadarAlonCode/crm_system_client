import { ADD_NEW_CONTACT, GET_ALL_CONTACTS } from './types'

export const setNewContact = (data) => async dispatch => {
    dispatch({
        type: ADD_NEW_CONTACT,
        payload: data
    })
}


export const getAllContacts = (data) => async dispatch => {
    dispatch({
        type: GET_ALL_CONTACTS,
        payload: data
    })
}