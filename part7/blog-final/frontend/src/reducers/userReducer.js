/* eslint-disable indent */

import blogService from '../services/blogs'

export const setUser = (user) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET_USER',
            user: user,
        })
    }
}

export const removeUser = () => {
    return async (dispatch) => {
        dispatch({
            type: 'REMOVE_USER',
        })
    }
}

export const initUser = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedappUser')
        const user = JSON.parse(loggedUserJSON)
        if (loggedUserJSON) {
            dispatch({
                type: 'SET_USER',
                user: user,
            })
        }
    }
}

const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_USER':
            window.localStorage.setItem('loggedappUser', JSON.stringify(action.user))
            blogService.setToken(action.user.token)
            return action.user
        case 'REMOVE_USER':
            window.localStorage.removeItem('loggedappUser')
            return null
        default:
            return state
    }
}

export default userReducer
