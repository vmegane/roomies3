const initState = {};

const homeReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_HOME':
            console.log('created home', action.home)
            return state
        case 'ADD_HOME_ERROR':
            console.log('create home error', action.err)
            return state
        case 'ADD_MESSAGE':
            console.log('added message', action.message)
            return state
        case 'ADD_MESSAGE_ERROR':
            console.log('add message error', action.err)
            return state
        case 'JOIN_HOME':
            console.log('added user', action.user)
            return state
        case 'JOIN_HOME_ERROR':
            console.log('add user error', action.err)
            return state
        default:
            return state
    }
}

export default homeReducer;