import React, {Component} from 'react'
import {Formik,Form} from 'formik';
import axios from 'axios';
import { BASE_URL } from '../../config';

const onSubmit = async (values) =>{
    console.log(values);
    const result = await axios.post(`${BASE_URL}/api/auth/signin`, values)
    console.log(result.data);
}

class SignIn extends Component{
    
    
    render(){
        return(
            <div>
                <h1>Sign In Form</h1>
                <Formik initialValues={{email:"", password:""}} onSubmit={onSubmit}>
                    {({values, handleSubmit,handleChange})=>
                    <Form>
                        <input type="email" name ="email" value={values.email} onChange={handleChange}/>
                        <input type="password" name="password" value={values.password} onChange={handleChange}/>
                        <button type ="submit" onClick={handleSubmit}>Submit</button>
                    </Form>
                    }
                </Formik>
            </div>  
        )
    }
}


export default SignIn;

