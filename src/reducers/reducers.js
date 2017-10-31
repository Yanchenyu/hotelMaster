import {combineReducers} from 'redux'

function userData(state={}, action){
    switch(action.type) {
        case 'USER_DATA':
            return action.userData
        default:
            return state
    }
}

export const reducers = combineReducers({
    userData
})