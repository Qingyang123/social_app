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
            dispatch({ type: actionTypes.CLEAR_ERRORS });
        })
        .catch(err => {
            dispatch({
                type: actionTypes.SET_ERRORS,
                payload: err.response.data
            });
        })
}


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


export const clearErrors = () => dispatch => {
    dispatch({ type: actionTypes.CLEAR_ERRORS });
}