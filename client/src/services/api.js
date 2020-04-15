import { BASE_URL } from '../config';
import axios from 'axios';
import { useHistory } from "react-router-dom";



const OnSubmitSignUp = async (values) =>{
    //const history = useHistory();
    const result = await axios.post(`${BASE_URL}/api/signup`, values);
    if(result.data.message === 'user created'){
        console.log("Now you can log in!");
        //history.push('/signin');
    };
};


const OnSubmitSignIn = async (values) =>{
    const history = useHistory();
    const result = await axios.post(`${BASE_URL}/api/signin`, values);
    window.localStorage.setItem("Access-Token", result.data.token);
    //history.push('/home');
};




export {OnSubmitSignIn, OnSubmitSignUp}