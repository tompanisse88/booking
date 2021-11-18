import React from "react";
import { Grid } from '@material-ui/core';
import { useSelector } from "react-redux";

import Post from "./post/post";
import useStyles from './styles';

const Posts = () => {
    const classes = useStyles();
    let isBooked = false;
    const currentUser = JSON.parse(localStorage.getItem('profile'));
    const posts = useSelector((state) => state.posts);

    posts.forEach(post => {
        if(post.user == currentUser.result.name) {
            isBooked = true;
        }
    });
    //const classes = useStyles();
    return(
    
            <Grid container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                <Grid key={post._id} item xs={6} sm={3}>
                    <Post post={post} isBooked={isBooked} currentUser={currentUser}/>
                </Grid> 
                ))}
            </Grid>
    
    );
}

export default Posts;
