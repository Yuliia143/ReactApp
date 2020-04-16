import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import './User.css';
import UserEditPage from './UserEditPage'

export default class EditEmail extends React.Component {


  render() {
    return (
      <div className="edit-profile"> 
        <UserEditPage />
        <div className="edit-content">
          <div className="title-edit">Email</div>
          <div className="description-edit">Edit your email here</div>
          <div className="inputs">
            <Form>
              <Form.Field>
                <label>Email</label>
                <input placeholder='Email' />
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
