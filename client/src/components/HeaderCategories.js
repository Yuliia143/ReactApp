import React, {Component} from 'react';
import {Dropdown, Input} from "semantic-ui-react";

class HeaderCategories extends Component{
    state = {
        isActiveDropdownCategories: false,
        searchCategField: '',
    };

    handleDropdownCategories = (status = false) => {
        this.handleDropDown('isActiveDropdownCategories', status)
    };
    handleDropDown = (typeDropdown, status) => {
        this.setState({[typeDropdown]: status})
    };

    handleChange = (event) => {
        this.setState({searchCategField: event.target.value})
    };
    searchChange = (list) => {
        return list.filter(category => {
            return category.title.toLowerCase().includes(this.state.searchCategField.toLowerCase())
        });
    };

    render(){
        const {isActiveDropdownCategories} = this.state;
        const searchedCategories = this.searchChange(this.props.categoriesList);
        return(
            <Dropdown item text="Categories"
                      onMouseEnter={() => this.handleDropdownCategories(true)}
                      onMouseLeave={() => this.handleDropdownCategories()}
                      open={isActiveDropdownCategories}
            >
                <Dropdown.Menu style={{marginTop: 0}}>
                    <Input
                        icon='search'
                        iconPosition='left'
                        value={this.state.searchCategField}
                        onChange={this.handleChange}/>
                    <Dropdown.Menu scrolling>
                        {searchedCategories.map((category) => (
                            <Dropdown.Item key={category.id} text={category.title}
                                           onClick={() => this.handleDropdownCategories()}
                            />
                        ))}
                    </Dropdown.Menu>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default HeaderCategories;