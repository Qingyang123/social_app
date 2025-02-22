import * as actionTypes from '../types';

const initialState = {
    screams: [],
    scream: {},
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actionTypes.LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            }
        case actionTypes.SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            }
        case actionTypes.LIKE_SCREAM:
        case actionTypes.UNLIKE_SCREAM:
            let index1 = state.screams.findIndex(
                (scream) => scream.screamId === action.payload.screamId
            );
            state.screams[index1] = action.payload;
            if (state.scream.screamId === action.payload.screamId) {
                state.scream = action.payload;
            }
            return {
                ...state
            };
        case actionTypes.DELETE_SCREAM:
            let index2 = state.screams.findIndex(
                (scream) => scream.screamId === action.payload
            );
            state.screams.splice(index2, 1);
            console.log(state);
            return {
                ...state
            };
        case actionTypes.POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }
        case actionTypes.STOP_LOADING_UI:
            return {
                ...state,
                loading: false
            }
        case actionTypes.SUBMIT_COMMENT:
            return {
                ...state,
                scream: {
                    ...state.scream,
                    comments: [
                        action.payload,
                        ...state.scream.comments
                    ]
                }
            }
        default:
            return state
    }
}