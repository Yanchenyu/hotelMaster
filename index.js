import React from "react";
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {store} from './src/store/store'
import {render} from 'react-dom'
import {Route, hashHistory, HashRouter, Switch} from 'react-router-dom'
import Login from './src/views/login'
import RoomList from './src/views/roomList'
import './src/styles/customStyle/root.less'

const rootDom = document.getElementById("root");

render(
    <Provider store={store}>
        <HashRouter history={hashHistory}>
            <Switch>
                <Route path='/' exact component={Login}></Route>
                <Route path='/roomList' component={RoomList}></Route>
            </Switch>
        </HashRouter>
    </Provider>,
    rootDom
);
