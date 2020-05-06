import React from "react";
import { Button, Input, Form } from "semantic-ui-react";
import { Formik } from 'formik';
import { createLecture } from '../../../api/lectures-api';
import FileLoaderProgress from './FileLoaderProgress';
import classes from './CreatePage.module.css';


const CreatePage = () => {

  const onSubmitLecture = async (values) => {
    // const posterFile = posterRef.current.files[0];
    console.log("start submiting")
    console.log(values);
    // const formdata = new FormData();
    // formdata.append("title",values.title)
    // formdata.append("videoUrl",values.videoUrl)
    // formdata.append("description",values.description)
    // formdata.append("poster", posterFile)
    // const result = await createLecture(values);
    // console.log(result);
  }

  return (
    <Formik initialValues={{ title: "", description: "", file: null }} onSubmit={values => onSubmitLecture(values)}>
      {({ values, handleSubmit, handleChange, isSubmitting, setFieldValue }) =>
        <Form onSubmit={handleSubmit}>
          <Form.Input fluid name="title" label='Title' placeholder='Title' value={values.title}
            onChange={handleChange} />
          <Form.TextArea name="description" label='Description' placeholder='Description...'
            value={values.description} onChange={handleChange} />
          <label htmlFor="file" className={classes.button}>Upload Video</label>
          <input id="file" name="file" type="file" onChange={(event) => {
            setFieldValue("file", event.currentTarget.files[0]);
          }} />
          <FileLoaderProgress file={values.file} />
          <div>
            {isSubmitting && "loading"}
              <Button type="submit" >Add Lecture</Button>
          </div>

        </Form>
      }

    </Formik>
  )
}

export default CreatePage;