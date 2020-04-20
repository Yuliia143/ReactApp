import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux'; //makes redux store available to any nested components
import HeaderContainer from "./components/HeaderContainer";
import Home from "./pages/Home/Home";
import User from "./pages/User/User";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import {store, persistor} from "./store";
import CreateLecture from "./pages/Lectures/Create/CreatePage";
import {PersistGate} from 'redux-persist/integration/react';
import FooterContainer from "./components/FooterContainer";



function App() {

    return (
        <div className="App">
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        <HeaderContainer/>
                        <Switch>
                            <div className="mainContent">
                                <Route exact path="/" component={Home}/>
                                <Route path="/user" component={User}/>
                                <Route path="/signup" component={SignUp}/>
                                <Route path="/signin" component={SignIn}/>
                                <Route path="/lecture/new" component={CreateLecture}/>    
                            </div>
                        </Switch>
                        <FooterContainer/>
                    </Router>
                </PersistGate>
            </Provider>
        </div>
    );
}

export default App;
