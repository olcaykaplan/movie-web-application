import React from 'react';
import AppBar from './AppBar';
import Footer from './Footer';

import MovieList from '../MovieList'
import MovieDetail from '../MovieDetail'
import About from '../About'


import {Grid, Paper} from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router';

import classes from './index.module.css';
const Layout = () =>(
    <Grid className={classes.main}>
        <Grid container xs={12} sm={12} md={12} lg={12} xl={12} className={classes.header}>
            <AppBar/>
        </Grid>
        <Grid container justify="center" className={classes.content}>
          <Switch>
          <Route path="/about" exact component={About} />
          <Route path="/movies" exact component={MovieList} />
          <Route path="/movies/:movieId" component={MovieDetail}/>
          <Redirect to="/movies" exact />
          </Switch>
        </Grid>
        <Grid item className={classes.footer}>
            <Footer/>
        </Grid>
    </Grid>
) 

export default Layout;