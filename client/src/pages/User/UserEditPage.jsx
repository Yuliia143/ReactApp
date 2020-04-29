import React, { useState } from 'react';

import { Menu, Image } from 'semantic-ui-react';

import { connect } from "react-redux";

import EditProfile from './EditProfile';
import EditPhoto from './EditPhoto';
import EditPassword from './EditPassword';
import EditEmail from './EditEmail';

import './User.css';


const UserEditPage = (props) => { 
    const [ activeItem, setActiveItem ] = useState('profile')
    const [ imageUrl, setImageUrl ] = useState('https://react.semantic-ui.com/images/wireframe/square-image.png')
    
    const handleItemClick = (e, { name }) => {
        setActiveItem(name)
    }

    const setPhoto = (url) => {
        setImageUrl(url)
    }

    const updateProfile = (data) => {
        props.updateProfile(Object.assign({}, props.user, data))
    }

    const { name, surName, email } = props.user

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
                    onClick={handleItemClick}
                ></Menu.Item>
                <Menu.Item 
                    name='photo'
                    active={activeItem === 'photo'}
                    onClick={handleItemClick}
                />
                <Menu.Item
                    name='email'
                    active={activeItem === 'email'}
                    onClick={handleItemClick}
                />
                <Menu.Item
                    name='password'
                    active={activeItem === 'password'}
                    onClick={handleItemClick}
                />
            </Menu>
            <div className="edit-content">
                {activeItem == 'profile' && <EditProfile 
                    name={name} 
                    email={email} 
                    surName={surName}  
                    updateProfile={updateProfile} 
                />}
                {activeItem == 'photo' && <EditPhoto 
                    imageUrl={imageUrl} 
                    setPhoto={setPhoto} 
                />} 
                {activeItem == 'email' && <EditEmail 
                    email={email} 
                    updateProfile={updateProfile} 
                />}
                {activeItem == 'password' && <EditPassword 
                    email={email}
                />}
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) =>({
    updateProfile: (user) => dispatch({ type: 'UPDATE_PROFILE', payload: user })
});

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEditPage);
