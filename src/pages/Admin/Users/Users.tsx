import React, { useEffect, Fragment } from 'react';
import { RootState } from '../../../store';
import { connect, ConnectedProps } from 'react-redux';
import { getUsers } from '../../../store/actions/getUsers';
import UserDetails from './UserDetails';
import UsersList from './UsersList';
import { Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../../../PrivateRoute';

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
  let { path } = useRouteMatch();
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <Fragment>
      <Switch>
        <PrivateRoute exact path={path} isAdmin>
          {usersLoading && <h1 className="loading">Loading...</h1>}
          {!usersLoading && usersList && <UsersList usersList={usersList} />}
        </PrivateRoute>
        <PrivateRoute path={`${path}/new`} component={UserDetails} isAdmin />
        <PrivateRoute path={`${path}/:id`} component={UserDetails} isAdmin />
      </Switch>
    </Fragment>
  );
};

export default connector(Users);
