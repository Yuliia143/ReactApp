import axios from "axios";
import {BASE_URL} from "../config";

export const readUsers = () => {
    const token = localStorage.getItem("Access-Token");
    return axios
        .get(`${BASE_URL}/api/users/all`,
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

export const removeUser = (id) => {
    const token = localStorage.getItem("Access-Token");
    return axios
        .delete(`${BASE_URL}/api/users/${id}`,
            {
                headers: {
                    "Access-Token": token
                }
            })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        })
};

export const updateUserInfo = (user) => {
    const token = localStorage.getItem("Access-Token");
    return axios
        .put(`${BASE_URL}/api/users/${user.id}`, {user},
            {
                headers: {
                    "Access-Token": token
                }
            })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        })
};

export const addUserInfo = (user) => {
    const token = localStorage.getItem("Access-Token");
    return axios
        .post(`${BASE_URL}/api/users/all`, {user},
            {
                headers: {
                    "Access-Token": token
                }
            })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        })
};