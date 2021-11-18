import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { Toolbar, Grid, Button, Box, Typography, AppBar, Container, CssBaseline } from "@mui/material";

const Navbar = () => {
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
        <AppBar>
            <Box sx={{ p: 1 }}>
                <Typography>Login</Typography>
            <Toolbar>
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
            </Toolbar>
            </Box>
            
        </AppBar>   
    );
};

export default Navbar
