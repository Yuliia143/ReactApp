import React, {useState} from 'react';
import {Button, Form, FormProps, InputOnChangeData} from "semantic-ui-react";

const UserDetails = ({closeDetails}:any) => {
    const [user, setUser] = useState({
        id: '323324',
        name: 'Name',
        surName: 'Sur',
        role: 'admin',
        email: 'email@gmail.com'
    });
    const roles = [{key: 'admin', text: 'Admin', value: 'admin'},
        {key: 'lector', text: 'Lector', value: 'lector'},
        {key: 'student', text: 'Student', value: 'student'},
    ];
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData, key: any) =>{
        setUser(Object.assign({}, user, {[key]: data.value}));
    } ;
    const handleSubmit = (event: React.SyntheticEvent<HTMLElement>, data: FormProps, key: any) => {
        setUser(Object.assign({}, user, {[key]: data.value}))
    };
    return (
        <div className="userDetails" style={{padding: '30px'}}>
            <Form size='large'>
                <Form.Input
                    label="First Name"
                    placeholder="First Name"
                    value={user.name}
                    onChange={(event, data)=>handleChange(event, data, "name")}
                >
                </Form.Input>
                <Form.Input
                    label="Last Name"
                    placeholder="Last Name"
                    value={user.surName}
                    onChange={(event, data)=>handleChange(event, data, "surName")}
                >
                </Form.Input>

                <Form.Select
                    fluid
                    label='Role'
                    options={roles}
                    placeholder='Role'
                    value={user.role}
                    onChange={(event, data)=>handleSubmit(event, data, "role")}
                />

                <Form.Input
                    label="Email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(event, data)=>handleChange(event, data, "email")}
                >
                </Form.Input>

                <Form.Field style={{textAlign: 'end', marginTop: '30px'}}>
                    <Button color='red' inverted onClick={closeDetails}>Cancel</Button>
                    <Button type='submit' color='green'>Save</Button>
                </Form.Field>
            </Form>
        </div>
    )
};

export default UserDetails;

