import { BASE_URL } from '../config';
import axios from 'axios';
import { USER_LOGIN_START, USER_LOGIN, REMOVE_USER } from "../store/actions";

const onSubmitSignUp = async (values) => {
    const result = await axios.post(`${BASE_URL}/api/signup`, values);
    if (result.data.message === 'user created') {
        console.log("Now you can log in!");
    }
};

const onSubmitSignIn = values => async (dispatch, getState) => {
    const result = await axios.post(`${BASE_URL}/api/signin`, values);
    window.localStorage.setItem("Access-Token", result.headers["access-token"]);
    const user = {name: result.data.name, email: result.data.email};
    window.localStorage.setItem("User", JSON.stringify(user));
    dispatch({ type: USER_LOGIN, payload: result.data })
};



export {onSubmitSignIn, onSubmitSignUp};

