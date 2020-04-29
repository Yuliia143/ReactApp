import React, { useState }  from 'react';

import { Form, Button, Message } from 'semantic-ui-react';

import http from "../../api/http";

import './User.css';


const EditEmail = (props) => {
    const [ email, setEmail ] = useState(props.email)
    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const [ loading, setLoading ] = useState(false) 
    
    const textInputOnChange = (e) => {
        setEmail(e.target.value)
        setError(false)
        setSuccess(false)
    }

    const getMessage = () => {
        if (error) {
            if (props.email == email) {
                return <Message negative header="This email is already used." />
            }
        }
        if (success) {
            return <Message success header="Your email has been changed." />
        }
    }

    const saveFields = () => {
        setLoading(true)


        const data = {
            "oldData": {
                "email": props.email
            },
            "newData": {
                "email": email
            }
        }

        http.put("/api/edit/editEmail", data )
            .then(response => {
                setLoading(false)
                setSuccess(true)
                props.updateProfile( { email: email })

                if (response.data.message == 'Email is already used') {
                    setError(true)
                }
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    };

    return (
        <div className="edit-profile">
            <div className="edit-content">
                <div className="title-edit">Email</div>
                <div className="description-edit">Edit your email here</div>
                <div className="inputs">
                    <Form loading={loading}>
                        <Form.Field>
                            <label>Email</label>
                            <input onChange={textInputOnChange} value={email} name='email' placeholder='Email' />
                        </Form.Field>
                        <div className="save-btn">
                            <Button disabled={!email} onClick={saveFields} color="red">Save</Button>
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

export default EditEmail
