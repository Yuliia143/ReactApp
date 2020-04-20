import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Menu, Segment} from 'semantic-ui-react';
import LogoImg from "../../assets/images/logowhite.png";

import Logo from "../Logo";
import HeaderCategories from "./HeaderCategories";
import HeaderSearch from "./HeaderSearch";
import HeaderPrimaryMenu from "./HeaderPrimaryMenu";
import HeaderAuthButtons from "./HeaderAuthButtons";

import {connect} from "react-redux";
import {getCategories} from "../../store/actions/getCategories";
import {getLectures} from "../../store/actions/getLectures";

class HeaderContainer extends Component {
    state = {
        activeItem: '',
    };

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    componentDidMount() {
        this.props.getLectures();
        this.props.getCategories();
    }

    render() {
        const {isAuth, categoriesList, lecturesList} = this.props;
        const {activeItem} = this.state;
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
                            <Logo image={LogoImg}/>
                        </Menu.Item>
                        <Menu.Item>
                            <HeaderCategories categoriesList={categoriesList}/>
                        </Menu.Item>
                        <Menu.Item>
                            <HeaderSearch lecturesList={lecturesList}/>
                        </Menu.Item>
                    </Menu.Menu>

                    {isAuth ? (
                            <Menu.Menu position='right'>
                                <HeaderPrimaryMenu/>
                            </Menu.Menu>
                        ) :
                        (
                            <Menu.Menu position='right'>
                                <HeaderAuthButtons
                                    activeItem={activeItem}
                                    handleActiveItem={this.handleItemClick}
                                />
                            </Menu.Menu>
                        )
                    }
                </Menu>
            </Segment>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isAuth: state.auth.isAuth,
    categoriesList: state.categories.categories,
    lecturesList: state.lectures.lectures
});

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => {
            dispatch(getCategories())
        },
        getLectures: () => {
            dispatch(getLectures())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
