/* eslint-disable indent */
import userListService from '../services/userList'

export const initUserlist = () => {
    return async (dispatch) => {
        const initBlogs = await userListService.getAll()
        dispatch({
            type: 'INIT_USERLIST',
            content: initBlogs,
        })
    }
}

const userListReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_USERLIST':
            return action.content
        default:
            return state
    }
}

export default userListReducer
