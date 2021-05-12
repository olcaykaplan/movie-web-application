import React from 'react';
import AppBar from './AppBar';
import Footer from './Footer';
import MovieList from '../MovieList'
import {Grid, Paper} from '@material-ui/core';

import classes from './index.module.css'
const Layout = () =>(
    <Grid className={classes.main}>
        <Grid container xs={12} sm={12} md={12} lg={12} xl={12} className={classes.header}>
            <AppBar/>
        </Grid>
        <Grid container className={classes.content}>
           <MovieList/>
        </Grid>
        <Grid item className={classes.footer}>
            <Footer/>
        </Grid>
    </Grid>
) 

export default Layout;