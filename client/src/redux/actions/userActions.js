import * as actionTypes from '../types';
import axios from 'axios';


export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_UI });

    axios.post('/login', userData)
        .then(res => {
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
            const FBIdToken = `Bearer ${res.data.token}`;
            axios.defaults.headers.common['Authorization'] = FBIdToken;
            dispatch(getUserData());
            dispatch({ type: actionTypes.CLEAR_ERRORS });
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: actionTypes.SET_ERRORS,
                payload: err.response.data
            });
        })
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: actionTypes.SET_UNAUTHENTICATED });
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_USER });
    axios.get('/user')
        .then(res => {
            dispatch({ 
                type: actionTypes.SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}


export const signupUser = (userData, history) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_UI })
    axios.post('/signup', userData)
        .then(res => {

            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
            const FBIdToken = `Bearer ${res.data.token}`;
            axios.defaults.headers.common['Authorization'] = FBIdToken;
            dispatch(getUserData());
            dispatch({ type: actionTypes.CLEAR_ERRORS });
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: actionTypes.SET_ERRORS,
                payload: err.response.data
            });
        })
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_USER });
    axios.post('/user/image', formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err));
}


export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_USER });
    axios.post('/user', userDetails)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err))
}