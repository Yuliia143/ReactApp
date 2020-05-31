import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import PrivateRoute from "./PrivateRoute";
import HeaderContainer from "./components/header/HeaderContainer";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import UserEditPage from "./pages/User/UserEditPage";
import { store, persistor } from "./store";
import CreateLecture from "./pages/Lectures/Create/CreatePage";
import FooterContainer from "./components/FooterContainer";
import Lecture from "./pages/Lecture/Lecture";
import { NoMatch } from "./components/NoMatch";
import FavoriteLections from "./pages/Home/FavoriteLections/FavoriteLections";
import Admin from "./pages/Admin/Admin";
import Webinar from "./pages/Webinar/Webinar";
import WebinarList from "./pages/WebinarList/WebinarList";
import Webinars from "./pages/Webinars/Webinars";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <HeaderContainer />
            <div className="mainContent">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
                <PrivateRoute path="/lecture/new" component={CreateLecture} />
                <PrivateRoute path="/lecture/:id" component={Lecture} />
                <PrivateRoute path="/edit-page" component={UserEditPage} />
                <PrivateRoute
                  path="/favorite-lections"
                  component={FavoriteLections}
                />
                <PrivateRoute path="/webinar/:id" component={Webinars} />
                <Route path="/webinars/list" component={WebinarList} />
                <PrivateRoute path="/admin" component={Admin} isAdmin />
                <PrivateRoute path="/webinar/new" component={Webinar} />
                <Route component={NoMatch} />
              </Switch>
            </div>
            <FooterContainer />
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export { App };
