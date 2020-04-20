import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const ModalFooter = ({id, onClose , userData}) =>{
    return (
        <Modal.Actions>

          <Button color='black' onClick={onClose} >
            Cancel
          </Button>
          {userData!== null ? <Link to={`/lecture/${id}`}><Button
            positive
            icon='checkmark'
            labelPosition='right'
            content="Buy"
            onClick={onClose}
          /></Link> : <Link to='/signin'><Button
          positive
          icon='checkmark'
          labelPosition='right'
          content="Go to signin"
          onClick={onClose}
        /></Link>}
          
        </Modal.Actions>
    )
}
const mapStateToProps = (state) =>({userData: state.user.data})
export default connect(mapStateToProps)(ModalFooter);