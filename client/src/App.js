import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Container, MuiCssBaseline, darkScrollbar, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightGreen } from '@mui/material/colors';

import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";


import useStyles from './styles';

const App = () => {
    const classes = useStyles();

    const theme = createTheme({
      palette: {
        primary: {
          main: '#79AA66',
        },
        secondary: {
          main: '#ff5722',
        },
      },
      typography: {
        fontFamily: [
          'Arial',
        ].join(','),
        body2: {
          fontWeight: '200',
        },
        h3: {
          fontWeight: '600',
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: "#424541",
            },
            
          }
        }
      }
    });

    return (
      <ThemeProvider theme={theme}>
      <CssBaseline />
            <BrowserRouter>
              <Container className={classes.root}>
                <Navbar />
               
                  <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/Auth' element={<Auth />} />
                  </Routes>      
            
              </Container> 
            </BrowserRouter>         
            </ThemeProvider>
    );
}

export default App;