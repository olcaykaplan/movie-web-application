import React from "react";

import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Box,
  Modal,
} from "@material-ui/core";

import jumbotron from "../../../assets/img/jumbotron.png";

import classes from "./index.module.css";
const JumbotronCard = () => (
  <Grid
    container
    item
    md={12}
    lg={12}
    xl={12}
    direction="row"
    alignItems="center"
    justify="center"
  >
    <Card className={classes.imageCard}>
      <CardMedia className={classes.imageCardMedia} image={jumbotron}>
            <Box style={{height:"100%", paddingLeft:"20px"}}>
              <Typography variant="h2" style={{color:"#3b8fad", fontWeight:"bold"}}>
                  Discover your Movie
              </Typography>
              <Box style={{display:"flex"}}>
              <Typography variant="h4" style={{color:"#2d5a6a"}}>
                <b>  Discover </b>
              </Typography>
              <Typography variant="h3"> AGAIN</Typography>
              </Box>
              <Typography variant="h2" style={{color:"#d44343"}}> ... And FIND</Typography>
              <Typography variant="h1" style={{color:"#ffb400", paddingLeft:"95px", display:"block" }}><b>"Yourself"</b></Typography>
          </Box>
      </CardMedia>
    </Card>
  </Grid>
);

export default JumbotronCard;
