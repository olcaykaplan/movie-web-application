import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Divider,
} from "@material-ui/core";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";

import unnamed from "../../assets/img/unnamed.jpeg";
const MovieList = () => {
 const  [popularMovieList, setPopularMovieList] = useState([]);
 const  [topRatedMovieList, setTopRatedMovieList] = useState([]);

 
  const fetchMovieList = async () => {
      axios.get("https://api.themoviedb.org/3/movie/popular?api_key=201644f743b0d24a770d286005c9c5b8&language=en-US&page=1")
        .then((res) => {
            console.log("popular movies: ",res.data.results[0])

            setPopularMovieList(res.data.results)
        })
      
  };
 
  useEffect(() => {
    fetchMovieList();
  }, []);

  return(
      <>
      {(popularMovieList || []).map((m,index) => (
          <>
          <span>{index}</span>
          <br/>
          </>
      ))}
     <h1>deneme</h1>
     </>
  );
};

export default MovieList;
