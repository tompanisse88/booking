import * as api from '../api';

//Action creators
export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({type: 'AUTH', data});

        navigate('../');
    } catch (error) {
        console.log("PASSWORD OR EMAIL IS INCORRECT");
    }
    
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({type: 'AUTH', data});

        navigate('../');
    } catch (error) {
        
    } 
    
}