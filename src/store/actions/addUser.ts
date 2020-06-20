import { USER_ADD, USERS_LOADING, USERS_STOP } from "../types/users";
import { AppThunk } from "../index";
import User from "../../models/user";
import { addUserInfo } from "../../api/users";

export const addUser = (user: User): AppThunk => (dispatch) => {
  dispatch({ type: USERS_LOADING });

  return addUserInfo(user)
    .then((response) => {
      if (response && response.data.user) {
        dispatch({ type: USER_ADD, payload: response.data.user });
      }
      return response;
    })
    .catch((err) => {
      return { err: err.response.data };
    })
    .finally(() => {
      dispatch({ type: USERS_STOP });
    });
};
