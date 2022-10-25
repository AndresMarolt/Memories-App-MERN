import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api'

// ACTION CREATORS
export const getPosts = (page) => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts(page);
        console.log("DATA");
        dispatch({type: FETCH_ALL, payload: data});
    } catch(err) {
        console.log(err);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({type: FETCH_BY_SEARCH, payload: data});
        console.log(data); 

    } catch(err) {
        console.log(err);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({type: CREATE, payload: data});
    } catch(err) {
        console.log(err);
    }
}

export const updatePost = (id, post) => async (dispatch) => {   
    try {
        const response = await api.updatePost(id, post);
        const { data } = response;
        dispatch({type: UPDATE, payload: data})
    } catch(err) {
        console.log(err);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch(err) {
        console.log(err);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);
        dispatch({type: UPDATE, payload: data});
    } catch(err) {
        console.log(err);
    }
}

