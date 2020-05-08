import axios from "axios";
import {BASE_URL} from "../config";

export const readUsers = () => {
    const token = localStorage.getItem("Access-Token");
    return axios
        .get('http://localhost:3030/api/users/all',
            {
                headers: {
                    "Access-token": token
                }
            })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        })
};