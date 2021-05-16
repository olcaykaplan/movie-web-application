import React from 'react';

import { Paper, Typography } from '@material-ui/core';

import classes from './index.module.css';
const iframeTemp = ({path}) =>(
    <Paper square className={[classes.paperBackgroundColor].join(' ')} id="video">
      <Typography variant="h1">Trailer</Typography>
    <div className={classes.videoWrapper} >
      <iframe
      className={classes.video}
        src={`https://www.youtube.com/embed/${path}`}
        frameBorder="0"
        allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  </Paper>
)

export default iframeTemp;