import React, { useState, useEffect } from "react";
import { Grid, Paper, CardMedia, Typography } from "@material-ui/core";
import imdb from '../../assets/img/imbd.jpeg'
import axios from "axios";

import classes from "./index.module.css";
const MovieDetail = ({ match }) => {
  const [movie, setMovie] = useState({});

  const fetchMovie = async (id) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=201644f743b0d24a770d286005c9c5b8`
      )
      .then((res) => {
        // get poster and backposter by paths
        const imgBackground = `https://image.tmdb.org/t/p/original/${res.data.backdrop_path}`;
        const poster = `https://image.tmdb.org/t/p/original/${res.data.poster_path}`;
      
        //fetch actors by movie id
        let credits =  {actors:[], director:[]}
        axios.get(`https://api.themoviedb.org/3/movie/${res.data.id}/credits?api_key=201644f743b0d24a770d286005c9c5b8&language=en-US`)
        .then((res) => {
          credits.director = res.data.crew.filter( d => d.job ==="Director")

          res.data.cast.map( a => {
            let {name, id, profile_path, popularity, character} = a;
            let  minValue = Math.min(...credits.actors.map(a => a.popularity))
              if(credits.actors.length < 6){
                credits.actors.push({popularity})
              }
              else if (popularity > minValue){
                credits.actors[credits.actors.findIndex( a => a.popularity === minValue)] = {name, id, profile_path, popularity, character};

              }  
          })
          console.log("director",credits.director)
          console.log("actors",credits.actors.map(x => x.popularity))

        })

        // set movie details 
        setMovie({ ...res.data, imgBackground, poster, });
      })
      .catch((e) => {
        console.log("error", e.message);
      });

      
  };

  useEffect(() => {
    //when the page loading this will work and try to fetch data
    //https://www.imdb.com/title/titleIdHere
    //genres  an array  genres > id,name
    //spoken languages an array  spoken_languages
    if (match.params.movieId) fetchMovie(match.params.movieId);
  }, []);

  return (
    <Grid container item xl={12} lg={12} md={12} className={classes.content}>
      <Grid container item xl={9} lg={9} md={9} className={classes.poster}>
        <img src={movie.imgBackground} />
      </Grid>
      <Grid
        container
        item
        xl={3}
        lg={3}
        md={3}
        style={{backgroundColor:"#101010"}}
      >
        <Paper className={classes.details}>
          <h1>{movie.title}</h1>
          <p> poster {movie.poster_path}</p>
          <p> Tagline : {movie.tagline}</p>
          <img src={imdb}/>
          <p>relase date {movie.release_date}</p>
          <p>overview {movie.overview}</p>
          <p>O. language {movie.original_language}</p>
          <p>imdb id {movie.imdb_id}</p>
          <p>status {movie.status}</p>
          <p>average {movie.vote_average}</p>
          <p> count {movie.vote_count}</p>
          <p>maker</p>
          <p>video</p>
          <p>actors</p>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MovieDetail;
