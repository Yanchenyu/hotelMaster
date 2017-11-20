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

function hotelRoomData(state={}, action) {
    switch(action.type) {
        case 'SET_HOTEL_ROOM_MES':
            return Object.assign({},state,{
                hotelRoomMes: {
                    ...state.hotelRoomMes,  // 如果不加这句话，则是浅拷贝，会直接替换掉hotelRoomMes里面所有的数据
                    ...action.data
                }
            })
        case 'SET_HOTEL_ROOM_DATA':
            return Object.assign({},state,{
                hotelRoomDataDetail: action.data
            })
        case 'SET_ROOM_STATUS':
            return Object.assign({}, state, {
                hotelRoomStatus: action.data
            })
        case 'SET_LOGIN_WAY_INDEX':
            return Object.assign({}, state, {
                hotelRoomStatus: action.data
            })
            
        default:
            return state
    }
}

export const reducers = combineReducers({
    userData,
    hotelMasterData,
    hotelRoomData
})