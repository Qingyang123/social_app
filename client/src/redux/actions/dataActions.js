import * as actionTypes from '../types';
import axios from 'axios';


// Get all screams
export const getScreams = () => dispatch => {
    dispatch({ type: actionTypes.LOADING_DATA });
    axios.get('/screams')
        .then(res => {
            dispatch({ type: actionTypes.SET_SCREAMS, payload: res.data })
        })
        .catch(err => {
            dispatch({ type: actionTypes.SET_SCREAMS, payload: [] })
        })
}


// Like a scream
export const likeScream = (screamId) => dispatch => {
    axios.get(`/scream/${screamId}/like`)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: actionTypes.LIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}


// Unlike a scream
export const unlikeScream = (screamId) => dispatch => {
    axios.get(`/scream/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: actionTypes.UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}


// Delete a scream
export const deleteScream = (screamId) => dispatch => {
    axios.delete(`/scream/${screamId}`)
        .then(() => {
            dispatch({ type: actionTypes.DELETE_SCREAM, payload: screamId })
        })
        .catch(err => console.log(err))
}


// Post a scream
export const postScream = (newScream) => dispatch => {
    dispatch({ type: actionTypes.LOADING_UI });
    axios.post('/scream', newScream)
        .then(res => {
            dispatch({
                type: actionTypes.POST_SCREAM,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: actionTypes.SET_ERRORS,
                payload: err.response.data
            });
        })
}

// Get the scream info when you click a scream
export const getScream = (screamId) => dispatch => {
    dispatch({ type: actionTypes.LOADING_UI });
    axios.get(`/scream/${screamId}`)
        .then(res => {
            dispatch({
                type: actionTypes.SET_SCREAM,
                payload: res.data
            });
            dispatch({ type: actionTypes.STOP_LOADING_UI });
        })
        .catch(err => console.log(err));
}


// Submit comment
export const submitComment = (screamId, commentData) => dispatch => {
    axios.post(`/scream/${screamId}/comment`, commentData)
        .then(res => {
            dispatch({
                type: actionTypes.SUBMIT_COMMENT,
                payload: res.data
            })
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: actionTypes.SET_ERRORS,
                payload: err.response.data
            })
        })
}


export const getUserData = (userHandle) => dispatch => {
    dispatch({ type: actionTypes.LOADING_DATA });
    axios.get(`/user/${userHandle}`)
        .then(res => {
            dispatch({
                type: actionTypes.SET_SCREAMS,
                payload: res.data.screams
            });
        })
        .catch(err => {
            dispatch({
                type: actionTypes.SET_SCREAMS,
                payload: null
            })
        })
}


export const clearErrors = () => dispatch => {
    dispatch({ type: actionTypes.CLEAR_ERRORS });
}