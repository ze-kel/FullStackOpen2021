const initialState = ''

let cancelTimer

export const emptyNotification = () => {
    return {
        type: 'emptyNotif',
    }
}

export const setNotification = (text, time) => {
    return async dispatch => {
        dispatch({
            type: 'setNotif',
            notification: text
        })

        if (cancelTimer) {
            clearTimeout(cancelTimer)
        }
        cancelTimer = setTimeout(() => dispatch({
            type: 'emptyNotif'
        }), time * 1000)
    }
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setNotif':
            return action.notification
        case 'emptyNotif':
            return ''
        default:
            return state
    }
}

export default notificationReducer