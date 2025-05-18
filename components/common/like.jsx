import React from "react";

const Like = ({ onLike, liked }) => {
let classes = liked ? "fas fa-heart" : "far fa-heart";
  return (
    <i
      onClick={onLike}
      className={classes}
      style={{ cursor: "pointer" }}
      area-hidden="true"
    ></i>
  );
};

export default Like;
