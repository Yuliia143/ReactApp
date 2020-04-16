import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Button, Menu, Segment, Image} from 'semantic-ui-react';
import Logo from "../assets/images/logowhite.png";
import axios from 'axios';
import HeaderCategories from "./HeaderCategories";
import HeaderSearch from "./HeaderSearch";
import HeaderPrimaryMenu from "./HeaderPrimaryMenu";
import {BASE_URL} from "../config";

import {connect} from "react-redux";

class HeaderContainer extends Component {
    state = {
        activeItem: '',
        categoriesList: [],
        lecturesList :[]
    };
    handleItemClick = (e, {name}) => this.setState({activeItem: name});


    loadCategories(){
        return axios
            .get(`${BASE_URL}/api/categories/all`)
            .then(result => {
                const categoriesList = [];
                result.data.map((item) => {
                    categoriesList.push(item);
                });
                console.log(categoriesList);
                this.setState({categoriesList});
            })
            .catch(error => {
                console.log(error);
            })
    }

    loadLectures() {
        return axios
            .get(`${BASE_URL}/api/lectures/all`)
            .then(result => {
                const lecturesList = [];
                result.data.map((item) => {
                    lecturesList.push({"title": item.title, "id": item.id});
                });
                console.log(lecturesList);
                this.setState({lecturesList});
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        this.loadCategories();
        this.loadLectures();
    }

    render() {
        const {user, onLogOut} = this.props;
        const {activeItem, lecturesList, categoriesList} = this.state;
        return (


            <Segment color="teal" inverted style={{borderRadius: '0', padding: '10px 30px', marginBottom: '0'}}>
                <Menu attached='top' inverted secondary style={{height: "50px"}}>
                    <Menu.Menu>
                        <Menu.Item as={NavLink}
                                   name='home'
                                   active={activeItem === 'home'}
                                   onClick={this.handleItemClick}
                                   exact to="/"
                        >
                            <Image
                                src={Logo}
                                size="tiny"
                                alt="Logo"
                                style={{width: '100px'}}
                            />
                        </Menu.Item>
                        <Menu.Item>
                            <HeaderCategories categoriesList={categoriesList}/>
                        </Menu.Item>
                        <Menu.Item>
                            <HeaderSearch lecturesList={lecturesList}/>
                        </Menu.Item>
                    </Menu.Menu>

                    {user ? (
                            <Menu.Menu position='right'>
                                <HeaderPrimaryMenu onLogOut={onLogOut}/>
                            </Menu.Menu>
                        ) :
                        (
                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    <Button as={NavLink}
                                            active={activeItem === 'signin'}
                                            onClick={this.handleItemClick}
                                            inverted
                                            to="/signin"
                                            style={{padding: '13px 40px'}}>
                                        Sign in
                                    </Button>
                                </Menu.Item>
                                <Menu.Item style={{paddingRight: '0'}}>
                                    <Button as={NavLink}
                                            active={activeItem === 'signup'}
                                            onClick={this.handleItemClick}
                                            inverted
                                            to="/signup"
                                            style={{marginLeft: '0.5em', padding: '13px 40px'}}>
                                        Sign Up
                                    </Button>
                                </Menu.Item>
                            </Menu.Menu>
                        )
                    }
                </Menu>
            </Segment>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user.data
});
export default connect(mapStateToProps)(HeaderContainer);
