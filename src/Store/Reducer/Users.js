import {FETCH_USERS_SUCCESS, FETCH_USERS_FAIL} from "../Types";

const initialState = {
    users: [],
    error: null
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_SUCCESS:
            return { ...state, ...action };
        case FETCH_USERS_FAIL:
            return { ...state, ...action };
        default:
            return {...state};
    }
};

export default UserReducer;
