import fetch from 'isomorphic-fetch';
import {serviceIpHotelMaster} from '../services/config';
import {storeSet} from '../utils/localStorage'
import {setHotelRoomMes} from './loginActions'
import {createHashHistory} from 'history'

const history = createHashHistory();

// 获取房间列表
function getHotelRoomList(data) {
    return dispatch => {
        return fetch(`${serviceIpHotelMaster}/HostelRoom/QueryHostelRoomList?Token=${data.token}`,{method: 'get'})
            .then(response => response.json())
            .then(response => {
                return response
            })
    }
}

// 点击单个房间的信息明细
function setHotelRoomData(data) {
    return {
        type: 'SET_HOTEL_ROOM_DATA',
        data
    }
}

// 设置房间入住界面状态
function setRoomStatus(data) {
    return {
        type: 'SET_ROOM_STATUS',
        data
    }
}

function setLoginWayIndex(data) {
    return {
        type: 'SET_LOGIN_WAY_INDEX',
        data
    }
}

export default {
    getHotelRoomList,
    setHotelRoomData,
    setHotelRoomMes,
    setRoomStatus,
    setLoginWayIndex,
}
