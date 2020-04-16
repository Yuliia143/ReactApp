import React, { useRef } from "react";
import {Button, Input} from "semantic-ui-react";
import {Formik,Form} from 'formik';
import {createLecture} from '../../../api/lectures-api';

const onSubmitLecture = async(values, posterRef)=>{
    const posterFile = posterRef.current.files[0];
    console.log("start submiting")
    console.log(values);
    // const formdata = new FormData();
    // formdata.append("title",values.title)
    // formdata.append("videoUrl",values.videoUrl)
    // formdata.append("description",values.description)
    // formdata.append("poster", posterFile)
    await createLecture(values);
} 

const CreatePage = () => {
    const posterRef = useRef()
    return (
        <Formik initialValues={{title:"",videoUrl:"",description:"", poster:""}} onSubmit={values=>onSubmitLecture(values,posterRef)}>
            {({ values, handleSubmit, handleChange, isSubmitting }) =>
                <Form handleSubmit={handleSubmit}>
                    <div className="inpAreaIn">
                        <Input type="text" name="title" value={values.title}
                            className="textInp" onChange={handleChange} placeholder="Title" />
                        <Input type="text" name="videoUrl" placeholder="VideoUrl"
                            className="textInp" value={values.videoUrl} onChange={handleChange} />
                        <Input type="text" name="description" placeholder="description"
                            className="textInp" value={values.description} onChange={handleChange} />
                        <input type="file" name="poster" placeholder="file"
                            className="textInp" ref={posterRef} />
                    </div>
                    <div>
                        {isSubmitting && "loading"}
                        <Button type="submit" >Add Lecture</Button>
                    </div>
    
                </Form>
            }

        </Formik>
    )
}

export default CreatePage