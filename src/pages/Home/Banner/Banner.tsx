import React from "react";

const classes = require("./Banner.module.css");

const Banner = () => {
  return (
    <div className={classes.banner}>
      <img
        src="https://2bbhfjfcid71r1htu46fdnn2-wpengine.netdna-ssl.com/wp-content/uploads/2018/12/18-12-Technical-Interview-Banner.png"
        alt="Banner"
      />
    </div>
  );
};

export default Banner;
