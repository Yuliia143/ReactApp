import {combineReducers} from "redux";
import categoriesReducer from "./categoriesReducer";
import lecturesReducer from "./lecturesReducer";
import authReducer from "./auth/authReducer";

export default combineReducers({
        auth: authReducer,
        lectures: lecturesReducer,
        categories: categoriesReducer,
    }
)