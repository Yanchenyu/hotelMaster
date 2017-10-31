import React, {Component} from 'react'
import hotelMaster from '../images/hotelMaster.png'
import styles from '../styles/login.css'

export default class Login extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={styles.bg}>
                <section>
                    <img src={hotelMaster} width="200px" />
                </section>
            </div>
        )
    }
}