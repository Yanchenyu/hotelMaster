import React from "react";
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {store} from './src/store/store'
import {render} from 'react-dom'
import {Route, hashHistory, HashRouter} from 'react-router-dom'
import Login from "./src/views/login"

const rootDom = document.getElementById("root");

render(
    <Provider store={store}>
        <HashRouter history={hashHistory}>
            <Route path='/' component={Login}></Route>
        </HashRouter>
    </Provider>,
    rootDom
);
