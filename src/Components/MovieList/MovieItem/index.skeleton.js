import React from "react";
import { Skeleton, Rating } from "@material-ui/lab";
import { Box, Card, Divider } from "@material-ui/core";

import classes from "./index.module.css";

const MovieItemSkeleton = () => {
  return (
    <Card className={classes.card}>
      <Skeleton animation="wave" variant="rect" className={classes.cardMedia} />
      <Skeleton animation="wave" className={classes.skeletonTitle} />
      <Divider />
      <Box className={classes.skeletonBoxRate}>
        <Rating
          name="half-rating-read"
          defaultValue={0}
          readOnly
          size="small"
        />
        <Skeleton animation="wave" height={10} width={30} />
      </Box>
    </Card>
  );
};

export default MovieItemSkeleton;
