import fetch from 'isomorphic-fetch';
import {serviceIpHotelMaster} from '../services/config';
import {createHashHistory} from 'history'

const history = createHashHistory();

function loginAction(data){
    return dispatch => {
        return fetch(`${serviceIpHotelMaster}/HostelAccount/Login?UserName=${data.userName}&PassWord=${data.password}&callback`)
            .then(response => response.json())
            .then(response => {
                if(response.ResultCode==0){
                    dispatch(setUserData(data));
                    dispatch(setHotelData(response.Data));
                    history.replace('/roomList');
                }
            })
            
    }
}

function setUserData(data) {
    return {
        type: 'SET_USER_DATA',
        data
    }
}

function setHotelData(data) {
    return {
        type: 'SET_HOTEL_DATA',
        data
    }
}

export default {loginAction,setHotelData}