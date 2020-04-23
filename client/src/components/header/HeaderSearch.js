import React, {useState} from 'react';
import {Search} from "semantic-ui-react";
import {withRouter} from 'react-router-dom';

const HeaderSearch=({lecturesList, history})=>{
    const [searchLectField, setSearchLectField] = useState('');

    const handleResultSelect = (e, {result}) => {
        setSearchLectField(result.title);
        history.push(`/lecture/${result.id}`);
    };
    const handleSearchSelect = (event) => {
        setSearchLectField(event.target.value);
    };
    const handleSearchChange = (list = []) => {
        return list.filter(item => {
            return item.title.toLowerCase().includes(searchLectField.toLowerCase())
        });
    };

        const res = handleSearchChange(lecturesList);
        return (
            <Search
                placeholder="Search..."
                input={{fluid: true}}
                style={{width: '300px'}}
                value={searchLectField}
                onSearchChange={handleSearchSelect}
                onResultSelect={handleResultSelect}
                results={res}/>
        )
}

export default withRouter(HeaderSearch);