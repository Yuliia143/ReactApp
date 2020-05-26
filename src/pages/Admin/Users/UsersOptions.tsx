import React, {useState} from 'react';
import {Button, Form, Icon, Popup} from "semantic-ui-react";
import {useHistory, useRouteMatch} from "react-router-dom";

const regex = new RegExp('^[a-zA-Z0-9 ]+$');
interface OptionsProps{
    query: string;
    handleQuery: Function;
    totalCount: number;
}

const UsersOptions = ({query, handleQuery, totalCount}: OptionsProps) => {
    const history = useHistory();
    const [filterValid, setFilterValid] = useState(true);
    const [popupMessage, setPopupMessage] = useState('');
    const handleOnChange = (event: any, {value}: any) => {
        if (value !== '' && !regex.test(value)) {
            setFilterValid(false);
            setPopupMessage('Invalid character.');
        } else {
            setFilterValid(true);
            handleQuery(value);
        }
        totalCount === 0 && setPopupMessage('No results found.');
    };
    let {url} = useRouteMatch();
    return (
        <div className="tableUsersOptions" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '20px',
            padding: '0 20px',
            borderBottom: '1px solid teal'
        }}>
            <Form style={{width: '65%'}}>
                <Form.Group>
                    <Form.Field>
                        <Popup
                            trigger={
                                <Form.Input
                                    placeholder="Enter the filter."
                                    name="filter"
                                    value={query}
                                    error={!filterValid}
                                    label="Filter"
                                    onChange={handleOnChange}
                                    icon="search"
                                />
                            }
                            content={popupMessage}
                            open={!filterValid || totalCount === 0}
                            on="click"
                            position="right center"
                        />
                    </Form.Field>
                </Form.Group>
            </Form>
            <Button style={{width: '20%', minHeight: '40px'}} onClick={(()=>history.push(`${url}/new`))}>
                Add new user<Icon style={{marginLeft: '5px'}} name="plus"/>
            </Button>
        </div>
    )
};
export default UsersOptions;