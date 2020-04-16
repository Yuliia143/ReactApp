import React from 'react'
import axios from 'axios'
import { Form, Button, Image } from 'semantic-ui-react'
import './User.css';
import UserEditPage from './UserEditPage'

export default class EditProfile extends React.Component {


    onChangeType = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    saveFields = (event) => {
        console.log(localStorage.getItem("User"))
        const data = {
            "oldData": {
                "email": "tarasdida22@gmail.com"
            },
            "newData": {
                "first_name": "Taras",
                "surName": "Dyda",
                "password": "taras20012001",
                "email": "tarasdida22@gmail.com"
            }
        }

        axios.put("https://glacial-chamber-22605.herokuapp.com/api/editProfile", data, {
            headers: {
                'accept': 'application/json',
                'Access-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTkzNzUzODdkMzkwZDQ0NzJiMDg1MzUiLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwibmFtZSI6IkpvaG4iLCJleHAiOjE1ODczODE0MjEsImlhdCI6MTU4Njc3NjYyMX0.NkhA-yUC7Sqxck03Xc82rL9REJlOW9R8wiP2vzUtCxk',
                "Access-Control-Allow-Headers": "accept, x-requested-with, origin, content-type, cookie, pragma, cache-control",
                // 'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => console.log(response))
            .catch(e => console.log(e))
    };

    render() {
        return (
            <div className="edit-profile">
                <UserEditPage />
                <div className="edit-content">
                    <div className="title-edit">Public profile</div>
                    <div className="description-edit">Add information about yourself</div>
                    <div className="inputs">
                        <Form>
                            <Form.Field>
                                <label>First Name</label>
                                <input onChange={this.onChangeType} placeholder='First Name' />
                            </Form.Field>
                            <Form.Field>
                                <label>Last Name</label>
                                <input onChange={this.onChangeType} placeholder='Last Name' />
                            </Form.Field>
                            <div className="save-btn">
                                <Button onClick={this.saveFields} color="red">Save</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
