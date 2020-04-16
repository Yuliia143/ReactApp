import axios from "axios";
import { BASE_URL } from '../config'

const get = () => {

}

const post = () => {
    
}

const put = async (url, data, options = {}) => {
    const token = localStorage.getItem("Access-Token");
    return axios.put(BASE_URL+url, data, {...options, headers: {'Access-Token': token}})
}

const remove = () => {
    
}

export default { get, put, post, delete: remove};