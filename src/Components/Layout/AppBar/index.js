import React from "react";

import About from "../../About";
import MovieList from "../../MovieList";

import {
  Grid,
  AppBar,
  Typography,
  Toolbar,
  Button,
  makeStyles,
  IconButton,
  MenuIcon,
  Link,
  Box,
} from "@material-ui/core";

import classes from "./index.module.css";
import logo from "../../../assets/img/logo.png";

const AppBarComponent = () => {
  return (
    <AppBar className={classes.menu}>
      <Toolbar className={classes.toolbar}>
        <Link href="/movie">
        <img src={logo} alt="logo" className={classes.logo} />      
        </Link>
        <Box>
          <Button color="inherit" href="/about">
            About
          </Button>
          <Button color="inherit" href="/movies">
            Movies
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default AppBarComponent;
