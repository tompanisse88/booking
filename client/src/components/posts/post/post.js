import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import { Paper, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
//import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AlarmIcon from '@mui/icons-material/Alarm';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
//import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
//import moment from 'moment';

import useStyles from './styles';
import { updatePost, deletePost } from '../../../actions/posts';

const Post = ({ post, isBooked, currentUser }) => {
    const classes = useStyles();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [updateData, setUpdateData] = useState({
        deskID: post?.deskID,
        user: currentUser?.result.name, 
        userID: currentUser?.result._id, 
        email: currentUser?.result.email
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePost(post._id, updateData))
        navigate('../');
    }

    const handleDeleteSubmit = (e) => {
        e.preventDefault();
        dispatch(deletePost(post.bookingID, currentUser.result.name, post.user));
        navigate('../');
    }

    return (
     
        <Box className={classes.box}>
            <Box p={0.4} mx={"auto"}>
                <form  method="post" autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Typography className={classes.bookedUser} p={1} variant="body2">{post.user ? post.user : "..."}</Typography>
                    <Typography 
                    className={classes.deskid}
                    name="deskID"
                    color="primary" 
                    variant="h3" 
                    value={post.deskID} 
                    >{post.deskID}</Typography>
                <Box m={1}>
                    <Button 
                    className={classes.button}  //OCH HÄR!!!!
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={!currentUser || post?.user != null || isBooked} // disable if user is not signed in or teh desk is already taken.
                    ><AccessTimeFilledIcon /> BOOK</Button>
                </Box>
                </form>

                <Box m={1}>
                <form  method="post" noValidate onSubmit={handleDeleteSubmit}>
                
                    <Button 
                    className={classes.button} 
                    color="secondary"
                    disabled={!currentUser || currentUser.result.name != post.user} 
                    variant="contained"
                    type="submit"
                    fullWidth
                    ><DeleteIcon /> REMOVE</Button>
                
                </form>
                </Box>
            </Box>
        </Box> 
     
    );
}

export default Post;