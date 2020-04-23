import React from 'react';

import { Form, Button, Message } from 'semantic-ui-react';

import http from "../../api/http";

import './User.css';


export default class EditEmail extends React.Component {
    constructor(props) {
        super(props);
        const { email } = this.props;
        this.state = {
            email: email,
            error: false,
            success: false,
            loading: false
        }
    }
    
    textInputOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: false,
            success: false
        })
    }

    getMessage = () => {
        const { error, success } = this.state
        if (error) {
            if (this.props.email == this.state.email) {
                return <Message negative header="This email is already used." />
            }
        }
        if (success) {
            return <Message success header="Your email has been changed." />
        }
    }

    saveFields = () => {
        this.setState({ loading: true }) 

        const data = {
            "oldData": {
                "email": this.props.email
            },
            "newData": {
                "email": this.state.email
            }
        }

        http.put("/api/edit/editEmail", data )
            .then(response => {
                this.setState({ 
                    loading: false,
                     success: true
                })
                this.props.updateProfile( { email: this.state.email })

                if (response.data.message == 'Email is already used') {
                    this.setState({ error: true })
                }
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    };

    render() {
        return (
            <div className="edit-profile">
                <div className="edit-content">
                    <div className="title-edit">Email</div>
                    <div className="description-edit">Edit your email here</div>
                    <div className="inputs">
                        <Form loading={this.state.loading}>
                            <Form.Field>
                                <label>Email</label>
                                <input onChange={this.textInputOnChange} value={this.state.email} name='email' placeholder='Email' />
                            </Form.Field>
                            <div className="save-btn">
                                <Button disabled={!this.state.email} onClick={this.saveFields} color="red">Save</Button>
                            </div>
                        </Form>
                    </div>
                    <div>
                        {this.getMessage()}
                    </div>
                </div>
            </div>
        )
    }
}
