import { USER_UPDATE, USERS_LOADING, USERS_STOP } from "../types/users";
import { updateUserInfo } from "../../api/users";
import { AppThunk } from "../index";
import User from "../../models/user";

export const updateUser = (user: User): AppThunk => (dispatch) => {
  dispatch({ type: USERS_LOADING });
  return updateUserInfo(user)
    .then((response) => {
      if (response && response.data.user) {
        dispatch({ type: USER_UPDATE, payload: response.data.user });
      }
    })
    .catch((err) => {
      return { err: err.response.data };
    })
    .finally(() => {
      dispatch({ type: USERS_STOP });
    });
};
