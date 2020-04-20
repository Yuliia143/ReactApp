import { BASE_URL } from '../config';
import axios from 'axios';

 const getLecture = async (lectureId) => {
    const token = window.localStorage.getItem("Access-Token");
    const result = await axios.get(`${BASE_URL}/api/lectures/${lectureId}`, {
      headers: {
        "Access-Token": token,
      },
      
    });
    return result.data;
  };
  
   const postComment = async(lectureId, comment) => {
    const token = window.localStorage.getItem("Access-Token");
    const myUrl = `${BASE_URL}/api/lectures/${lectureId}/messages`;
      const response = await axios.post(myUrl, comment, {
        headers: {"Access-Token": token},
      });
      return response.data; 
    };


export {getLecture, postComment};
