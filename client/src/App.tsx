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
import EditProfile from './pages/User/EditProfile'
import EditPhoto from './pages/User/EditPhoto'
import EditEmail from './pages/User/EditEmail'
import EditPassword from './pages/User/EditPassword'
import UserEditPage from './pages/User/UserEditPage'
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
                            {/* <Route path="/user">
                                <User/>
                            </Route> */}
                            <Route path="/edit-profile">
                                <EditProfile />
                            </Route>
                            <Route path="/edit-photo">
                                <EditPhoto />
                            </Route>
                            <Route path="/edit-email">
                                <EditEmail />
                            </Route>
                            <Route path="/edit-password">
                                <EditPassword />
                            </Route>
                            <Route path="/edit-page">
                                <UserEditPage />
                            </Route>
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
