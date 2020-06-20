import React from "react";
import BannerImg from "../../../assets/images/banner.png";

const classes = require("./Banner.module.css");

const Banner = () => {
  return (
    <div className={classes.banner}>
      <img src={BannerImg} alt="Banner" />
    </div>
  );
};

export default Banner;
