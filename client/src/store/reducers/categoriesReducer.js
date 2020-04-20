import {CATEGORIES_LOADING, CATEGORIES_SUCCESS, CATEGORIES_FAIL} from "../types/categories";

const initialState = {
    loading: false,
    categories: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CATEGORIES_LOADING:
            return {
                ...state,
                loading: true
            };
        case CATEGORIES_SUCCESS:
            return {
                loading: false,
                categories: action.payload
            };
        case CATEGORIES_FAIL:
            return state;
        default:
            return state;
    }
}
