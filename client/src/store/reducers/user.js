const initialState = {
    data: null,
    loading: false
};

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case 'USER_LOGIN_START':
            return {
            loading: true,
                data: null
        };
        case 'USER_LOGIN':
            return{
                ...state, data: payload, loading: false
            };
        case 'UPDATE_PROFILE':
            return{
                ...state, data: payload, loading: false
            };
        case 'REMOVE_USER':
            return initialState;

        default: return state;
    }
}
