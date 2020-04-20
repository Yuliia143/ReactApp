import {LECTURES_LOADING, LECTURES_SUCCESS, LECTURES_FAIL} from "../types/lectures";
import {readLectures} from "../../api/lectures";

export const getLectures = () => (dispatch) => {
    dispatch({type: LECTURES_LOADING});
    return readLectures().then(lectures => {
        dispatch({type: LECTURES_SUCCESS, payload: lectures})
    }).catch(()=>{
        dispatch({type: LECTURES_FAIL})
    })
};