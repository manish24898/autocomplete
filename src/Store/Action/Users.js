import axios from "axios";
import {FETCH_USERS_FAIL, FETCH_USERS_SUCCESS} from "../Types";
import {USER_LIST} from "../../Config/Constans";

export const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        users: users
    };
};

export const fetchUsersFail = error => {
    return {
        type: FETCH_USERS_FAIL,
        error: error
    };
};

export const fetchUsers = () => {
    return function (dispatch) {
        return axios
            .get(USER_LIST)
            .then(response => dispatch(fetchUsersSuccess(response.data)))
            .catch(error => dispatch(fetchUsersFail(error)));
    };
};
