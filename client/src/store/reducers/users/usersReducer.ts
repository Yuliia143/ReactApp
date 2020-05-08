import {USERS_FAIL, USERS_LOADING, USERS_STOP, USERS_SUCCESS} from "../../types/users";
import {UsersActions, UsersState} from "./types";

const initialState : UsersState={
    loading: false,
    users: []
};

export default function (state = initialState, action: UsersActions): UsersState {
    switch (action.type) {
        case USERS_LOADING:
            return {
                ...state,
                loading: true
            };
        case USERS_SUCCESS:
            return {
                ...state,
                users: action.payload
            };
        case USERS_STOP:
            return{
                ...state,
                loading: false
            };
        case USERS_FAIL:
            return{
                ...state,
                loading: false
            };
        default:
            return state;
    }
}