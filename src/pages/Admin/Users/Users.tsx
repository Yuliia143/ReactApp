import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Switch, useRouteMatch } from "react-router-dom";
import { RootState } from "../../../store";
import { getUsers } from "../../../store/actions/getUsers";
import UserDetails from "./UserDetails";
import UsersList from "./UsersList";
import PrivateRoute from "../../../PrivateRoute";

const mapStateToProps = (state: RootState) => ({
  usersList: state.users.users,
  usersLoading: state.users.loading,
});
const mapDispatchToProps = (dispatch: Function) => ({
  getUsers: () => dispatch(getUsers()),
});
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Users = ({ getUsers, usersList, usersLoading }: PropsFromRedux) => {
  const { path } = useRouteMatch();
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <>
      <Switch>
        <PrivateRoute exact path={path} isAdmin>
          {usersLoading && <h1 className="loading">Loading...</h1>}
          {!usersLoading && usersList && <UsersList usersList={usersList} />}
        </PrivateRoute>
        <PrivateRoute path={`${path}/new`} component={UserDetails} isAdmin />
        <PrivateRoute path={`${path}/:id`} component={UserDetails} isAdmin />
      </Switch>
    </>
  );
};

export default connector(Users);
