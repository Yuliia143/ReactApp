import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Icon } from "semantic-ui-react";

import { connect, ConnectedProps } from "react-redux";
import { signOut } from "../../store/actions/auth";
import { RootState } from "../../store";
import styles from "./Header.module.css";

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
});
const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSignOut: () => {
      dispatch(signOut());
    },
  };
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const HeaderPrimaryMenu = ({ user, onSignOut }: PropsFromRedux) => {
  const [isActiveDropdownMenu, setIsActiveDropdownMenu] = useState(false);

  const handleDropdownMenu = (status = false) => {
    setIsActiveDropdownMenu(status);
  };
  return (
    <Dropdown
      item
      icon={<Icon name="user" size="big" />}
      onMouseEnter={() => handleDropdownMenu(true)}
      onMouseLeave={() => handleDropdownMenu()}
      onClick={() => handleDropdownMenu()}
      open={isActiveDropdownMenu}
    >
      <Dropdown.Menu direction="left" className={styles.primaryDropDown}>
        <Dropdown.Item as={Link} name="profile" to="/edit-page">
          My profile
        </Dropdown.Item>
        {user && user.role === "student" ? (
          <Dropdown.Item as={Link} name="favorite" to="/favorite-lections">
            Favorites
          </Dropdown.Item>
        ) : null}
        {user && user.role === "admin" ? (
          <Dropdown.Item as={Link} name="admin" to="/admin/users">
            Admin page
          </Dropdown.Item>
        ) : null}
        <Dropdown.Item as={Link} name="webinar" to="/webinars/new">
          Webinar
        </Dropdown.Item>
        <Dropdown.Item as={Link} name="webinars" to="/webinars/list">
          Webinars
        </Dropdown.Item>
        <Dropdown.Item as={Link} name="signout" onClick={onSignOut} to="/">
          Sign out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default connector(HeaderPrimaryMenu);
