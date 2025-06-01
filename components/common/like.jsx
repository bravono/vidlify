"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"; // Hollow version

const Like = ({ onLike, liked }) => {
  return (
    <FontAwesomeIcon
      icon={liked ? faHeart : faHeartRegular}
      onClick={onLike}
      style={{ cursor: "pointer" }}
      area-hidden="true"
    />
  );
};

export default Like;
