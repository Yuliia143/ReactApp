import {
    AUTH_LOADING,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    SIGN_OUT_SUCCESS,
} from "../types/auth";
import {signUp as registration} from "../../api/auth"
import {signIn as login} from "../../api/auth"
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
        const config = {token:response.headers["access-token"], user: response.data};
        dispatch({type: SIGN_IN_SUCCESS, payload: config})
    }).catch(() => {
        dispatch({type: SIGN_IN_FAIL})
    })
};

export const signOut = ():AppThunk => (dispatch) => {
    dispatch({type: AUTH_LOADING});
    dispatch({type: SIGN_OUT_SUCCESS})
};

