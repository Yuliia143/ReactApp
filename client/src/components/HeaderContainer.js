import React, {Component, Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import {Button, Menu, Segment,} from 'semantic-ui-react';
import {REMOVE_USER} from "../store/actions";
import {connect} from "react-redux";

class HeaderContainer extends Component {
    state = {activeItem: ''};
    handleItemClick = (e, {name}) => this.setState({activeItem: name});
    render() {
        const {activeItem} = this.state;
        const {user, onLogOut} = this.props;

        return (
            <Segment color="teal" inverted style={{borderRadius: '0'}}>
                <Menu inverted secondary>
                    <Menu.Item as={NavLink}
                               name='home'
                               active={activeItem === 'home'}
                               onClick={this.handleItemClick}
                               exact to="/"
                    />
                    <Menu.Item as={NavLink}
                               name='user'
                               active={activeItem === 'user'}
                               onClick={this.handleItemClick}
                               to='/user'/>


                   
                    {
                    user ? <Button onClick={onLogOut}>Log out</Button> :  <Menu.Item position='right'>
                        <Button as={NavLink}
                                name='signin'
                                active={activeItem === 'signin'}
                                onClick={this.handleItemClick}
                                to='/signin'
                                inverted>
                        Log in
                    </Button>
                        <Button as={NavLink}
                                name='signup'
                                active={activeItem === 'signup'}
                                onClick={this.handleItemClick}
                                to='/signup'
                                inverted style={{marginLeft: '0.5em'}}>
                            Sign Up
                        </Button></Menu.Item>
                }

                </Menu>
            </Segment>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user.data
});
const mapDispatchToProps = (dispatch) =>({
    onLogOut: () => dispatch({type: REMOVE_USER})
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
