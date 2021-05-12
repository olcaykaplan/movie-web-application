import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Divider,
} from "@material-ui/core";
import MovieFilterIcon from '@material-ui/icons/MovieFilter';

import unnamed from "../../assets/img/unnamed.jpeg";
const MovieList = () => {
  return (
    <Card style={{ maxWidth: 300 }}>
      <CardMedia title="logo">
        <img src={unnamed} />
      </CardMedia>
      <CardContent>
        <Typography variant="h5" >Title is here</Typography>
        <Divider/>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <MovieFilterIcon />
        <Typography variant="caption">More Details</Typography>
      </CardActions>
    </Card>
  );
};

export default MovieList;
