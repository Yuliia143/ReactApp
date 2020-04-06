import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Menu, Segment,} from 'semantic-ui-react';

class HeaderContainer extends Component {
    state = {activeItem: 'home'};
    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    render() {
        const {activeItem} = this.state;
        return (
            <Segment inverted style={{borderRadius: '0'}}>
                <Menu inverted secondary>
                    <Menu.Item as={Link}
                               name='home'
                               active={activeItem === 'home'}
                               onClick={this.handleItemClick}
                               to="/"
                    />
                    <Menu.Item as={Link}
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