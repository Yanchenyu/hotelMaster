import React, {Component} from 'react'
import {render} from 'react-dom'
import Header from '../components/pageHeader'
import {connect} from 'react-redux'
import '../styles/customStyle/views/roomList.less'
import actions from '../actions/actionCreator'
import {storeGet} from '../utils/localStorage'
import classnames from 'classnames'
import ReactSVG from 'react-svg'
import telephone from '../svg/telephone.svg'
import rawMore from '../svg/raw-more.svg'

class RoomList extends Component {
    constructor(props){
        super(props);
        this.state = {
            roomList: [],
            num: -1
        };
        this.touchStart = this.touchStart.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }
    touchStart(){

    }
    touchEnd(){
        
    }
    componentDidMount(){
        let token = this.props.token === '' ? storeGet('HotelMaster', 'UserData').Token : this.props.token;
        this.props.dispatch(actions.getHotelRoomList({token})).then(response => {
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
                                <div className={classnames('roomList', 'cus-flexrow', {'listFocus': this.state.num === index})} key={index} onTouchStart={this.touchStart(index)} onTouchEnd={this.touchEnd}>
                                    <section className={classnames("listFocusHead", {'firstListFocus': this.state.num===0, 'hide': this.state.num === index})}></section>
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
        token: state.hotelRoomMes.token
    }
}

export default connect(mapStateToProps)(RoomList);