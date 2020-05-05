import React from 'react';

import { Form, Button } from 'semantic-ui-react';

import http from "../../api/http";

import './User.css';


export default class EditProfile extends React.Component {
     constructor(props) {
         super(props);
         const { name, surName } = this.props;
         this.state = {
            name: name,
            surName: surName,
            loading: false,
        }
     }

    textInputOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveFields = () => {
        this.setState({ loading: true })    

        const data = {
            "oldData": {
                "email": this.props.email
            },
            "newData": {
                "first_name": this.state.name,
                "surName": this.state.surName
            }
        }
        
        http.put('/api/edit/editName', data )
            .then(response => {
            this.setState({ loading: false })
            this.props.updateProfile({
                    name: this.state.name,
                    surName: this.state.surName
                })
                console.log(response.data)
            })
            .catch(e => console.log(e))
    };

    render() {
        return (
            <div className="edit-profile">
                <div className="edit-content">
                    <div className="title-edit">Public profile</div>
                    <div className="description-edit">Add information about yourself</div>
                    <div className="inputs">
                        <Form loading={this.state.loading}>
                            <Form.Field>
                                <label>First Name</label>
                                <input onChange={this.textInputOnChange} value={this.state.name} name='name' placeholder='First Name' />
                            </Form.Field>
                            <Form.Field>
                                <label>Last Name</label>
                                <input onChange={this.textInputOnChange} value={this.state.surName} name='surName' placeholder='Last Name' />
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