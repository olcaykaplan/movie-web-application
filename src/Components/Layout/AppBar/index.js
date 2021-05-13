import React from 'react';
import {Link} from 'react-router';

import About from '../../About';
import MovieList from '../../MovieList';

import {Grid, AppBar, Typography, Toolbar, Button, makeStyles, IconButton, MenuIcon,Box } from '@material-ui/core'


import classes from './index.module.css';
import logo from '../../../assets/img/logo.png'

const AppBarComponent = () =>{


  return(
    <AppBar  className={classes.menu}>
        <Toolbar className={classes.toolbar}>
          <img src={logo} alt="logo" className={classes.logo} />
          <Box>
         
          <Button color="inherit"  href="/about">About</Button>
          <Button color="inherit" href="/movies">Movies</Button>
          </Box>
        </Toolbar>
      </AppBar>
   
) 
}
export default AppBarComponent;