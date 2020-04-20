import {CATEGORIES_FAIL, CATEGORIES_LOADING, CATEGORIES_SUCCESS} from "../types/categories";
import {readCategories} from "../../api/categories";

export const getCategories = () => (dispatch) => {
    dispatch({type: CATEGORIES_LOADING});
    return readCategories().then(categories => {
        dispatch({type: CATEGORIES_SUCCESS, payload: categories})
    }).catch(()=>{
        dispatch({type: CATEGORIES_FAIL})
    })
};