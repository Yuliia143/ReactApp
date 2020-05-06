import React, {Component} from 'react'
import {Formik,Form} from 'formik';
import {BASE_URL} from '../../config';
import './SignIn.css';
import {Button, Input} from "semantic-ui-react";
import {connect} from "react-redux";
import {object, string} from "yup";
import {signIn} from "../../store/actions/auth";
import {RootState} from "../../store";
import {Credential} from "../../models/credential";
import {History} from "history";

const validationSchema = object({
    email:string().required(),
    password:string().required(),
});

const initialValues = {email: "", password: ""};


const mapStateToProps = (state: RootState) => ({
    user: state.auth.user,
    loading: state.auth.loading
});

const mapDispatchToProps = (dispatch: Function) =>{
    return {
        onSignIn: (credential: Credential) => {
            dispatch(signIn(credential))
        }
    }
};
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
    history: History,
    onSignIn: (credentials: Credential) => void
}

const SignIn=({history, onSignIn}:Props)=> {
    const handleSignIn = async(credential: Credential) =>{
        await onSignIn(credential);
        history.push("/");
    };

        return (
            <div className="modalContentIn">
                <div className="headerPopIn">
                    <h4 className="logClassIn">Log In to Your SoftServe Account!</h4>
                </div>
                <hr/>
                <div className="fieldsIn">
                    <a className="logText fieldsIn" href="#">
                        <Button>
                            Continue with Facebook
                        </Button>
                    </a>
                    <a className="logText fieldsIn" href={`${BASE_URL}/api/google`}>
                        <Button>
                            Continue with Google
                        </Button>
                    </a>
                    <a className="logText fieldsIn" href="#">
                        <Button>
                            Continue with Apple
                        </Button>
                    </a>
                    <Formik validationSchema={validationSchema}
                            initialValues={initialValues}
                        onSubmit={handleSignIn}>
                        {({values,handleChange, isSubmitting, isValid})=>
                            <Form>
                                <div className="inpAreaIn">
                                    <Input type="email" name="email" value={values.email}
                                           className="textInp" onChange={handleChange} placeholder="Email"/>
                                    <Input type="password" name="password" placeholder="Password"
                                           className="textInp" value={values.password} onChange={handleChange}/>
                                </div>
                                <div className="logBtnIn fieldsIn">
                                    {isSubmitting && 'Loading'}
                                    <Button type="submit" disabled={isSubmitting || !isValid}>Log In</Button>
                                </div>
                                <div className="changeAccIn">
                                    <p className="forgotPassword">or <a href="#">Forgot Password</a></p>
                                    <p className="newAcc">Don't have an account?<a href="#"> Sign Up</a></p>
                                </div>
                            </Form>
                        }
                    </Formik>
                </div>
            </div>

        );
}
export default connector(SignIn);
