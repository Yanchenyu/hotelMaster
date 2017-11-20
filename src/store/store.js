import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {reducers} from '../reducers/reducers'

const initState = {
    userData: {},
    hotelMasterData: {},
    hotelRoomData: {
        hotelRoomMes: {
            hotelRoomId: '',
            orderId: '',
            token: '',
            roomStatus: '',
            roomTypeId: ''
        },
        hotelRoomDataDetail: {
            RoomNo: 0
        },  // 房间信息明细
        hotelRoomStatus: 0, // 当前房间状态
        loginWayIndex: 0
    }
};

export const store = createStore(
    reducers,
    initState,
    applyMiddleware(thunk)
)