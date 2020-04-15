import { BASE_URL } from '../config';
import axios from 'axios';
import {USER_LOGIN_START, USER_LOGIN, REMOVE_USER} from "../store/actions";




const onSubmitSignUp = async (values) =>{
    const result = await axios.post(`${BASE_URL}/api/signup`, values);
    if(result.data.message === 'user created'){
        console.log("Now you can log in!");
    }
};


const onSubmitSignIn = values =>  async (dispatch, getState) =>{
    dispatch({type: USER_LOGIN_START});
    try {
        const result = await axios.post(`${BASE_URL}/api/signin`, values); 
        window.localStorage.setItem("Access-Token", result.headers["access-token"]);
        dispatch({type: USER_LOGIN, payload: result.data})
    } catch (e) {
        dispatch({type: REMOVE_USER})
    }

};


export {onSubmitSignIn, onSubmitSignUp}
