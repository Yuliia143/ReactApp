import {Route, Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

function PrivateRoute({isAuth, children, ...rest}) {
    return (
        isAuth ? (
            <Route
                {...rest}
                render={() => children}
            />
        ) : (
            <Route
                path={rest.path}
                dispatc={rest.dispatch}
                render={({location}) =>
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: {from: location}
                        }}
                    />
                }
            />
        )

    );
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});


export default connect(mapStateToProps)(PrivateRoute)