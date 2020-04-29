import React, { useState } from 'react'

import { Button, Image, Form } from 'semantic-ui-react'

import http from "../../api/http";

import './User.css';


const EditPhoto = (props) => {
    const [ selectedFile, setSelectedFile ] = useState(null)
    const [ imagePreviewUrl, setImagePreviewUrl ] = useState('')
    const [ imageUrl, setImageUrl ] = useState(props.imageUrl)
    const [ loading, setLoading ] = useState(false)
    const [ isDisabled, setIsDisabled ] = useState(true)
    
    // const checkIsDisabled = () => {
        
    //     return imagePreviewUrl !== '' 
    // }

    const singleFileChangedHandler = (event) => {
        // const isDisabled = checkIsDisabled()
        let reader = new FileReader();
        let selectedFile = event.target.files[0];

        reader.onloadend = () => {
            setSelectedFile(selectedFile)
            console.log(imagePreviewUrl)
            setImagePreviewUrl(reader.result)
            setIsDisabled(isDisabled)
            // // // // // // setIsDisabled(isDisabled)
        }
        reader.readAsDataURL(selectedFile)
    };

    

    const singleFileUploadHandler = () => {
        setLoading(true) 
        const data = new FormData();
    
        if (selectedFile) {
            data.append('avatarImage', selectedFile, selectedFile.name);
            http.post('/api/aws/upload-avatar', data, { headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }})
                .then(response => {
                    setLoading(false)
                    let fileName = response.data;
                    props.setPhoto(imagePreviewUrl)
                    if (200 === response.status) {
                        console.log('fileName:', fileName);
                    } else {
                    console.log(response.data.error);
                    }
                })
        }
    }

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
            <Form loading={loading} >
                <div className="edit-profile">
                    <div className="edit-content">
                        <div className="title-edit">Photo</div>
                        <div className="description-edit">Add a nice photo of yourself for your profile.</div>
                        <div className="imgPreview">
                            {imagePreview}
                        </div>
                        <div className="text-edit-photo">Add / edit image:</div>
                        <input type="file" id="file" onChange={singleFileChangedHandler} />
                        <label for="file">Upload image</label>
                        <Button className="save-btn" onClick={singleFileUploadHandler} color="red">Save</Button>
                        {/* disabled={isDisabled} */}
                    </div>
                </div>
            </Form>
        </>
    );
    
}

export default EditPhoto
