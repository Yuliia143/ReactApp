import {USERS_FAIL, USERS_LOADING, USERS_STOP, USERS_SUCCESS} from "../../types/users";
import User from "../../../models/user";

export interface UsersState {
    loading: boolean,
    users: User[]
}

interface UsersLoadingAction {
    type: typeof USERS_LOADING
}

interface UsersSuccessAction {
    type: typeof USERS_SUCCESS
    payload: User[]
}

interface UsersStopAction {
    type: typeof USERS_STOP
}

interface UsersFailAction {
    type: typeof USERS_FAIL
}


export type UsersActions =
    UsersLoadingAction
    | UsersSuccessAction
    | UsersStopAction
    | UsersFailAction;