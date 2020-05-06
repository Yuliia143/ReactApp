import { BASE_URL } from "../config"
import axios from "axios";
import {store} from "../store";

export const createLecture = async(values) => {
    // const token = localStorage.getItem("Access-Token");
    const response = await axios.post(`${BASE_URL}/api/lectures`, values, {
        headers: {
            "Access-token": store.getState().auth.token
        }
    })
    return response.data;
}

export const deleteLecture = () => {
    
}

export const editLecture = () => {
    
}

export const getAllLectures = () => {
    
}



