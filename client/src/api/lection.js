
// export default class LectureService {
//     getLectures = async () => {
//     const url = 'https://glacial-chamber-22605.herokuapp.com/api/lectures/all';
//     const res = await fetch(url);
//     const json = await res.json();
//     return json;
//   };
// }

import axios from "axios";
import {BASE_URL} from "../config";

export const getLectures = () => {
    return axios
        .get(`${BASE_URL}/api/lectures/all`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        })
};
