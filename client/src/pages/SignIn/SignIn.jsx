import React, {Component} from 'react'
import {Formik,Form} from 'formik';
import {BASE_URL} from '../../config';
import {onSubmitSignIn} from '../../services/api';
import './SignIn.css';
import {Button, Input} from "semantic-ui-react";
import {connect} from "react-redux";
import {object, string} from "yup";

const validationSchema = object({
    email:string().required(),
    password:string().required(),
});


class SignIn extends Component {
    
    handleLogin = async(values) =>{
        const {onLogIn, history} = this.props;
        await onLogIn(values);
        history.push("/");
        console.log(this.props);
    }  

    render() {
        const {onLogIn, loading, user} = this.props;
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
                    <Formik  validationSchema={validationSchema} 
                        initialValues={{email:"", password:""}} 
                        onSubmit={this.handleLogin}>
                        {({values, handleSubmit,handleChange, isSubmiting, isValid})=>
                            <Form>
                                <div className="inpAreaIn">
                                    <Input type="email" name="email" value={values.email}
                                           className="textInp" onChange={handleChange} placeholder="Email"/>
                                    <Input type="password" name="password" placeholder="Password"
                                           className="textInp" value={values.password} onChange={handleChange}/>
                                </div>
                                <div className="logBtnIn fieldsIn">
                                    {isSubmiting && 'Loading'}
                                    <Button type="submit" disabled={isSubmiting || !isValid} onClick={handleSubmit}>Log In</Button>
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
const mapDispatchToProps = (dispatch) =>({
    onLogIn: (form) => dispatch(onSubmitSignIn(form))
});
const mapStateToProps = (state) => ({
    user: state.user.data,
    loading: state.user.loading
});
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
