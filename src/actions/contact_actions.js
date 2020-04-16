import { ADD_NEW_CONTACT } from './types'

export const setNewContact = (data) => async dispatch => {
    dispatch({
        type: ADD_NEW_CONTACT,
        payload: data
    })
}