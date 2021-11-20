import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import { Box, Avatar, Button, Paper, Container, Grid, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Divider from '@mui/material/Divider';

import Input from './Input';
import { signin, signup} from "../../actions/auth";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => { 
 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword) //Toggle (knapp för detta är ej tillagd)
    const switchMode = () => {
                setIsSignup((prevIsSignup) => !prevIsSignup);
                setShowPassword(false);
            }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignup) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    } 

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const googleSuccess = async (res) => {
        const results = res?.profileObj;
        const token = res?.tokenId;
        
        try {
            dispatch({ type: 'AUTH',  data: { results, token }})
            navigate('../');
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure = () => {

        console.log("Google sign in was unsuccessfull");
    }
    
    
    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3}>
            <Box sx={{ p: 3 }}>
                    
                <Avatar><LockOutlinedIcon /></Avatar>
             
                <Typography variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                <div style={{marginTop: 20, marginBottom: 20}}>
                    <Divider variant="middle" />
                </div>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                            </>
                        )}
                        <Input name="email" label="Email Adress" handleChange={handleChange} type="email" />
                        <Input name="password" label="password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        { isSignup && (
                            <>
                                <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />
                            </>
                        )}
                        
                    </Grid>
                   
                        <GoogleLogin 
                        disabled
                            clientId = "652743264461-jpshptoe0s6o0ht7dibmiv676varrian.apps.googleusercontent.com"
                            render={(renderProps) => (
                               <Button color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained">Google Sign in</Button> 
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            {isSignup ? 'Sign up' : 'Sign in'}
                        </Button>
                    
                    <Grid container justifyContent="center" >
                            <Grid>
                                <Button onClick={switchMode}>
                                    { isSignup ? 'Already have and account? Sign in' : 'Don´t have an account? Sign up'}
                                </Button>
                            </Grid>
                    </Grid>
                </form>
            </Box>
            </Paper>
        </Container>
    );
}

export default Auth
