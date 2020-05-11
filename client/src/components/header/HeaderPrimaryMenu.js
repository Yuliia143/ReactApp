import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'semantic-ui-react';

import {connect} from "react-redux";
import {signOut} from "../../store/actions/auth";

const HeaderPrimaryMenu = ({onSignOut, user}) => {
    const [isActiveDropdownMenu, setIsActiveDropdownMenu] = useState(false);
    // const role = 'user';

    const handleDropdownMenu = (status = false) => {
        setIsActiveDropdownMenu(status);
    };
    return (
        <Dropdown item icon='user large'
                  onMouseEnter={() => handleDropdownMenu(true)}
                  onMouseLeave={() => handleDropdownMenu()}
                  onClick={() => handleDropdownMenu()}
                  open={isActiveDropdownMenu}
        >
            <Dropdown.Menu direction='left' style={{marginTop: 0, width: '200px', maxHeight: '200px'}}>
                <Dropdown.Item as={Link}
                               name='profile'
                               to="/edit-page">My profile</Dropdown.Item>
                {user && user.role === 'student' ? (
                    <Dropdown.Item as={Link}
                                   name='favorite'
                                   to="/favorite-lections">Favorites</Dropdown.Item>
                ):null}
                {user && user.role === 'admin' ? (
                    <Dropdown.Item as={Link}
                                   name='admin'
                                   to="/admin">Admin page</Dropdown.Item>
                ) : null}
                <Dropdown.Item as={Link}
                               name='signout'
                               onClick={onSignOut}
                               to="/">Sign out</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
};
const mapStateToProps = (state) => ({
    user: state.auth.user
});
const mapDispatchToProps = (dispatch) => {
    return {
        onSignOut: () => {
            dispatch(signOut())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderPrimaryMenu);
