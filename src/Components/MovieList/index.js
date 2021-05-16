import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl, apikey, language } from "../../api/index";

import MovieItem from "./MovieItem";
import JumbotronCard from "../helpers/jumbotron";

import {
  Grid,
  CircularProgress,
  TextField,
  makeStyles,
} from "@material-ui/core";

import { Autocomplete, Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  filterGrid: {
    backgroundColor: "rgba(10,10,10,0.1)",
    marginBottom: "20px",
  },
}));

const MovieList = () => {
  const classes = useStyles();
  const [popularMovieList, setPopularMovieList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const movieListTypes = [
    { type: "Popular", value: "popular" },
    { type: "Top Rated", value: "top_rated" },
    { type: "Now Playing", value: "now_playing" },
  ];
  const [movieListType, setMovieListType] = useState({ ...movieListTypes[0] });

  const fetchMovieList = async (type = movieListType.value, page = 1) => {
    // movie fetching by list type and page number

    axios
      .get(baseUrl + type + apikey + language + "&page=" + page)
      .then((res) => {
        setPopularMovieList(res.data.results);
        setLoading(false);
      });
  };

  const fetchMovieListTypeHandle = (newValue) => {
    // when movie list type change (popular / top rated / now playing)

    // first make loading false and show loading CircularProgress
    setLoading(true);
    // set movie list type
    setMovieListType(newValue);
    // after chose new movie list type, set page is 1
    setPageNumber(1);
    // accoridng to this information fetch data 
    fetchMovieList(newValue.value);
  };
  const handlePageNumber = (event, pageNum) => {
    // when page number change on pagination

    // first make loading false and show loading CircularProgress
    setLoading(true);
    // set pageNum 
    setPageNumber(pageNum);
    
    // accoridng to this information fetch data
    fetchMovieList(movieListType.value, pageNum);
  };

  useEffect(() => {
    // when the page loading this will work
    // default type is *popular*
    // default page number is 1
    fetchMovieList();
  }, []);

  return (
    <>
      {loading ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "80vh" }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <Grid
          container
          spacing={3}
          xl={10}
          lg={10}
          md={10}
          sm={10}
          xs={10}
          style={{ marginBottom: "20px" }}
        >
          <JumbotronCard />
          <Grid
            container
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            direction="row"
            alignItems="center"
            justify="space-between"
            className={classes.filterGrid}
          >
            <Autocomplete
              id="combo-box-demo"
              options={movieListTypes}
              autoHighlight
              value={movieListType}
              onChange={(event, newValue) => {
                fetchMovieListTypeHandle(newValue);
              }}
              getOptionLabel={(option) => option.type}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="List" variant="outlined" />
              )}
            />
            <div>
              <Pagination
                count={5}
                page={pageNumber}
                color="primary"
                onChange={handlePageNumber}
              />
            </div>
          </Grid>

          {(popularMovieList || []).map((m,index) => (
            <Grid
              container
              item
              xl={2}
              lg={3}
              md={4}
              sm={4}
              xs={12}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <MovieItem
                title={m.title}
                releaseDate={m.release_date}
                posterPath={m.poster_path}
                voteAverage={m.vote_average}
                voteCount={m.vote_count}
                id={m.id}
              />
            </Grid>
          ))}
          <Grid
            container
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            direction="row"
            alignItems="center"
            justify="center"
          >
            <Pagination
              count={5}
              page={pageNumber}
              color="primary"
              onChange={handlePageNumber}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default MovieList;
