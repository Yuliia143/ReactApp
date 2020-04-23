import {
    AUTH_LOADING,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    SIGN_OUT_SUCCESS,
    UPDATE_PROFILE
} from "../types/auth";
import {signUp as registration} from "../../api/auth"
import {signIn as login} from "../../api/auth"
import {Action} from "redux";
import User from "../../models/user";
import {AppThunk} from "../index";


export const signUp = (credential:any):AppThunk<Promise<void>> => (dispatch) => {
    dispatch({type: AUTH_LOADING});
    return registration(credential).then(() => {
        dispatch({type: SIGN_UP_SUCCESS})
    }).catch(() => {
        dispatch({type: SIGN_UP_FAIL})
    })
};

export const signIn = (credential:any):AppThunk<Promise<void>> => (dispatch) => {
    dispatch({type: AUTH_LOADING});
    return login(credential).then((response) => {
        window.localStorage.setItem("Access-Token", response.headers["access-token"]);
        window.localStorage.setItem("User", JSON.stringify(response.data));
        dispatch({type: SIGN_IN_SUCCESS, payload: response.data})
    }).catch(() => {
        dispatch({type: SIGN_IN_FAIL})
    })
};

export const signOut = ():AppThunk => (dispatch) => {
    dispatch({type: AUTH_LOADING});
    window.localStorage.removeItem("Access-Token");
    window.localStorage.removeItem("User");
    dispatch({type: SIGN_OUT_SUCCESS})
};

