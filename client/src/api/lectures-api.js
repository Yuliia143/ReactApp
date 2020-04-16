import { BASE_URL } from "../config"
import axios from "axios";

export const createLecture = async(values) => {
    const token = localStorage.getItem("Access-Token");
    const response = await axios.post(`${BASE_URL}/api/lectures`, values, {
        headers: {
            "Access-Token":token
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



