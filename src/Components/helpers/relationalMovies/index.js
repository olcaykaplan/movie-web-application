import { Grid, Typography, Box } from "@material-ui/core";
import React from "react";
import Carousel from "react-elastic-carousel";
import MovieItem from "../../MovieList/MovieItem";

import classes from "./index.module.css";

// https://sag1v.github.io/react-elastic-carousel/
const breakPoints = [
  { width: 1, itemsToShow: 1, itemsToScroll: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 850, itemsToShow: 3, itemsToScroll: 3 },
  { width: 1150, itemsToShow: 5, itemsToScroll: 5 },
  { width: 1450, itemsToShow: 10, itemsToScroll: 10 },
  { width: 1750, itemsToShow: 10, itemsToScroll: 10 },
];

const RelationalMovies = ({ content }) => {
  return (
    <Grid
      item
      xl={12}
      lg={12}
      md={12}
      sm={12}
      xs={12}
      className={classes.relationalGrid}
      id="smilarMovies"
    >
      <Box className={classes.carouselBoxColor}>
        <Typography variant="h1">Similar Movies</Typography>
        <Carousel
          pagination={false}
          className={classes.carousel}
          breakPoints={breakPoints}
        >
          {content.map((item, index) => (
            <MovieItem
              title={item.title}
              releaseDate={item.release_date}
              posterPath={item.poster_path}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              id={item.id}
            />
          ))}
        </Carousel>
      </Box>
    </Grid>
  );
};

export default RelationalMovies;
