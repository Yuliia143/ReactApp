import {Route, Redirect} from "react-router-dom";
import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "./store";
import {RouteProps} from 'react-router-dom'

const mapStateToProps = (state: RootState) => ({
    isAuth: state.auth.isAuth,
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export interface ProtectedRouteProps extends PropsFromRedux, RouteProps {
    children?: React.ReactNode,
}

const PrivateRoute = ({isAuth, children, ...rest}: ProtectedRouteProps) => {
    return (
        isAuth ? (
            <Route
                {...rest}
                render={() => children}
            />
        ) : (
            <Route
                path={rest.path}
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
};


export default connector(PrivateRoute);