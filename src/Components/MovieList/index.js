import React, { useState, useEffect } from "react";

import MovieItem from "./MovieItem";

import axios from "axios";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Divider,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";

const MovieList = () => {
  const [popularMovieList, setPopularMovieList] = useState([]);
  const [topRatedMovieList, setTopRatedMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovieList = async () => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=201644f743b0d24a770d286005c9c5b8&language=en-US&page=1"
      )
      .then((res) => {
        console.log("popular movies: ", res.data.results[0]);
        setPopularMovieList(res.data.results);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMovieList();
  }, []);

  return (
    <>
      {loading ? (
        <Grid container direction="column" alignItems="center" justify="center"  style={{minHeight: '80vh' }}>
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container spacing={3} lg={10} xl={10}>
          {(popularMovieList || []).map((m) => (
            <MovieItem
              title={m.title}
              releaseDate={m.release_date}
              posterPath={m.poster_path}
              voteAverage={m.vote_average}
              voteCount={m.vote_count}
              id={m.id}
            />
          ))}
        </Grid>
      )}
    </>
  );
};

export default MovieList;
