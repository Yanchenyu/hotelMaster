import {combineReducers} from 'redux'

function userData(state={}, action){
    switch(action.type) {
        case 'SET_USER_DATA':
            return action.data
        default:
            return state
    }
}

function hotelMasterData(state={}, action){
    switch(action.type) {
        case 'SET_HOTEL_DATA':
            return action.data
        default:
            return state
    }
}

export const reducers = combineReducers({
    userData,
    hotelMasterData
})