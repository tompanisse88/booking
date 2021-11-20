import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { Button, Box, Typography } from "@mui/material";
import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('../');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        //JWT...

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]); //updaterar setUser när location ändras

    return (

            <Box className={classes.box} mb={3}>
                <Typography variant="h5">Desk booking</Typography>

                {user ? (
                    <div>
                        <Typography>Welcome {user.result.name}</Typography>
                        <Button variant="outlined" color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <div>
                        <Button component={Link} to="/auth" variant="contained">Sign in</Button>
                    </div>
                )}
 
            </Box>
            
      
    );
};

export default Navbar
