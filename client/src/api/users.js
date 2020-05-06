import axios from "axios";
import {BASE_URL} from "../config";
import {store} from '../store'

export const readUsers = () => {
    // const token = localStorage.getItem("Access-Token");
    return axios
        .get('http://localhost:3030/api/users/all',
            {
                headers: {
                    "Access-token": store.getState().auth.token
                }
            })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        })
};