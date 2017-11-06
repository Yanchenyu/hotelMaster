import React, {Component} from 'react'
import {render} from 'react-dom'
import Header from '../components/pageHeader'
import {connect} from 'react-redux'
import '../styles/customStyle/views/roomList.less'
import actions from '../actions/actionCreator'
import {storeGet} from '../utils/localStorage'
import classnames from 'classnames'

class RoomList extends Component {
    constructor(props){
        super(props);
        this.state = {
            roomList: []
        }
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
                                <div className={classnames('roomList','cus-flexrow')} key={index}>
                                    <div className={classnames('hotelRoom','cus-flexcolumn')}>
                                        <div className={classnames('roomName', {'available1': item.RoomStatusName!='维修中', 'unavailable': item.RoomStatusName=='维修中'})}>{item.RoomName}</div>
                                        <div className={classnames('roomNumber', {'available2': item.RoomStatusName!='维修中', 'unavailable': item.RoomStatusName=='维修中'})}>{item.RoomNo}</div>
                                    </div>
                                    <div className='userMes'>
                                        <div className={classnames('userMesDiv','cus-flexrow',{'hide': item.RoomStatusName !== '已入住' && item.RoomStatusName !== '已预订'})}>
                                            {/*<icon name='telephone' scale='1.5'></icon>*/}
                                            <div>{item.CustomerName+item.Phone}</div>
                                        </div>
                                    </div>
                                    <div className='hotelRoomState'>
                                        <icon name='raw-more' scale='2.6'></icon>
                                        <div>{item.RoomStatusName}</div>
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