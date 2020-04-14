import React from "react";
import "./App.css";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Provider} from 'react-redux'; //makes redux store available to any nested components
import HeaderContainer from "./components/HeaderContainer";
import Home from "./pages/Home/Home";
import User from "./pages/User/User";
import store from "./store";
import FooterContainer from "./components/FooterContainer";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Router>
                    <Switch>
                        <HeaderContainer/>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route path="/user">
                            <User/>
                        </Route>
                    </Switch>
                </Router>
                <Home/>
                <FooterContainer/>
            </Provider>
        </div>
    );
}

export default App;