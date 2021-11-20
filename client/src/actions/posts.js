import * as api from '../api';

//Action creators
export const getPosts = () => async (dispatch) => {

    try {
        const { data } = await api.fetchPosts();
        dispatch( {type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    
    try {

        const { data } = await api.createPost(post);
        
        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {

        const { data } = await api.updatePost(id, post);
        dispatch({ type: 'NEW_BOOKING', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id, currentUser, postUser) => async (dispatch) => {
    if( currentUser === postUser) {
        try {
                await api.deletePost(id);
                dispatch( {type: 'DELETE', payload: id });
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    




