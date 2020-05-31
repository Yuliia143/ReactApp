import React from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { Checkbox, Button } from 'semantic-ui-react';
import './SignUp.css';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { signUp } from '../../store/actions/auth';
import { ISignUp } from '../../models/credential';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'Too Short!')
    .max(40, 'Too Long!')
    .required('Full Name is required'),

  email: Yup.string().email('Email is invalid').required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const initialValues = {
  email: '',
  name: '',
  password: '',
};

const SignUp = ({ onSignUp, history }: any) => {
  const handleSignUp = async (credential: ISignUp, formikActions: any) => {
    const result = await onSignUp(credential);
    if (!result) {
      history.push('/signin');
    }
    if (result && result.err) {
      formikActions.setErrors(result.err);
    }
  };

  return (
    <div className="modalContentUp">
      <div className="headerPopUp">
        <h4>Sign Up and Start Learning!</h4>
      </div>
      <hr />
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSignUp}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            isValid,
            errors,
            touched,
          }) => (
            <Form className="fieldsUp">
              <Field
                type="text"
                name="name"
                placeholder="Full Name"
                value={values.name}
                onChange={handleChange}
                className={`form-control${
                  errors.name && touched.name ? ' is-invalid' : ''
                }`}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="invalid-feedback"
              />

              <Field
                type="email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                className={`form-control${
                  errors.email && touched.email ? ' is-invalid' : ''
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />

              <Field
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                className={`form-control${
                  errors.password && touched.password ? ' is-invalid' : ''
                }`}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />

              <div className="emailRec">
                <Checkbox />
                <p className="emailRecText">
                  Yes! I want to get the most out of StudyHard by receiving
                  emails with exclusive learning tips!
                </p>
              </div>
              <Button
                type="submit"
                className="submitBtn"
                onClick={() => handleSubmit}
                disabled={!isValid}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        <p className="termsPrivacy">
          By signing up, you agree to our Terms of Use and Privacy Policy.
        </p>
        <hr />
        <p className="logExAc">Already have an account? Log In</p>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSignUp: (credential: ISignUp) => dispatch(signUp(credential)),
  };
};
export default connect(null, mapDispatchToProps)(SignUp);
