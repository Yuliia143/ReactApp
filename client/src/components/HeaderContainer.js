import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Button, Menu, Segment,} from 'semantic-ui-react';

class HeaderContainer extends Component {
    state = {activeItem: ''};
    handleItemClick = (e, {name}) => this.setState({activeItem: name});
    render() {
        const {activeItem} = this.state;
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
                               to='/user'
                    />
                    <Menu.Item position='right'>
                        <Button as='a' inverted>
                            Log in
                        </Button>
                        <Button as='a' inverted style={{marginLeft: '0.5em'}}>
                            Sign Up
                        </Button>
                    </Menu.Item>
                </Menu>
            </Segment>
        )
    }
}

export default HeaderContainer;
