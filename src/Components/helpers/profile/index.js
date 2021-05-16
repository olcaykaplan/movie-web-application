import { Avatar, Tooltip } from "@material-ui/core";
import React from "react";

const Profile = ({ title, src, size }) => (
  <Tooltip title={title} arrow>
    <Avatar
      alt={title}
      src={`https://image.tmdb.org/t/p/original${src}`}
      sizes={"large"}
      style={{margin:"5px"}}
    />
  </Tooltip>
);
export default Profile;
