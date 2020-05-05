import React from "react";
import "./App.css";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import PrivateRoute from "./PrivateRoute";
import HeaderContainer from "./components/header/HeaderContainer";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import UserEditPage from './pages/User/UserEditPage';
import AdminEditPage from './pages/Admin/AdminEditPage'
import {store, persistor} from "./store";
import CreateLecture from "./pages/Lectures/Create/CreatePage";
import FooterContainer from "./components/FooterContainer";
import Lecture from "./pages/Lecture/Lecture";
import {NoMatch} from "./components/NoMatch";


function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        <HeaderContainer/>
                        <div className="mainContent">
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route path="/signup" component={SignUp}/>
                                <Route path="/signin" component={SignIn}/>
                                <PrivateRoute path="/admin" component={AdminEditPage}/>
                                <PrivateRoute path="/lecture/new" component={CreateLecture}/>
                                <PrivateRoute path="/lecture/:id" component={Lecture}/>
                                <PrivateRoute path="/edit-page" component={UserEditPage}/>
                                <Route component={NoMatch}/>
                            </Switch>
                        </div>
                        <FooterContainer/>
                    </Router>
                </PersistGate>
            </Provider>
        </div>
    );
}

export default App;


