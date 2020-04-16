import React from 'react'
import { Button, Image } from 'semantic-ui-react'
import axios from 'axios'
// import $ from 'jquery'
import './User.css';
import UserEditPage from './UserEditPage'

export default class EditPhoto extends React.Component {
    state = {
      selectedFile: null,
      imagePreviewUrl: ''
    }
  
    singleFileChangedHandler = (event) => {
      // this.setState({ selectedFile: event.target.files[0] });

      let reader = new FileReader();
      let selectedFile = event.target.files[0];

      reader.onloadend = () => {
        this.setState({
          selectedFile: selectedFile,
          imagePreviewUrl: reader.result
        });
      }

    reader.readAsDataURL(selectedFile)
    };
  
    singleFileUploadHandler = (event) => {
      const data = new FormData();
      // If file selected
      if (this.state.selectedFile) {
        data.append( 'avatarImage', this.state.selectedFile, this.state.selectedFile.name);
        axios.post( 'https://glacial-chamber-22605.herokuapp.com/api/aws/upload-avatar', data, {
          headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            "Access-Token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTkzNzUzODdkMzkwZDQ0NzJiMDg1MzUiLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwibmFtZSI6IkpvaG4iLCJleHAiOjE1ODczODE0MjEsImlhdCI6MTU4Njc3NjYyMX0.NkhA-yUC7Sqxck03Xc82rL9REJlOW9R8wiP2vzUtCxk",
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          }
        })
        .then( ( response ) => {
          if ( 200 === response.status ) {
        // If file size is larger than expected.
          if( response.data.error ) {
             if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
                this.ocShowAlert( 'Max size: 2MB', 'red' );
             } else {
                console.log( response.data );
                // If not the given file type
                this.ocShowAlert( response.data.error, 'red' );
             }
          } else {
           // Success
           let fileName = response.data;
           console.log( 'fileName', fileName );
           this.ocShowAlert( 'File Uploaded', '#3089cf' );
          }
           }
          }).catch( ( error ) => {
          // If another error
          this.ocShowAlert( error, 'red' );
         });
        } else {
         // if file not selected throw error
         this.ocShowAlert( 'Please upload file', 'red' );
        }
        };
        
        ocShowAlert = ( message, background = '#3089cf' ) => {
        let alertContainer = document.querySelector( '#oc-alert-container' ),
         alertEl = document.createElement( 'div' ),
         textNode = document.createTextNode( message );
        alertEl.setAttribute( 'class', 'oc-alert-pop-up' );
        // $( alertEl ).css( 'background', background );
        // alertEl.appendChild( textNode );
        // setTimeout( function () {
        //  $( alertEl ).fadeOut( 'slow' );
        //  $( alertEl ).remove();
        // }, 3000 );
         };
  
    render() {
      let {imagePreviewUrl} = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      imagePreview = (
      <div className="img-template">
        <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small'/>
      </div>
      );
    }

      console.log(this.state);
      return (
        <>
        <div className="edit-profile">
          <UserEditPage />
          <div className="edit-content">                  
            <div className="title-edit">Photo</div>
            <div className="description-edit">Add a nice photo of yourself for your profile.</div>
            <div className="imgPreview">
              {imagePreview}
            </div>
            <div className="text-edit-photo">Add / edit image:</div>
            <input type="file" id="file" onChange={this.singleFileChangedHandler}/>
            <label for="file">Upload image</label>
            <Button className="save-btn" color='red' onClick={this.singleFileUploadHandler}>Save</Button>
          </div>
        </div>
        </>
      );
    }
  }