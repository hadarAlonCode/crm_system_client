import { SET_USER_DATA } from './types'

export const setUserData = data => async dispatch => {
    dispatch({
        type: SET_USER_DATA,
        payload: data
    })
}