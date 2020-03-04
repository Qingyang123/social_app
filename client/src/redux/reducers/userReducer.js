import * as actionTypes from '../types';

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [],
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case actionTypes.SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case actionTypes.SET_UNAUTHENTICATED:
            return initialState;
        case actionTypes.SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case actionTypes.LOADING_USER:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}
