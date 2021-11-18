import React from 'react'
import { TextField, Grid, InputAdornment, IconButton, Icon } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Input = ({name, handleChange, label, half, autoFocus, type, handleShowPassword}) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField 
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={name == 'password' ? {
                    endadornment: (   // DETTA FUNKAR INTE SOM DET SKA! toggle knapp för att visa/dölja lösenordet.
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type=="password" ? <Visibility /> : <VisibilityOff /> }
                            </IconButton>
                        </InputAdornment>
                    ),
                } : null} 
            />
        </Grid>
    )
}

export default Input
