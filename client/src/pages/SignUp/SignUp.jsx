import React, {Component} from 'react'
import {Formik,Form} from 'formik';
import axios from 'axios';
import {object,string} from 'yup';
import { BASE_URL } from '../../config';


const validationSchema = object({
    name:string().required(),
    email:string().required(),
    password:string().required()
});

const initialValues = {email:"", name:"", password:""};

const onSubmit = async (values) =>{
    console.log(values);
    const result = await axios.post(`${BASE_URL}/api/auth/signup`, values)
    console.log(result.data);
}

class SignUp extends Component{
    
    
    render(){
        return(
            <div>
                <h1>Sign Up Form</h1>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
                    {({values, handleSubmit,handleChange, isValid})=>
                    <Form>
                        <input type="email" name ="email" value={values.email} onChange={handleChange}/>
                        <input name ="name" value={values.name} onChange={handleChange}/>
                        <input type="password" name="password" value={values.password} onChange={handleChange}/>
                        <button type ="submit" onClick={handleSubmit} disabled={!isValid}>Submit</button>
                    </Form>
                    }
                </Formik>
            </div>  
        )
    }
}


export default SignUp;

