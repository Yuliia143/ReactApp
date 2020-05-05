import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../../store';
// import http from '../../../../api/http';


const ModalFooter = ({ id, onClose, userData }: any) => {

  // const favoriteLection = async(id : any) =>{
  //   const responce = await http.put(`/api/lectures/${id}/add_to_favs`, {})
  //   return responce.data;
  // }  

  return (
    // <Modal.Actions>
    //   <Button color='black' onClick={onClose} >
    //     Cancel
    //           </Button>
    //   {userData !== null ? <Button
    //     positive
    //     icon='heart outline'
    //     labelPosition='right'
    //     content="Add to favorite"
    //     onClick={() => favoriteLection(id)}
    //   /> : <Link to='/signin'><Button
    //     positive
    //     icon='checkmark'
    //     labelPosition='right'
    //     content="Go to signin"
    //     onClick={onClose}
    //   /></Link>}

    // </Modal.Actions>


    <Modal.Actions>

      <Button color='black' onClick={onClose} >
        Cancel
      </Button>
      {userData!== null ? <Link to={`/lecture/${id}`}><Button
        positive
        icon='heart outline'
        labelPosition='right'
        content="Add to favorite"
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
const mapStateToProps = (state: RootState) => ({ userData: state.auth.user })
export default connect(mapStateToProps)(ModalFooter);


