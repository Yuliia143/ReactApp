import React, {Component} from 'react';
import {Search} from "semantic-ui-react";
import {withRouter} from 'react-router-dom';

class HeaderSearch extends Component{
    state = {
        searchLectField: '',
        count: 0
    };

    handleResultSelect = (e, {result}) => {
        this.setState({searchLectField: result.title});
        this.props.history.push(`/lecture/${result.id}`);
    };
    handleSearchSelect = (event) => {
        this.setState({searchLectField: event.target.value})
    };
    handleSearchChange = (list = []) => {
        return list.filter(item => {
            return item.title.toLowerCase().includes(this.state.searchLectField.toLowerCase())
        });
    };

    render() {
        const res = this.handleSearchChange(this.props.lecturesList);
        return (
            <Search
                placeholder="Search..."
                input={{fluid: true}}
                style={{width: '300px'}}
                value={this.state.searchLectField}
                onSearchChange={this.handleSearchSelect}
                onResultSelect={this.handleResultSelect}
                results={res}/>
        )
    }
}

export default withRouter(HeaderSearch);