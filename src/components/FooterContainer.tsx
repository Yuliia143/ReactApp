import React from 'react';
import LogoImg from "../assets/images/logoblack.png";
import {Segment, Menu} from "semantic-ui-react";
import {Link} from 'react-router-dom';
import Logo from "./Logo";
import styles from "./Footer.module.css"


const FooterContainer = () => {
    return (
        <Segment inverted
                 attached={"bottom"}
                className={styles.footerContainer}>
            <Menu attached='top'
                  inverted
                  secondary
                  style={{height: "50px"}}>
                <Menu.Item as={Link}
                           to="/"
                >
                    <Logo image={LogoImg}/>
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
};

export default FooterContainer;