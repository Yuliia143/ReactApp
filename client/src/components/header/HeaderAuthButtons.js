import React, {Fragment} from "react";
import {Button, Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

export default function (props) {
    return(
    <Fragment>
        <Menu.Item>
            <Button as={NavLink}
                    active={props.activeItem === 'signin'}
                    onClick={props.handleActiveItem}
                    inverted
                    to="/signin"
                    style={{padding: '13px 40px'}}>
                Sign in
            </Button>
        </Menu.Item>
        <Menu.Item style={{paddingRight: '0'}}>
            <Button as={NavLink}
                    active={props.activeItem === 'signup'}
                    onClick={props.handleActiveItem}
                    inverted
                    to="/signup"
                    style={{marginLeft: '0.5em', padding: '13px 40px'}}>
                Sign Up
            </Button>
        </Menu.Item>
    </Fragment>
    )
}