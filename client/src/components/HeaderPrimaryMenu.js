import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'semantic-ui-react';

import {REMOVE_USER} from "../store/actions";
import {connect} from "react-redux";

class HeaderPrimaryMenu extends Component {
    state = {
        activeItem: '',
        role: 'user',
        isActiveDropdownMenu: false,
    };
    handleDropdownMenu = (status = false) => {
        this.handleDropDown('isActiveDropdownMenu', status)
    };
    handleDropDown = (typeDropdown, status) => {
        this.setState({[typeDropdown]: status})
    };

    render() {
        const {role, isActiveDropdownMenu} = this.state;
        const {onLogOut} = this.props;
        return (
            <Dropdown item icon='user large'
                      onMouseEnter={() => this.handleDropdownMenu(true)}
                      onMouseLeave={() => this.handleDropdownMenu()}
                      onClick={() => this.handleDropdownMenu()}
                      open={isActiveDropdownMenu}
            >
                <Dropdown.Menu direction='left' style={{marginTop: 0, width: '200px',maxHeight: '200px'}}>
                    <Dropdown.Item as={Link}
                                   name='profile'
                                   to="/profile">My profile</Dropdown.Item>
                    {role === 'admin' ? (
                        <Dropdown.Item as={Link}
                                       name='admin'
                                       to="/admin">Admin page</Dropdown.Item>
                    ) : null}
                    <Dropdown.Item as={Link}
                                   name='signout'
                                   onClick={onLogOut}
                                   to="/">Sign out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

const mapDispatchToProps = (dispatch) =>({
    onLogOut: () => dispatch({type: REMOVE_USER})
});
export default connect(null, mapDispatchToProps)(HeaderPrimaryMenu);
