import React from 'react';
import {Link} from 'react-router';

import {Grid, AppBar, Typography, Toolbar, Button, makeStyles, IconButton, MenuIcon,Box } from '@material-ui/core'

import logo from  '../../../assets/img/logo.png'

import classes from './index.module.css';


const AppBarComponent = () =>{


  return(
    <AppBar position="static" className={classes.menu}>
        <Toolbar className={classes.toolbar}>
          <img src={logo} alt="logo" className={classes.logo} />
          <Box>
          <Button color="inherit">Login</Button>
          <Button color="inherit">logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
   
) 
}
export default AppBarComponent;