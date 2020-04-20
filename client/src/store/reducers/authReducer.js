import {AUTH_LOADING, SIGN_IN_SUCCESS, SIGN_IN_FAIL, SIGN_UP_SUCCESS, SIGN_UP_FAIL, SIGN_OUT_SUCCESS} from "../types/auth";

const initialState = {
    loading: false,
    user: null,
    isAuth: false,
    token: localStorage.getItem("Access-Token")
};

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_LOADING:
            return {
                ...state,
                loading: true
            };
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuth: true,
                loading: false
            };
        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                isAuth: false,
                user: null,
                loading: false,
                token: null
            };
        default:
            return state;
    }
}
