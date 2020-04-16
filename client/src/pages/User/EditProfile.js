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
        const userData = JSON.parse(localStorage.getItem("User"));
        console.log(this.props.user)
        const token = localStorage.getItem("Access-Token");

        const data = {
            "oldData": {
                "email": "tarasdida22@gmail.com"
            },
            "newData": {
                "first_name": "sebek",
                "surName": "sebek",
                "password": "taras20012001",
                "email": "tarasdida22@gmail.com"
            }
        }

        axios.put("https://glacial-chamber-22605.herokuapp.com/api/editName", data, {
            headers: {
                'Access-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTk4NjFmMTZmODRkYzAwMTdhOTkxY2IiLCJlbWFpbCI6ImFuZHJpeWR1YmFzMTk4NkB1a3IubmV0IiwibmFtZSI6InNlYmVrIiwiaXNBZG1pbiI6ZmFsc2UsImV4cCI6MTU4NzY0OTk3MiwiaWF0IjoxNTg3MDQ1MTcyfQ.fjwslmUGvKs1ALdQ2FJhXpI-cmTRIovn1LIK2A7ZkxU'
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
