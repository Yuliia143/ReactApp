import React from "react";
import { Button, Form } from "semantic-ui-react";
import { Formik } from 'formik';
import { createLecture } from '../../../api/lectures-api';
import FileLoaderProgress from './FileLoaderProgress';
import classes from './CreatePage.module.css';
import * as Yup from 'yup';
import { withRouter } from "react-router-dom";
import './Admin.css';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Must have a character")
    .max(255, "Must be shorter than 255")
    .required("Must be a title"),
  description: Yup.string()
    .max(255, "Must be shorter than 255")
    .required("Must add description"),
  videoUrl: Yup.string()
    .required("Please add video URL or upload your own")
})

const errorFormHandlind = (touchedName, errorName) =>{
  if (touchedName && typeof(errorName) !== 'undefined'){
    return { 
      content: errorName, 
      pointing: 'below' 
    }
  } else {
    return false;
  }
}

const CreatePage = ({history}) => {

  const onSubmitLecture = async (values) => {
    const result = await createLecture(values);
    history.push(`/lecture/${result._id}`);
  }

  return (
    <div className="edit-content">
    <Formik initialValues={{ title: "", description: "", videoUrl:'', file: null }} 
      validationSchema = {validationSchema}
      onSubmit={(values, {setSubmitting, resetForm}) => {
        onSubmitLecture(values)
        setSubmitting(true);
        resetForm();
        setSubmitting(false);
        }}>
      {({ values, errors, touched, handleSubmit, handleBlur, 
          handleChange, isValid, setFieldValue }) =>
        <Form onSubmit={handleSubmit}>
          <Form.Input  
            name="title"
            id="title" 
            label='Title' 
            placeholder='Title' 
            value={values.title}
            onBlur = {handleBlur}
            onChange={handleChange}
            error={errorFormHandlind(touched.title, errors.title)}  />
          <Form.TextArea 
            name="description"
            id="description" 
            label='Description' 
            placeholder='Description...'
            value={values.description} 
            onBlur={handleBlur}
            onChange={handleChange} 
            error={errorFormHandlind(touched.description, errors.description)}/>
          <Form.Input  
            name="videoUrl"
            id="videoUrl" 
            label='Add video url' 
            placeholder='videoUrl' 
            value={values.videoUrl}
            onBlur = {handleBlur}
            onChange={handleChange}
            error={errorFormHandlind(touched.videoUrl, errors.videoUrl)}  />
          <label htmlFor="file" className={classes.button}>Upload Video</label>
          <Form.Input id="file" name="file" type="file" onChange={(event) => {
            setFieldValue("file", event.currentTarget.files[0]);
          }} />
          <FileLoaderProgress file={values.file} onUploaded={(url)=>{
            setFieldValue('videoUrl', url);
          }} />
          <div>
              <Button type="submit" disabled={!isValid} color='teal'>Add Lecture</Button>
          </div>
        </Form>
      }
    </Formik>
    </div>
  )
}

export default withRouter(CreatePage);