import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux'; //makes redux store available to any nested components
import HeaderContainer from "./components/HeaderContainer";
import DefaultLayout from "./components/layouts/default";
import Home from "./pages/Home/Home";
import User from "./pages/User/User";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import {store, persistor} from "./store";
import CreateLecture from "./pages/Lectures/Create/CreatePage"
import { PersistGate } from 'redux-persist/integration/react'


function App() {
    return (
        <div className="App">
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                    <Router>
                    <Switch>
                        <DefaultLayout>
                            <HeaderContainer />
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route path="/user">
                                <User />
                            </Route>
                            <Route path="/signup">
                                <SignUp />
                            </Route>
                            <Route component={SignIn} path="/signin" />
                            <Route path="/lecture/new">
                                <CreateLecture />
                            </Route>
                        </DefaultLayout>
                    </Switch>
                </Router>

                    </PersistGate>
                </Provider>

        </div>
    );
}

export default App;
