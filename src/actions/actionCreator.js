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
                    dispatch(setToken(response.Data.Token));
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
function setToken(data) {
    return {
        type: 'SET_TOKEN',
        data
    }
}

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

export default {loginAction,setHotelData,getHotelRoomList}