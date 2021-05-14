import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Divider,
  Grid,
  Box
} from "@material-ui/core";
import {Event} from "@material-ui/icons";
import Rating from '@material-ui/lab/Rating';
import classes from "./index.module.css";
import { Link } from "react-router-dom";

const MovieItem = ({ title, releaseDate, posterPath, voteAverage, voteCount, id }) => {
  const imgBaseUrl = "https://image.tmdb.org/t/p/w1280";
  console.log(`key`,id);
 
  return (
    <Grid
      container
      item
      md={3}
      lg={3}
      xl={2}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Link to={`/movies/${id}`} style={{textDecoration:"none"}}>
      <Card key={id} className={classes.card}>
        <CardMedia
          title="card"
          className={classes.cardMedia}
          image={`${imgBaseUrl}${posterPath}`}
        >
          <Box className={classes.movieDate}>
          <Event fontSize="small"/>
          <Typography variant="caption">{releaseDate}</Typography>
          </Box>
        </CardMedia>
        
        <Box className={classes.boxContent}>
          <Box className={classes.title}>{title}</Box>
          <Divider/>
          <Box className={classes.boxRate}>
          <Rating name="half-rating-read" defaultValue={voteAverage/2} precision={0.5} readOnly size="small" /> 
           <span>({voteCount})</span>
          </Box>
        </Box>
      </Card>
      </Link>
    </Grid>
  );
};

export default MovieItem;
