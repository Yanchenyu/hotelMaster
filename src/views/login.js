import React, {Component} from 'react'
import classnames from 'classnames'
import actions from '../actions/actionCreator'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import md5 from 'blueimp-md5'
import hotelMaster from '../images/hotelMaster.png'
import '../styles/login.less'
import {Link} from 'react-router-dom'

class Login extends Component {
    constructor(props){
        super(props);
        this.usrHandleChange = this.usrHandleChange.bind(this);
        this.paswHandleChange = this.paswHandleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            userName: '',
            password: ''
        };
    }
    usrHandleChange(e){
        let userName = e.target.value;
        this.setState({
            userName
        });
    }
    paswHandleChange(e){
        let password = e.target.value;
        this.setState({
            password
        });
    }
    handleClick(){
        let userName = this.state.userName;
        let password = md5(this.state.password);
        if(userName==''||password==''){
            return
        }
        let userData = {
            userName,
            password
        };
        this.props.dispatch(actions.loginAction(userData));
    }
    render(){
        let btnClass = classnames({
            'btnClass': this.state.userName==''||this.state.password==''
        });
        return (
            <div className='bg'>
                <section>
                    <img src={hotelMaster} width="200px" />
                </section>
                <div className='loginInput'>
                    <input type='text' placeholder='请输入手机号' onChange={this.usrHandleChange} />
                    <input type='password' placeholder='请输入密码' onChange={this.paswHandleChange} />
                </div>
                <div className='forgetPassword'>忘记密码</div>
                <div className='loginBtn'>
                    <button onClick={this.handleClick} className={btnClass}>主人登录</button>
                </div>
                <div><Link to='/roomList'>aaaa</Link></div>
            </div>
        )
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(actions, dispatch)  // 使用bindActionCreators的场景应该是如果有个子组件，希望它能用redux的方法，但是又不希望它觉察到redux的存在，那么就let boundActionCreators = bindActionCreators(actions, dispatch)，把这个boundActionCreators作为属性传递给子组件，这样就能作为属性直接用dispatch了
//     }
// }

// export default connect(mapDispatchToProps)(Login)
const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Login)
