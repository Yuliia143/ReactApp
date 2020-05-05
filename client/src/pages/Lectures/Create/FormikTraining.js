import React from 'react';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';


const initialValues = {
  friends: [
    {
      name: "",
      email: ""
    }
  ],
}

const UploadVideo = () => (
  <div>
    <h1>Upload Video</h1>
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
        }, 500);
      }}>
      {({isSubmitting}) => (
        <Form>
          <div className="row">
            <div className="col">
              <Field name="friendsname">
              {({field, form})=>(
                  <input {...field} type="file"   />
              )}
              </Field>
            </div>
            <div className="col">
              <Field name="email" type="text" placeholder = "Jane Doe" />
            </div>
            <div className="col">
              <button type="button">X</button>
            </div>
          </div>
          <button type="button" disabled={isSubmitting}>Add Video</button>
          <button type="submit" disabled={isSubmitting}>Invite</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default UploadVideo;