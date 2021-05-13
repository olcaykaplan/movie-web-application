import React from 'react';

const MovieDetail = ({match}) => {
    console.log("match:", match.params.movieId)

    alert(match.params.movieId)
    return (
        <h1>Movie Details</h1>
    );
};

export default MovieDetail;