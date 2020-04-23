import React from 'react';

import { Form, Button, Message } from 'semantic-ui-react';

import http from "../../api/http";

import './User.css';


export default class EditPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            repeatNewPassword: '',
            error: false,
            success: false,
            isDisabled: true
        }
        this.matchPasswords = this.matchPasswords.bind(this);
    }

    matchPasswords() {
        if (this.state.newPassword !== this.state.repeatNewPassword) {
            this.setState({error: true});
        } 
    }

    textInputOnChange = (e) => {
        const isDisabled = this.isDisabled()
        this.setState({
            [e.target.name]: e.target.value,
            error: false,
            success: false,
            isDisabled
        })
    }

    isDisabled = () => {
        const { oldPassword, newPassword, repeatNewPassword } = this.state
        return oldPassword.length < 5 || newPassword.length < 5 || repeatNewPassword.length < 5
    }

    getMessage = () => {
        const { error, success, oldPassword, newPassword, repeatNewPassword } = this.state
        if (error) {
            if (newPassword !== repeatNewPassword) {
                return <Message negative header="Your new password does not match confirmation." />
            } else if (oldPassword == newPassword) {
                return <Message negative header={"New password can not be the same as old password" }/>
            }
            else { 
                return <Message negative header={"Incorrect current password" }/>
             }
        }
        if (success) {
            return <Message success header="Your password has been changed." />
        }
    }

    saveFields = () => {
        const data = {
            "oldData": {
                "email": this.props.email,
                "password": this.state.oldPassword
            },
            "newData": {
                "password": this.state.newPassword
            }
        }

        http.put("/api/edit/editPassword", data )
            .then(response => {
                this.setState({ success: true })
            })
            .catch(e => this.setState({ error: true }))
    };

    render() {
        return (
            <div className="edit-profile">
                <div className="edit-content">
                    <div className="title-edit">Password</div>
                    <div className="description-edit">Change your password here</div>
                    <div className="inputs">
                        <Form onSubmit={this.matchPasswords}> 
                            <Form.Field required>
                                <label>Password:</label>
                                <input onChange={this.textInputOnChange} type="password" name="oldPassword" placeholder='Enter current password' />
                            </Form.Field>
                            <Form.Field required>
                                <input onChange={this.textInputOnChange} type="password" name="newPassword" placeholder='Enter new password' />
                            </Form.Field>
                            <Form.Field required>
                                <input onChange={this.textInputOnChange} type="password" name="repeatNewPassword" placeholder='Re-type new password' />
                            </Form.Field>
                            <div className="save-btn">
                                <Button onClick={this.saveFields} disabled={this.state.isDisabled} color="red">Save</Button>
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
