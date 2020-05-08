import React, {useState} from 'react';
import {Button, Form, Icon, Popup} from "semantic-ui-react";

const regex = new RegExp('^[a-zA-Z0-9 ]+$');

const UsersOptions = ({filter}: any) => {
    const [filterValid, setFilterValid] = useState(true);

    const handleOnChange = (event: any, {name, value}: any) => {
        if (value !== '' && !regex.test(value)) {
            setFilterValid(false);
        } else {
            setFilterValid(true);
        }
    };

    // let popupMessage = '';
    // if (!filterValid) {
    //     popupMessage = 'Invalid character.';
    // } else if (totalCount === 0) {
    //     popupMessage = 'No results found.';
    // }

    return (
        <div className="tableUsersOptions" style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', marginTop:'20px', padding: '0 20px', borderBottom: '1px solid teal'}}>
            <Form style={{width:'65%'}}>
                <Form.Group>
                    <Form.Field>
                        <Popup
                            trigger={
                                <Form.Input
                                    placeholder="Enter the filter."
                                    name="filter"
                                    value={filter}
                                    error={!filterValid}
                                    label="Filter"
                                    onChange={handleOnChange}
                                    icon="search"
                                    // loading={loading}
                                />
                            }
                            // content={popupMessage}
                            on="click"
                            // open={!filterValid || totalCount === 0}
                            position="right center"
                        />
                    </Form.Field>
                </Form.Group>
            </Form>
            <Button style={{width: '20%', minHeight: '40px'}}>
                Add new user
                <Icon style={{marginLeft: '5px'}} name="plus"/>
            </Button>
        </div>
    )
};

export default UsersOptions;