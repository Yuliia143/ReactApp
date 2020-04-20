import {LECTURES_LOADING, LECTURES_SUCCESS, LECTURES_FAIL} from "../types/lectures";

const initialState = {
    loading: false,
    lectures: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LECTURES_LOADING:
            return {
                ...state,
                loading: true
            };
        case LECTURES_SUCCESS:
            return {
                loading: false,
                lectures: action.payload
            };
        case LECTURES_FAIL:
            return state;
        default:
            return state;
    }
}
