import * as actionTypes from '../types';

const initialState = {
    loading: false,
    errors: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null
            }
        case actionTypes.LOADING_UI:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}