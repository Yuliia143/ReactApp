import axios from "axios";
import { BASE_URL } from '../config'
import {store} from "../store";

const get =  async (url, data, options = {}) => {
    // const token = localStorage.getItem("Access-Token");
    const token = store.getState().auth.token;
    return axios.get(BASE_URL+url , {...options, headers: {'Access-Token': token}, params:data})
}

const post = async (url, data, options = {}) => {
    // const token = localStorage.getItem("Access-Token");
    const token = store.getState().auth.token;
    return axios.post(BASE_URL+url, data, {...options, headers: {'Access-Token': token}})
}

const put = async (url, data, options = {}) => {
    // const token = localStorage.getItem("Access-Token");
    const token = store.getState().auth.token;
    return axios.put(BASE_URL+url, data, {...options, headers: {'Access-Token': token}})
}

const remove = () => {
    
}

export default { get, put, post, delete: remove};