import React from "react";
import "./App.css";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Provider} from 'react-redux'; //makes redux store available to any nested components
import HeaderContainer from "./components/HeaderContainer";
import DefaultLayout from "./components/layouts/default";
import Home from "./pages/Home/Home";
import User from "./pages/User/User";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Lecture from "./pages/Lecture/Lecture";
import store from "./store";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Router>
                    <Switch>
                        <DefaultLayout>
                            <HeaderContainer/>
                            <Route exact path="/">
                                <Home/>
                            </Route>
                            <Route path="/user">
                                <User/>
                            </Route>
                            <Route path="/lecture/:id" component={Lecture}/>
                             
                            <Route path="/signup">
                                <SignUp/>
                            </Route>
                            <Route path="/signin">
                                <SignIn/>
                            </Route>
                        </DefaultLayout>
                    </Switch>
                </Router>
            </Provider>
        </div>
    );
}

export default App;
