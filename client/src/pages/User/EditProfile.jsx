import React, { useState } from 'react';

import { Form, Button, Message } from 'semantic-ui-react';

import http from "../../api/http";

import './User.css';


const EditProfile = (props) => {
    const [userFullName, setUserFullName] = useState({
        name: props.name,
        surName: props.surName
    })
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)

    const textInputOnChange = (e) => {
        const { name, value } = e.target
        setUserFullName( prevState => ({
            ...prevState,
            [name]: value
        }))

        setError(false)
    }

    const isFieldsEmpty = () => {
        if (userFullName.name.length === 0 ||  userFullName.surName.lengt === 0) {
            setError(true)
        }
    }

    const getMessage = () => {
        if (error) {
            return <Message negative header="All fields are required." />
        }
    }

    const saveFields = () => {
        setLoading(true)  

        const data = {
            "oldData": {
                "email": props.email
            },
            "newData": {
                "first_name": userFullName.name,
                "surName": userFullName.surName
            }
        }
        
        http.put('/api/edit/editName', data )
            .then(response => {
                setLoading(false)
                props.updateProfile({
                        name: userFullName.name,
                        surName: userFullName.surName
                    })
                    console.log(response.data)
            })
            .catch(e => { 
                setError(true)
                setLoading(false) 
            })
    };

    return (
        <div className="edit-profile">
            <div className="edit-content">
                <div className="title-edit">Public profile</div>
                <div className="description-edit">Add information about yourself</div>
                <div className="inputs">
                    <Form loading={loading} onSubmit={isFieldsEmpty}>
                        <Form.Field>
                            <label>First Name</label>
                            <input 
                                onChange={textInputOnChange} 
                                value={userFullName.name} 
                                name='name' 
                                placeholder='First Name' 
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name</label>
                            <input 
                                onChange={textInputOnChange} 
                                value={userFullName.surName} 
                                name='surName'
                                placeholder='Last Name' 
                            />
                        </Form.Field>
                        <div className="save-btn">
                            <Button onClick={saveFields} color="red">Save</Button> 
                        </div>
                    </Form>
                </div>
                <div>
                    {getMessage()}
                </div>
            </div>
        </div>
    )

}

export default EditProfile
