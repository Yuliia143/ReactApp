import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { BASE_URL } from '../../config';
import './SignIn.css';
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/auth";
import * as Yup from 'yup';
import { Credential } from "../../models/credential"

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),

    password: Yup.string()
        .required('Password is required'),
});

const initialValues = {
    email: "",
    password: ""
};

const SignIn = ({ onSignIn, history }: any) => {
    const handleSignIn = async (credential: Credential, formikActions: any) => {
        const result = await onSignIn(credential);
        if (!result) {
            history.push("/");
        }
        if (result && result.err) {
            formikActions.setErrors(result.err);
        }
    };
    return (
        <div className="modalContentIn">
            <div className="headerPopIn">
                <h4 className="logClassIn">Log In to Your StudyHard Account!</h4>
            </div>
            <hr />
            <div className="fieldsIn">
                <a className="logText fieldsIn" href={`${BASE_URL}/api/facebook`}>
                    <Button className='buttonsSignIn'>
                        Continue with Facebook
                        </Button>
                </a>
                <a className="logText fieldsIn" href={`${BASE_URL}/api/google`}>
                    <Button className='buttonsSignIn'>
                        Continue with Google
                        </Button>
                </a>
                <p className="logText fieldsIn">
                    <Button className='buttonsSignIn'>
                        Continue with Apple
                        </Button>
                </p>
                <Formik validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={handleSignIn}>
                    {({ values, handleSubmit, handleChange, isSubmitting, isValid, errors, touched }) =>
                        <Form>
                            <div className="inpAreaIn">

                                <Field type="email" name="email" placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />

                                <Field type="password" name="password" placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />

                            </div>

                            <div className="logBtnIn fieldsIn">
                                {isSubmitting && 'Loading'}
                                <Button className='buttonsSignIn' type="submit" disabled={isSubmitting || !isValid} onClick={() => handleSubmit}>Log In</Button>
                            </div>
                            <div className="changeAccIn">
                                <p className="forgotPassword">or Forgot Password</p>
                                <p className="newAcc">Don't have an account?Sign Up</p>
                            </div>
                        </Form>
                    }
                </Formik>
            </div>
        </div>

    );

}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        onSignIn: (credential: any) => dispatch(signIn(credential))
    }
};

export default connect(null, mapDispatchToProps)(SignIn);