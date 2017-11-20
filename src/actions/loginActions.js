import fetch from 'isomorphic-fetch';
import {serviceIpHotelMaster} from '../services/config';
import {createHashHistory} from 'history'
import {storeSet} from '../utils/localStorage'

const history = createHashHistory();

// 登录action
function loginAction(data){
    return dispatch => {
        return fetch(`${serviceIpHotelMaster}/HostelAccount/Login?UserName=${data.userName}&PassWord=${data.password}&callback`,{method: 'get'})
            .then(response => response.json())
            .then(response => {
                if(response.ResultCode==0){
                    dispatch(setUserData(data));
                    dispatch(setHotelData(response.Data));
                    dispatch(setHotelRoomMes({'token': response.Data.Token}));
                    storeSet('HotelMaster', 'UserData', response.Data);
                    history.push('/roomList');
                }
            })
            
    }
}

// 设置登录用户信息
function setUserData(data) {
    return {
        type: 'SET_USER_DATA',
        data
    }
}

// 设置客栈主人信息
function setHotelData(data) {
    return {
        type: 'SET_HOTEL_DATA',
        data
    }
}

// 设置token
export const setHotelRoomMes = (data) => {
    return {
        type: 'SET_HOTEL_ROOM_MES',
        data
    }
}

export default {loginAction,setHotelData}