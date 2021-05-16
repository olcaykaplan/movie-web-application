import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Link,
  CircularProgress,
  Card,
} from "@material-ui/core";
import { Event, Movie, Star } from "@material-ui/icons";

import Profile from "../helpers/profile/";
import IframeTemp from "../helpers/iframe/";
import RelationalMovies from "../helpers/relationalMovies/";
import axios from "axios";
import { baseUrl, apikey, imgBaseUrlDetail, language } from "../../api/index";

import classes from "./index.module.css";
import { findDOMNode } from "react-dom";

const MovieDetail = ({ match }) => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [relationalMovies, setRelationalMovies] = useState([]);

  const fetchData = async (id) => {
    const movie = await fetchMovie(id);
    const credits = await fetchCredits(id);
    const video = await fetchMovieVideo(id);
    const dataRelationalMovies = await fetchRelationalMovies(id);
    const videoPath = video && video.key ? video.key : false;
    setRelationalMovies(dataRelationalMovies);
    setMovie({ ...movie, credits, videoPath });
    //make loading false and show data
    setLoading(false);
  };

  const fetchMovie = async (id) => {
    try {
      //fetch movie details by movie id
      const data = axios.get(baseUrl + id + apikey).then((res) => {
        // get poster and backposter by paths
        const imgBackground = imgBaseUrlDetail + res.data.backdrop_path;
        const poster = imgBaseUrlDetail + res.data.poster_path;
        return { ...res.data, imgBackground, poster };
      });
      return data;
    } catch (error) {
      console.log("Error Fetch Movie :", error.message);
    }
  };
  const fetchCredits = async (id) => {
    try {
      //fetch actors by movie id
      const data = await axios
        .get(baseUrl + id + "/credits" + apikey + language)
        .then((res) => {
          let credits = { actors: [], director: [] };
          //filter crews job to find director/s
          credits.director = res.data.crew.filter((d) => d.job === "Director");

          //mapping 6 actors by sorting their popularity value
          res.data.cast.map((a) => {
            let { name, id, profile_path, popularity, character } = a;
            let minValue = Math.min(...credits.actors.map((a) => a.popularity));
            if (credits.actors.length < 6) {
              credits.actors.push({
                name,
                id,
                profile_path,
                popularity,
                character,
              });
            } else if (popularity > minValue) {
              credits.actors[
                credits.actors.findIndex((a) => a.popularity === minValue)
              ] = { name, id, profile_path, popularity, character };
            }
          });
          return credits;
        });
      return data;
    } catch (error) {
      console.log("Error Fetch Credits :", error.message);
    }
  };
  const fetchMovieVideo = async (id) => {
    try {
      //fetch movie's video by movie id
      console.log(" url: ", baseUrl + id + "/videos" + apikey + language);
      const data = await axios
        .get(baseUrl + id + "/videos" + apikey + language)
        .then((res) => {
          // there may be more than one video
          // but send first item to show
          return res.data.results[0];
        });
      return data;
    } catch (error) {
      console.log("Error Fetch Movie Video:", error.message);
    }
  };

  const fetchRelationalMovies = async (id) => {
    try {
      //fetch similar movies of chosen movie by movie id
      const data = await axios
        .get(baseUrl + id + "/similar" + apikey + language + "page=1")
        .then((res) => {
          console.log("res", res);
          return res.data.results;
        });
      return data;
    } catch (err) {
      console.log("Error Fetch Relational Movies:", err.message);
    }
  };
  useEffect(() => {
    //when the match change;

    //before fetching show loading
    setLoading(true);
    // it will take you to the top of the page after click an similar movie
   /* window.scrollTo({
      top: 0,
      behavior: "smooth",
    });*/
    //fetch data will work
    if (match.params.movieId) fetchData(match.params.movieId);
  }, [match.params.movieId]);

  return (
    <>
      {loading ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "84vh" }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container item className={classes.content}>
          <Grid
            container
            item
            xl={9}
            lg={8}
            md={8}
            sm={12}
            xs={12}
            className={classes.poster}
          >
            <img src={movie.imgBackground} />
          </Grid>
          <Grid container item xl={3} lg={4} md={4} sm={12} xs={12}>
            <Paper
              square
              className={[classes.details, classes.paperBackgroundColor].join(" ")}
            >
              <Grid
                container
                style={{ paddingTop: 40}}
              >
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className={classes.detailsPoster}>
                    <img src={movie.poster} />
                  </Box>
                  <Typography variant="caption">{movie.tagline}</Typography>
                </Grid>
                <Grid item sm={12} xs={12} md={12} lg={6} xl={6}>
                  <Box className={[classes.colorWhite, classes.flex].join(" ")}>
                    <Event />
                    <Typography>Related Date : {movie.release_date}</Typography>
                  </Box>
                  {movie.videoPath ? (
                    <Box
                      className={[classes.movieStatus, classes.flex].join(" ")}
                    >
                      <Movie />
                      <Typography variant="body1">
                        <Link href="#video" underline="always" color="inherit">
                          Watch Trailer
                        </Link>
                      </Typography>
                    </Box>
                  ) : null}
                </Grid>
                <div style={{ width: "100%" }}>
                  <Typography variant="h4" className={classes.colorWhite}>
                    {movie.title}
                  </Typography>
                </div>
                <Box className={[classes.flex, classes.rating].join(" ")}>
                  <Star fontSize="large" />
                  <Typography variant="h4">({movie.vote_average})</Typography>
                </Box>
              </Grid>
              <Typography variant="subtitle2" className={classes.colorWhite}>
                Genres:
                {(movie.genres || []).map((g, index) =>
                  index !== movie.genres.length - 1 ? `${g.name}, ` : g.name
                )}
              </Typography>
              {relationalMovies.length > 0 ? (
                <Typography
                  variant="subtitle2"
                  style={{ paddingBottom: "10px" }}
                >
                  <Link href="#smilarMovies" underline="always" color="inherit">
                    Check Similar Movies
                  </Link>
                </Typography>
              ) : null}
              <Typography>{movie.overview}</Typography>
              <hr />
              <Typography className={classes.colorWhite}>Actors:</Typography>
              <Box className={classes.flex}>
                {(movie.credits?.actors || []).map((a) => (
                  <Profile
                    key={a.id}
                    title={a.name}
                    src={a.profile_path}
                    size="large"
                  />
                ))}
              </Box>
              <Typography className={classes.colorWhite}>Director:</Typography>
              <Box className={classes.flex}>
                {(movie.credits?.director || []).map((d) => (
                  <Profile
                    key={d.id}
                    title={d.name}
                    src={d.profile_path}
                    size="large"
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
          {relationalMovies.length > 0 ? (
            <RelationalMovies content={relationalMovies} />
          ) : null}
          {movie.videoPath ? (
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <IframeTemp path={movie.videoPath} />
            </Grid>
          ) : null}
        </Grid>
      )}
    </>
  );
};

export default MovieDetail;
