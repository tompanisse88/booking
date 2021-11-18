import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';

//import FileBase from 'react-file-base64';

//import useStyles from './styles';
import { createPost } from '../../actions/posts';

const Form = () => {

    const [postData, setPostData] = useState({
        user: '', deskID: ''
    });

    //const classes = useStyles();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const temp = dispatch(createPost(postData));
        console.log(temp);
    }

    return(
        <Paper elevation={6}>
            <Box sx={{ p: 2  }}>
            <form method="post" autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Typography variant="h6">Add desk</Typography>
            <TextField
            name="user"
            variant="outlined"
            label="user"
            fullWidth
            value={postData.user}
            onChange={(e) => setPostData({ ...postData, user: e.target.value })}
            />
            <TextField
            name="deskID"
            variant="outlined"
            label="deskID"
            fullWidth
            value={postData.deskID}
            onChange={(e) => setPostData({ ...postData, deskID: e.target.value })}
            />
            <Button disabled variant="contained" color="primary" size="large" type="submit">Submit</Button>
            </form>
            </Box>
        </Paper>
    );
}

export default Form;