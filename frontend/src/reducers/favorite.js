import { LOGOUT_SUCCESS } from '../actions/auth/types';
import {
    LOAD_FAV_SUCCESS,
    LOAD_FAV_FAIL,
    ENROLL_FAV_SUCCESS,
    ENROLL_FAV_FAIL,
    DELETE_FAV_SUCCESS,
    DELETE_FAV_FAIL,

} from '../actions/favorite/types';

const initialState = {
    favorite: null,
};

const favoriteReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case LOAD_FAV_SUCCESS:
            return {
                ...state,
                favorite: payload
            }
        case LOAD_FAV_FAIL:
            return {
                ...state,
                favorite: null
            }
        case ENROLL_FAV_SUCCESS:
            return {
                ...state,
            }
        case ENROLL_FAV_FAIL:
            return {
                ...state,
            }
        case DELETE_FAV_SUCCESS:
            return {
                ...state,
            }
        case DELETE_FAV_FAIL:
            return {
                ...state,
            }
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    };
};

export default favoriteReducer;