import React, { useState } from 'react'

import { Button, Image, Form } from 'semantic-ui-react'

import http from "../../api/http";
import AvatarCropper from './AvatarCropper'

import './User.css';


// interface Props {
//     imageUrlProps: string
//     setPhoto: (url: string) => void
// }

// : React.FC<Props> = ({
//     imageUrlProps,
//     setPhoto
// })

const EditPhoto = (props) => {
    const [ uploadedFile, setUploadedFile ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [ isDisabled, setIsDisabled ] = useState(true)
    const [ cropWindow,  showCropWindow] = useState(false)
    const [ newAvatar, setNewAvatar ] = useState(null)
    
    const isFileValid = (file) => {
        const validExtentions = ['image/jpg', 'image/png', 'image/jpeg']
        const maxSize = 15000000
        return validExtentions.includes(file.type) && file.size <= maxSize
    }
    
    // event: React.ChangeEvent<HTMLInputElement>
    const singleFileChangedHandler = (event) => {
        
        const reader = new FileReader();
        const file = event.target.files[0];
        // todo test if non-file choosed
        const valid = isFileValid(file)

        reader.onloadend = () => {
            setUploadedFile(file)
            setNewAvatar(reader.result)
            setIsDisabled(!valid)
            showCropWindow(true)
        }
        reader.readAsDataURL(file)
    };

    const cropImage = (file) => {
        setUploadedFile(file)
        showCropWindow(false)
    }

    const singleFileUploadHandler = () => {
        setLoading(true) 
        const data = new FormData();
    
        if (uploadedFile) {
            const requestOptions = {
                headers: { 'Content-Type': `multipart/form-data; boundary=${data._boundary}` },
                crossDomain: true
            }
            
            data.append('avatarImage', uploadedFile, uploadedFile.name);
            http.post('/api/aws/upload-avatar', data, requestOptions)
                .then( response => {
                    setLoading(false)
                    const avatar = response.data.updatedUser.imageUrl
                    console.log('ok')
                    props.setAvatar(avatar)
                        // todo test non-200  
                })
                .catch( error => {
                    setLoading(false)
                    setIsDisabled(true)
                    console.log('error')
                })
        }
    }

    return (
        <>
            <Form loading={loading}>
                <div className="edit-profile">
                    <div className="edit-content">
                        <div className="title-edit">Photo</div>
                        <div className="description-edit">Add a nice photo of yourself for your profile.</div>
                        <div className="imgPreview">
                            <Image src={newAvatar || props.avatar} />  
                        </div>
                        {cropWindow && <AvatarCropper avatar={newAvatar} setNewAvatar={setNewAvatar} cropImage={cropImage}/>}
                        <input type="file" id="file" onChange={singleFileChangedHandler} />
                        <label htmlFor="file">Upload image</label>
                        <Button className="save-btn" onClick={singleFileUploadHandler} disabled={isDisabled} color="red">Save</Button>
                    </div>
                </div>
            </Form>
        </>
    );
    
}

export default EditPhoto
