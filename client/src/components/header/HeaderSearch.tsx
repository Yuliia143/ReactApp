import React, {useState} from 'react';
import {Search} from "semantic-ui-react";
import Lecture from "../../models/lecture";
import {MenuItemProps} from "semantic-ui-react/dist/commonjs/collections/Menu/MenuItem";
import {SearchProps} from "semantic-ui-react/dist/commonjs/modules/Search/Search";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router-dom";

interface Props extends RouteComponentProps{
    lecturesList: Lecture[]
}

const HeaderSearch = ({lecturesList, history}: Props) => {
    const [searchLectField, setSearchLectField] = useState('');

    const handleResultSelect = (_: any, data: MenuItemProps) => {
        setSearchLectField(data.result.title);
        history.push(`/lecture/${data.result.id}`);
    };
    const handleSearchSelect = (event: React.MouseEvent<HTMLElement>, data: SearchProps) => {
        setSearchLectField(data.value || '');
    };
    const handleSearchChange = (list: Lecture[] = []) => {
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
};

export default withRouter(HeaderSearch);