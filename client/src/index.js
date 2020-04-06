import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './store/index';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Provider} from 'react-redux';
import HeaderContainer from "./components/HeaderContainer"; //makes redux store available to any nested components
import DefaultLayout from "./layouts/default";
import Home from "./pages/Home";
import User from "./pages/User";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <React.StrictMode>
                <DefaultLayout>
                    <HeaderContainer/>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/user" component={User}/>
                </DefaultLayout>
            </React.StrictMode>
        </Router>
    </Provider>,
    document.getElementById('root')
);

