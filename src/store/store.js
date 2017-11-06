import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {reducers} from '../reducers/reducers'

const initState = {
    userData: {},
    hotelMasterData: {},
    hotelRoomMes: {
        token: ''
    }
};

export const store = createStore(
    reducers,
    initState,
    applyMiddleware(thunk)
)