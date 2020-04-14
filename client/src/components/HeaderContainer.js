import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';
import {Button, Menu, Segment, Dropdown, Input, Search, Image} from 'semantic-ui-react';
import Logo from "../assets/images/logowhite.png";
import axios from 'axios';

class HeaderContainer extends Component {
    state = {
        activeItem: '',
        isSignedIn: false,
        role: 'admin',
        isActiveDropdownMenu: false,
        isActiveDropdownCategories: false,
        categoriesList: ["Development", "Business", "IT and Software", "Design", "Marketing", "Personal Development", "Photography", "Music"],
        searchField: '',
        searchLectField: '',
        lecturesList: []
    };
    handleItemClick = (e, {name}) => this.setState({activeItem: name});
    handleDropdownMenu = (status = false) => {
        this.handleDropDown('isActiveDropdownMenu', status)
    };
    handleDropdownCategories = (status = false) => {
        this.handleDropDown('isActiveDropdownCategories', status)
    };
    handleDropDown = (typeDropdown, status) => {
        this.setState({[typeDropdown]: status})
    };
    handleChange = (event) => {
        this.setState({searchField: event.target.value})
    };
    searchChange = (list) => {
        return list.filter(category => {
            return category.toLowerCase().includes(this.state.searchField.toLowerCase())
        });
    };


    loadLectures() {
        return axios
            .get('https://glacial-chamber-22605.herokuapp.com/api/lecture')
            .then(result => {
                const lecturesList = result.data.map(item => (item));
                console.log(lecturesList);
                this.setState({lecturesList});
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        this.loadLectures();
    }

    render() {
        const {activeItem, isSignedIn, role, isActiveDropdownMenu, isActiveDropdownCategories, categoriesList} = this.state;
        const searchedCategories = this.searchChange(categoriesList);
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
                            <Dropdown item text="Categories"
                                      onMouseEnter={() => this.handleDropdownCategories(true)}
                                      onMouseLeave={() => this.handleDropdownCategories()}
                                      open={isActiveDropdownCategories}
                            >
                                <Dropdown.Menu style={{marginTop: 0}}>
                                    <Input
                                        icon='search'
                                        iconPosition='left'
                                        value={this.state.searchField}
                                        onChange={this.handleChange}/>
                                    <Dropdown.Menu scrolling>
                                        {searchedCategories.map((category) => (
                                            <Dropdown.Item key={category} text={category}
                                                           onClick={() => this.handleDropdownCategories()}
                                            />
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                        <Menu.Item>
                            <Search
                                placeholder="Search..."
                                input={{fluid: true}}
                                style={{width: '300px'}}/>
                        </Menu.Item>
                    </Menu.Menu>

                    {isSignedIn ? (
                            <Menu.Menu position='right'>
                                <Dropdown item icon='user large'
                                          onMouseEnter={() => this.handleDropdownMenu(true)}
                                          onMouseLeave={() => this.handleDropdownMenu()}
                                          onClick={() => this.handleDropdownMenu()}
                                          open={isActiveDropdownMenu}
                                >
                                    <Dropdown.Menu direction='left' style={{marginTop: 0}}>
                                        <Dropdown.Item as={Link}
                                                       name='profile'
                                                       to="/profile">My profile</Dropdown.Item>
                                        {role === 'admin' ? (
                                            <Dropdown.Item as={Link}
                                                           name='admin'
                                                           to="/admin">Admin page</Dropdown.Item>
                                        ) : null}
                                        <Dropdown.Item as={Link}
                                                       name='signout'
                                                       to="/">Sign out</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Menu>
                        ) :
                        (
                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    <Button as={Link}
                                            inverted
                                            to="/signin"
                                            style={{padding: '13px 40px'}}>
                                        Sign in
                                    </Button>
                                </Menu.Item>
                                <Menu.Item style={{paddingRight: '0'}}>
                                    <Button as={Link}
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

export default HeaderContainer;
