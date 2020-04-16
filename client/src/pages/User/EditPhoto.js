import React from 'react'
import { Button, Image } from 'semantic-ui-react'
import axios from 'axios'
import './User.css';
import UserEditPage from './UserEditPage'

export default class EditPhoto extends React.Component {
    state = {
        selectedFile: null,
        imagePreviewUrl: ''
    }

    singleFileChangedHandler = (event) => {
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
    
        if (this.state.selectedFile) {
            data.append('avatarImage', this.state.selectedFile, this.state.selectedFile.name);
            axios.post('https://glacial-chamber-22605.herokuapp.com/api/aws/upload-avatar', data, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    "Access-Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTkzNzUzODdkMzkwZDQ0NzJiMDg1MzUiLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwibmFtZSI6IkpvaG4iLCJleHAiOjE1ODczODE0MjEsImlhdCI6MTU4Njc3NjYyMX0.NkhA-yUC7Sqxck03Xc82rL9REJlOW9R8wiP2vzUtCxk",
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            })
            .then(response => {
                if (200 === response.status) {
                    let fileName = response.data;
                    console.log('fileName:', fileName);
                } else {
                    console.log(response.data.error);
                }
            })
        }
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            imagePreview = (
                <div className="img-template">
                    <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small' />
                </div>
            );
        }

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
                        <input type="file" id="file" onChange={this.singleFileChangedHandler} />
                        <label for="file">Upload image</label>
                        <Button className="save-btn" color='red' onClick={this.singleFileUploadHandler}>Save</Button>
                    </div>
                </div>
            </>
        );
    }
}