import React, {Component} from 'react';
import Logo from "../assets/images/logoblack.png";
import {Segment, Menu, Image} from "semantic-ui-react";

class FooterContainer extends Component {
    render() {
        return (
            <Segment inverted
                     attached={"bottom"}
                     style={{
                         borderRadius: '0',
                         padding: '10px 30px',
                         backgroundColor: 'white',
                         borderBottom: '6px solid teal',
                         color: 'black'
                     }}>
                <Menu attached='top'
                      inverted
                      secondary
                      style={{height: "50px"}}>
                    <Menu.Item as='a'
                               href="/"
                    >
                        <Image
                            src={Logo}
                            size="tiny"
                            alt="Logo"
                            style={{width: '100px'}}
                        />
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item as="a" id="footer__link">
                            Terms of use
                        </Menu.Item>
                        <Menu.Item as="a" id="footer__link">
                            Privacy policy
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Segment>
        )
    }
}

export default FooterContainer;