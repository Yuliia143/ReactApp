import React from "react";
import NavBar from "./NavBar/NavBar";

const classes = require("./RecomendedLections.module.css");

const RecomendedLections = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.info}>
        <h1 className={classes.title}>
          The world’s largest selection of courses
        </h1>
        <p className={classes.text}>
          Choose from over 100 online video courses with new additions published
          every month
        </p>
      </div>

      <div className={classes.wrapForCenter}>
        <NavBar />
      </div>
    </div>
  );
};

export default RecomendedLections;
