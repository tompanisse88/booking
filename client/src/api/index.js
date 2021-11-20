import axios from 'axios';
 
const API = axios.create({ baseURL: 'https://deskbookingapp.herokuapp.com'});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, newBooking) => API.post(`/posts/${id}`, newBooking);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
