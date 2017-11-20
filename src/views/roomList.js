import React, {Component} from 'react'
import {render} from 'react-dom'
import Header from '../components/pageHeader'
import {connect} from 'react-redux'
import '../styles/customStyle/views/roomList.less'
import actions from '../actions/roomListActions'
import {storeGet} from '../utils/localStorage'
import classnames from 'classnames'
import ReactSVG from 'react-svg'
import telephone from '../svg/telephone.svg'
import rawMore from '../svg/raw-more.svg'
import { bindActionCreators } from '../../../../Library/Caches/typescript/2.6/node_modules/redux';
import {createHashHistory} from 'history'

const history = createHashHistory();

class RoomList extends Component {
    constructor(props){
        super(props);
        this.state = {
            roomList: [],
            num: -1
        };
        this.touchStart = this.touchStart.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    touchStart(index){
        this.setState({
            num: index
        });
    }
    touchEnd(){
        this.setState({
            num: -1
        })
    }
    handleClick(data){
        this.props.actions.setHotelRoomData(data);
        this.props.actions.setHotelRoomMes({'hotelRoomId': data.Id, 'orderId': data.OrderId, 'roomStatus': data.Status, 'roomTypeId': data.RoomTypeId});
        if (data.RoomStatusName == '已入住') {
            history.push({
                pathname: '/checkedInRoom',
                query: {
                    reload: true
                }
            });
        } else if (data.RoomStatusName == '维修中' || data.RoomStatusName == '已退房') {
            history.push('/maintenance');
        } else if (data.RoomStatusName == '已预订') {
            this.props.actions.setRoomStatus(0);
            this.props.actions.setLoginWayIndex(0);
            history.push({
                pathname: '/hotelRoomLogin',
                query: {
                    index: 0
                }
            });
        } else {
            this.props.actions.setRoomStatus(2);
            this.props.actions.setLoginWayIndex(2);
            history.push({
                pathname: '/hotelRoomLogin',
                query: {
                    index: 2
                }
            });
        }
    }
    componentDidMount(){
        let token = this.props.token === '' ? storeGet('HotelMaster', 'UserData').Token : this.props.token;
        this.props.actions.getHotelRoomList({token}).then(response => {
            if (response.ResultCode === 0) {
                let roomList = response.Data;
                roomList.forEach(item => {
                    let phone = item.Phone;
                    let phoneArr = phone.split('');
                    phoneArr.splice(3, 4, '*', '*', '*', '*');
                    let newPhone = phoneArr.join('');
                    item.Phone = newPhone;
                });
                this.setState({
                    roomList
                });
            }
        })
    }
    render(){
        return (
            <div>
                <Header path={this.props.location.pathname}></Header>
                <div className='page-wrap'>
                    {
                        this.state.roomList.map((item, index) => {
                            return (
                                <div className={classnames('roomList', 'cus-flexrow', {'listFocus': this.state.num === index})} key={index} onTouchStart={() => {this.touchStart(index)}} onTouchEnd={this.touchEnd} onClick={() => {this.handleClick(item)}}>
                                    <section className={classnames("listFocusHead", {'firstListFocus': this.state.num===0, 'hide': this.state.num !== index})}></section>
                                    <div className={classnames('hotelRoom','cus-flexcolumn')}>
                                        <div className={classnames('roomName', {'available1': item.RoomStatusName!='维修中', 'unavailable': item.RoomStatusName=='维修中'})}>{item.RoomName}</div>
                                        <div className={classnames('roomNumber', {'available2': item.RoomStatusName!='维修中', 'unavailable': item.RoomStatusName=='维修中'})}>{item.RoomNo}</div>
                                    </div>
                                    <div className='userMes'>
                                        <div className={classnames('userMesDiv','cus-flexrow',{'hide': item.RoomStatusName !== '已入住' && item.RoomStatusName !== '已预订'})}>
                                            <ReactSVG path={telephone} style={{width: 13,height: 13}}></ReactSVG>
                                            <div>{item.CustomerName+item.Phone}</div>
                                        </div>
                                    </div>
                                    <div className='hotelRoomState'>
                                        <ReactSVG path={rawMore} style={{width: 23,height: 23}}></ReactSVG>
                                        <div className={classnames({'outTime':item.ExpireFlag === 1})}>{item.RoomStatusName}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        token: state.hotelRoomData.hotelRoomMes.token
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);