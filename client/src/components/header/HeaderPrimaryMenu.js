import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'semantic-ui-react';

import {connect} from "react-redux";
import {signOut} from "../../store/actions/auth";

const HeaderPrimaryMenu = ({onSignOut}) => {
    const [isActiveDropdownMenu, setIsActiveDropdownMenu] = useState(false);
    const role = 'user';

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
                {role === 'admin' ? (
                    <Dropdown.Item as={Link}
                                   name='admin'
                                   to="/lecture/new">Admin page</Dropdown.Item>
                ) : null}
                <Dropdown.Item as={Link}
                               name='webinar'
                               to="/webinar/new">Webinar</Dropdown.Item>
                <Dropdown.Item as={Link}
                               name='webinars'
                               to="/webinar/all">Webinars</Dropdown.Item>
                <Dropdown.Item as={Link}
                               name='signout'
                               onClick={onSignOut}
                               to="/">Sign out</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignOut: () => {
            dispatch(signOut())
        }
    }
};
export default connect(null, mapDispatchToProps)(HeaderPrimaryMenu);
