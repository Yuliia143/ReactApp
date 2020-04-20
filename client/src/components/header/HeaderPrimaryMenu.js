import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'semantic-ui-react';

import {connect} from "react-redux";
import {signOut} from "../../store/actions/auth";

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
        const {onSignOut} = this.props;
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
                                   to="/edit-profile">My profile</Dropdown.Item>
                    {role === 'admin' ? (
                        <Dropdown.Item as={Link}
                                       name='admin'
                                       to="/lecture/new">Admin page</Dropdown.Item>
                    ) : null}
                    <Dropdown.Item as={Link}
                                   name='signout'
                                   onClick={onSignOut}
                                   to="/">Sign out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onSignOut: () => {
            dispatch(signOut())
        }
    }
};
export default connect(null, mapDispatchToProps)(HeaderPrimaryMenu);
