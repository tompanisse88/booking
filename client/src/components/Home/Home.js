import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { Toolbar, Grid, Button, Box, Typography, AppBar, Container, CssBaseline } from "@mui/material";

import { getPosts } from "../../actions/posts"
import Posts from "../posts/Posts";
import Form from "../form/Form";

const Home = () => {

    const location = useLocation();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [location]);

    return (
    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={7}>
            <Posts />
        </Grid>
       {/* <Grid item xs={12} sm={4}>
            <Form />
        </Grid>*/}
    </Grid>
    )
}

export default Home
