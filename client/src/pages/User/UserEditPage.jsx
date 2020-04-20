import React, { Component } from 'react';

import { Menu, Image } from 'semantic-ui-react';

import { connect } from "react-redux";

import EditProfile from './EditProfile';
import EditPhoto from './EditPhoto';
import EditPassword from './EditPassword';
import EditEmail from './EditEmail';

import './User.css';


class UserEditPage extends Component {
    state = { 
        activeItem: 'profile',
        imageUrl: 'https://react.semantic-ui.com/images/wireframe/square-image.png'
    }


    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    setPhoto = (url) => {
        this.setState({ imageUrl: url })
    }

    updateProfile = (data) => {
        this.props.updateProfile(Object.assign({}, this.props.user, data))
    }

    render() {
        const { activeItem, imageUrl } = this.state
        const { name, surName, email } = this.props.user

        return (
            <div className="edit-profile">
                <Menu pointing vertical>
                    <Menu.Item>
                        <div className="edit-menu-data">
                            <Image className="edit-menu-item" src={imageUrl} size='small' circular />
                            <div className="edit-menu-item">{name + ' ' + surName}</div>
                        </div>
                    </Menu.Item>
                    <Menu.Item
                        name='profile'
                        active={activeItem === 'profile'}
                        onClick={this.handleItemClick}
                    ></Menu.Item>
                    <Menu.Item 
                        name='photo'
                        active={activeItem === 'photo'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='email'
                        active={activeItem === 'email'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='password'
                        active={activeItem === 'password'}
                        onClick={this.handleItemClick}
                    />
                </Menu>
                <div className="edit-content">
                    {activeItem == 'profile' && <EditProfile name={name} email={email} surName={surName}  updateProfile={this.updateProfile} />}
                    {activeItem == 'photo' && <EditPhoto imageUrl={imageUrl} setPhoto={this.setPhoto} />} 
                    {activeItem == 'email' && <EditEmail email={email} updateProfile={this.updateProfile} />}
                    {activeItem == 'password' && <EditPassword email={email}/>}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>({
    updateProfile: (user) => dispatch({ type: 'UPDATE_PROFILE', payload: user })
});

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEditPage);
