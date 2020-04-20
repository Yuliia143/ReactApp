import React from 'react'

import { Button, Image, Form } from 'semantic-ui-react'

import http from "../../api/http";

import './User.css';


export default class EditPhoto extends React.Component {
    constructor(props) {
        super(props);
        const { imageUrl } = this.props 
        this.state = {
            selectedFile: null,
            imagePreviewUrl: '',
            imageUrl: imageUrl,
            loading: false,
            isDisabled: true
        }
    }

    singleFileChangedHandler = (event) => {
        const isDisabled = this.isDisabled()
        let reader = new FileReader();
        let selectedFile = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                selectedFile: selectedFile,
                imagePreviewUrl: reader.result,
                isDisabled
            });
        }
        reader.readAsDataURL(selectedFile)
    };

    isDisabled = () => {
        const { imagePreviewUrl } = this.state
        return imagePreviewUrl !== '' 
    }

    singleFileUploadHandler = () => {
        this.setState({ loading: true }) 
        const data = new FormData();
    
        if (this.state.selectedFile) {
            data.append('avatarImage', this.state.selectedFile, this.state.selectedFile.name);
            http.post('/api/aws/upload-avatar', data, { headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }})
                .then(response => {
                    this.setState({ loading: false })
                    let fileName = response.data;
                    this.props.setPhoto(this.state.imagePreviewUrl)
                    if (200 === response.status) {
                        console.log('fileName:', fileName);
                    } else {
                    console.log(response.data.error);
                    }
                })
        }
    }

    render() {
        const { imagePreviewUrl } = this.state;
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
                <Form loading={this.state.loading} >
                    <div className="edit-profile">
                        <div className="edit-content">
                            <div className="title-edit">Photo</div>
                            <div className="description-edit">Add a nice photo of yourself for your profile.</div>
                            <div className="imgPreview">
                                {imagePreview}
                            </div>
                            <div className="text-edit-photo">Add / edit image:</div>
                            <input type="file" id="file" onChange={this.singleFileChangedHandler} />
                            <label for="file">Upload image</label>
                            <Button className="save-btn" onClick={this.singleFileUploadHandler} disabled={this.state.isDisabled} color="red">Save</Button>
                        </div>
                    </div>
                </Form>
            </>
        );
    }
}
