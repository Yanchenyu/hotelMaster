import React,{Component} from 'react';
import {render} from 'react-dom';
import pageTitle from '../router/routeTitle'
import backImg from '../images/back.png'
import '../styles/customStyle/components/pageHeader.less'
import '../styles/common/basicStyle.less'
import classnames from 'classnames'

export default class Header extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <div className='header'>
                    <div className={classnames('cus-flexrow','back')}>
                        <img src={backImg} height='25px' width='25px' />
                        <span>{this.props.path=='/roomList'?'退出客栈':'返回'}</span>
                    </div>
                    <span>{pageTitle[this.props.path]}</span>
                    <div className={classnames('cus-flexrow','maintain',{'showOff': true})}>
                        <span>维护</span>
                        <img src={backImg} height='25px' width='25px' />
                    </div>
                </div>
            </div>
        )
    }
}