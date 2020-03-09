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
        case actionTypes.LIKE_SCREAM:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        screamId: action.payload.screamId
                    }
                ]
            }
        case actionTypes.UNLIKE_SCREAM:
            return {
                ...state,
                likes: state.likes.filter(like => like.screamId !== action.payload.screamId)
            }
        case actionTypes.MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(not => not.read = true);
            return {
                ...state
            }
        default:
            return state
    }
}
