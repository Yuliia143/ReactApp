import React, { Component } from 'react'
import { Menu, Image } from 'semantic-ui-react'
import './User.css';
import { NavLink } from 'react-router-dom';

export default class UserEditPage extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu pointing vertical>
        <Menu.Item>
          <div className="edit-menu-data">
            <Image className="edit-menu-item" src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small' circular />
            <div className="edit-menu-item">UserName</div>
          </div>
        </Menu.Item>
        <Menu.Item as={NavLink}
          name='profile'
          active={activeItem === 'edit-profile'}
          onClick={this.handleItemClick}
          exact to="/edit-profile"
        ></Menu.Item>
        <Menu.Item as={NavLink}
          name='photo'
          active={activeItem === 'edit-photo'}
          onClick={this.handleItemClick}
          exact to="/edit-photo"
        />
        <Menu.Item as={NavLink}
          name='email'
          active={activeItem === 'edit-email'}
          onClick={this.handleItemClick}
          exact to="/edit-email"
        />
        <Menu.Item as={NavLink}
          name='password'
          active={activeItem === 'edit-password'}
          onClick={this.handleItemClick}
          exact to="/edit-password"
        />
      </Menu>
    )
  }
}
