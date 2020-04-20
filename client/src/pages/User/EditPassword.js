import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import './User.css';
import UserEditPage from './UserEditPage'

export default class EditPassword extends React.Component {


    render() {
        return (
            <div className="edit-profile">
                <UserEditPage />
                <div className="edit-content">
                    <div className="title-edit">Password</div>
                    <div className="description-edit">Change your password here</div>
                    <div className="inputs">
                        <Form>
                            <Form.Field>
                                <label>Password:</label>
                                <input type="password" placeholder='Enter current password' />
                            </Form.Field>
                            <Form.Field>
                                <input type="password" placeholder='Enter new password' />
                            </Form.Field>
                            <Form.Field>
                                <input type="password" placeholder='Re-type new password' />
                            </Form.Field>
                            <div className="save-btn">
                                <Button color="red">Save</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
