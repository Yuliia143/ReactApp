import {
  AUTH_LOADING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_OUT_SUCCESS,
} from "../types/auth";

import {
  signUp as registration,
  signIn as SignIn,
  googleFacebook,
} from "../../api/auth";

import { AppThunk } from "../index";

export const signUp = (
  credential: any
): AppThunk<Promise<any | { err: any }>> => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  try {
    await registration(credential);
    return dispatch({ type: SIGN_UP_SUCCESS });
  } catch (err) {
    dispatch({ type: SIGN_UP_FAIL });
    return { err: err.response.data };
  }
};

export const signIn = (
  credential: any,
  googleOrFacebook: boolean
): AppThunk<Promise<any | { err: any }>> => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  let login = SignIn;
  if(googleOrFacebook) login = googleFacebook
  try {
    await login(credential).then((response) => {
      window.localStorage.setItem(
        "Access-Token",
        response.headers["access-token"]
      );
      window.localStorage.setItem("User", JSON.stringify(response.data));
      return dispatch({ type: SIGN_IN_SUCCESS, payload: response.data });
    });
  } catch (err) {
    dispatch({ type: SIGN_IN_FAIL });
    return { err: err.response.data };
  }
  return null;
};

export const signOut = (): AppThunk => (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  window.localStorage.removeItem("Access-Token");
  window.localStorage.removeItem("User");
  dispatch({ type: SIGN_OUT_SUCCESS });
};
