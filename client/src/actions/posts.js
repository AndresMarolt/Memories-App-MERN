import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, START_LOADING, END_LOADING, COMMENT, DELETE_COMMENT } from '../constants/actionTypes';
import * as api from '../api'

// ACTION CREATORS
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);
        dispatch({type: FETCH_ALL, payload: data});
        dispatch({ type: END_LOADING });
    } catch(err) {
        console.log("Error trayendo los posts");
        console.log(err);
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);
        dispatch({type: FETCH_POST, payload: data});
        dispatch({ type: END_LOADING });
    } catch(err) {
        console.log("Error trayendo los posts");
        console.log(err);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({type: FETCH_BY_SEARCH, payload: data});
        dispatch({ type: END_LOADING });
    } catch(err) {
        console.log(err);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);
        dispatch({type: CREATE, payload: data});
        dispatch({ type: END_LOADING });
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
        window.location.reload();
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

export const commentPost = (value, id) => async (dispatch) => {
    try { 
        const { data } = await api.commentPost(value, id);

        console.log("DATA");
        console.log(data);


        dispatch({ type: COMMENT, payload: data })

        return data.comments;

    } catch (err) {
        console.log(err);
    }
}

export const deleteComment = (commentId, postId) => async (dispatch) => {
    try {
        const { data } = await api.deleteComment(commentId, postId);
        dispatch({ type: DELETE_COMMENT, payload: data })
        return data.comments;
    } catch(err) {
        console.log(err);
    }
}

export const editComment = (value, postId) => async (dispatch) => {
    try {
        console.log(value);
        console.log(postId);
        const { data } = await api.editComment(value, postId);

        // FALTA EL DISPATCH

        console.log(data);

    } catch(err) {
        console.log(err);
    }
}