const initialState = ''


export const setFilter = (inputtext) => {
    return {
        type: 'setFilter',
        filter: inputtext
    }
}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setFilter':
            return action.filter
        default:
            return state
    }
}


export default filterReducer