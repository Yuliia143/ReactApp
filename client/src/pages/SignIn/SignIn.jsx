import React, {Component} from 'react'
import axios from 'axios';
import {Formik,Form} from 'formik';
import { BASE_URL } from '../../config';
import './SignIn.css'
import {Button, Input} from "semantic-ui-react";

const onSubmit = async (values) =>{
    console.log(values);
    const result = await axios.post(`${BASE_URL}/api/signin`, values);
    console.log(result);
};

export default class SignIn extends Component {

    render() {
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
                    <Formik initialValues={{email:"", password:""}} onSubmit={onSubmit}>
                        {({values, handleSubmit,handleChange})=>
                            <Form>
                                <div className="inpAreaIn">
                                    <Input type="email" name="email" value={values.email}
                                           className="textInp" onChange={handleChange} placeholder="Email"/>
                                    <Input type="password" name="password" placeholder="Password"
                                           className="textInp" value={values.password} onChange={handleChange}/>
                                </div>
                                <div className="logBtnIn fieldsIn">
                                    <Button type="submit" onClick={handleSubmit}>Log In</Button>
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
}
